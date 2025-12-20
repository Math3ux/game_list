import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await req.json();

  // Busca o usuário pelo email
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // Cria o jogo associado ao usuário
  const game = await prisma.game.create({
    data: {
      nome: data.nome,
      dificuldade: data.dificuldade,
      prioridade: data.prioridade,
      terminado: data.terminado,
      userId: user.id,
    },
  });

  return NextResponse.json(game);
}

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Busca o usuário pelo email
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { games: true },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json(user.games);
}

export async function PATCH(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await req.json();

  // Verifica se o jogo pertence ao usuário
  const game = await prisma.game.findUnique({
    where: { id: data.id },
    include: { user: true },
  });

  if (!game || game.user.email !== session.user.email) {
    return NextResponse.json({ error: "Not allowed" }, { status: 403 });
  }

  // Atualiza o status terminado
  const updated = await prisma.game.update({
    where: { id: data.id },
    data: { terminado: data.terminado },
  });

  return NextResponse.json(updated);
}
