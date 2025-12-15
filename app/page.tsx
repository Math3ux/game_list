import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import GameList from "./GameList";

export default async function Home() {
  const session = await getServerSession();
  if (!session) {
    redirect("/login");
  }

  // Dados iniciais podem ser passados como props
  const initialGames = [
    { id: 1, nome: "The Witcher 3", dificuldade: 0, prioridade: 0, terminado: true },
    { id: 2, nome: "Celeste", dificuldade: 0, prioridade: 2, terminado: false },
    { id: 3, nome: "Hades", dificuldade: 0, prioridade: 1, terminado: true },
    { id: 4, nome: "Expedition 33", dificuldade: 2, prioridade: 2, terminado: false },
  ];

  return <GameList initialGames={initialGames} />;
}