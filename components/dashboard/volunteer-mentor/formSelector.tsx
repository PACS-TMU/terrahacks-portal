"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";

interface VolunteerFormData {
    account_id?: string;
    first_name?: string;
    last_name?: string;
    email?: string;
    phone_number?: string;
    emergency_contact_name?: string;
    emergency_contact_phone?: string;
    acknowledge_physical_location?: boolean;
    preferred_roles?: string;
    dietary_restrictions?: string;
    applied_date?: string;
}

interface MentorFormData extends VolunteerFormData {
    current_job_title?: string;
    company_organization?: string;
    linkedin_url?: string;
    github_url?: string;
    technical_skills?: string;
    expertise_areas?: string;
    why_mentor?: string;
}

type FormType = "volunteer" | "mentor";
type FormData = VolunteerFormData | MentorFormData;

export default function FormSelector() {
    const [formType, setFormType] = useState<FormType>("volunteer");
    const [formData, setFormData] = useState<FormData>({} as FormData);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        // setFormData({});
        setSubmitted(false);
    }, [formType]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const target = e.target as HTMLInputElement;
        const { name, value, type, checked } = target;

        if (type === "checkbox") {
            setFormData((prev) => ({ ...prev, [name]: checked }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const validatePhone = (value: string) => /^\d{3}-\d{3}-\d{4}$/.test(value);
    const validateEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const supabase = createClient();

        const {
            data: { user },
            error: userError,
        } = await supabase.auth.getUser();

        if (userError || !user) {
            alert("You must be logged in to submit.");
            return;
        }

        // Pattern Validations
        if (!formData.email || !validateEmail(formData.email)) {
            alert("Invalid email format. Must include @ and a domain.");
            return;
        }
        if (!formData.phone_number || !validatePhone(formData.phone_number)) {
            alert("Phone number must be in XXX-XXX-XXXX format.");
            return;
        }
        if (!formData.emergency_contact_phone || !validatePhone(formData.emergency_contact_phone)) {
            alert("Emergency contact number must be in XXX-XXX-XXXX format.");
            return;
        }
    const table = formType === "volunteer" ? "volunteer_applications" : "mentor_applications";
    const currentDate = new Date().toISOString().split("T")[0];

    // Check if email already exists
const { data: existing, error: checkError } = await supabase
    .from(table)
    .select("account_id")
    .eq("email", formData.email)
    .limit(1);

if (checkError) {
    console.error("Email check error:", checkError.message);
    alert("Error checking email. Please try again.");
    return;
}

if (existing && existing.length > 0) {
    alert("An application with this email has already been submitted.");
    return;
}


    // Submit the application
    const payload = { ...formData, account_id: user.id, applied_date: currentDate };

    const { error } = await supabase.from(table).insert([payload]);

    if (error) {
        console.error("Submission error:", error.message, error.details);
        alert("Submission failed. Check console for details.");
    } else {
        setSubmitted(true);
    } 

};

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <button
                    type="button"
                    className={`bg-highlight text-background shadow-md p-4 rounded-lg ${formType === "volunteer" ? "bg-gray-200" : "bg-sky-200"}`}
                    onClick={() => setFormType("volunteer")}
                >
                    Volunteer Form
                </button>
                <button
                    type="button"
                    className={`bg-highlight text-background shadow-md p-4 rounded-lg ${formType === "mentor" ? "bg-gray-200" : "bg-sky-200"}`}
                    onClick={() => setFormType("mentor")}
                >
                    Mentor Form
                </button>
            </div>

            {!submitted ? (
                <form onSubmit={handleSubmit} className="grid gap-4">
                    <input name="first_name" placeholder="First Name" onChange={handleChange} required className="border p-2" />
                    <input name="last_name" placeholder="Last Name" onChange={handleChange} required className="border p-2" />
                    <input name="email" type="email" placeholder="Email" onChange={handleChange} required className="border p-2" />
                    <input name="phone_number" placeholder="Phone Number (XXX-XXX-XXXX)" onChange={handleChange} required className="border p-2" />
                    <input name="emergency_contact_name" placeholder="Emergency Contact Name" onChange={handleChange} required className="border p-2" />
                    <input name="emergency_contact_phone" placeholder="Emergency Contact Phone (XXX-XXX-XXXX)" onChange={handleChange} required className="border p-2" />

                    <label className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            name="acknowledge_physical_location"
                            onChange={handleChange}
                            required
                        />
                        <span>I acknowledge I will be physically present</span>
                    </label>

                    <input name="dietary_restrictions" placeholder="Dietary Restrictions" onChange={handleChange} required className="border p-2" />

                    {formType === "volunteer" && (
                        <input name="preferred_roles" placeholder="Preferred Roles" onChange={handleChange} required className="border p-2" />
                    )}

                    {formType === "mentor" && (
                        <>
                            <input name="current_job_title" placeholder="Current Job Title" onChange={handleChange} required className="border p-2" />
                            <input name="company_organization" placeholder="Company / Organization" onChange={handleChange} required className="border p-2" />
                            <input name="linkedin_url" placeholder="LinkedIn URL" onChange={handleChange} required className="border p-2" />
                            <input name="github_url" placeholder="GitHub URL" onChange={handleChange} required className="border p-2" />
                            <input name="technical_skills" placeholder="Technical Skills" onChange={handleChange} required className="border p-2" />
                            <input name="expertise_areas" placeholder="Expertise Areas" onChange={handleChange} required className="border p-2" />
                            <textarea name="why_mentor" placeholder="Why do you want to be a mentor?" onChange={handleChange} required className="border p-2" />
                        </>
                    )}

                    <button
                        type="submit"
                        className="bg-highlight text-background shadow-md p-4 rounded-lg rounded-lg hover:animate-pulse hover:opacity-90 ease-in-out duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Submit {formType === "volunteer" ? "Volunteer" : "Mentor"} Application
                    </button>
                </form>
            ) : (
                <div className="text-green-600 font-bold text-center">Form submitted successfully! We look forward to reviewing your application! Good luck!</div>
            )}
        </div>
    );
}
