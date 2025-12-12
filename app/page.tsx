'use client';

import { useState } from 'react';
import { trpc } from '@/utils/trpc';

export default function Home() {
  const [inputText, setInputText] = useState('');
  const hello = trpc.hello.useQuery({ text: 'from tRPC' });
  const { mutate: triggerHelloWorld } = trpc.triggerHelloWorld.useMutation();
  const { mutate: coderAgent } = trpc.ai.coderAgent.useMutation();
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            tRPC + Next.js 16
          </h1>
          <button onClick={() => triggerHelloWorld({ email: 'test@test.com' })} className="bg-blue-500 text-white px-4 py-2 rounded-md">Trigger Hello World</button>
          <div className="flex flex-col gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Enter text here..."
              className="px-4 py-2 border border-gray-300 rounded-md dark:bg-zinc-800 dark:border-zinc-700 dark:text-white"
            />
            <button 
              onClick={() => coderAgent({ text: inputText })} 
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
              disabled={!inputText.trim()}
            >
              Translate Text
            </button>
          </div>
          {hello.isLoading ? (
            <p className="text-lg text-zinc-600 dark:text-zinc-400">Loading...</p>
          ) : hello.data ? (
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              {hello.data.greeting}
            </p>
          ) : (
            <p className="text-lg text-red-600 dark:text-red-400">
              Error: {hello.error?.message}
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
