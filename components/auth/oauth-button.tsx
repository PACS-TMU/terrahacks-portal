"use client";
import Image from "next/image";
import { createClient } from "@/utils/supabase/client";
import { isWebView } from "@/utils/detectWebView";

export default function OAuthButton({
  provider,
}: {
  provider: string;
}): JSX.Element {

  const baseURL = process.env.NEXT_PUBLIC_BASE_URL
    ? `https://${process.env.NEXT_PUBLIC_BASE_URL}`
    : "http://localhost:3000";

  const signInWithGitHub = async () => {
    const supabase = createClient();

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${baseURL}/auth/callback`,
      },
    });
  };

  const signInWithGoogle = async () => {
    const supabase = createClient();

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${baseURL}/auth/callback`,
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

  const webView = isWebView();

  return (
    <button
      aria-label={`Continue with ${provider}`}
      className={`border flex flex-row justify-center items-center bg-background rounded-md px-4 py-2 text-foreground mb-2 w-full hover:bg-gray-200 ease-out duration-300 ${webView && provider === "google" && 'cursor-not-allowed opacity-50'}`}
      onClick={!webView || provider !== "google" ? signInWithOAuth : undefined}
    >
      <Image
        src={`/assets/${provider}-logo.png`}
        alt={`${provider} logo`}
        width={500}
        height={500}
        className="mr-4 w-6 h-6"
      />
      {webView && provider === "google" ?
        "Google Sign In is not supported in WebView" :
        `Continue with ${providerToText(provider)}`
      }
    </button>
  );
}
