import { useEffect, useRef, useState } from 'react';

function VoiceSearch({ onResult }) {
  const [listening, setListening] = useState(false);
  const [supported, setSupported] = useState(true);
  const [error, setError] = useState('');
  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setSupported(false);
      return undefined;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript.trim();
      onResult(transcript);
      setListening(false);
      setError('');
    };

    recognition.onerror = (event) => {
      setListening(false);
      if (event.error === 'not-allowed') {
        setError('Microphone permission denied.');
      } else if (event.error !== 'aborted') {
        setError('Could not capture voice. Try again.');
      }
    };

    recognition.onend = () => setListening(false);
    recognitionRef.current = recognition;

    return () => {
      recognition.abort();
    };
  }, [onResult]);

  const toggleListening = () => {
    if (!supported || !recognitionRef.current) return;

    if (listening) {
      recognitionRef.current.stop();
      setListening(false);
      return;
    }

    setError('');
    try {
      recognitionRef.current.start();
      setListening(true);
    } catch {
      setError('Voice search is busy. Please wait a moment.');
    }
  };

  if (!supported) {
    return (
      <p className="voice-search__unsupported">
        Voice search needs Chrome or Edge with microphone access.
      </p>
    );
  }

  return (
    <div className="voice-search">
      <button
        type="button"
        className={`btn btn--voice ${listening ? 'is-listening' : ''}`}
        onClick={toggleListening}
        aria-pressed={listening}
      >
        {listening ? 'Listening… tap to stop' : 'Voice search'}
      </button>
      {error && <p className="form-error voice-search__error">{error}</p>}
    </div>
  );
}

export default VoiceSearch;
