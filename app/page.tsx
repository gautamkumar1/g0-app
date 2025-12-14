'use client';

import { useState } from 'react';
import { trpc } from '@/utils/trpc';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  ArrowUp01Icon,
} from '@hugeicons/core-free-icons';

export default function Home() {
  const [inputText, setInputText] = useState('');
  const { mutate: coderAgent } = trpc.ai.coderAgent.useMutation();

  const handleSubmit = () => {
    if (inputText.trim()) {
      coderAgent({ text: inputText });
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background font-sans">
      {/* Radial gradient background */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-background via-background to-background" />
      
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 bg-card opacity-40 blur-[120px]" />

      <main className="relative z-10 flex w-full max-w-[1200px] flex-col items-center px-6 py-24 sm:px-6">
        {/* Hero Title */}
        <h1 className="mb-6 max-w-[700px] text-center text-[40px] font-semibold leading-tight tracking-[-0.02em] text-foreground sm:text-[48px]">
          AI-Powered Website Builder For React.js and Tailwind CSS
        </h1>

        {/* Prompt Input Container */}
        <div className="mb-8 w-full max-w-3xl">
          <div className="relative rounded-2xl border border-dashed border-border/20 bg-card p-4 shadow-[0_20px_40px_rgba(0,0,0,0.4)] transition-all focus-within:border-ring/30 focus-within:shadow-[0_0_0_1px_hsl(var(--ring)/0.1)]">
            <div className="flex items-center gap-2">
              {/* Input field */}
              <Input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit();
                  }
                }}
                placeholder="Enter your prompt"
                className="flex-1 border-0 bg-transparent px-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
              />

              {/* Right side buttons */}
              <div className="flex items-center gap-2">
                <Button
                  variant="default"
                  size="icon"
                  onClick={handleSubmit}
                  disabled={!inputText.trim()}
                  className="h-8 w-8 rounded-full bg-primary text-primary-foreground transition-transform hover:scale-105 hover:bg-primary/90 disabled:opacity-50"
                >
                  <HugeiconsIcon
                    icon={ArrowUp01Icon}
                    className="size-4"
                    strokeWidth={1.5}
                  />
                  <span className="sr-only">Submit</span>
                </Button>
              </div>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
