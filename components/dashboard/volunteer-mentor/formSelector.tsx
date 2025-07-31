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
    dietary_restrictions_other?: string; // Add this field
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
    const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
    const [alreadySubmitted, setAlreadySubmitted] = useState<{ volunteer: boolean; mentor: boolean }>({ volunteer: false, mentor: false });

    useEffect(() => {
        setSubmitted(false);
        setFormErrors({});
        setFormData({});
    }, [formType]);

    // Check for existing application on mount
    useEffect(() => {
        const checkExisting = async () => {
            const supabase = createClient();
            const {
                data: { user },
                error: userError,
            } = await supabase.auth.getUser();

            if (userError || !user) return;

            const vApp = await supabase
                .from("volunteer_applications")
                .select("account_id")
                .eq("account_id", user.id)
                .limit(1);

            const mApp = await supabase
                .from("mentor_applications")
                .select("account_id")
                .eq("account_id", user.id)
                .limit(1);

            setAlreadySubmitted({
                volunteer: Array.isArray(vApp.data) && vApp.data.length > 0,
                mentor: Array.isArray(mApp.data) && mApp.data.length > 0,
            });
        };
        checkExisting();
    }, [formType]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const target = e.target;
        const { name, value, type } = target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

        let newValue: string | boolean = value;
        if (type === "checkbox" && target instanceof HTMLInputElement) {
            newValue = target.checked;
        }

        setFormData((prev) => ({ ...prev, [name]: newValue }));

        // Real-time validation
        if (name === "email") {
            setFormErrors((prev) => ({
                ...prev,
                email: validateEmail(value) ? "" : "Invalid email format. Must include @ and a domain",
            }));
        }

        if (name === "phone_number" || name === "emergency_contact_phone") {
            setFormErrors((prev) => ({
                ...prev,
                [name]: validatePhone(value) ? "" : "Phone number must be XXX-XXX-XXXX",
            }));
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
            alert("Phone number must be in 123-456-6789 format.");
            return;
        }
        if (!formData.emergency_contact_phone || !validatePhone(formData.emergency_contact_phone)) {
            alert("Emergency contact number must be in 123-456-6789 format.");
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

        // Submit the application - properly typed
        const payload = {
            account_id: user.id,
            first_name: formData.first_name,
            last_name: formData.last_name,
            email: formData.email,
            phone_number: formData.phone_number,
            acknowledge_physical_location: formData.acknowledge_physical_location,
            preferred_roles: formData.preferred_roles,
            dietary_restrictions:
                formData.dietary_restrictions === "Other"
                    ? formData.dietary_restrictions_other || "Other"
                    : formData.dietary_restrictions,
            emergency_contact_name: formData.emergency_contact_name,
            emergency_contact_phone: formData.emergency_contact_phone,
            applied_date: currentDate,
        };

        const { error } = await supabase.from(table).insert([payload]);

        if (error) {
            console.error("Submission error:", error.message, error.details);
            alert("Submission failed. Check console for details.");
        } else {
            setSubmitted(true);
        }
    };

    return (
        <div className="space-y-6 px-6 py-4 max-w-6xl mx-auto">
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

            {alreadySubmitted[formType] ? (
                <div className="text-blue-600 font-bold text-center">
                    You have already submitted a {formType} application.
                </div>
            ) : !submitted ? (
                <form onSubmit={handleSubmit} className="grid gap-4">
                    <input name="first_name" placeholder="First Name" onChange={handleChange} required className="border p-2" />
                    <input name="last_name" placeholder="Last Name" onChange={handleChange} required className="border p-2" />
                    <input name="email" type="email" placeholder="Email" onChange={handleChange} required className="border p-2" />
                    {formErrors.email && (<p className="text-red-500 text-sm">{formErrors.email}</p>)}
                    <input name="phone_number" placeholder="Phone Number (XXX-XXX-XXXX)" onChange={handleChange} required className="border p-2" />
                    {formErrors.phone_number && (<p className="text-red-500 text-sm">{formErrors.phone_number}</p>)}
                    <input name="emergency_contact_name" placeholder="Emergency Contact Name" onChange={handleChange} required className="border p-2" />
                    <input name="emergency_contact_phone" placeholder="Emergency Contact Phone (XXX-XXX-XXXX)" onChange={handleChange} required className="border p-2" />
                    {formErrors.emergency_contact_phone && (<p className="text-red-500 text-sm">{formErrors.emergency_contact_phone}</p>)}

                    <label htmlFor="dietary_restrictions" className="font-medium">
                    </label>
                    <p className="-mt-2 -mb-2 font-semibold">Dietary Restrictions/Food Allergies</p>
                    <select
                        id="dietary_restrictions"
                        name="dietary_restrictions"
                        onChange={handleChange}
                        required
                        className="border p-2"
                    >
                        <option value="">-- Please select an option -- </option>
                        <option value="Vegetarian">Vegetarian</option>
                        <option value="Vegan">Vegan</option>
                        <option value="Gluten-Free">Gluten-Free</option>
                        <option value="Nut Allergy">Nut Allergy (Peanuts/Tree Nuts)</option>
                        <option value="None">No dietary restrictions</option>
                        <option value="Other">Other (please specify in the form below)</option>
                    </select>
                    {formData.dietary_restrictions === "Other" && (
                        <input
                            name="dietary_restrictions_other"
                            placeholder="Please specify your dietary restriction"
                            onChange={handleChange}
                            className="border p-2"
                        />
                    )}

                    {formType === "volunteer" && (
                        <>
                            <label htmlFor="preferred_roles" className="mt-2 -mb-2 font-semibold">Preferred Role</label>
                            <select
                                id="preferred_roles"
                                name="preferred_roles"
                                onChange={handleChange}
                                required
                                className="border p-2"
                            >
                                <option value="">-- Please select a role -- </option>
                                <option value="Guide">Guide - Showing people how to get to rooms or spaces</option>
                                <option value="Runner">Runner - Help grab food and other items when needed</option>
                                <option value="Tech Support">Tech Support - Helps with general tech questions that participants might have</option>
                                <option value="Set Up/Tear Down Crew">Set Up/Tear Down Crew - Sets up rooms for events that are happening</option>
                                <option value="Photographer / Videographer">Photographer / Videographer - Helps take photos/videos during the event</option>
                                <option value="Floater">Floater - Help with whatever task needs extra help</option>
                            </select>
                        </>
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

                    <label className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            name="acknowledge_physical_location"
                            onChange={handleChange}
                            required
                        />
                        <span>I acknowledge I will be physically present</span>
                    </label>

                    <button
                        type="submit"
                        className="bg-highlight text-background shadow-md p-4 rounded-lg hover:animate-pulse hover:opacity-90 ease-in-out duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
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