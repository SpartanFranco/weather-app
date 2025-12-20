/**
 * Pausa la ejecución por una cantidad de milisegundos.
 * @param ms - Tiempo de espera en milisegundos.
 * @returns Promise que se resuelve después del tiempo especificado.
 */
export const wait = (ms: number): Promise<void> => {
	return new Promise((resolve) => setTimeout(resolve, ms * 1000));
};
