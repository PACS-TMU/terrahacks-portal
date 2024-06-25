import Link from "next/link";
import OAuthButton from "../../components/auth/oauth-button";
import Image from "next/image";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SubmitButton } from "../../components/forms/submit-button";
import PasswordField from "../../components/forms/password-field";
import ErrorMessage from "@/components/auth/error-message";
import EmailField from "@/components/forms/email-field";

export default function Login({ searchParams }: { searchParams: { message: string } }) {
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
            return redirect("/login?message=Error - could not authenticate user. Please check your credentials and try again.");
        }

        return redirect("/dashboard");
    };
    
    return (
        // background gradient
        <div className="bg-gradient-to-b from-[#afd6e3] from-20% via-[#c3aa8e] via-50% to-[#432c2b] to-90% min-h-screen w-full flex flex-col items-center lg:text-lg xl:text-xl justify-center text-background">
            <div className="flex flex-col w-full px-8 sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl items-center justify-center gap-2 animate-in">
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

                <form className="flex flex-col w-full justify-center gap-2 text-foreground">
                    <EmailField />
                    <PasswordField name="password" />

                    <Link
                        aria-label="Forgot Password Link"
                        href="/forgot-password"
                        className="text-sm lg:text-base w-fit text-background font-medium underline hover:text-green-500 ease-in-out duration-300 pb-4 text-underline"
                    >
                        Forgot Password?
                    </Link>

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
                            <Link
                                aria-label="Sign Up Link"
                                href="/signup"
                                className="text-background font-semibold underline hover:text-green-500 ease-in-out duration-300"
                            >
                                Sign up.
                            </Link>
                        </span>
                    </p>
                </form>
                <OAuthButton provider="google" />
                <OAuthButton provider="github" />
                <p className="text-background text-sm xl:text-base text-center">
                    Having problems? Please contact us at <a href="mailto:contact@terrahacks.ca" className="underline hover:text-green-500 ease-in-out duration-300">contact@terrahacks.ca</a> to get help.
                </p>
            </div>
            {searchParams?.message && (
                <ErrorMessage key={Date.now()} searchParams={searchParams} />
            )}
        </div>
    );
}
