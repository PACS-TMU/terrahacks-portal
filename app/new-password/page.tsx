import Image from "next/image";
import { SubmitButton } from "@/components/forms/submit-button";
import PasswordField from "@/components/forms/password-field";
import newPassword from "@/server/newPassword";
import { redirect } from "next/navigation";
import ErrorMessage from "@/components/auth/error-message";

export default async function NewPasswordPage({ searchParams }: { searchParams: { code?: string, message: string } }) {
  // Get the authorization code from the search params
  const code = searchParams.code;

  // Exchange the authorization code for a session
  if (!code) {
    return redirect("/login?message=Error - Invalid token. Please ensure you opened the correct link.");
  }

  return (
    <div className="bg-gradient-to-b from-[#afd6e3] from-20% via-[#c3aa8e] via-50% to-[#432c2b] to-90% min-h-screen w-full flex flex-col items-center lg:text-lg xl:text-xl justify-center text-background">
      <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl items-center justify-center gap-2">
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

        <form method="POST" className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground">
          <PasswordField name="password" />
          <input type="hidden" name="code" value={code} />
          <PasswordField name="confirm-password" />

          <SubmitButton
            className="bg-green-700 rounded-md px-4 py-2 text-background mb-2 ease-in-out duration-300 hover:bg-green-800"
            pendingText="Updating Password..."
            formAction={newPassword}
          >
            Confirm New Password
          </SubmitButton>
        </form>
      </div>
      {searchParams?.message && (
        <ErrorMessage key={Date.now()} searchParams={searchParams} />
      )}
    </div>
  );
}
