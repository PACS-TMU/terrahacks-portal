"use server";
import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function resetPassword(formData: FormData) {
    const origin = headers().get("origin");
    const email = formData.get("email") as string;
    const supabase = createClient();

    // Query the Supabase database to check if the email is valid
    const { data: data, error: updateError } = await supabase.from("accounts").select('email').eq("email", email);

    if (data?.length === 0) {
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