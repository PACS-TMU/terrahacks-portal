"use server";
// import { createClient } from "@/utils/supabaseAdmin/server";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function newPassword(formData: FormData) {
    // Get the authorization code from the form data
    const code = formData.get("code") as string;

    // Create a new Supabase server client
    const supabase = createClient();

    // Get the new password and confirm password from the form data
    const newPassword = formData.get("password") as string;
    const confirmPassword = formData.get("confirm-password") as string;

    // Error check before submitting
    if (newPassword !== confirmPassword) {
        return redirect(`/new-password?code=${code}&message=Error - Passwords do not match`);
    }

    // Exchange the authorization code for a session
    try {
        const { data: exchangeData, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
        if (exchangeError) {
            return redirect("/login?message=Error - Invalid token. Please ensure you opened the correct link.");
        }
    }
    catch (error) {
        return redirect("/login?message=Error - Invalid token. Please ensure you opened the correct link.");
    }

    // If all checks pass, update the user's password
    const { data, error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) {
        console.error(error);
        return redirect("/login?message=Error - Failed to update password");
    }

    return redirect("/login?message=Password updated successfully! Sign in to continue.");
}
