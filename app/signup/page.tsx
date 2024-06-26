import Link from "next/link";
import Image from "next/image";
import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SubmitButton } from "../../components/forms/submit-button";
import OAuthButton from "@/components/auth/oauth-button";
import PasswordField from "../../components/forms/password-field";
import EmailField from "@/components/forms/email-field";
import ErrorMessage from "@/components/auth/error-message";

export default function Signup({ searchParams }: { searchParams: { message: string } }) {
    const signUp = async (formData: FormData) => {
        "use server";

        const origin = process.env.NEXT_PUBLIC_BASE_URL ? `https://${process.env.NEXT_PUBLIC_BASE_URL}` : "http://localhost:3000";
        const firstName = formData.get("firstname") as string;
        const lastName = formData.get("lastname") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const confirmPassword = formData.get("confirm-password") as string;

        if (password !== confirmPassword) {
            return redirect("/signup?message=Error - Passwords do not match.");
        }

        // Check if the password meets the minimum requirements
        if (password.length < 6) {
            return redirect(`/signup?message=Error - Password needs to be at least 6 characters long.`);
        }

        // Create a Supabase client
        const supabase = createClient();

        // Check if email is already in use
        const { data: existingUser, error: getUserError } = await supabase
            .from('users')
            .select('*')
            .eq('email', email)
            .single();

        // Error code PGRST116 is thrown when the request returns no results
        if (getUserError && getUserError.code !== "PGRST116") {
            console.error(getUserError);
            return redirect("/signup?message=Error - An error occurred, please try again later. If issue persists, contact us.");
        }

        if (existingUser) {
            console.error("Email already exists");
            return redirect("/login?message=Error - Email already exists. Please sign in.");
        }

        // Attempt to sign up the user using Supabase Auth
        const { data: signUpData, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: `${origin}/login?message=Email verified. Please sign in to continue.`,
                data: {
                    full_name: `${firstName} ${lastName}`,
                }
            },
        });

        if (error) {
            console.error(error);
            return redirect("/signup?message=Error - An error occurred, please try again later. We recommend logging in with Google/GitHub. If issue persists, contact us.");
        }

        if (!signUpData.user) {
            console.error("User not created");
            return redirect("/signup?message=Error - An error occurred, please try again later. If issue persists, contact us.");
        }

        return redirect("/login?message=Check email to continue sign in process. It may take a few minutes. If you do not receive an email, please check your spam folder. If issue persists, please contact us.");
    };

    return (
        //background gradient
        <div className="bg-gradient-to-b from-[#afd6e3] from-20% via-[#c3aa8e] via-50% to-[#432c2b] to-90% min-h-screen w-full flex items-center lg:text-lg xl:text-xl justify-center text-background">
            <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl items-center justify-center gap-2">
                {/* h1 is hidden for SEO purposes */}
                <h1 className="opacity-0 h-0">TerraHacks</h1>

                <Image
                    src="/assets/th-text.png"
                    priority={true}
                    alt="Terrahacks logo"
                    width={3000}
                    height={400}
                    className="w-full h-auto mx-auto"
                />
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold pt-[5%] pb-[2%] text-left text-background">Application Portal</h2>

                <form className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground">
                    <h1 className="opacity-0">TerraHacks</h1>
                    <label className="text-base text-background" htmlFor="firstname">
                        First Name
                    </label>
                    <input
                        id="firstname"
                        className="rounded-md px-4 py-2 bg-inherit border border-background mb-4 placeholder-gray-200"
                        name="firstname"
                        placeholder="First Name"
                        autoComplete="given-name"
                        required
                    />
                    <label className="text-base text-background" htmlFor="lastname">
                        Last Name
                    </label>
                    <input
                        id="lastname"
                        className="rounded-md px-4 py-2 bg-inherit border border-background mb-4 placeholder-gray-200"
                        name="lastname"
                        placeholder="Last Name"
                        autoComplete="family-name"
                        required
                    />

                    <EmailField />
                    <PasswordField name="password" />
                    <PasswordField name="confirm-password" />
                    <p className="text-sm lg:text-base text-background"><span className="font-semibold">Note:</span> Passwords must be at least 6 characters long.</p>

                    <SubmitButton
                        formAction={signUp}
                        className="bg-green-700 rounded-md px-4 py-2 text-background mt-4 ease-in-out duration-300 hover:bg-green-800"
                        pendingText="Signing Up..."
                    >
                        Sign Up
                    </SubmitButton>
                    <p className="text-sm lg:text-base text-background pb-2 mb-2">
                        By signing up, you agree to our {""}
                        <Link
                            aria-label="Terms of Service Link"
                            href="/assets/privacy-policy.pdf"
                            target="_blank"
                            className="text-background font-semibold underline hover:text-green-500 ease-in-out duration-300"
                        >
                            Privacy Policy
                        </Link>.
                    </p>

                    <p className="pb-4 text-background">
                        Already have an account? {" "}
                        <span>
                            <Link
                                aria-label="Login Link"
                                href="/login"
                                className="text-background font-semibold underline hover:text-green-500 ease-in-out duration-300"
                            >
                                Log in.
                            </Link>
                        </span>
                    </p>
                </form>
                <OAuthButton provider="google" />
                <OAuthButton provider="github" />
            </div>
            {searchParams?.message && (
                <ErrorMessage key={Date.now()} searchParams={searchParams} />
            )}
        </div>
    );
}
