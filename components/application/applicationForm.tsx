'use client';
import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import ApplicationSegment1 from './applicationSegment1';
import ApplicationSegment2 from './applicationSegment2';
import { SubmitButton } from '../forms/submit-button';
import submitPageOne from '@/server/submitPageOne';
import submitPageTwo from '@/server/submitPageTwo';
import { IoMdArrowRoundBack, IoMdArrowRoundForward } from "react-icons/io";

interface ApplicationFormData {
    fullName: string;
    email: string;
    pronouns: string;
    otherPronouns: string;
    gender: string;
    race: string;
    sexuality: string;
    phoneNumber: string;
    country: string;
    city: string;
    province: string;
    levelOfStudy: string;
    graduationYear: number;
    fieldOfStudy: string;
    school: string;
    tmuStudentBool: string;
    tmuStudentID: string;
    accommodationsBool: string;
    accommodationsDescription: string;
    dietaryRestrictions: string;
    otherDietaryRestriction: string;
    githubURL: string;
    linkedinURL: string;
    questionOne: string;
    questionTwo: string;
    resumeUrl: string | null;
}

export default function ApplicationForm() {
    const [formData, setFormData] = useState<ApplicationFormData>({
        fullName: '',
        email: '',
        pronouns: '',
        otherPronouns: '',
        gender: '',
        race: '',
        sexuality: '',
        phoneNumber: '',
        country: '',
        city: '',
        province: '',
        levelOfStudy: '',
        graduationYear: 0,
        fieldOfStudy: '',
        school: '',
        tmuStudentBool: '',
        tmuStudentID: '',
        accommodationsBool: '',
        accommodationsDescription: '',
        dietaryRestrictions: '',
        otherDietaryRestriction: '',
        githubURL: '',
        linkedinURL: '',
        questionOne: '',
        questionTwo: '',
        resumeUrl: null,
    });

    const searchParams = useSearchParams();
    const router = useRouter();
    let page = 0;
    if (!searchParams.has('page') || !['1', '2'].includes(searchParams.get('page')!)) {
        router.push('/dashboard/application?page=1');
    }
    else {
        page = parseInt(searchParams.get('page')!);
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const resumeUrl = URL.createObjectURL(file);
            setFormData({
                ...formData,
                resumeUrl
            });
        }
    };

    return (
        <>
            <h1 className='text-[#2A6C82] text-4xl font-bold'>Application</h1>
            <br />
            <div id="section-viewers" className='flex justify-center gap-2'>
                <button
                    id="section-1"
                    onClick={() => router.push('/dashboard/application?page=1')}
                    className={`rounded-full w-10 h-10 flex justify-center items-center hover:scale-105 ease-in-out duration-300 ${(page === 1) ? 'bg-[#2A6C82] text-background' : 'bg-gray-200 text-[#2a6c82]'}`}
                >
                    <p className='text-xl'>1</p>
                </button>
                <button
                    id="section-2"
                    onClick={() => router.push('/dashboard/application?page=2')}
                    className={`rounded-full w-10 h-10 flex justify-center items-center hover:scale-105 ease-in-out duration-300 ${(page === 2) ? 'bg-[#2A6C82] text-background' : 'bg-gray-200 text-[#2a6c82]'}`}
                >
                    <p className='text-xl'>2</p>
                </button>
            </div>
            <div id='container' className='bg-[#2A6C82] rounded-lg p-8 m-8 pt-16 pb-8'>
                {page === 1 ? (
                    <form className='font-mono'>
                        <ApplicationSegment1 formData={formData} handleInputChange={handleInputChange} />
                        <div className='flex justify-center'>
                            <SubmitButton
                                formAction={submitPageOne}
                                pendingText='Processing...'
                                aria-label="Next to Page 2 of Application Form"
                                className='bg-btn pt-4 pb-4 pr-12 pl-12 rounded-md mt-8 text-background font-bold cursor-pointer hover:bg-btnHover transition ease-in-out duration-300'
                            >
                                <span className='flex flex-row justify-center items-center gap-2'>
                                    Next<IoMdArrowRoundForward />
                                </span>
                            </SubmitButton>
                        </div>
                    </form>
                ) : (
                    <form>
                        <ApplicationSegment2 formData={formData} handleInputChange={handleInputChange} />
                        <div id='resume-field' className='flex flex-col'>
                            <label
                                htmlFor="resume"
                                className="text-base lg:text-lg text-background pb-2"
                            >
                                Upload Your Resume (Optional, PDF Only)
                            </label>
                            <input
                                type="file"
                                id="resume"
                                name="resume"
                                onChange={handleFileChange}
                                accept='application/pdf'
                                className="block w-full text-lg text-background
                                    file:mr-4 file:py-2 file:px-4      
                                    file:rounded-md file:border-0      
                                    file:text-sm file:font-semibold      
                                    file:bg-background file:text-[#2A6C82]      
                                    hover:file:bg-[#1D5162] hover:file:text-gray-200      
                                    file:placeholder:text-background
                                    file:transition file:ease-in-out file:duration-300
                                    hover:file:cursor-pointer
                                    hover:cursor-pointer"
                            />
                        </div >

                        <div className='flex justify-between'>
                            <button
                                type="button"
                                onClick={() => router.push('/dashboard/application?page=1')}
                                aria-label="Back to Page 1 of Application Form"
                                className='bg-btn pt-4 pb-4 pr-12 pl-12 rounded-md mt-8 text-background font-bold cursor-pointer hover:bg-btnHover transition ease-in-out duration-300'>
                                <span className='flex flex-row justify-center items-center gap-2'>
                                    <IoMdArrowRoundBack />Back
                                </span>
                            </button>

                            <SubmitButton
                                formAction={submitPageTwo}
                                aria-label='Submit Application Form'
                                className='bg-btn pt-4 pb-4 pr-12 pl-12 rounded-md mt-8 text-background font-bold cursor-pointer hover:bg-btnHover transition ease-in-out duration-300'
                                pendingText="Submitting application..."
                            >
                                Submit
                            </SubmitButton>
                        </div>
                    </form>
                )}
            </div >
        </>
    );
}
