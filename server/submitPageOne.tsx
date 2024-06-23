"use server"
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function submitPageOne(formData: FormData) {
    // Create a new Supabase server client
    const supabase = createClient();

    // Get the user's id
    const user = await supabase.auth.getUser();
    if (!user) {
        redirect('/login');
    }
    const userID = user.data.user!.id;

    // Check if the user has already submitted an application
    const { data: oldApplicationData, error: oldApplicationError } = await supabase.from('applications').select().eq('account_id', userID);

    if (oldApplicationError) {
        console.error(oldApplicationError);
    }

    let applicationID = null;

    // If the user has already submitted an application, get the application id
    if (oldApplicationData && oldApplicationData.length > 0) {
        applicationID = oldApplicationData[0].application_id;
    }
    else {
        // Insert the application data into the database
        const { data: applicationData, error: applicationDataError } = await supabase.from('applications').insert({
            account_id: userID,
        })

        if (applicationDataError) {
            console.error(applicationDataError);
            return redirect('/dashboard/application?message=Error - please try again later. If the problem persists, contact support.');
        }

        if (applicationDataError) {
            console.error(applicationDataError);
            return redirect('/dashboard/application?message=Error - please try again later. If the problem persists, contact support.');
        }

        if (!applicationData) {
            console.error('Application data not found');
            return redirect('/dashboard/application?message=Error - please try again later. If the problem persists, contact support.');
        }

        // Get the application id
        const { data: newApplicationData, error: newApplicationError } = await supabase.from('applications').select().eq('account_id', userID);

        if (newApplicationError) {
            console.error(newApplicationError);
            return redirect('/dashboard/application?message=Error - please try again later. If the problem persists, contact support.');
        }

        if (!newApplicationData) {
            console.error('New application data not found');
            return redirect('/dashboard/application?message=Error - please try again later. If the problem persists, contact support.');
        }

        applicationID = newApplicationData[0].application_id;
    }

    // All the logic for submitting an application will go here
    const pronouns = formData.get('pronouns');
    const otherPronouns = formData.get('otherPronouns');
    const gender = formData.get('gender');
    const race = formData.get('race');
    const sexuality = formData.get('sexuality');
    const phoneNumber = formData.get('phoneNumber');
    const country = formData.get('country');
    const city = formData.get('city');
    const province = formData.get('province');
    const levelOfStudy = formData.get('levelOfStudy');
    const graduationYear = formData.get('graduationYear');
    const fieldOfStudy = formData.get('fieldOfStudy');
    const school = formData.get('school');
    const tmuStudentBool = formData.get('tmuStudentBool') === "Yes" ? true : false;
    const tmuStudentID = tmuStudentBool ? formData.get('tmuStudentID') : null;
    const accommodationsBool = formData.get('accommodationsBool') === "Yes" ? true : false;
    const accommodationsDescription = accommodationsBool ? formData.get('accommodationsDescription') : null;
    const dietaryRestrictions = formData.get('dietaryRestrictions') === "Other" ? formData.get('otherDietaryRestriction') : formData.get('dietaryRestrictions');
    const githubURL = formData.get('githubURL') ? formData.get('githubURL') : "N/A";
    const linkedinURL = formData.get('linkedinURL') ? formData.get('linkedinURL') : "N/A";

    // Check if the user has already submitted their application details
    const { data: oldApplicationDetailsData, error: oldApplicationDetailsError } = await supabase.from('applicant_details').select().eq('account_id', userID);

    if (oldApplicationDetailsError) {
        console.error(oldApplicationDetailsError);
    }

    // If the user has already submitted their application details, update the details
    if (oldApplicationDetailsData && oldApplicationDetailsData.length > 0) {
        const { data: applicationDetailsUpdate, error: applicationDetailsUpdateError } = await supabase.from('applicant_details').update({
            application_id: applicationID,
            account_id: userID,
            gender,
            pronouns: pronouns === "Other" ? otherPronouns : pronouns,
            race,
            sexuality,
            field_of_study: fieldOfStudy,
            phone_number: phoneNumber,
            school,
            level_of_study: levelOfStudy,
            grad_year: graduationYear,
            city,
            province_state: province,
            country,
            tmu_student: tmuStudentBool,
            accommodation: accommodationsBool,
            github: githubURL,
            linkedin: linkedinURL,
            resume_path: "added soon",
            dietary_restrictions: dietaryRestrictions,
        }).match({ account_id: userID });
        console.log('Application updated successfully');
        return redirect('/dashboard/application?page=2');
    }

    const { data: applicationDetailsInsert, error: applicationDetailsInsertError } = await supabase.from('applicant_details').insert({
        application_id: applicationID,
        account_id: userID,
        gender,
        pronouns: pronouns === "Other" ? otherPronouns : pronouns,
        race,
        sexuality,
        field_of_study: fieldOfStudy,
        phone_number: phoneNumber,
        school,
        level_of_study: levelOfStudy,
        grad_year: graduationYear,
        city,
        province_state: province,
        country,
        tmu_student: tmuStudentBool,
        accommodation: accommodationsBool,
        github: githubURL,
        linkedin: linkedinURL,
        resume_path: "added soon",
        dietary_restrictions: dietaryRestrictions,
    })

    if (applicationDetailsInsertError) {
        console.error(applicationDetailsInsertError);
        return redirect('/dashboard/application?message=Error - please try again later. If the problem persists, contact support.');
    }


    console.log('Application submitted successfully');
    return redirect('/dashboard/application?page=2');
}