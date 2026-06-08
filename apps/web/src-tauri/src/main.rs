#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::sync::Mutex;
use tauri::{
    command,
    menu::{Menu, MenuItem},
    tray::{TrayIconBuilder, TrayIconEvent, TrayIcon},
    AppHandle, Emitter, Manager, WindowEvent,
};

struct WindowHidden(Mutex<bool>);

impl WindowHidden {
    fn set_hidden(&self, hidden: bool) { *self.0.lock().unwrap() = hidden; }
    fn is_hidden(&self) -> bool { *self.0.lock().unwrap() }
}

#[command]
fn hide_window(app: AppHandle) {
    if let Some(window) = app.get_webview_window("main") {
        let hidden_state = app.state::<WindowHidden>();
        hidden_state.set_hidden(true);
        let _ = window.hide();
        if let Some(tray) = app.try_state::<TrayIcon>() {
            update_tray_menu(&app, &tray);
        }
    }
}

#[command]
async fn record_and_transcribe(_app: tauri::AppHandle) -> Result<String, String> {
    use std::process::Command;
    use tempfile::NamedTempFile;

    let audio_file = NamedTempFile::new().map_err(|e| format!("tempfile: {}", e))?;
    let audio_path = audio_file.path().to_str().unwrap().to_string();
    drop(audio_file);

    let arecord = Command::new("arecord")
        .arg("-D").arg("default")
        .arg("-f").arg("S16_LE")
        .arg("-r").arg("44100")
        .arg("-c").arg("2")
        .arg("-d").arg("5")
        .arg("-q")
        .arg(&audio_path)
        .output()
        .map_err(|e| format!("arecord: {}", e))?;

    if !arecord.status.success() {
        return Err(format!("arecord error: {}", String::from_utf8_lossy(&arecord.stderr)));
    }

    let whisper_bin = std::env::var("WHISPER_CLI_PATH")
        .unwrap_or_else(|_| {
            let manifest_dir = std::env::var("CARGO_MANIFEST_DIR")
                .unwrap_or_else(|_| ".".to_string());
            std::path::PathBuf::from(manifest_dir)
                .join("DelezApp/usr/bin/whisper-cli")
                .to_str()
                .unwrap_or("whisper-cli")
                .to_string()
        });

    let model_path = std::env::var("WHISPER_MODEL_PATH")
        .unwrap_or_else(|_| {
            let home = std::env::var("HOME").unwrap_or_else(|_| "/home/user".to_string());
            format!("{}/.cache/delez/whisper/ggml-small.bin", home)
        });

    let output = Command::new(&whisper_bin)
        .arg("-m").arg(&model_path)
        .arg("-f").arg(&audio_path)
        .arg("-l").arg("ru")
        .arg("--no-prints")
        .output()
        .map_err(|e| format!("whisper: {}", e))?;

    if !output.status.success() {
        return Err(format!("whisper error: {}", String::from_utf8_lossy(&output.stderr)));
    }

    let stdout = String::from_utf8_lossy(&output.stdout);
    let text = stdout
        .lines()
        .filter(|line| line.contains("]"))
        .last()
        .map(|line| {
            if let Some(pos) = line.find("] ") {
                line[pos + 2..].trim().to_string()
            } else {
                line.trim().to_string()
            }
        })
        .unwrap_or_default();

    if text.is_empty() {
        return Err(format!("whisper empty. Raw output:\n{}", stdout));
    }

    Ok(text)
}

fn update_tray_menu(app: &AppHandle, tray: &TrayIcon) {
    let hidden = app.try_state::<WindowHidden>().map(|s| s.is_hidden()).unwrap_or(false);
    let toggle_text = if hidden { "Открыть" } else { "Свернуть в трей" };
    let toggle = MenuItem::with_id(app, "toggle", toggle_text, true, None::<&str>).unwrap();
    let new_entry = MenuItem::with_id(app, "new_entry", "Новая запись", true, None::<&str>).unwrap();
    let quit = MenuItem::with_id(app, "quit", "Выход", true, None::<&str>).unwrap();
    let menu = Menu::with_items(app, &[&toggle, &new_entry, &quit]).unwrap();
    let _ = tray.set_menu(Some(menu));
}

fn handle_menu_event(app: &AppHandle, event: tauri::menu::MenuEvent, tray: &TrayIcon) {
    if let Some(window) = app.get_webview_window("main") {
        match event.id.as_ref() {
            "toggle" => {
                let hidden_state = app.state::<WindowHidden>();
                let was_hidden = hidden_state.is_hidden();
                if was_hidden {
                    let _ = window.show(); let _ = window.set_focus();
                    hidden_state.set_hidden(false);
                } else {
                    let _ = window.hide(); hidden_state.set_hidden(true);
                }
                update_tray_menu(app, tray);
            }
            "new_entry" => {
                app.state::<WindowHidden>().set_hidden(false);
                let _ = window.show(); let _ = window.set_focus();
                let _ = window.emit("new-entry", ());
                update_tray_menu(app, tray);
            }
            "quit" => app.exit(0),
            _ => {}
        }
    }
}

fn handle_tray_event(app: &AppHandle, event: TrayIconEvent, tray: &TrayIcon) {
    if let TrayIconEvent::Click {
        button: tauri::tray::MouseButton::Left,
        button_state: tauri::tray::MouseButtonState::Up,
        ..
    } = event {
        if let Some(window) = app.get_webview_window("main") {
            app.state::<WindowHidden>().set_hidden(false);
            let _ = window.show(); let _ = window.set_focus();
            update_tray_menu(app, tray);
        }
    }
}

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_window_state::Builder::default().build())
        .plugin(tauri_plugin_notification::init())
        .plugin(tauri_plugin_http::init())
        .manage(WindowHidden(Mutex::new(false)))
        .invoke_handler(tauri::generate_handler![hide_window, record_and_transcribe])
        .setup(|app| {
            let handle = app.handle().clone();
            let toggle = MenuItem::with_id(&handle, "toggle", "Свернуть в трей", true, None::<&str>)?;
            let new_entry = MenuItem::with_id(&handle, "new_entry", "Новая запись", true, None::<&str>)?;
            let quit = MenuItem::with_id(&handle, "quit", "Выход", true, None::<&str>)?;
            let menu = Menu::with_items(&handle, &[&toggle, &new_entry, &quit])?;
            let tray = TrayIconBuilder::new()
                .menu(&menu)
                .show_menu_on_left_click(false)
                .icon(app.default_window_icon().unwrap().clone())
                .on_menu_event(move |app, event| {
                    if let Some(tray) = app.try_state::<TrayIcon>() { handle_menu_event(app, event, &tray); }
                })
                .on_tray_icon_event(move |tray_event, event| {
                    let app = tray_event.app_handle();
                    if let Some(tray) = app.try_state::<TrayIcon>() { handle_tray_event(app, event, &tray); }
                })
                .build(app)?;
            app.manage(tray);
            Ok(())
        })
		.on_window_event(|window, event| {
		    if let WindowEvent::CloseRequested { api, .. } = event {
		        let app = window.app_handle();
		        let _ = window.hide();
		        api.prevent_close();
		        app.state::<WindowHidden>().set_hidden(true);
		        if let Some(tray) = app.try_state::<TrayIcon>() {
		            update_tray_menu(&app, &tray);
		        }
		    }
		})
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
