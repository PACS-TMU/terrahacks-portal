import { createClient } from "@/utils/supabase/client";
import { useState, useEffect } from "react";
import ConsentCheckbox from "@/components/dashboard/application/consentCheckbox";

type ApplicationSegment2Props = {
    formData: {
        questionOne: string;
        questionTwo: string;
        checkbox1: boolean;
        checkbox2: boolean;
        checkbox3: boolean;
        checkbox4: boolean;
    };
    handleInputChange: (
        e:
            | React.ChangeEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLSelectElement>
            | React.ChangeEvent<HTMLTextAreaElement>
    ) => void;
};

interface Question {
    question_id: number;
    question: string;
}

export default function ApplicationSegment2({
    formData,
    handleInputChange,
}: ApplicationSegment2Props) {
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

    const {
        questionOne,
        questionTwo,
        checkbox1,
        checkbox2,
        checkbox3,
        checkbox4,
    } = formData;

    return (
        <div className="flex flex-col gap-6 font-medium">
            {/* Question 1 */}
            <div id="questionOne" className="flex flex-col">
                <label
                    htmlFor="questionOneText"
                    className="text-base lg:text-lg text-background pb-2 after:content-['*'] after:ml-0.5 after:text-red-500"
                >
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

            {/* Question 2 */}
            <div id="questionTwo" className="flex flex-col">
                <label
                    htmlFor="questionTwoText"
                    className="text-base lg:text-lg text-background pb-2 after:content-['*'] after:ml-0.5 after:text-red-500"
                >
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

            {/* Checkboxes */}
            <div id="checkboxes" className="flex flex-col">
                <label className="text-base lg:text-lg text-background pb-2 after:content-['*'] after:ml-0.5 after:text-red-500">
                    Please confirm all of the following:
                </label>

                <ConsentCheckbox
                    name="checkbox1"
                    checked={checkbox1}
                    onChange={handleInputChange}
                    required
                >
                    I have read and agree to the{" "}
                    <a
                        className="underline"
                        href="https://github.com/MLH/mlh-policies/blob/main/code-of-conduct.md"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        MLH Code of Conduct
                    </a>
                    .
                </ConsentCheckbox>

                <ConsentCheckbox
                    name="checkbox2"
                    checked={checkbox2}
                    onChange={handleInputChange}
                    required
                >
                    I authorize you to share my application/registration information with
                    Major League Hacking for event administration, ranking, and MLH
                    administration in-line with the{" "}
                    <a
                        className="underline"
                        href="https://github.com/MLH/mlh-policies/blob/main/privacy-policy.md"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        MLH Privacy Policy
                    </a>
                    . I further agree to the{" "}
                    <a
                        className="underline"
                        href="https://github.com/MLH/mlh-policies/blob/main/contest-terms.md"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        MLH Contest Terms
                    </a>{" "}
                    and{" "}
                    <a
                        className="underline"
                        href="https://github.com/MLH/mlh-policies/blob/main/privacy-policy.md"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Privacy Policy
                    </a>
                    .
                </ConsentCheckbox>

                <ConsentCheckbox
                    name="checkbox3"
                    checked={checkbox3}
                    onChange={handleInputChange}
                >
                    (Optional) I authorize MLH to send me occasional emails about relevant
                    events, career opportunities, and community announcements.
                </ConsentCheckbox>

                <ConsentCheckbox
                    name="checkbox4"
                    checked={checkbox4}
                    onChange={handleInputChange}
                >
                    (Optional) I consent to share my email address, name, and other
                    information (such as resume and LinkedIn profile) with event sponsors and partners after the event.
                </ConsentCheckbox>
            </div>
        </div>
    );
}
