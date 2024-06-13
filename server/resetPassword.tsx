"use server";
import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function resetPassword(formData: FormData) {
    const origin = headers().get("origin");
    const email = formData.get("email") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${origin}/new-password`,
    });

    if (error) {
        console.error(error);
        return redirect("/login?message=Error - please try again later. If the problem persists, contact support.");
    }

    return redirect("/login?message=If your email exists, you will receive email to continue reset password process!");
};