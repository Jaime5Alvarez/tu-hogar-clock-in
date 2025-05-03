"use client";
import BetterTooltip from "@/components/ui/better-tooltip";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { LogOut } from "lucide-react";

export const LogoutButton = () => {
  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          window.location.href = "/login";
        },
      },
    });
  };
  return (
    <BetterTooltip content="Logout">
      <Button
        variant="ghost"
        className="cursor-pointer"
        size="icon"
        onClick={() => handleSignOut()}
      >
        <LogOut className="size-4" />
      </Button>
    </BetterTooltip>
  );
};
