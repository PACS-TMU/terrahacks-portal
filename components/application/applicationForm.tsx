'use client';
import { useState } from 'react';
import ApplicationSegment1 from './applicationSegment1';
import ApplicationSegment2 from './applicationSegment2';
import { redirect } from 'next/navigation';
import { SubmitButton } from '../forms/submit-button';
import submitApplication from '@/server/submitApplication';
import { IoMdArrowForward, IoMdArrowRoundBack, IoMdArrowRoundForward } from "react-icons/io";



export default function ApplicationForm() {
    const [page, setPage] = useState("1");

    return (
        <>
            <h1 className='text-[#2A6C82] text-4xl font-bold'>Application</h1>
            <br></br>
            <div id="section-viewers" className='flex justify-center gap-2'>
                <div id="section-1" className={`rounded-full w-10 h-10  flex justify-center items-center ${(page === '1') ? 'bg-[#2A6C82] text-white' : 'bg-gray-200 text-[#2a6c82]'}`}>
                    <p className='text-xl'>1</p>
                </div>
                <div id="section-1" className={`rounded-full w-10 h-10  flex justify-center items-center ${(page === '2') ? 'bg-[#2A6C82] text-white' : 'bg-gray-200 text-[#2a6c82]'}`}>
                    <p className='text-xl'>2</p>
                </div>
            </div>
            <div id='container' className='bg-[#2A6C82] rounded-lg p-32 m-8 '>

                <form >
                    {(page === '1') ? (<ApplicationSegment1 />) : (<ApplicationSegment2 />)}
                    {/* Page 2 goes here */}
                </form>

                {(page === '1') ? (
                    // shows next button if page is 1
                    <div className='flex justify-center'>
                        <button
                            onClick={() => setPage('2')}
                            aria-label="Next to Page 2 of Application Form"
                            className='bg-btn pt-4 pb-4 pr-12 pl-12 rounded-md mt-8 text-white font-bold cursor-pointer hover:bg-btnHover transition ease-in-out duration-300'>
                            <span className='flex flex-row justify-center items-center gap-2'> Next<IoMdArrowRoundForward /></span>
                        </button>
                    </div>) : (
                    // shows back and upload button if page is 2
                    <div className='flex justify-between'>
                        <button
                            onClick={() => setPage('1')}
                            aria-label="Back to Page 1 of Application Form"
                            className='bg-btn pt-4 pb-4 pr-12 pl-12 rounded-md mt-8 text-white font-bold cursor-pointer hover:bg-btnHover transition ease-in-out duration-300'>
                            <span className='flex flex-row justify-center items-center gap-2'><IoMdArrowRoundBack />Back</span>

                        </button>

                        <SubmitButton

                            formAction={submitApplication}
                            aria-label='Submit Application Form'
                            className='bg-btn pt-4 pb-4 pr-12 pl-12 rounded-md mt-8 text-white font-bold cursor-pointer hover:bg-btnHover transition ease-in-out duration-300'
                            pendingText="Submitting application..."
                        >Submit</SubmitButton >


                    </div>)}



            </div>

        </>
    );
}