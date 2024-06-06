"use client";
import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";

export default function OAuthButton({
  provider,
}: {
  provider: string;
}): JSX.Element {
  const signInWithGitHub = async () => {
    const supabase = createClient();

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `http://localhost:3000/auth/callback`,
      },
    });
  };

  const signInWithGoogle = async () => {
    const supabase = createClient();

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `http://localhost:3000/auth/callback`,
      },
    });

  };

  const signInWithOAuth = async () => {
    if (provider === "github") {
      await signInWithGitHub();
    } else if (provider === "google") {
      await signInWithGoogle();
    }
  }

  const providerToText = (provider: string) => {
    if (provider === "github") {
      return "GitHub";
    } else if (provider === "google") {
      return "Google";
    }
  }

  return (
    <button
      className="border flex flex-row justify-center items-center bg-white rounded-md px-4 py-2 text-black mb-2 w-full"
      onClick={signInWithOAuth}
    >
      <img
        src={`/images/${provider}-logo.png`}
        width={24}
        height={24}
        className="mr-4"
      ></img>
      Continue with {providerToText(provider)}
    </button>
  );
}
