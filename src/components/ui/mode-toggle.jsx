"use client";

import * as React from "react";
import { Sunrise, Sunset } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ModeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
    >
      {mounted && resolvedTheme === "light" ? (
        <Sunset className="size-5" />
      ) : (
        <Sunrise className="size-5" />
      )}
    </Button>
  );
}