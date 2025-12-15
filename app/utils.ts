import type { Game } from "../types/Game";

const handleOrdenacao = (gamesList: Game[]): Game[] => {
    return gamesList.sort((a, b) => { if (a.terminado !== b.terminado) {return a.terminado ? 1 : -1} return b.prioridade - a.prioridade});
}

export { handleOrdenacao };
