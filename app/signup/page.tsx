import Link from "next/link";
import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SubmitButton } from "../../components/submit-button";

export default function Signup({
  searchParams,
}: {
  searchParams: { message: string };
}) {
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
        <img
          src="/images/Terrahacks_logo.png"
          alt="Terrahacks logo"
          className="w-screen mx-auto"
        />

        <form className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground">
          <h1 className="text-2xl text-bold pb-8 text-left  text-white">
            Application Portal
          </h1>

          <label className="text-md text-white" htmlFor="firstname">
            First Name
          </label>
          <input
            className="rounded-md px-4 py-2 bg-inherit border border-white mb-4 placeholder-colour"
            name="firstname"
            placeholder="Peter"
            required
          />
          <label className="text-md text-white" htmlFor="lastname">
            Last Name
          </label>
          <input
            className="rounded-md px-4 py-2 bg-inherit border border-white mb-4 placeholder-colour"
            name="lastname"
            placeholder="Parker"
            required
          />
          <label className="text-md text-white" htmlFor="email">
            Email
          </label>
          <input
            className="rounded-md px-4 py-2 bg-inherit border border-white mb-4 placeholder-colour"
            name="email"
            placeholder="you@terrahacks.ca"
            required
          />
          <label className="text-md  text-white" htmlFor="password">
            Password
          </label>
          <input
            className="rounded-md px-4 py-2 bg-inherit border border-white mb-4 placeholder-colour"
            type="password"
            name="password"
            placeholder="super secret password"
            required
          />

          <SubmitButton
            formAction={signUp}
            className="bg-green-700 rounded-md px-4 py-2 text-foreground mb-2"
            pendingText="Signing Up..."
          >
            Sign Up
          </SubmitButton>

          <p className="pb-4">
            Already have an account?{" "}
            <span>
              <Link
                href="/login"
                className=" text-foreground font-bold underline hover:text-amber-400"
              >
                Log in.
              </Link>
            </span>
          </p>

          {searchParams?.message && (
            <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
              {searchParams.message}
            </p>
          )}
          <button
            id="Github-Signin"
            className="border flex flex-row justify-center items-center bg-white rounded-md px-4 py-2 text-black mb-2"
          >
            <img
              src="/images/google-logo.png"
              width={24}
              height={24}
              className="mr-4"
            ></img>
            Continue with Google
          </button>
          <button
            id="Github-Signin"
            className="border flex flex-row justify-center items-center bg-white rounded-md px-4 py-2 text-black mb-2"
          >
            <img
              src="/images/github-logo.png"
              width={24}
              height={24}
              className="mr-4"
            ></img>
            Continue with Github
          </button>
        </form>
      </div>
    </div>
  );
}
