# Delёz — персональный ИИ-ассистент саморефлексии

Проект Delёz помогает осмыслить события, эмоции и решения через призму философии Жиля Делёза.  
Приложение представляет собой AI-дневник с чатом, аналитикой, графом связей и голосовым вводом.  
Доступен как web-версия, так и кроссплатформенный desktop-клиент (Tauri v2).

---

## Основные возможности

- Чат с ИИ (GigaChat) с сохранением контекста и потоковой передачей ответов  
- Дневник с календарём, блокнотами, аналитикой и импортом Markdown  
- Ризома — интерактивный граф связей между событиями, целями, экспериментами  
- Голосовой ввод (Web Speech API на Windows/macOS, whisper.cpp на Linux)  
- Кеширование записей для офлайн-доступа (до 50 записей)

### Desktop-клиент (Tauri v2)

- Кастомный титулбар с кнопками навигации и оконными действиями  
- Системный трей с динамическим меню (Открыть/Свернуть, Новая запись, Выход)  
- Глобальные горячие клавиши (`Ctrl+N`, `Ctrl+,`, `Ctrl+Q`)  
- Системные уведомления через плагин Tauri  
- Запоминание позиции и размера окна  
- Сборка установщиков: AppImage, deb (Linux), MSI (Windows), тестовый APK (Android)

---

## Стек технологий

- **Backend:** Python 3.11, FastAPI, Uvicorn, PostgreSQL, Neo4j, ChromaDB  
- **Frontend/Desktop:** React 19, TypeScript, Vite, Tauri v2 (Rust)  
- **AI/Голос:** GigaChat, LangGraph, whisper.cpp (Linux), Web Speech API  
- **DevOps:** Docker, GitLab CI/CD, Nginx, SonarQube, Grafana/Prometheus/Loki  

---

## Структура проекта
```
.
├── CLAUDE.md
├── Dockerfile
├── Project_files
│   ├── Documentation_frontend
│   │   ├── What-are-we-going-for-2.png
│   │   ├── What-are-we-going-for.md
│   │   ├── What-are-we-going-for.png
│   │   ├── _index.md
│   │   ├── architecture.md
│   │   ├── commit-rules.md
│   │   └── new-architecture.md
│   └── tasks-frontend
│       ├── Chat-page.md
│       ├── IMG_2064.mp4
│       ├── _index-2-2.png
│       ├── _index-3.png
│       ├── _index.md
│       ├── integration_ui
│       │   └── _index.md
│       ├── podpravit-2.png
│       ├── podpravit-3.png
│       ├── podpravit.md
│       ├── podpravit.png
│       ├── podtverzhdenie-akkaunta-2.png
│       ├── podtverzhdenie-akkaunta.md
│       ├── podtverzhdenie-akkaunta.png
│       ├── sbros-parolya-podtverzhdenie-akkaunta-2.png
│       ├── sbros-parolya-podtverzhdenie-akkaunta.md
│       ├── sbros-parolya-podtverzhdenie-akkaunta.png
│       ├── stilizovat.md
│       └── Подтверждение email - Trim.mp4
├── api.json
├── apps
│   └── web
│       ├── Delez.7z
│       ├── README.md
│       ├── api.json
│       ├── build-appimage.sh
│       ├── components.json
│       ├── coverage
│       │   ├── base.css
│       │   ├── block-navigation.js
│       │   ├── components
│       │   │   ├── LandingFooter.tsx.html
│       │   │   ├── PasswordToggleButton.tsx.html
│       │   │   ├── ProtectedRoute.tsx.html
│       │   │   ├── empty.tsx.html
│       │   │   ├── index.html
│       │   │   ├── thread
│       │   │   │   ├── agent-inbox
│       │   │   │   │   ├── components
│       │   │   │   │   │   ├── inbox-item-input.tsx.html
│       │   │   │   │   │   ├── index.html
│       │   │   │   │   │   └── state-view.tsx.html
│       │   │   │   │   ├── hooks
│       │   │   │   │   │   ├── index.html
│       │   │   │   │   │   └── use-interrupted-actions.tsx.html
│       │   │   │   │   ├── index.html
│       │   │   │   │   └── utils.ts.html
│       │   │   │   ├── context-banner.tsx.html
│       │   │   │   ├── history
│       │   │   │   │   ├── index.html
│       │   │   │   │   └── index.tsx.html
│       │   │   │   ├── index.html
│       │   │   │   ├── index.tsx.html
│       │   │   │   ├── messages
│       │   │   │   │   ├── ai.tsx.html
│       │   │   │   │   ├── generic-interrupt.tsx.html
│       │   │   │   │   ├── human.tsx.html
│       │   │   │   │   ├── index.html
│       │   │   │   │   ├── reactions.tsx.html
│       │   │   │   │   ├── tool-calls.tsx.html
│       │   │   │   │   └── utils.ts.html
│       │   │   │   └── utils.ts.html
│       │   │   └── ui
│       │   │       ├── button.tsx.html
│       │   │       ├── empty.tsx.html
│       │   │       ├── index.html
│       │   │       ├── input.tsx.html
│       │   │       ├── label.tsx.html
│       │   │       ├── password-input.tsx.html
│       │   │       ├── separator.tsx.html
│       │   │       └── textarea.tsx.html
│       │   ├── favicon.png
│       │   ├── hooks
│       │   │   ├── index.html
│       │   │   ├── useHints.ts.html
│       │   │   ├── useMediaQuery.tsx.html
│       │   │   └── useSpeechRecognition.tsx.html
│       │   ├── index.html
│       │   ├── lcov-report
│       │   │   ├── base.css
│       │   │   ├── block-navigation.js
│       │   │   ├── components
│       │   │   │   ├── LandingFooter.tsx.html
│       │   │   │   ├── PasswordToggleButton.tsx.html
│       │   │   │   ├── ProtectedRoute.tsx.html
│       │   │   │   ├── empty.tsx.html
│       │   │   │   ├── index.html
│       │   │   │   ├── thread
│       │   │   │   │   ├── agent-inbox
│       │   │   │   │   │   ├── components
│       │   │   │   │   │   │   ├── inbox-item-input.tsx.html
│       │   │   │   │   │   │   ├── index.html
│       │   │   │   │   │   │   └── state-view.tsx.html
│       │   │   │   │   │   ├── hooks
│       │   │   │   │   │   │   ├── index.html
│       │   │   │   │   │   │   └── use-interrupted-actions.tsx.html
│       │   │   │   │   │   ├── index.html
│       │   │   │   │   │   └── utils.ts.html
│       │   │   │   │   ├── context-banner.tsx.html
│       │   │   │   │   ├── history
│       │   │   │   │   │   ├── index.html
│       │   │   │   │   │   └── index.tsx.html
│       │   │   │   │   ├── index.html
│       │   │   │   │   ├── index.tsx.html
│       │   │   │   │   ├── messages
│       │   │   │   │   │   ├── ai.tsx.html
│       │   │   │   │   │   ├── generic-interrupt.tsx.html
│       │   │   │   │   │   ├── human.tsx.html
│       │   │   │   │   │   ├── index.html
│       │   │   │   │   │   ├── reactions.tsx.html
│       │   │   │   │   │   ├── tool-calls.tsx.html
│       │   │   │   │   │   └── utils.ts.html
│       │   │   │   │   └── utils.ts.html
│       │   │   │   └── ui
│       │   │   │       ├── button.tsx.html
│       │   │   │       ├── empty.tsx.html
│       │   │   │       ├── index.html
│       │   │   │       ├── input.tsx.html
│       │   │   │       ├── label.tsx.html
│       │   │   │       ├── password-input.tsx.html
│       │   │   │       ├── separator.tsx.html
│       │   │   │       └── textarea.tsx.html
│       │   │   ├── favicon.png
│       │   │   ├── hooks
│       │   │   │   ├── index.html
│       │   │   │   ├── useHints.ts.html
│       │   │   │   ├── useMediaQuery.tsx.html
│       │   │   │   └── useSpeechRecognition.tsx.html
│       │   │   ├── index.html
│       │   │   ├── lib
│       │   │   │   ├── agent-inbox-interrupt.ts.html
│       │   │   │   ├── api-client.ts.html
│       │   │   │   ├── api-key.tsx.html
│       │   │   │   ├── auth-utils.ts.html
│       │   │   │   ├── ensure-tool-responses.ts.html
│       │   │   │   ├── index.html
│       │   │   │   ├── logger.ts.html
│       │   │   │   └── utils.ts.html
│       │   │   ├── pages
│       │   │   │   ├── BetaTest.tsx.html
│       │   │   │   ├── EmailSent.tsx.html
│       │   │   │   ├── ForgotPassword.tsx.html
│       │   │   │   ├── Landing.tsx.html
│       │   │   │   ├── NotFound.tsx.html
│       │   │   │   ├── ResetPassword.tsx.html
│       │   │   │   ├── SignIn.tsx.html
│       │   │   │   ├── SignUp.tsx.html
│       │   │   │   ├── VerifyEmail.tsx.html
│       │   │   │   └── index.html
│       │   │   ├── prettify.css
│       │   │   ├── prettify.js
│       │   │   ├── providers
│       │   │   │   ├── Stream.tsx.html
│       │   │   │   ├── Thread.tsx.html
│       │   │   │   └── index.html
│       │   │   ├── sort-arrow-sprite.png
│       │   │   ├── sorter.js
│       │   │   ├── styles
│       │   │   │   ├── auth.css.html
│       │   │   │   ├── index.html
│       │   │   │   └── landing.css.html
│       │   │   └── utils
│       │   │       ├── index.html
│       │   │       └── math.ts.html
│       │   ├── lcov.info
│       │   ├── lib
│       │   │   ├── agent-inbox-interrupt.ts.html
│       │   │   ├── api-client.ts.html
│       │   │   ├── api-key.tsx.html
│       │   │   ├── auth-utils.ts.html
│       │   │   ├── ensure-tool-responses.ts.html
│       │   │   ├── index.html
│       │   │   ├── logger.ts.html
│       │   │   └── utils.ts.html
│       │   ├── pages
│       │   │   ├── BetaTest.tsx.html
│       │   │   ├── EmailSent.tsx.html
│       │   │   ├── ForgotPassword.tsx.html
│       │   │   ├── Landing.tsx.html
│       │   │   ├── NotFound.tsx.html
│       │   │   ├── ResetPassword.tsx.html
│       │   │   ├── SignIn.tsx.html
│       │   │   ├── SignUp.tsx.html
│       │   │   ├── VerifyEmail.tsx.html
│       │   │   └── index.html
│       │   ├── prettify.css
│       │   ├── prettify.js
│       │   ├── providers
│       │   │   ├── Stream.tsx.html
│       │   │   ├── Thread.tsx.html
│       │   │   └── index.html
│       │   ├── sort-arrow-sprite.png
│       │   ├── sorter.js
│       │   ├── styles
│       │   │   ├── auth.css.html
│       │   │   ├── index.html
│       │   │   └── landing.css.html
│       │   └── utils
│       │       ├── index.html
│       │       └── math.ts.html
│       ├── eslint.config.js
│       ├── index.html
│       ├── install-debug.sh
│       ├── install-release.sh
│       ├── install.sh
│       ├── package.json
│       ├── public
│       │   ├── Vector.png
│       │   ├── arrow_right.png
│       │   ├── cat_writing.jpg
│       │   ├── favicon_16x16.png
│       │   ├── favicon_32x32.png
│       │   ├── favicon_64x64.png
│       │   ├── image 3.png
│       │   ├── penguin.png
│       │   ├── penguin2.png
│       │   ├── penguin3.png
│       │   └── thread-more-dots.png
│       ├── src
│       │   ├── App.tsx
│       │   ├── DesktopApp.tsx
│       │   ├── assets
│       │   │   ├── DMMono-Light.ttf
│       │   │   ├── Macbook Air M2 Silver Flatten.png
│       │   │   ├── cat_writing.jpg
│       │   │   ├── circle_of_sins.png
│       │   │   ├── configuration.png
│       │   │   ├── graph.png
│       │   │   ├── history.png
│       │   │   ├── image 6.png
│       │   │   ├── input_bg.png
│       │   │   ├── memory.png
│       │   │   ├── overtime.png
│       │   │   ├── padlock.png
│       │   │   ├── send_arrow.png
│       │   │   └── shield.png
│       │   ├── components
│       │   │   ├── Breadcrumbs.tsx
│       │   │   ├── DesktopRedirect.tsx
│       │   │   ├── DesktopStatusBar.tsx
│       │   │   ├── LandingFooter.test.tsx
│       │   │   ├── LandingFooter.tsx
│       │   │   ├── NavigationBar.tsx
│       │   │   ├── ParticlesBackground.tsx
│       │   │   ├── PasswordToggleButton.test.tsx
│       │   │   ├── PasswordToggleButton.tsx
│       │   │   ├── ProtectedRoute.test.tsx
│       │   │   ├── ProtectedRoute.tsx
│       │   │   ├── empty.test.tsx
│       │   │   ├── empty.tsx
│       │   │   ├── icons
│       │   │   │   └── langgraph.tsx
│       │   │   ├── thread
│       │   │   │   ├── agent-inbox
│       │   │   │   │   ├── components
│       │   │   │   │   │   ├── inbox-item-input.test.tsx
│       │   │   │   │   │   ├── inbox-item-input.tsx
│       │   │   │   │   │   ├── state-view.test.tsx
│       │   │   │   │   │   ├── state-view.tsx
│       │   │   │   │   │   ├── thread-actions-view.tsx
│       │   │   │   │   │   ├── thread-id.tsx
│       │   │   │   │   │   └── tool-call-table.tsx
│       │   │   │   │   ├── hooks
│       │   │   │   │   │   ├── use-interrupted-actions.test.tsx
│       │   │   │   │   │   └── use-interrupted-actions.tsx
│       │   │   │   │   ├── index.tsx
│       │   │   │   │   ├── types.ts
│       │   │   │   │   ├── utils.test.ts
│       │   │   │   │   └── utils.ts
│       │   │   │   ├── chat-hints.test.tsx
│       │   │   │   ├── chat-hints.tsx
│       │   │   │   ├── context-banner.test.tsx
│       │   │   │   ├── context-banner.tsx
│       │   │   │   ├── history
│       │   │   │   │   ├── index.test.tsx
│       │   │   │   │   └── index.tsx
│       │   │   │   ├── index.test.tsx
│       │   │   │   ├── index.tsx
│       │   │   │   ├── markdown-styles.css
│       │   │   │   ├── markdown-text.tsx
│       │   │   │   ├── messages
│       │   │   │   │   ├── ai.test.tsx
│       │   │   │   │   ├── ai.tsx
│       │   │   │   │   ├── generic-interrupt.test.tsx
│       │   │   │   │   ├── generic-interrupt.tsx
│       │   │   │   │   ├── human.test.tsx
│       │   │   │   │   ├── human.tsx
│       │   │   │   │   ├── reactions.tsx
│       │   │   │   │   ├── shared.tsx
│       │   │   │   │   ├── tool-calls.test.tsx
│       │   │   │   │   ├── tool-calls.tsx
│       │   │   │   │   ├── utils.test.ts
│       │   │   │   │   └── utils.ts
│       │   │   │   ├── syntax-highlighter.tsx
│       │   │   │   ├── thread-more-menu.test.tsx
│       │   │   │   ├── thread-more-menu.tsx
│       │   │   │   ├── tooltip-icon-button.tsx
│       │   │   │   ├── utils.test.ts
│       │   │   │   └── utils.ts
│       │   │   └── ui
│       │   │       ├── avatar.tsx
│       │   │       ├── button.tsx
│       │   │       ├── card.tsx
│       │   │       ├── dropdown-menu.tsx
│       │   │       ├── empty.tsx
│       │   │       ├── input.tsx
│       │   │       ├── label.tsx
│       │   │       ├── loading-animation.tsx
│       │   │       ├── password-input.tsx
│       │   │       ├── separator.tsx
│       │   │       ├── sheet.tsx
│       │   │       ├── skeleton.tsx
│       │   │       ├── sonner.tsx
│       │   │       ├── switch.tsx
│       │   │       ├── textarea.tsx
│       │   │       └── tooltip.tsx
│       │   ├── hooks
│       │   │   ├── useDesktopEvents.ts
│       │   │   ├── useDesktopNotifications.ts
│       │   │   ├── useHints.test.ts
│       │   │   ├── useHints.ts
│       │   │   ├── useMediaQuery.test.tsx
│       │   │   ├── useMediaQuery.tsx
│       │   │   ├── useSpeechRecognition.test.tsx
│       │   │   ├── useSpeechRecognition.tsx
│       │   │   ├── useTitleBarNavigation.ts
│       │   │   └── useWindowState.ts
│       │   ├── index.css
│       │   ├── lib
│       │   │   ├── agent-inbox-interrupt.test.ts
│       │   │   ├── agent-inbox-interrupt.ts
│       │   │   ├── api-client.test.ts
│       │   │   ├── api-client.ts
│       │   │   ├── api-key.test.ts
│       │   │   ├── api-key.tsx
│       │   │   ├── auth-client.ts
│       │   │   ├── auth-utils.test.ts
│       │   │   ├── auth-utils.ts
│       │   │   ├── ensure-tool-responses.test.ts
│       │   │   ├── ensure-tool-responses.ts
│       │   │   ├── logger.test.ts
│       │   │   ├── logger.ts
│       │   │   ├── mbti-data.ts
│       │   │   ├── utils.test.ts
│       │   │   └── utils.ts
│       │   ├── main.tsx
│       │   ├── pages
│       │   │   ├── BetaTest.test.tsx
│       │   │   ├── BetaTest.tsx
│       │   │   ├── DevelopmentPage.tsx
│       │   │   ├── EmailSent.test.tsx
│       │   │   ├── EmailSent.tsx
│       │   │   ├── Event.tsx
│       │   │   ├── EventsPage.test.tsx
│       │   │   ├── EventsPage.tsx
│       │   │   ├── Experiment.tsx
│       │   │   ├── ExperimentsPage.test.tsx
│       │   │   ├── ExperimentsPage.tsx
│       │   │   ├── ForgotPassword.test.tsx
│       │   │   ├── ForgotPassword.tsx
│       │   │   ├── GoalPage.test.tsx
│       │   │   ├── GoalPage.tsx
│       │   │   ├── GoalsPage.test.tsx
│       │   │   ├── GoalsPage.tsx
│       │   │   ├── GraphPage.tsx
│       │   │   ├── Landing.test.tsx
│       │   │   ├── Landing.tsx
│       │   │   ├── MBTITestPage.tsx
│       │   │   ├── MemoirsPage.tsx
│       │   │   ├── NavigationPage.tsx
│       │   │   ├── NotFound.test.tsx
│       │   │   ├── NotFound.tsx
│       │   │   ├── NotebookEntriesPage.tsx
│       │   │   ├── Privacy.tsx
│       │   │   ├── ProfilePage.tsx
│       │   │   ├── RecordsPage.tsx
│       │   │   ├── ReportPage.test.tsx
│       │   │   ├── ReportPage.tsx
│       │   │   ├── ResetPassword.test.tsx
│       │   │   ├── ResetPassword.tsx
│       │   │   ├── SignIn.test.tsx
│       │   │   ├── SignIn.tsx
│       │   │   ├── SignUp.test.tsx
│       │   │   ├── SignUp.tsx
│       │   │   ├── Terms.tsx
│       │   │   ├── VerifyEmail.test.tsx
│       │   │   ├── VerifyEmail.tsx
│       │   │   └── VirtualFieldsPage.tsx
│       │   ├── providers
│       │   │   ├── Stream.test.tsx
│       │   │   ├── Stream.tsx
│       │   │   ├── Thread.test.tsx
│       │   │   ├── Thread.tsx
│       │   │   └── client.ts
│       │   ├── styles
│       │   │   ├── auth-backup.css
│       │   │   ├── auth.css
│       │   │   ├── landing.css
│       │   │   └── navigation.css
│       │   ├── test
│       │   │   └── setup.ts
│       │   ├── three.d.ts
│       │   ├── utils
│       │   │   ├── cache.ts
│       │   │   ├── math.test.ts
│       │   │   ├── math.ts
│       │   │   ├── tauri-direct.ts
│       │   │   └── tauri.ts
│       │   └── vite-env.d.ts
│       ├── src-tauri
│       │   ├── Cargo.lock
│       │   ├── Cargo.toml
│       │   ├── build.rs
│       │   ├── capabilities
│       │   │   └── default.json
│       │   ├── gen
│       │   │   └── schemas
│       │   │       ├── acl-manifests.json
│       │   │       ├── capabilities.json
│       │   │       ├── desktop-schema.json
│       │   │       ├── linux-schema.json
│       │   │       └── windows-schema.json
│       │   ├── icons
│       │   │   ├── 128x128.png
│       │   │   ├── 128x128@2x.png
│       │   │   ├── 32x32.png
│       │   │   ├── icon.icns
│       │   │   └── icon.ico
│       │   ├── src
│       │   │   └── main.rs
│       │   ├── tauri.conf.json
│       │   └── whisper-runtime
│       │       └── setup-model.sh
│       ├── tailwind.config.js
│       ├── tsconfig.app.json
│       ├── tsconfig.json
│       ├── tsconfig.node.json
│       ├── turbo.json
│       ├── vite.config.ts
│       └── vitest.config.ts
├── auth.test.ts
├── auth.ts
├── better-auth_migrations
│   └── 2025-11-30T00-01-55.929Z.sql
├── check_auth.ts
├── create-coverage.js
├── docker-compose.staging.yml
├── docker-compose.yml
├── docs
│   └── html
│       ├── App_8tsx.html
│       ├── BetaTest_8tsx.html
│       ├── EmailSent_8tsx.html
│       ├── Event_8tsx.html
│       ├── EventsPage_8tsx.html
│       ├── Experiment_8tsx.html
│       ├── ExperimentsPage_8tsx.html
│       ├── ForgotPassword_8tsx.html
│       ├── GoalPage_8tsx.html
│       ├── GoalsPage_8tsx.html
│       ├── GraphPage_8tsx.html
│       ├── LandingFooter_8tsx.html
│       ├── Landing_8tsx.html
│       ├── NotFound_8tsx.html
│       ├── ParticlesBackground_8tsx.html
│       ├── PasswordToggleButton_8tsx.html
│       ├── Privacy_8tsx.html
│       ├── ProtectedRoute_8tsx.html
│       ├── ReportPage_8tsx.html
│       ├── ResetPassword_8tsx.html
│       ├── SignIn_8tsx.html
│       ├── SignUp_8tsx.html
│       ├── Stream_8tsx.html
│       ├── Thread_8tsx.html
│       ├── VerifyEmail_8tsx.html
│       ├── agent-inbox-interrupt_8ts.html
│       ├── agent-inbox_2index_8tsx.html
│       ├── ai_8tsx.html
│       ├── api-client_8ts.html
│       ├── api-key_8tsx.html
│       ├── auth-client_8ts.html
│       ├── auth-utils_8ts.html
│       ├── avatar_8tsx.html
│       ├── button_8tsx.html
│       ├── card_8tsx.html
│       ├── chat-hints_8tsx.html
│       ├── client_8ts.html
│       ├── clipboard.js
│       ├── components_2thread_2agent-inbox_2utils_8ts.html
│       ├── components_2thread_2messages_2utils_8ts.html
│       ├── components_2thread_2utils_8ts.html
│       ├── context-banner_8tsx.html
│       ├── cookie.js
│       ├── dir_034f0908076cb9d9fe6fa9862c91e21a.html
│       ├── dir_034f0908076cb9d9fe6fa9862c91e21a.js
│       ├── dir_1c2432606d4ac3ed78825ecc7d8d83ee.html
│       ├── dir_1c2432606d4ac3ed78825ecc7d8d83ee.js
│       ├── dir_26d72a09be520f9ee720cdb8cfb9ad76.html
│       ├── dir_26d72a09be520f9ee720cdb8cfb9ad76.js
│       ├── dir_418a504f3cb1aa4cec4801303ccf9711.html
│       ├── dir_418a504f3cb1aa4cec4801303ccf9711.js
│       ├── dir_4b8451646ec8005222e89de002fdc702.html
│       ├── dir_4b8451646ec8005222e89de002fdc702.js
│       ├── dir_512cff6ab2ed082791082a46ef12b1d4.html
│       ├── dir_512cff6ab2ed082791082a46ef12b1d4.js
│       ├── dir_5e5f507e9cf3a0c60848e64f1339591c.html
│       ├── dir_5e5f507e9cf3a0c60848e64f1339591c.js
│       ├── dir_5e853f1daa1df4481d7f9b35fff0dc0f.html
│       ├── dir_5e853f1daa1df4481d7f9b35fff0dc0f.js
│       ├── dir_718f99dab26efe4853b40410b6d5768d.html
│       ├── dir_718f99dab26efe4853b40410b6d5768d.js
│       ├── dir_8281e714de644f5685da6d26fbc2ce3c.html
│       ├── dir_83dd2850f4ebb7682c6c98003fac1897.html
│       ├── dir_83dd2850f4ebb7682c6c98003fac1897.js
│       ├── dir_8756785360dd821841256fa6f150484d.html
│       ├── dir_8756785360dd821841256fa6f150484d.js
│       ├── dir_8ab632966909e8b6524997d3ef081211.html
│       ├── dir_8ab632966909e8b6524997d3ef081211.js
│       ├── dir_9654b8d08f4bba4e84b362c5fd320bee.html
│       ├── dir_9654b8d08f4bba4e84b362c5fd320bee.js
│       ├── dir_a052651e953b3afa05564605e35b4520.html
│       ├── dir_a052651e953b3afa05564605e35b4520.js
│       ├── dir_c3c3628c9e7eff9877b3e5b82101a67f.html
│       ├── dir_c3c3628c9e7eff9877b3e5b82101a67f.js
│       ├── dir_d7fc10608d2bea856fe6f2aabb35e9da.html
│       ├── dir_d7fc10608d2bea856fe6f2aabb35e9da.js
│       ├── dir_e8428325b2ff82e7ac05f5a386b592c3.html
│       ├── dir_e8428325b2ff82e7ac05f5a386b592c3.js
│       ├── dir_ef156c39908085b40117e676bb28c2fc.html
│       ├── dir_ef156c39908085b40117e676bb28c2fc.js
│       ├── doxygen.css
│       ├── doxygen.svg
│       ├── doxygen_crawl.html
│       ├── doxygen_custom.css
│       ├── dynsections.js
│       ├── empty_8tsx.html
│       ├── ensure-tool-responses_8ts.html
│       ├── files.html
│       ├── files_dup.js
│       ├── generic-interrupt_8tsx.html
│       ├── history_2index_8tsx.html
│       ├── human_8tsx.html
│       ├── inbox-item-input_8tsx.html
│       ├── index.html
│       ├── index.js
│       ├── index_8tsx.html
│       ├── input_8tsx.html
│       ├── jquery.js
│       ├── label_8tsx.html
│       ├── langgraph_8tsx.html
│       ├── lib_2utils_8ts.html
│       ├── loading-animation_8tsx.html
│       ├── logger_8ts.html
│       ├── main_8tsx.html
│       ├── mainpage_8dox.html
│       ├── markdown-text_8tsx.html
│       ├── math_8ts.html
│       ├── menu.js
│       ├── menudata.js
│       ├── navtree.css
│       ├── navtree.js
│       ├── navtreedata.js
│       ├── navtreeindex0.js
│       ├── password-input_8tsx.html
│       ├── reactions_8tsx.html
│       ├── search
│       │   ├── all_0.js
│       │   ├── all_1.js
│       │   ├── all_10.js
│       │   ├── all_11.js
│       │   ├── all_12.js
│       │   ├── all_13.js
│       │   ├── all_14.js
│       │   ├── all_15.js
│       │   ├── all_16.js
│       │   ├── all_17.js
│       │   ├── all_18.js
│       │   ├── all_19.js
│       │   ├── all_1a.js
│       │   ├── all_1b.js
│       │   ├── all_1c.js
│       │   ├── all_1d.js
│       │   ├── all_2.js
│       │   ├── all_3.js
│       │   ├── all_4.js
│       │   ├── all_5.js
│       │   ├── all_6.js
│       │   ├── all_7.js
│       │   ├── all_8.js
│       │   ├── all_9.js
│       │   ├── all_a.js
│       │   ├── all_b.js
│       │   ├── all_c.js
│       │   ├── all_d.js
│       │   ├── all_e.js
│       │   ├── all_f.js
│       │   ├── files_0.js
│       │   ├── files_1.js
│       │   ├── files_10.js
│       │   ├── files_2.js
│       │   ├── files_3.js
│       │   ├── files_4.js
│       │   ├── files_5.js
│       │   ├── files_6.js
│       │   ├── files_7.js
│       │   ├── files_8.js
│       │   ├── files_9.js
│       │   ├── files_a.js
│       │   ├── files_b.js
│       │   ├── files_c.js
│       │   ├── files_d.js
│       │   ├── files_e.js
│       │   ├── files_f.js
│       │   ├── pages_0.js
│       │   ├── pages_1.js
│       │   ├── pages_10.js
│       │   ├── pages_11.js
│       │   ├── pages_2.js
│       │   ├── pages_3.js
│       │   ├── pages_4.js
│       │   ├── pages_5.js
│       │   ├── pages_6.js
│       │   ├── pages_7.js
│       │   ├── pages_8.js
│       │   ├── pages_9.js
│       │   ├── pages_a.js
│       │   ├── pages_b.js
│       │   ├── pages_c.js
│       │   ├── pages_d.js
│       │   ├── pages_e.js
│       │   ├── pages_f.js
│       │   ├── search.css
│       │   ├── search.js
│       │   └── searchdata.js
│       ├── separator_8tsx.html
│       ├── setup_8ts.html
│       ├── shared_8tsx.html
│       ├── sheet_8tsx.html
│       ├── skeleton_8tsx.html
│       ├── sonner_8tsx.html
│       ├── state-view_8tsx.html
│       ├── switch_8tsx.html
│       ├── syntax-highlighter_8tsx.html
│       ├── tabs.css
│       ├── textarea_8tsx.html
│       ├── thread-actions-view_8tsx.html
│       ├── thread-id_8tsx.html
│       ├── tool-call-table_8tsx.html
│       ├── tool-calls_8tsx.html
│       ├── tooltip-icon-button_8tsx.html
│       ├── tooltip_8tsx.html
│       ├── types_8ts.html
│       ├── ui_2empty_8tsx.html
│       ├── use-interrupted-actions_8tsx.html
│       ├── useHints_8ts.html
│       ├── useMediaQuery_8tsx.html
│       ├── useSpeechRecognition_8tsx.html
│       └── vite-env_8d_8ts.html
├── langgraph.json
├── lib
│   └── logger.ts
├── nginx.conf
├── package-lock.json
├── package.json
├── sonar-project.properties
├── tsconfig.json
├── turbo.json
└── vitest.config.ts
```
---

## Инструкция по запуску

### Backend (API)

1. Клонировать репозиторий:  
   `git clone https://git.delez-repo.ru/root/frontend.git`

2. Установить Python-зависимости:  
   `pip install -r api/requirements.txt`

3. Скопировать пример настроек:  
   `cp api/.env.example api/.env`

4. Запустить контейнеры с базами данных:  
   `docker compose up -d db` (из корня проекта)

5. Запустить сервер:  
   `uvicorn api.main:app --reload`


### Desktop-клиент (Tauri v2)

1. Перейти в папку `frontend/apps/web`:  
   `cd frontend/apps/web`

2. Установить Node.js зависимости:  
   `npm install`

3. Запустить в dev-режиме (с Vite и горячей перезагрузкой):  
   `npm run tauri dev`

4. Для установки как обычное приложение (Linux):  
   `./install-debug.sh`  
   `delez` или `/opt/delez/run-delez.sh`

5. Собрать AppImage:  
   `./build-appimage.sh`

### Windows (MSI)

Сборка через GitLab CI: при пуше в main автоматически создаётся MSI-установщик.  
Для локальной сборки на Windows достаточно выполнить:  
`npm run tauri build`

---

## Ссылки

- Репозиторий: [https://git.delez-repo.ru/root/frontend](https://git.delez-repo.ru/root/frontend)
- Web-версия: [https://delez.tech](https://delez.tech)
- SonarQube: [https://sonar.delez-repo.ru](https://sonar.delez-repo.ru)  
- Grafana: [https://grafana.delez-repo.ru](https://grafana.delez-repo.ru)  