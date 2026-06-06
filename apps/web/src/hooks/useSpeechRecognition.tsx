import { useState, useEffect, useRef } from 'react';
import { invoke } from '@tauri-apps/api/core';
import { toast } from 'sonner';

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
  message: string;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  abort(): void;
  onstart: ((this: SpeechRecognition, ev: Event) => any) | null;
  onend: ((this: SpeechRecognition, ev: Event) => any) | null;
  onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any) | null;
  onerror: ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => any) | null;
}

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
}

export const useSpeechRecognition = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isSupported, setIsSupported] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const listeningRef = useRef(false);
  const isLinux = typeof navigator !== 'undefined' && navigator.platform.toLowerCase().includes('linux');

  useEffect(() => {
    if (isLinux) {
      setIsSupported(true);
      return;
    }

    const SpeechRecognition = (globalThis as any).SpeechRecognition || (globalThis as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      setIsSupported(true);
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'ru-RU';

      recognition.onstart = () => { listeningRef.current = true; setIsListening(true); };
      recognition.onend = () => { listeningRef.current = false; setIsListening(false); };
      recognition.onresult = (event: SpeechRecognitionEvent) => {
        let finalTranscript = '';
        for (const result of event.results) if (result.isFinal) finalTranscript += result[0].transcript;
        if (finalTranscript) setTranscript(finalTranscript);
      };
      recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        console.error('Speech error:', event.error);
        listeningRef.current = false;
        setIsListening(false);
      };
      recognitionRef.current = recognition;
    } else {
      setIsSupported(false);
    }
    return () => { recognitionRef.current?.abort(); };
  }, [isLinux]);

  const startLinuxRecording = async () => {
    if (listeningRef.current) return;
    listeningRef.current = true;
    setIsListening(true);
    toast.info('Запись 5 сек... Говорите.');
    try {
      const text = await invoke<string>('record_and_transcribe');
      setTranscript(text);
      toast.success('Готово');
    } catch (e) {
      console.error(e);
      toast.error('Ошибка распознавания');
    } finally {
      listeningRef.current = false;
      setIsListening(false);
    }
  };

  const startListening = async () => {
    if (isLinux) {
      await startLinuxRecording();
      return;
    }
    if (recognitionRef.current) {
      if (listeningRef.current) return;
      setTranscript('');
      try { recognitionRef.current.start(); } catch { /* already started */ void 0; }
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch { /* already stopped */ void 0; }
    }
  };

  const resetTranscript = () => setTranscript('');

  return { isListening, transcript, isSupported, startListening, stopListening, resetTranscript };
};
