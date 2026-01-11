"use client";
import { signIn } from "next-auth/react";

export default function Login() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl shadow-2xl p-8 flex flex-col items-center w-full max-w-md">
        <h1 className="text-3xl font-bold mb-2 text-white">Bem-vindo</h1>
        <p className="text-slate-400 mb-8 text-center">
          Faça login para continuar
        </p>
        <button
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="flex items-center justify-center gap-3 bg-white hover:bg-gray-100 text-gray-900 font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-200 w-full hover:scale-105 active:scale-95"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 48 48"
            className="inline-block"
          >
            <g>
              <path
                fill="#4285F4"
                d="M24 9.5c3.54 0 6.73 1.22 9.24 3.22l6.9-6.9C36.36 2.16 30.55 0 24 0 14.61 0 6.44 5.48 2.44 13.44l8.06 6.27C12.47 13.09 17.73 9.5 24 9.5z"
              />
              <path
                fill="#34A853"
                d="M46.09 24.5c0-1.64-.15-3.22-.43-4.75H24v9.01h12.44c-.54 2.91-2.16 5.38-4.61 7.04l7.19 5.59C43.99 37.09 46.09 31.27 46.09 24.5z"
              />
              <path
                fill="#FBBC05"
                d="M10.5 28.71c-1.02-2.99-1.02-6.23 0-9.22l-8.06-6.27C.82 17.61 0 20.71 0 24c0 3.29.82 6.39 2.44 9.22l8.06-6.27z"
              />
              <path
                fill="#EA4335"
                d="M24 48c6.55 0 12.07-2.16 16.13-5.89l-7.19-5.59c-2.01 1.35-4.59 2.15-8.94 2.15-6.27 0-11.53-3.59-13.5-8.71l-8.06 6.27C6.44 42.52 14.61 48 24 48z"
              />
              <path fill="none" d="M0 0h48v48H0z" />
            </g>
          </svg>
          Continuar com Google
        </button>
      </div>
    </div>
  );
}
