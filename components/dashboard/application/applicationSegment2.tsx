import { createClient } from "@/utils/supabase/client";
import { useState, useEffect } from "react";

type ApplicationSegment2Props = {
    formData: {
        questionOne: string;
        questionTwo: string;
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

    const { questionOne, questionTwo } = formData;

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
        </div>
    )
}