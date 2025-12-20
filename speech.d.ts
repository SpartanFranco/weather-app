import { SpeechRecognitionConstructor } from './src/interafces/speech-recognition.interface';
declare global {
	interface Window {
		SpeechRecognition?: SpeechRecognitionConstructor;
		webkitSpeechRecognition?: SpeechRecognitionConstructor;
	}
}
