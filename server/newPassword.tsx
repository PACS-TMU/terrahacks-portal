"use server";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function newPassword(formData: FormData) {
    // Get the token from the form data
    const token = formData.get("token") as string;
    const code = formData.get("code") as string;

    // Create a new Supabase server client
    const supabase = createClient();

    // Get the new password and confirm password from the form data
    const newPassword = formData.get("password") as string;
    const confirmPassword = formData.get("confirm-password") as string;

    // Error check before submitting
    if (newPassword !== confirmPassword) {
        return redirect(`/new-password?code=${code}&token=${token}&message=Passwords do not match`);
    }

    // If all checks pass, update the user's password
    const { error } = await supabase.auth.updateUser({ 
        password: newPassword,
        nonce: token 
    });

    if (error) {
        console.error(error);
        return redirect("/login?message=Error - Failed to update password");
    }

    await supabase.from("password_reset_tokens").delete().eq("token", token);

    return redirect("/login?message=Password updated successfully");
}
