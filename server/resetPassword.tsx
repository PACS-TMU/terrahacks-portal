"use server";
import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function resetPassword(formData: FormData) {
    const origin = process.env.NEXT_PUBLIC_BASE_URL ? `https://${process.env.NEXT_PUBLIC_BASE_URL}` : "http://localhost:3000";
    const email = formData.get("email") as string;
    const supabase = createClient();

    // Query the Supabase database to check if the email is valid
    const { data: existingUser, error: getUserError } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single();

    // Error code PGRST116 is thrown when the request returns no results
    if (getUserError && getUserError.code === "PGRST116") {
        console.error(getUserError);
        return redirect("/login?message=Error - Email does not exist in our records. Please try again.");
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${origin}/new-password`,
    });

    if (error) {
        console.error(error);
        return redirect("/login?message=Error - please try again later. If the problem persists, contact support.");
    }

    return redirect("/login?message=Check your email continue reset password process!");
};