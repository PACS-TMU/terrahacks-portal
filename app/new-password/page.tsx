import Image from "next/image";
import { SubmitButton } from "@/components/forms/submit-button";
import PasswordField from "@/components/forms/password-field";
import newPassword from "@/server/newPassword";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

type Props = {
  searchParams: { code?: string, token?: string };
};

const isUUID = (str: string) => {
  const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return regex.test(str);
};

export default async function NewPasswordPage({ searchParams }: Props) {

  // Get the token from the search params
  const token = searchParams.token;
  const code = searchParams.code;
  if (!token || !isUUID(token)) {
    return redirect("/login?message=Error - Invalid token");
  }

  // Create a new Supabase server client
  const supabase = createClient();
  
  // Get the token from the form data
  const { data, error } = await supabase.from("password_reset_tokens").select("*").eq("token", token);

  if (error) {
    console.error(error);
    return redirect("/login?message=Error - Invalid token");
  }

  if (data.length === 0) {
    return redirect("/login?message=Error - Invalid token");
  }

  const tokenData = data[0];
  const now = new Date();
  if (now > tokenData.expiry_time) {
    console.log(now);
    console.log(tokenData.expiry_time);
    return redirect("/login?message=Error - Token expired");
  }

  return (
    <div className="bg-gradient-to-b from-[#afd6e3] from-20% via-[#c3aa8e] via-50% to-[#432c2b] to-90% min-h-screen w-full flex items-center lg:text-lg xl:text-xl justify-center text-background">
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

        <form  method="POST" className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground">
          <input type="hidden" name="token" value={token} />
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
    </div>
  );
}
