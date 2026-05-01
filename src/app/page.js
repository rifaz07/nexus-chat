import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-50 dark:bg-black">
      <main className="flex flex-col items-center gap-6">
        <h1 className="text-4xl font-bold text-black dark:text-white">
          Welcome to Nexus Chat 👋
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 text-lg">
          Your AI chat app is ready!
        </p>
        <Button>
          Get Started
        </Button>
      </main>
    </div>
  );
}