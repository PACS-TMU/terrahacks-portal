import { headers } from "next/headers";
import Image from "next/image";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SubmitButton } from "../../components/submit-button";

export default function ForgotPassword({
    searchParams,
  }: {
    searchParams: { message: string };
  }) {
    const resetPassword = async (formData: FormData) => {
        "use server";

        const origin = headers().get("origin");
        const email = formData.get("email") as string;
        const supabase = createClient();

        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${origin}/new-password`,
        });

        if (error) {
            return redirect("/login?message=Could not reset password");
        }

        return redirect("/login?message=Check email to continue reset password process");
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
                    Reset Password
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
                <SubmitButton
                    formAction={resetPassword}
                    className="bg-green-700 rounded-md px-4 py-2 text-background mb-2 ease-in-out duration-300 hover:bg-green-800"
                    pendingText="Resetting Password..."
                >
                    Reset Password
                </SubmitButton>
                </form>
            </div>
        </div>
    );
}