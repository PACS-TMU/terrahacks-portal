
import Link from "next/link";
import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SubmitButton } from "../../components/submit-button";


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

  const signUp = async (formData: FormData) => {
    "use server";

    const origin = headers().get("origin");
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    });

    if (error) {
      return redirect("/login?message=Could not authenticate user");
    }

    return redirect("/login?message=Check email to continue sign in process");
  };


  return (
    //background gradient
    <div className="bg-gradient-to-b from-[#afd6e3] from-20% via-[#c3aa8e] via-50% to-[#432c2b] to-90% min-h-screen w-full flex items-center justify-center">

      <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md items-center justify-center gap-2">
        <Link
          href="/"
          className="absolute left-8 top-8 py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>{" "}
          Back
        </Link>

        <img src="/images/Terrahacks_logo.png" alt="Terrahacks logo" className="w-screen mx-auto" />


        <form className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground">
          <h1 className="text-2xl text-bold pb-8 text-left  text-white">Application Portal</h1>

          <label className="text-md  text-white" htmlFor="email">
            Email
          </label>
          <input
            className="rounded-md px-4 py-2 bg-inherit border  border-white mb-6 placeholder-colour"
            name="email"
            placeholder="you@terrahacks.ca"
            required
          />
          <label className="text-md  text-white" htmlFor="password">
            Password
          </label>
          <input
            className="rounded-md px-4 py-2 bg-inherit border  border-white mb-6 placeholder-colour"
            type="password"
            name="password"
            placeholder="super secret password"
            required
          />

          <SubmitButton
            formAction={signIn}
            className="bg-green-700 rounded-md px-4 py-2 text-foreground mb-2"
            pendingText="Signing In..."
          >
            Sign In
          </SubmitButton>

          <p className="pb-4">Don't have an account? <span>
            <Link href="/signup" className=" text-foreground font-bold underline hover:text-amber-400">Sign up.</Link>
          </span>
          </p>






          {searchParams?.message && (
            <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
              {searchParams.message}
            </p>
          )}
          <button
            id="Github-Signin"
            className="border flex flex-row justify-center items-center bg-white rounded-md px-4 py-2 text-black mb-2">
            <img src="/images/google-logo.png" width={24} height={24} className="mr-4"></img>
            Continue with Google
          </button>
          <button
            id="Github-Signin"
            className="border flex flex-row justify-center items-center bg-white rounded-md px-4 py-2 text-black mb-2">
            <img src="/images/github-logo.png" width={24} height={24} className="mr-4"></img>
            Continue with Github
          </button>

        </form>


      </div>
    </div>
  );
}
