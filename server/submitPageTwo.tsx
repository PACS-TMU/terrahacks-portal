"use server";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function submitPageTwo(formData: FormData) {
    // Create a new Supabase server client
    const supabase = createClient();

    // Get the user's id
    const user = await supabase.auth.getUser();
    if (!user) {
        redirect('/login');
    }
    const userID = user.data.user!.id;

    // Get the resume file
    const resume = formData.get('resume') as File ;

    // All the logic for submitting a resume will go here
    const resumePath = resume ? `${userID}/${resume.name}` : null;

    if (resumePath && resume) {
        const { data: resumeData, error: resumeError } = await supabase.storage
            .from('resumes')
            .upload(resumePath, resume);

        if (resumeError) {
            console.error(resumeError);
            return redirect('/dashboard/application?page=1&message=Error - please try again later. If the problem persists, contact support.');
        }
    }

    // Update applicant details
    const { data: updateApplicantData, error: updateApplicantError } = await supabase.from('applicant_details').update({
        resume_path: resumePath,
    }).match({ account_id: userID });

    if (updateApplicantError) {
        console.error(updateApplicantError);
        return redirect('/dashboard/application?page=1&message=Error - please try again later. If the problem persists, contact support.');
    }

    console.log('Resume submitted successfully');
    return redirect('/dashboard/application?page=3');
}