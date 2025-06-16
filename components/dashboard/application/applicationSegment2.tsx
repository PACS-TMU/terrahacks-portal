import { createClient } from "@/utils/supabase/client";
import { useState, useEffect } from "react";


type ApplicationSegment2Props = {
    formData: {
        questionOne: string;
        questionTwo: string;
        checkbox1: boolean;
        checkbox2: boolean;
        checkbox3: boolean;
        checkbox4: boolean;
    },
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLTextAreaElement> ) => void;
};

interface Question {
    question_id: number;
    question: string;
}

export default function ApplicationSegment2({ formData, handleInputChange } : ApplicationSegment2Props) {
    const [questions, setQuestions] = useState<Question[]>([]);
    useEffect(() => {
        const fetchQuestions = async () => {
            const supabase = createClient();
            const { data, error } = await supabase.from("questions").select();

            if (error) {
                console.error("Error fetching questions: ", error);
            } else {
                setQuestions(data as Question[]);
            }
        };

        fetchQuestions();
    }, []);

    const { questionOne, questionTwo, checkbox1, checkbox2, checkbox3, checkbox4 } = formData;

    // Helper to check if all checkboxes are checked (for required validation)
    const allChecked = checkbox1 && checkbox2;

    return (
        <div className='flex flex-col gap-6 font-medium'>
            <div id='questionOne' className='flex flex-col'>
                <label className="text-base lg:text-lg text-background pb-2 after:content-['*'] after:ml-0.5 after:text-red-500" htmlFor="questionOneText">
                    {/* Why do you want to participate in TerraHacks? (3-5 sentences) */}
                    {questions[0]?.question}
                </label>
                <textarea
                    id="questionOneText"
                    className="rounded-md px-4 py-2 bg-background min-h-[20vh] mb-4 placeholder-gray-400"
                    name="questionOne"
                    value={questionOne}
                    onChange={handleInputChange}
                    placeholder="I wish to participate in TerraHacks because..."
                    required
                />
            </div>

            <div id='questionTwo' className='flex flex-col'>
                <label className="text-base lg:text-lg text-background pb-2 after:content-['*'] after:ml-0.5 after:text-red-500" htmlFor="questionTwoText">
                    {/* Describe any relevant experience you have that would assist you with TerraHacks. (3-5 sentences) */}
                    {questions[1]?.question}
                </label>
                <textarea
                    id="questionTwoText"
                    className="rounded-md px-4 py-2 bg-background min-h-[20vh] mb-4 placeholder-gray-400"
                    name="questionTwo"
                    value={questionTwo}
                    onChange={handleInputChange}
                    placeholder="I have experience in..."
                    required
                />
            </div>

            <div id='checkboxes' className='flex flex-col'>
                <label className="text-base lg:text-lg text-background pb-2 after:content-['*'] after:ml-0.5 after:text-red-500">
                    Please confirm all of the following:
                </label>
                <label className="flex items-center gap-2 mb-2 text-white">
                    <input
                        type="checkbox"
                        name="checkbox1"
                        checked={!!checkbox1}
                        onChange={handleInputChange}
                        required
                        className="accent-[#2a6c82] w-5 h-5"
                    />
                   I have read and agree to the <a className="underline" href="https://github.com/MLH/mlh-policies/blob/main/code-of-conduct.md" target="_blank" rel="noopener noreferrer">MLH Code of Conduct</a>.
                </label>
               <label className="flex items-start gap-2 mb-2 text-white">
                    <input
                        type="checkbox"
                        name="checkbox2"
                        checked={!!checkbox2}
                        onChange={handleInputChange}
                        required
                        className="accent-[#2a6c82] w-5 h-5 mt-1"
                    />
                    <span>
                        I authorize you to share my application/registration information with Major League Hacking for event administration, ranking, and MLH administration in-line with the&nbsp;
                        <a href="https://github.com/MLH/mlh-policies/blob/main/privacy-policy.md" target="_blank" rel="noopener noreferrer" className="underline">MLH Privacy Policy</a>.&nbsp;
                        I further agree to the terms of both the&nbsp;
                        <a href="https://github.com/MLH/mlh-policies/blob/main/contest-terms.md" target="_blank" rel="noopener noreferrer" className="underline">MLH Contest Terms and Conditions</a>
                        &nbsp;and the&nbsp;
                        <a href="https://github.com/MLH/mlh-policies/blob/main/privacy-policy.md" target="_blank" rel="noopener noreferrer" className="underline">MLH Privacy Policy</a>.
                    </span>
                </label>
                <label className="flex items-center gap-2 mb-2 text-white">
                    <input
                        type="checkbox"
                        name="checkbox3"
                        checked={!!checkbox3}
                        onChange={handleInputChange}
                   
                        className="accent-[#2a6c82] w-5 h-5"
                    />
                    (Optional) I authorize MLH to send me occasional emails about relevant events, career opportunities, and community announcements
                </label>
                <label className="flex items-center gap-2 mb-2 text-white">
                    <input
                        type="checkbox"
                        name="checkbox4"
                        checked={!!checkbox4}
                        onChange={handleInputChange}
                     
                        className="accent-[#2a6c82] w-5 h-5"
                    />
                    (Optional) I consent to share my email address, name, and other information with event sponsors and partners after the event
                </label>
            </div>
        </div>
    )
}