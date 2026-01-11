"use client";
import { useState } from "react";
import { handleOrdenacao } from "./utils";
import type { Game } from "../types/Game";



export default function GameList({ initialGames }: { readonly initialGames: Game[] }) {
  

  const [games, setGames] = useState<Game[]>(handleOrdenacao(initialGames));
  const [nome, setNome] = useState("");
  const [dificuldade, setDificuldade] = useState(0);
  const [prioridade, setPrioridade] = useState(0);

  const getDificuldadeLabel = (dificuldade: number): string => {
    if (dificuldade == 0) return "Fácil";
    if (dificuldade == 1) return "Médio";
    return "Difícil";
  };

  const getPrioridadeLabel = (prioridade: number): string => {
    if (prioridade == 0) return "Baixa";
    if (prioridade == 1) return "Média";
    return "Alta";
  }

  const handleCheckTerminado = async (id: number) => {
  const game = games.find(g => g.id === id);
  if (!game) return;

  // Atualiza no banco
  const res = await fetch("/api/games", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, terminado: !game.terminado }),
  });

  if (res.ok) {
    const updatedGame = await res.json();
    const updatedGames = games.map(g =>
      g.id === id ? { ...g, terminado: updatedGame.terminado } : g
    );
    setGames(handleOrdenacao(updatedGames));
  } else {
    alert("Erro ao atualizar status!");
  }
};


  const handleAddGame = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // Envia para a API
    const res = await fetch("/api/games", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nome,
        dificuldade,
        prioridade,
        terminado: false,
      }),
    });

    if (res.ok) {
      const newGame = await res.json();
      setGames(handleOrdenacao([...games, newGame]));
      setNome("");
      setDificuldade(0);
      setPrioridade(0);
    } else {
      alert("Erro ao adicionar jogo!");
    }
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-linear-to-br from-zinc-100 via-zinc-200 to-zinc-300 dark:from-black dark:via-zinc-900 dark:to-zinc-800 font-sans py-10">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-extrabold text-center text-zinc-900 dark:text-zinc-100 mb-8 tracking-tight drop-shadow">
          🎮 Lista de Jogos Para Terminar
        </h1>

        <form className="bg-white dark:bg-zinc-900 rounded-xl shadow-lg p-6 mb-10 space-y-4 border border-zinc-200 dark:border-zinc-800">
          <div>
            <label htmlFor="nome" className="block mb-1 text-zinc-700 dark:text-zinc-200 font-medium">
              Nome do jogo
            </label>
            <input
              id="nome"
              type="text"
              placeholder="Digite o nome do jogo"
              className="mb-2 p-2 border border-zinc-300 rounded-lg w-full dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              onInput={e => setNome(e.currentTarget.value)}
            />
          </div>
          <div>
            <label htmlFor="dificuldade" className="block mb-1 text-zinc-700 dark:text-zinc-200 font-medium">
              Dificuldade
            </label>
            <select
              id="dificuldade"
              className="mb-2 p-2 border border-zinc-300 rounded-lg w-full dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              value={dificuldade}
              onChange={e => setDificuldade(Number(e.currentTarget.value))}
            >
              <option value="0">Fácil</option>
              <option value="1">Médio</option>
              <option value="2">Difícil</option>
            </select>
          </div>
          <div>
            <label htmlFor="prioridade" className="block mb-1 text-zinc-700 dark:text-zinc-200 font-medium">
              Prioridade
            </label>
            <select
              id="prioridade"
              className="mb-2 p-2 border border-zinc-300 rounded-lg w-full dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              value={prioridade}
              onChange={e => setPrioridade(Number(e.currentTarget.value))}
            >
              <option value="0">Baixa</option>
              <option value="1">Média</option>
              <option value="2">Alta</option>
            </select>
          </div>
          <button
            type="submit"
            onClick={handleAddGame}
            className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md transition focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            Adicionar
          </button>
        </form>

        <ul className="space-y-6">
          {games.filter(game => !game.terminado).map((game) => (
            <li
              key={game.id}
              className="p-5 bg-white rounded-xl shadow-md dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 w-full transition hover:scale-[1.02] hover:shadow-lg"
            >
              <div className="flex items-center justify-between mb-2">
                <input type="checkbox" name={`terminado-${game.id}`} id={`terminado-${game.id}`} checked={game.terminado} onChange={() => handleCheckTerminado(game.id)} />
                <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                  {game.nome}
                </h2>
                <span className={`px-2 py-1 rounded text-xs font-semibold ${game.terminado ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200" : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-200"}`}>
                  {game.terminado ? "Terminado" : "Pendente"}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between text-zinc-700 dark:text-zinc-300 text-sm">
                <span>
                  <strong>Dificuldade:</strong> {getDificuldadeLabel(game.dificuldade)}
                </span>
                <span>
                  <strong>Prioridade:</strong> {getPrioridadeLabel(game.prioridade)}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}