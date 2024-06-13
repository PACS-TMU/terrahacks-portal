"use server";
// import { createClient } from "@/utils/supabaseAdmin/server";
import { createClient } from '@supabase/supabase-js';
import { redirect } from "next/navigation";

export default async function newPassword(formData: FormData) {
    // Get the token from the form data
    const token = formData.get("token") as string;
    const code = formData.get("code") as string;

    // Create a new Supabase Admin server client
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey);

    // Get the new password and confirm password from the form data
    const newPassword = formData.get("password") as string;
    const confirmPassword = formData.get("confirm-password") as string;

    // Error check before submitting
    if (newPassword !== confirmPassword) {
        return redirect(`/new-password?code=${code}&token=${token}&message=Passwords do not match`);
    }

    // If all checks pass, update the user's password
    // Replace "" below with the user's ID
    const { data, error } = await supabaseAdmin.auth.admin.updateUserById("", {password: newPassword});
    if (error) {
        console.error(error);
        return redirect("/login?message=Error - Failed to update password");
    }

    await supabaseAdmin.from("password_reset_tokens").delete().eq("token", token);

    return redirect("/login?message=Password updated successfully");
}
