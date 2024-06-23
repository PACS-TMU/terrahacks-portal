type ApplicationSegment2Props = {
    formData: {
        questionOne: string;
        questionTwo: string;
    },
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLTextAreaElement> ) => void;
};

export default function ApplicationSegment2({ formData, handleInputChange } : ApplicationSegment2Props) {
    const { questionOne, questionTwo } = formData;

    return (
        <div className='flex flex-col gap-2'>
            <div id='questionOne' className='flex flex-col'>
                <label className="text-base lg:text-lg text-background pb-2 after:content-['*'] after:ml-0.5 after:text-red-500" htmlFor="questionOneText">
                    Why do you want to participate in TerraHacks? (3-5 sentences)
                </label>
                <textarea
                    id="questionOneText"
                    className="rounded-md px-4 py-2 bg-background min-h-[20vh] mb-4 placeholder-grey-500"
                    name="questionOne"
                    onChange={handleInputChange}
                    placeholder="I wish to participate in TerraHacks because..."
                    required
                />
            </div>

            <div id='questionTwo' className='flex flex-col'>
                <label className="text-base lg:text-lg text-background pb-2 after:content-['*'] after:ml-0.5 after:text-red-500" htmlFor="questionTwoText">
                    Describe any relevant experience you have that would assist you with TerraHacks. (3-5 sentences)
                </label>
                <textarea
                    id="questionTwoText"
                    className="rounded-md px-4 py-2 bg-background min-h-[20vh] mb-4 placeholder-grey-500"
                    name="questionTwo"
                    onChange={handleInputChange}
                    placeholder="I have experience in..."
                    required
                />
            </div>
        </div>
    )
}