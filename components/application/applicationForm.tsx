'use client';
import { useEffect, useState } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import ApplicationSegment1 from './applicationSegment1';
import ApplicationSegment2 from './applicationSegment2';
import { SubmitButton } from '../forms/submit-button';
import submitPageOne from '@/server/submitPageOne';
import submitPageTwo from '@/server/submitPageTwo';
import { IoMdArrowRoundBack, IoMdArrowRoundForward } from "react-icons/io";

interface ApplicationFormData {
    firstName: string;
    lastName: string;
    email: string;
    pronouns: string;
    otherPronouns: string;
    gender: string;
    race: string;
    sexuality: string;
    phoneNumber: string;
    country: string;
    otherCountry: string;
    city: string;
    province: string;
    levelOfStudy: string;
    graduationYear: string;
    fieldOfStudy: string;
    school: string;
    otherSchool: string;
    tmuStudentID: string;
    tmuEmail: string;
    accommodationsBool: string;
    accommodationsDescription: string;
    dietaryRestrictions: string;
    otherDietaryRestriction: string;
    githubURL: string;
    linkedinURL: string;
    questionOne: string;
    questionTwo: string;
    resume: File | null;
}

export default function ApplicationForm() {
    const unloadRouter = useRouter();
    const pathname = usePathname();
    const [isNavigating, setIsNavigating] = useState(false);

    useEffect(() => {
        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
            if (!isNavigating) {
                event.preventDefault();
                event.returnValue = 'Are you sure you want to exit? You will lose your progress if you leave this page.';
            }
        };

        const handleRouteChange = (url: string) => {
            const currentPath = new URL(pathname, window.location.origin).pathname;
            const newPath = new URL(url, window.location.origin).pathname;
            
            if (currentPath === '/dashboard/application' && newPath === '/dashboard/application') {
                return true;
            }
            
            if (!window.confirm('Are you sure you want to navigate away? You will lose your progress if you leave this page.')) {
                setIsNavigating(false);
                return false;
            }

            setIsNavigating(true);
            return true;
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        const originalPush = unloadRouter.push;
        unloadRouter.push = (...args) => {
            if (handleRouteChange(args[0])) {
                return originalPush(...args);
            }
            return Promise.resolve(false);
        };

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
            unloadRouter.push = originalPush; // Restore original push method
        };
    }, [unloadRouter, pathname, isNavigating]);


    const [formData, setFormData] = useState<ApplicationFormData>({
        firstName: '',
        lastName: '',
        email: '',
        pronouns: '',
        otherPronouns: '',
        gender: '',
        race: '',
        sexuality: '',
        phoneNumber: '',
        country: '',
        otherCountry: '',
        city: '',
        province: '',
        levelOfStudy: '',
        graduationYear: '',
        fieldOfStudy: '',
        school: '',
        otherSchool: '',
        tmuStudentID: '',
        tmuEmail: '',
        accommodationsBool: '',
        accommodationsDescription: '',
        dietaryRestrictions: '',
        otherDietaryRestriction: '',
        githubURL: '',
        linkedinURL: '',
        questionOne: '',
        questionTwo: '',
        resume: null,
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
        if (file?.type !== 'application/pdf') {
            alert('Please upload a PDF file.');
            setFormData({
                ...formData,
                resume: null
            });
            e.target.value = '';
            return;
        }
        if (file) {
            setFormData({
                ...formData,
                resume: file
            });
        }
    };

    return (
        <>
            <div className="lg:sticky z-30 top-0 shrink-0 px-6 md:py-8 py-2 border-b-2 border-b-gray-300 bg-[#f7fafc]">
                <h1 className="text-xl md:text-4xl text-gray-800 font-bold font-sans">My Application</h1>
                <p className="md:text-xl text-gray-400 md:mt-4 font-sans whitespace-pre-line">Welcome to your TerraHacks 2024 application!</p>
                <p className="text-gray-800 mt-2">Having trouble? Please contact us at through {" "}
                    <a
                        aria-label="Send us an email"
                        href="mailto:contact@terrahacks.ca"
                        target="_blank"
                        rel="nooppener noreferrer"
                        className="text-sky-600 font-bold underline hover:text-sky-400 duration-300 ease-in-out"
                    >
                        Email
                    </a>
                    {" "} or get help in our support channels on {" "}
                    <a
                        aria-label="Join our Discord server"
                        href="https://discord.gg/982AkBQea7"
                        target="_blank"
                        rel="nooppener noreferrer"
                        className="text-sky-600 font-bold underline hover:text-sky-400 duration-300 ease-in-out"
                    >
                        Discord
                    </a>.
                </p>
            </div>
            <div id="section-viewers" className='flex justify-center gap-2 mt-4 lg:mt-6'>
                <button
                    id="section-1"
                    onClick={() => router.push('/dashboard/application?page=1')}
                    className={`rounded-full w-10 h-10 flex justify-center items-center hover:scale-105 ease-in-out duration-300 ${(page === 1) ? 'bg-[#2A6C82] text-background' : 'bg-gray-200 text-[#2a6c82]'}`}
                >
                    <p className='text-xl'>1</p>
                </button>
                <SubmitButton
                    id="section-2"
                    form='section-one'
                    formAction={submitPageOne}
                    className={`rounded-full w-10 h-10 flex justify-center items-center hover:scale-105 ease-in-out duration-300 ${(page === 2) ? 'bg-[#2A6C82] text-background' : 'bg-gray-200 text-[#2a6c82]'}`}
                >
                    <p className='text-xl'>2</p>
                </SubmitButton>
            </div>
            <div id='container' className='bg-[#2A6C82] rounded-lg p-8 m-8 pt-16 pb-8'>
                <h3 className='text-background font-semibold lg:text-lg xl:text-xl 2xl:text-2xl pb-2'>IMPORTANT: If you leave this page, you will lose your progress.</h3>
                <p className='text-background text-sm lg:text-base 2xl:text-lg pb-4'>Don't worry, your progress is saved between pages!</p>
                {page === 1 ? (
                    <form className='font-mono' id='section-one'>
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
                                className="text-base lg:text-lg text-background pb-2 mt-6"
                            >
                                Upload Your Resume (Optional, PDF Only)
                            </label>
                            <input
                                type="file"
                                id="resume"
                                name="resume"
                                onChange={handleFileChange}
                                accept='application/pdf'
                                className="w-fit lg:text-lg text-background
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

                        <div className='flex flex-col lg:flex-row lg:justify-between'>
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
            </div>
        </>
    );
}
