"use client";
import { signIn } from "next-auth/react";

export default function Login() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <button onClick={() => signIn("google", { callbackUrl: "/" })}>Login com Google</button>
    </div>
  );
}
