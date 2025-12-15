'use client';

export default function Home() {

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#030303] font-sans">
     
      <main className="relative z-10 flex w-full max-w-[1200px] flex-col items-center px-6 py-24 sm:px-6">
        {/* Hero Title */}
        <h1 className="mb-6 max-w-[700px] text-center text-[40px] font-semibold leading-tight tracking-[-0.02em] text-foreground sm:text-[48px]">
          AI-Powered Website Builder For React.js and Tailwind CSS
        </h1>
      </main>
    </div>
  );
}
