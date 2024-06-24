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

    // Get the form data
    const questionOne = formData.get('questionOne') as string;
    const questionTwo = formData.get('questionTwo') as string;
    const resume = formData.get('resume') as File;

    // Add the long answer questions to the database
    const { data: applicationData, error: applicationDataError } = await supabase.from('applications').select().eq('account_id', userID);

    if (applicationDataError) {
        console.error(applicationDataError);
        return redirect('/dashboard/application?page=1&message=Error - please try again later. If the problem persists, contact support.');
    }

    if (!applicationData || applicationData.length === 0) {
        console.error('Application data not found');
        return redirect('/dashboard/application?page=1&message=Error - please try again later. If the problem persists, contact support.');
    }

    const applicationID = applicationData[0].application_id;

    const { data: longAnswerData, error: longAnswerError } = await supabase.from('responses').insert([
        {
            application_id: applicationID,
            account_id: userID,
            question_id: 1,
            response: questionOne,
        },
        {
            application_id: applicationID,
            account_id: userID,
            question_id: 2,
            response: questionTwo,
        }
    ]);

    if (longAnswerError) {
        console.error(longAnswerError);
        return redirect('/dashboard/application?page=1&message=Error - please try again later. If the problem persists, contact support.');
    }

    // All the logic for submitting a resume will go here
    if (resume.type === 'application/pdf') {
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

        // Update applicant details with new resume path
        const { data: updateApplicantData, error: updateApplicantError } = await supabase.from('applicant_details').update({
            resume_path: resumePath,
        }).match({ account_id: userID });

        if (updateApplicantError) {
            console.error(updateApplicantError);
            return redirect('/dashboard/application?page=1&message=Error - please try again later. If the problem persists, contact support.');
        }
    }
    else {
        // If no resume is uploaded, update the resume path to null
        const { data: updateApplicantData, error: updateApplicantError } = await supabase.from('applicant_details').update({
            resume_path: "No Resume Uploaded",
        }).match({ account_id: userID });

        if (updateApplicantError) {
            console.error(updateApplicantError);
            return redirect('/dashboard/application?page=1&message=Error - please try again later. If the problem persists, contact support.');
        }
    }


    // If all data is successfully submitted, update user application status
    const { data: updateStatusData, error: updateStatusError } = await supabase.from('users').update({
        applied: 'Applied'
    }).match({ id: userID });

    if (updateStatusError) {
        console.error(updateStatusError);
        return redirect('/dashboard/application?page=1&message=Error - please try again later. If the problem persists, contact support.');
    }

    // Redirect to the applied page
    return redirect('/dashboard/application/applied');
}