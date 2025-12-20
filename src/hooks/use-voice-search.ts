import type {
	BrowserSpeechRecognition,
	VoiceSearchState,
} from '@/interafces/speech-recognition.interface';
import { useState, useEffect, useRef } from 'react';

export function useVoiceSearch() {
	const [state, setState] = useState<VoiceSearchState>({
		isListening: false,
		transcript: '',
		error: null,

		isSupported: false,
	});

	const recognitionRef = useRef<BrowserSpeechRecognition | null>(null);

	useEffect(() => {
		if (typeof window === 'undefined') return;
		const SpeechRecognition =
			window.SpeechRecognition || window.webkitSpeechRecognition;
		setState((prev) => ({ ...prev, isSupported: !!SpeechRecognition }));
	}, []);

	const startListening = () => {
		if (typeof window === 'undefined') return;
		const SpeechRecognition =
			window.SpeechRecognition || window.webkitSpeechRecognition;

		if (!SpeechRecognition) {
			setState((prev) => ({
				...prev,
				error: 'Speech recognition is not supported in this browser',
			}));
			return;
		}

		const recognition = new SpeechRecognition();
		recognitionRef.current = recognition;
		recognition.lang = 'en-US';
		recognition.continuous = false;
		recognition.interimResults = false;

		recognition.onstart = () => {
			setState((prev) => ({
				...prev,
				isListening: true,
				error: null,
				transcript: '',
			}));
		};

		recognition.onresult = (event) => {
			const transcript = (event as any).results[0][0].transcript;
			setState((prev) => ({
				...prev,
				transcript,
				isListening: false,
			}));
		};

		recognition.onerror = (event) => {
			setState((prev) => ({
				...prev,
				error: (event as any).error,
				isListening: false,
			}));
		};

		recognition.onend = () => {
			setState((prev) => ({
				...prev,
				isListening: false,
			}));
		};

		recognition.start();
	};

	const stopListening = () => {
		recognitionRef.current?.stop();
		setState((prev) => ({
			...prev,
			isListening: false,
		}));
	};

	const clearTranscript = () => {
		setState((prev) => ({
			...prev,
			transcript: '',
			error: null,
		}));
	};

	return {
		...state,
		startListening,
		stopListening,
		clearTranscript,
	};
}
