import React from 'react'

const ApplicationSegment2 = () => {
    return (
        <div className='flex flex-col gap-2'>

            <div id='questionOne' className='flex flex-col'>
                <label className="text-md text-white pb-2 after:content-['*'] after:ml-0.5 after:text-red-500" htmlFor="questionOne">
                    Why do you want to participate in TerraHacks? (3-5 sentences)
                </label>
                <textarea
                    id="questionOne"
                    className="rounded-md px-4 py-2 bg-white  mb-4 placeholder-grey-500"
                    name="questionOne"
                    placeholder="I wish to participate in TerraHacks because..."
                    required
                />
            </div>

            <div id='questionTwo' className='flex flex-col'>
                <label className="text-md text-white pb-2 after:content-['*'] after:ml-0.5 after:text-red-500" htmlFor="questionOne">
                    Describe any relevant experience you have that would assist you with TerraHacks. (3-5 sentences)


                </label>
                <textarea
                    id="questionTwo"
                    className="rounded-md px-4 py-2 bg-white  mb-4 placeholder-grey-500"
                    name="questionTwo"
                    placeholder="I have experience in..."
                    required
                />
            </div>


        </div>
    )
}

export default ApplicationSegment2