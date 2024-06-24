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
        });

        if (applicationDataError) {
            console.error(applicationDataError);
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
    const firstName = formData.get('firstName');
    const lastName = formData.get('lastName');
    const pronouns = formData.get('pronouns');
    const otherPronouns = formData.get('otherPronouns');
    const gender = formData.get('gender');
    const race = formData.get('race');
    const sexuality = formData.get('sexuality');
    const phoneNumber = formData.get('phoneNumber');
    const country = formData.get('country') === "Other" ? formData.get('otherCountry') : formData.get('country');
    const city = formData.get('city');
    const province = formData.get('province') === '' ? 'Not in Canada' : formData.get('province');
    const levelOfStudy = formData.get('levelOfStudy');
    const graduationYear = Number(formData.get('graduationYear'));
    const fieldOfStudy = formData.get('fieldOfStudy');
    const school = formData.get('school') === "Other" ? formData.get('otherSchool') : formData.get('school');
    const tmuStudentBool = school === "Toronto Metropolitan (Ryerson) University" ? true : false;
    const tmuStudentID = tmuStudentBool ? formData.get('tmuStudentID') : 'Error retrieving student number.';
    const email = tmuStudentBool ? formData.get('tmuEmail') : formData.get('email');
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
            first_name: firstName,
            last_name: lastName,
            email,
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

        // Check for errors
        if (applicationDetailsUpdateError) {
            console.error(applicationDetailsUpdateError);
            return redirect('/dashboard/application?page=1&message=Error - please try again later. If the problem persists, contact support.');
        }
    } else {
        // If the user has not submitted their application details, insert the details
        const { data: applicationDetailsInsert, error: applicationDetailsInsertError } = await supabase.from('applicant_details').insert({
            application_id: applicationID,
            account_id: userID,
            gender,
            first_name: firstName,
            last_name: lastName,
            email,
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
        });

        if (applicationDetailsInsertError) {
            console.error(applicationDetailsInsertError);
            return redirect('/dashboard/application?page=1&message=Error - please try again later. If the problem persists, contact support.');
        }
    }

    // Always handle TMU student logic separately
    if (tmuStudentBool) {
        const { data: tmuStudent, error: tmuStudentError } = await supabase.from('tmu_students').select().eq('account_id', userID);

        if (tmuStudentError) {
            console.error(tmuStudentError);
            return redirect('/dashboard/application?page=1&message=Error - please try again later. If the problem persists, contact support.');
        }

        // If they are in the tmu_students table, update them
        if (tmuStudent && tmuStudent.length > 0) {
            const { data: tmuStudentUpdate, error: tmuStudentUpdateError } = await supabase.from('tmu_students').update({
                application_id: applicationID,
                account_id: userID,
                student_num: tmuStudentID,
                email: email,
            }).match({ account_id: userID });

            if (tmuStudentUpdateError) {
                console.error(tmuStudentUpdateError);
                return redirect('/dashboard/application?page=1&message=Error - please try again later. If the problem persists, contact support.');
            }
        } else {
            // Else, insert them
            const { data: tmuStudentInsert, error: tmuStudentInsertError } = await supabase.from('tmu_students').insert({
                application_id: applicationID,
                account_id: userID,
                student_num: tmuStudentID,
                email: email,
            });

            if (tmuStudentInsertError) {
                console.error(tmuStudentInsertError);
                return redirect('/dashboard/application?page=1&message=Error - please try again later. If the problem persists, contact support.');
            }
        }
    } else {
        // Remove them from the tmu_students table if they are not a TMU student
        const { data: tmuStudent, error: tmuStudentError } = await supabase.from('tmu_students').select().eq('account_id', userID);

        if (tmuStudentError) {
            console.error(tmuStudentError);
            return redirect('/dashboard/application?page=1&message=Error - please try again later. If the problem persists, contact support.');
        }

        // If they are in the tmu_students table, remove them
        if (tmuStudent && tmuStudent.length > 0) {
            const { data: tmuStudentDelete, error: tmuStudentDeleteError } = await supabase.from('tmu_students').delete().match({ account_id: userID });

            if (tmuStudentDeleteError) {
                console.error(tmuStudentDeleteError);
                return redirect('/dashboard/application?page=1&message=Error - please try again later. If the problem persists, contact support.');
            }
        }
    }

    // Handle accommodations logic
    if (accommodationsBool) {
        const { data: accommodations, error: accommodationsError } = await supabase.from('accommodations').select().eq('account_id', userID);

        if (accommodationsError) {
            console.error(accommodationsError);
            return redirect('/dashboard/application?page=1&message=Error - please try again later. If the problem persists, contact support.');
        }

        // If they are in the accommodations table, update them
        if (accommodations && accommodations.length > 0) {
            const { data: accommodationsUpdate, error: accommodationsUpdateError } = await supabase.from('accommodations').update({
                application_id: applicationID,
                account_id: userID,
                description: accommodationsDescription,
            }).match({ account_id: userID });

            if (accommodationsUpdateError) {
                console.error(accommodationsUpdateError);
                return redirect('/dashboard/application?page=1&message=Error - please try again later. If the problem persists, contact support.');
            }
        } else {
            // Else, insert them
            const { data: accommodationsInsert, error: accommodationsInsertError } = await supabase.from('accommodations').insert({
                application_id: applicationID,
                account_id: userID,
                description: accommodationsDescription,
            });

            if (accommodationsInsertError) {
                console.error(accommodationsInsertError);
                return redirect('/dashboard/application?page=1&message=Error - please try again later. If the problem persists, contact support.');
            }
        }
    } else {
        // Remove them from the accommodations table if they don't require accommodations
        const { data: accommodations, error: accommodationsError } = await supabase.from('accommodations').select().eq('account_id', userID);

        if (accommodationsError) {
            console.error(accommodationsError);
            return redirect('/dashboard/application?page=1&message=Error - please try again later. If the problem persists, contact support.');
        }

        // If they are in the accommodations table, remove them
        if (accommodations && accommodations.length > 0) {
            const { data: accommodationsDelete, error: accommodationsDeleteError } = await supabase.from('accommodations').delete().match({ account_id: userID });

            if (accommodationsDeleteError) {
                console.error(accommodationsDeleteError);
                return redirect('/dashboard/application?page=1&message=Error - please try again later. If the problem persists, contact support.');
            }
        }
    }

    // Update application status to in progress
    const { data: updateStatusData, error: updateStatusError } = await supabase.from('users').update({
        applied: 'In Progress',
    }).match({ id: userID });

    if (updateStatusError) {
        console.error(updateStatusError);
        return redirect('/dashboard/application?page=1&message=Error - please try again later. If the problem persists, contact support.');
    }

    // If all goes well, redirect the user to the next page
    return redirect('/dashboard/application?page=2');
}
