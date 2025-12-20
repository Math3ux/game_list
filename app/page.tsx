import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { headers } from "next/headers";
import GameList from "./GameList";

export default async function Home() {
  const session = await getServerSession();
  if (!session) {
    redirect("/login");
  }

  // Monta a URL absoluta para SSR
  const headersList = await headers();
  const host = headersList.get("host");
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  const url = `${protocol}://${host}/api/games`;

  const res = await fetch(url, {
    headers: {
      Cookie: headersList.get("cookie") || "",
    },
    cache: "no-store",
  });
  const initialGames = await res.json();

  return <GameList initialGames={initialGames} />;
}