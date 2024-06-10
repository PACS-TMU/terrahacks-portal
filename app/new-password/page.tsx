import Link from "next/link";
import OAuthButton from "../../components/oauth-button";
import Image from "next/image";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SubmitButton } from "../../components/submit-button";
import PasswordField from "../login/password";

export default async function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }
  const newPassword = async (formData: FormData) => {
    "use server";

    // const email = formData.get("email") as string;
    const newPassword = formData.get("password") as string;
    const confirmPassword = formData.get("confirm-password") as string;
    const supabase = createClient();

    // This may mess things up idk
    if (newPassword !== confirmPassword) {
      return redirect("/new-password?message=Passwords do not match");
    }

    const { error } = await supabase.auth.updateUser({password: newPassword});

    if (error) {
      return redirect("/login?message=Failed to update password");
    }

    return redirect("/login?message=Password updated successfully");
  };

  return (
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
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold py-[5%] text-left text-background">
            Confirm New Password
        </h2>

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
          <label className="text-md text-background" htmlFor="confirm-password">
            Confirm Password
          </label>
          {/* TODO: Change this input element to use the PasswordField Component */}
          <input
            className="rounded-md px-4 py-2 bg-inherit border border-background mb-6 placeholder-gray-200"
            id="confirm-password"
            name="confirm-password"
            type="confirm-password"
            placeholder="Confirm Password"
            autoComplete="email"
            required
          />

          <SubmitButton
            formAction={newPassword}
            className="bg-green-700 rounded-md px-4 py-2 text-background mb-2 ease-in-out duration-300 hover:bg-green-800"
            pendingText="Signing In..."
          >
            Confirm New Password
          </SubmitButton>
        </form>
      </div>
    </div>
  );
}
