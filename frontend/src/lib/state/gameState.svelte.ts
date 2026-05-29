import type { Game } from '@/types/games';
import { games } from '../assets/gamedata';

const defaultGame = games.find((g: Game) => g?.default) as Game;

export const gameState = $state({
	currentGame: defaultGame as Game | undefined
});

export function updateGame(gameName: string) {
	const foundGame = games.find((g) => g.name === gameName) as Game;
	if (foundGame) {
		gameState.currentGame = foundGame;
	}
}
