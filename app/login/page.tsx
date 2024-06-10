import Link from "next/link";
import OAuthButton from "../../components/oauth-button";
import Image from "next/image";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SubmitButton } from "../../components/submit-button";
import PasswordField from "./password";

export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const signIn = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return redirect("/login?message=Could not authenticate user");
    }

    return redirect("/dashboard");
  };

  return (
    //background gradient
    <div className="bg-gradient-to-b from-[#afd6e3] from-20% via-[#c3aa8e] via-50% to-[#432c2b] to-90% min-h-screen w-full flex items-center lg:text-lg xl:text-xl justify-center">
      <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl items-center justify-center gap-2">
        {/* h1 is hidden for SEO purposes */}
        <h1 className="opacity-0">TerraHacks</h1>

        <Image
          src="/assets/th-text.png"
          priority={true}
          alt="Terrahacks logo"
          width={3000}
          height={400}
          className="w-full h-auto mx-auto"
        />
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold py-[5%] text-left text-background">Application Portal</h2>

        <form className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground">
          <label className="text-md text-background" htmlFor="email">
            Email
          </label>
          <input
            className="rounded-md px-4 py-2 bg-inherit border border-background mb-6 placeholder-gray-200"
            id="email"
            name="email"
            type="email"
            placeholder="example@example.com"
            autoComplete="email"
            required
          />
          <label className="text-md text-background" htmlFor="password">
            Password
          </label>
          <PasswordField />

          <Link aria-label="Forgot Password Link" href="/forgot-password" className="text-sm lg:text-md text-background font-semibold underline hover:text-green-500 ease-in-out duration-300 pb-4 text-underline">Forgot Password?</Link>

          <SubmitButton
            formAction={signIn}
            className="bg-green-700 rounded-md px-4 py-2 text-background mb-2 ease-in-out duration-300 hover:bg-green-800"
            pendingText="Signing In..."
          >
            Sign In
          </SubmitButton>


          <p className="pb-4 text-background">
            Don't have an account? {" "}
            <span>
              <Link aria-label="Sign Up Link" href="/signup" className=" text-background font-semibold underline hover:text-green-500 ease-in-out duration-300">Sign up.</Link>
            </span>
          </p>

          {searchParams?.message && (
            <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
              {searchParams.message}
            </p>
          )}
        </form>
        <OAuthButton provider="google" />
        <OAuthButton provider="github" />
      </div>
    </div>
  );
}
