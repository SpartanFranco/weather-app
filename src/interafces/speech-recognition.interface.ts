export interface BrowserSpeechRecognition {
	lang: string;
	continuous: boolean;
	interimResults: boolean;
	onstart: (() => void) | null;
	onresult: ((event: Event) => void) | null;
	onerror: ((event: Event) => void) | null;
	onend: (() => void) | null;
	start: () => void;
	stop: () => void;
}

export type SpeechRecognitionConstructor = new () => BrowserSpeechRecognition;

export interface VoiceSearchState {
	isListening: boolean;
	transcript: string;
	error: string | null;
	isSupported: boolean;
}
