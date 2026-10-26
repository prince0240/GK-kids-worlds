// Web Speech API wrapper for reading questions aloud to young children
import { Language } from '../types';

export const speakText = (text: string, onEnd?: () => void, lang: Language = 'en') => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    if (onEnd) onEnd();
    return;
  }

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  // Strip emojis for clean pronunciation
  const cleanText = text.replace(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '').trim();

  const utterance = new SpeechSynthesisUtterance(cleanText);
  utterance.rate = 0.88; // Clear, measured pace for children
  utterance.pitch = 1.1; // Friendly pitch

  const voices = window.speechSynthesis.getVoices();

  if (lang === 'hi') {
    utterance.lang = 'hi-IN';
    const hindiVoice = voices.find(v => v.lang.startsWith('hi') || v.lang.includes('Hindi') || v.name.includes('Lekha') || v.name.includes('Kalpana') || v.name.includes('Hemant'));
    if (hindiVoice) {
      utterance.voice = hindiVoice;
    }
  } else {
    utterance.lang = 'en-US';
    const englishVoice = voices.find(v => (v.lang.startsWith('en') || v.lang.startsWith('en-US') || v.lang.startsWith('en-GB')) && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Junior')));
    if (englishVoice) {
      utterance.voice = englishVoice;
    }
  }

  if (onEnd) {
    utterance.onend = onEnd;
    utterance.onerror = onEnd;
  }

  window.speechSynthesis.speak(utterance);
};

export const stopSpeech = () => {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
};
