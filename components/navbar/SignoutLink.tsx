"use client";

import { useToast } from "@/hooks/use-toast";
import { SignOutButton } from "@clerk/nextjs";

const SignoutLink = () => {
  const { toast } = useToast();
  const handleSignOut = () => {
    toast({ description: "You've been signed out" });
  };
  return (
    <SignOutButton redirectUrl="/">
      <button className="w-full text-left" onClick={handleSignOut}>
        Logout
      </button>
    </SignOutButton>
  );
};

export default SignoutLink;
