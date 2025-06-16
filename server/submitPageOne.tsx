"use server"
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function submitPageOne(formData: FormData) {
    console.log('FormData entries:', Array.from(formData.entries()));
    
    const validate = (formData: FormData) => {
        let isStudentNumValid = false;
        let isTMUEmailValid = false;
        let isPhoneValid = false;
        let isGithubValid = false;
        let isLinkedInValid = false;
    
        // Check if TMU email is valid
        const uni = formData.get('school') === "Other" ? formData.get('otherSchool') : formData.get('school');
        if (uni === "Toronto Metropolitan (Ryerson) University") {
            const emailPattern = /^[a-z0-9._%+-]+@torontomu\.ca$/;
            const studentIdPattern = /^\d{9}$/;
    
            const tmuEmail = formData.get('tmuEmail') as string;
            const studentID = formData.get('tmuStudentID') as string;
    
            isTMUEmailValid = emailPattern.test(tmuEmail);
            isStudentNumValid = studentIdPattern.test(studentID);
    
            if (!isStudentNumValid) {
                return { valid: false, message: "Error - Please enter a valid TMU student number." }
            }
            if (!isTMUEmailValid) {
                return { valid: false, message: "Error - Please enter a valid TMU email." }
            }
        } else {
            isTMUEmailValid = true;
        }
    
        // Check if phone number is valid
        const phonePattern = /\([0-9]{3}\) [0-9]{3}-[0-9]{4}/;
        const phoneNumber = formData.get('phoneNumber') as string;
        isPhoneValid = phonePattern.test(phoneNumber);
        if (!isPhoneValid) {
            return { valid: false, message: "Error - Please enter a valid phone number." }
        }
    
        // Check if Github URL is valid
        const githubPattern = /^(https?:\/\/)?(www\.)?github\.com\/[a-zA-Z0-9-]+$\/?/i;
        let githubURL = formData.get('githubURL') as string;
        if (githubURL === "") {
            isGithubValid = true;
        } else {
            isGithubValid = githubPattern.test(githubURL);
            if (!isGithubValid) {
                return { valid: false, message: "Error - Please enter a valid Github URL." }
            }

            // appends "https://" to github urls if necessary
            if (githubURL.slice(0,8) !== "https://" && githubURL.slice(0,7) !== "http://") {
                githubURL = "https://" + githubURL;
                formData.set('githubURL', githubURL);
            }
        }
    
        // Check if LinkedIn URL is valid
        const linkedinPattern = /^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[a-zA-Z0-9-]+\/?$/i;
        let linkedinURL = formData.get('linkedinURL') as string;
        if (linkedinURL === "") {
            isLinkedInValid = true;
        } else {
            isLinkedInValid = linkedinPattern.test(linkedinURL);
            if (!isLinkedInValid) {
                return { valid: false, message: "Error - Please enter a valid LinkedIn URL." }
            }
            
            // appends "https://" to linkedin urls if necessary
            if (linkedinURL.slice(0,8) !== "https://" && linkedinURL.slice(0,7) !== "http://") {
                linkedinURL = "https://" + linkedinURL;
                formData.set('linkedinURL', linkedinURL);
            }
        }
    
        if (isTMUEmailValid && isPhoneValid && isGithubValid && isLinkedInValid) {
            return { valid: true, message: "" }
        }
    };    

    // Validate the form data
    const validation = validate(formData);
    if (!validation) {
        return redirect('/dashboard/application?page=1&message=Error - please try again later. If the problem persists, contact support.');
    }
    if (!validation.valid) {
        return redirect(`/dashboard/application?page=1&message=${validation.message}`);
    }

    // Create a new Supabase server client
    const supabase = await createClient();

    // Get the user's id
    const user = await supabase.auth.getUser();
    if (!user) {
        return redirect('/login');
    }
    const userID = user.data.user!.id;

    // Extract all form data upfront
    const firstName = formData.get('firstName');
    const lastName = formData.get('lastName');
    const pronouns = formData.get('pronouns') === "Other" ? formData.get('otherPronouns') : formData.get('pronouns');
    const otherPronouns = formData.get('otherPronouns');
    const gender = formData.get('gender');
    const race = formData.get('race');
    const sexuality = formData.get('sexuality');
    const phoneNumber = formData.get('phoneNumber');
    const country = formData.get('country') === "Other" ? formData.get('otherCountry') : formData.get('country');
    const city = formData.get('city');
    const province = !formData.get('province') ? 'Not in Canada' : formData.get('province');
    const levelOfStudy = formData.get('levelOfStudy');
    const graduationYear = Number(formData.get('graduationYear'));
    const fieldOfStudy = formData.get('fieldOfStudy');
    const school = formData.get('school') === "Other" ? formData.get('otherSchool') : formData.get('school');
    const tmuStudentBool = school === "Toronto Metropolitan (Ryerson) University" ? true : false;
    const tmuStudentID = tmuStudentBool ? formData.get('tmuStudentID') : null;
    const email = tmuStudentBool ? formData.get('tmuEmail') : formData.get('email');
    const accommodationsBool = formData.get('accommodationsBool') === "Yes" ? true : false;
    const accommodationsDescription = accommodationsBool ? formData.get('accommodationsDescription') : null;
    const dietaryRestrictions = formData.get('dietaryRestrictions') === "Other" ? formData.get('otherDietaryRestriction') : formData.get('dietaryRestrictions');
    const githubURL = formData.get('githubURL') ? formData.get('githubURL')!.toString().toLowerCase() : "N/A";
    const linkedinURL = formData.get('linkedinURL') ? formData.get('linkedinURL')!.toString().toLowerCase() : "N/A";
    const appliedDate = new Date().toISOString();

    console.log("Submitting application with the following data:");
    console.log({
        firstName,
        lastName,
        pronouns,
        otherPronouns,
        gender,
        race,
        sexuality,
        phoneNumber,
        country,
        city,
        province,
        levelOfStudy,
        graduationYear,
        fieldOfStudy,
        school,
        tmuStudentID,
        email,
        accommodationsDescription,
        dietaryRestrictions,
        githubURL,
        linkedinURL
    });

    // Check if the user has already submitted an application
    const { data: existingApplication, error: existingApplicationError } = await supabase
        .from('applicant_details')
        .select('application_id')
        .eq('account_id', userID)
        .single();

    if (existingApplicationError && existingApplicationError.code !== 'PGRST116') {
        console.error('Error checking existing application:', existingApplicationError);
        return redirect('/dashboard/application?page=1&message=Error - please try again later. If the problem persists, contact support.');
    }

    // Prepare the complete application data
    const applicationData = {
        account_id: userID,
        gender,
        first_name: firstName,
        last_name: lastName,
        email,
        pronouns: pronouns,
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
        applied_date: appliedDate,
        app_state: 'In Progress',
        
    };

    let applicationID: string;

    if (existingApplication) {
        // Update existing application
        applicationID = existingApplication.application_id;
        const { error: updateError } = await supabase
            .from('applicant_details')
            .update(applicationData)
            .eq('account_id', userID);

        if (updateError) {
            console.error('Error updating application:', updateError);
            return redirect('/dashboard/application?page=1&message=Error - please try again later. If the problem persists, contact support.');
        }
    } else {
        // Insert new application
        const { data: newApplication, error: insertError } = await supabase
            .from('applicant_details')
            .insert(applicationData)
            .select('application_id')
            .single();

        if (insertError || !newApplication) {
            console.error('Error creating application:', insertError);
            return redirect('/dashboard/application?page=1&message=Error - please try again later. If the problem persists, contact support.');
        }

        applicationID = newApplication.application_id;
    }

    // Handle TMU student logic
    if (tmuStudentBool) {
        const { data: existingTMUStudent, error: tmuCheckError } = await supabase
            .from('tmu_students')
            .select('account_id')
            .eq('account_id', userID)
            .single();

        if (tmuCheckError && tmuCheckError.code !== 'PGRST116') {
            console.error('Error checking TMU student:', tmuCheckError);
            return redirect('/dashboard/application?page=1&message=Error - please try again later. If the problem persists, contact support.');
        }

        const tmuStudentData = {
            application_id: applicationID,
            account_id: userID,
            student_num: tmuStudentID,
            email: email,
        };

        if (existingTMUStudent) {
            // Update existing TMU student record
            const { error: tmuUpdateError } = await supabase
                .from('tmu_students')
                .update(tmuStudentData)
                .eq('account_id', userID);

            if (tmuUpdateError) {
                console.error('Error updating TMU student:', tmuUpdateError);
                return redirect('/dashboard/application?page=1&message=Error - please try again later. If the problem persists, contact support.');
            }
        } else {
            // Insert new TMU student record
            const { error: tmuInsertError } = await supabase
                .from('tmu_students')
                .insert(tmuStudentData);

            if (tmuInsertError) {
                console.error('Error inserting TMU student:', tmuInsertError);
                return redirect('/dashboard/application?page=1&message=Error - please try again later. If the problem persists, contact support.');
            }
        }
    } else {
        // Remove from tmu_students table if not a TMU student
        const { error: tmuDeleteError } = await supabase
            .from('tmu_students')
            .delete()
            .eq('account_id', userID);

        if (tmuDeleteError) {
            console.error('Error removing TMU student:', tmuDeleteError);
            return redirect('/dashboard/application?page=1&message=Error - please try again later. If the problem persists, contact support.');
        }
    }

    // Handle accommodations logic
    if (accommodationsBool) {
        const { data: existingAccommodations, error: accommodationsCheckError } = await supabase
            .from('accommodations')
            .select('id')
            .eq('account_id', userID)
            .single();

        if (accommodationsCheckError && accommodationsCheckError.code !== 'PGRST116') {
            console.error('Error checking accommodations:', accommodationsCheckError);
            return redirect('/dashboard/application?page=1&message=Error - please try again later. If the problem persists, contact support.');
        }

        const accommodationsData = {
            application_id: applicationID,
            account_id: userID,
            description: accommodationsDescription,
        };

        if (existingAccommodations) {
            // Update existing accommodations record
            const { error: accommodationsUpdateError } = await supabase
                .from('accommodations')
                .update(accommodationsData)
                .eq('account_id', userID);

            if (accommodationsUpdateError) {
                console.error('Error updating accommodations:', accommodationsUpdateError);
                return redirect('/dashboard/application?page=1&message=Error - please try again later. If the problem persists, contact support.');
            }
        } else {
            // Insert new accommodations record
            const { error: accommodationsInsertError } = await supabase
                .from('accommodations')
                .insert(accommodationsData);

            if (accommodationsInsertError) {
                console.error('Error inserting accommodations:', accommodationsInsertError);
                return redirect('/dashboard/application?page=1&message=Error - please try again later. If the problem persists, contact support.');
            }
        }
    } else {
        // Remove from accommodations table if no accommodations needed
        const { error: accommodationsDeleteError } = await supabase
            .from('accommodations')
            .delete()
            .eq('account_id', userID);

        if (accommodationsDeleteError) {
            console.error('Error removing accommodations:', accommodationsDeleteError);
            return redirect('/dashboard/application?page=1&message=Error - please try again later. If the problem persists, contact support.');
        }
    }

    // Update application status to in progress
    const { error: updateStatusError } = await supabase
        .from('users')
        .update({ applied: 'In Progress' })
        .eq('id', userID);

    if (updateStatusError) {
        console.error('Error updating status:', updateStatusError);
        return redirect('/dashboard/application?page=1&message=Error - please try again later. If the problem persists, contact support.');
    }

    // If all goes well, redirect the user to the next page
    return redirect('/dashboard/application?page=2');
}