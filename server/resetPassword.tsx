"use server";
import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { v4 as uuidv4 } from 'uuid';

export default async function resetPassword(formData: FormData) {
    const origin = headers().get("origin");
    const email = formData.get("email") as string;
    const supabase = createClient();
    
    // Create token for password reset
    const token = uuidv4();
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 1);

    // Store token in database
    const { data, error: dbError } = await supabase.from("password_reset_tokens").insert([
        { email, token, expiry_time: expiresAt }
    ]);

    if (dbError) {
        console.error(dbError);
        return redirect("/login?message=Error - try again later. If this issue persists, please contact us.");
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${origin}/new-password?token=${token}`,
    });

    if (error) {
        console.error(error);
        return redirect("/login?message=Error - please try again later.");
    }

    return redirect("/login?message=Check email to continue reset password process");
};