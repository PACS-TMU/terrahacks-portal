'use client';
import { canadianUniversities } from './universities';
import { useState } from 'react';
import Image from 'next/image';
import { canadianCities } from './cities';

type ApplicationSegment1Props = {
    formData: {
        firstName: string,
        lastName: string,
        email: string,
        pronouns: string,
        otherPronouns: string,
        gender: string,
        race: string,
        sexuality: string,
        phoneNumber: string,
        country: string,
        otherCountry: string,
        city: string,
        province: string,
        levelOfStudy: string,
        graduationYear: string,
        fieldOfStudy: string,
        school: string,
        otherSchool: string,
        tmuStudentID: string,
        accommodationsBool: string,
        accommodationsDescription: string,
        dietaryRestrictions: string,
        otherDietaryRestriction: string,
        githubURL: string,
        linkedinURL: string,
    },
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => void;
};

export default function ApplicationSegment1({ formData, handleInputChange }: ApplicationSegment1Props) {
    const {
        firstName,
        lastName,
        email,
        pronouns,
        otherPronouns,
        gender,
        race,
        sexuality,
        phoneNumber,
        country,
        otherCountry,
        city,
        province,
        levelOfStudy,
        graduationYear,
        fieldOfStudy,
        school,
        otherSchool,
        tmuStudentID,
        accommodationsBool,
        accommodationsDescription,
        dietaryRestrictions,
        githubURL,
        linkedinURL,
    } = formData;

    const [image, setImage] = useState(0);
    const images = ['Celina', 'Gregory', 'Dan', 'Sandra']

    return (
        <div className='flex flex-col gap-2 font-medium text-xs md:text-sm lg:text-base 2xl:text-lg relative'>
            <div id='demographic-information' className='grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6'>
                <div id="first-name-field" className='flex flex-col'>
                    <label
                        htmlFor="firstName"
                        className="text-base lg:text-lg text-background pb-2 after:content-['*'] after:ml-0.5 after:text-red-500"
                    >
                        First Name
                    </label>
                    <input
                        id="firstName"
                        className="rounded-md px-4 py-2 bg-background  mb-4 placeholder-gray-400 w-full lg:w-2/3"
                        name="firstName"
                        value={firstName}
                        onChange={handleInputChange}
                        placeholder="Sandra"
                        title="Please enter your first name"
                        autoComplete='given-name'
                        required
                    />
                </div>

                <div id="last-name-field" className='flex flex-col'>
                    <label
                        htmlFor="lastName"
                        className="text-base lg:text-lg text-background pb-2 after:content-['*'] after:ml-0.5 after:text-red-500"
                    >
                        Last Name
                    </label>
                    <input
                        id="lastName"
                        className="rounded-md px-4 py-2 bg-background  mb-4 placeholder-gray-400 w-full lg:w-2/3"
                        name="lastName"
                        value={lastName}
                        onChange={handleInputChange}
                        placeholder="The Mole"
                        title="Please enter your last name"
                        autoComplete='family-name'
                        required
                    />
                </div>

                <div id="email-field" className='flex flex-col'>
                    <label
                        htmlFor="email"
                        className="text-base lg:text-lg text-background pb-2 after:content-['*'] after:ml-0.5 after:text-red-500"
                    >
                        {school === "Toronto Metropolitan (Ryerson) University" ?  'TMU Email' : 'Email'}
                    </label>
                    <input
                        id="email"
                        className="rounded-md px-4 py-2 bg-background mb-4 placeholder-gray-400 w-full lg:w-2/3"
                        name="email"
                        value={email}
                        onChange={handleInputChange}
                        placeholder={school === "Toronto Metropolitan (Ryerson) University" ? "sandra@torontomu.ca" : "sandra@terrhacks.ca"}
                        title={"Please enter your " + (school === "Toronto Metropolitan (Ryerson) University" ? 'TMU email' : 'email')}
                        pattern={school === "Toronto Metropolitan (Ryerson) University" ? "^[a-zA-Z0-9._%+-]+@torontmu\\.ca$" : undefined}
                        type='email'
                        autoComplete='email'
                        required
                    />
                </div>

                <div id="pronouns-field" className='flex flex-col'>
                    <label
                        className="text-base lg:text-lg text-background pb-2 after:content-['*'] after:ml-0.5 after:text-red-500"
                        htmlFor="pronouns-select"
                    >
                        Pronouns
                    </label>
                    <select
                        id="pronouns-select"
                        name="pronouns"
                        defaultValue={pronouns}
                        onChange={handleInputChange}
                        className="rounded-md px-4 py-2 bg-background mb-4 w-full lg:w-2/3"
                        required
                    >
                        <option value="" disabled>-- Select --</option>
                        <option value="She/Her" >She/Her</option>
                        <option value="He/Him">He/Him</option>
                        <option value="They/Them">They/Them</option>
                        <option value="She/They">She/They</option>
                        <option value="He/They">He/They</option>
                        <option value="Other">Other</option>
                        <option value="Prefer not to answer">Prefer not to answer</option>
                    </select>
                    {pronouns === "Other" && (
                        <input
                            id="otherPronouns"
                            className="rounded-md px-4 py-2 bg-background mb-4 placeholder-gray-400 w-full lg:w-1/2"
                            name="otherPronouns"
                            value={otherPronouns}
                            onChange={handleInputChange}
                            placeholder="Please enter your pronouns"
                            required
                        />
                    )}
                </div>

                <div id="gender-field" className='flex flex-col'>
                    <label
                        htmlFor='gender-select'
                        className="text-base lg:text-lg text-background pb-2 after:content-['*'] after:ml-0.5 after:text-red-500"
                    >
                        Gender
                    </label>
                    <select
                        id="gender-select"
                        name="gender"
                        value={gender}
                        onChange={handleInputChange}
                        className="rounded-md px-4 py-2 bg-background mb-4 w-full lg:w-2/3 cursor-pointer"
                        required
                    >
                        <option value="" disabled>-- Select --</option>
                        <option value="Male" >Male</option>
                        <option value="Female">Female</option>
                        <option value="Non-binary">Non-binary</option>
                        <option value="Other">Other</option>
                        <option value="Prefer not to answer">Prefer not to answer</option>
                    </select>
                </div>

                <div id="race-field" className='flex flex-col'>
                    <label
                        htmlFor="race"
                        className="text-base lg:text-lg text-background pb-2 after:content-['*'] after:ml-0.5 after:text-red-500"
                    >
                        Race/Ethnicity
                    </label>
                    <select
                        id="race"
                        name="race"
                        value={race}
                        onChange={handleInputChange}
                        className="rounded-md px-4 py-2 bg-background mb-4 w-full lg:w-2/3 cursor-pointer"
                        required
                    >
                        <option value="" disabled>-- Select --</option>
                        <option value="Black or African">Black / African</option>
                        <option value="Caucasian">Caucasian</option>
                        <option value="East Asian">East Asian</option>
                        <option value="Guamanian or Chamorro">Guamanian / Chamorro</option>
                        <option value="Hispanic / Latino / Spanish Origin">Hispanic / Latino / Spanish Origin</option>
                        <option value="Middle Eastern">Middle Eastern</option>
                        <option value="Native American or Alaskan Native">Native American or Alaskan Native</option>
                        <option value="Native Hawaiian">Native Hawaiian</option>
                        <option value="Samoan">Samoan</option>
                        <option value="South Asian">South Asian</option>
                        <option value="Southeast Asian">Southeast Asian</option>
                        <option value="Other Asian">Other Asian</option>
                        <option value="Other Pacific Islander">Other Pacific Islander</option>
                        <option value="Other">Other</option>
                        <option value="Prefer not to answer">Prefer not to answer</option>
                    </select>
                </div>

                <div id="sexuality-field" className='flex flex-col'>
                    <label
                        htmlFor='sexuality'
                        className="text-base lg:text-lg text-background pb-2 after:content-['*'] after:ml-0.5 after:text-red-500"
                    >
                        Do you consider yourself to be any of the following?
                    </label>
                    <select
                        id="sexuality"
                        name="sexuality"
                        value={sexuality}
                        onChange={handleInputChange}
                        className="rounded-md px-4 py-2 bg-background mb-4 w-full lg:w-2/3"
                        required
                    >
                        <option value="" disabled>-- Select --</option>
                        <option value="Heterosexual or Straight" >Heterosexual or Straight</option>
                        <option value="Gay or lesbian">Gay or lesbian</option>
                        <option value="Bisexual">Bisexual</option>
                        <option value="Other">Other</option>
                        <option value="Prefer not to answer">Prefer not to answer</option>
                    </select>
                </div>

                <div id="phone-number-field" className='flex flex-col'>
                    <label
                        htmlFor="phoneNumber"
                        className="text-base lg:text-lg text-background pb-2 after:content-['*'] after:ml-0.5 after:text-red-500"
                    >
                        Phone number
                    </label>
                    <input
                        id="phoneNumber"
                        className="rounded-md px-4 py-2 bg-background  mb-4 placeholder-gray-400 w-full lg:w-2/3"
                        name="phoneNumber"
                        value={phoneNumber}
                        onChange={handleInputChange}
                        placeholder="(123) 456-7890"
                        title="Phone number should be in the format (123) 456-7890"
                        required
                    />
                </div>

                <div id="country-field" className='flex flex-col'>
                    <label
                        htmlFor="country"
                        className="text-base lg:text-lg text-background pb-2 after:content-['*'] after:ml-0.5 after:text-red-500"
                    >
                        Country
                    </label>
                    <select
                        id="country"
                        name="country"
                        value={country}
                        onChange={handleInputChange}
                        className="rounded-md px-4 py-2 bg-background mb-4 w-full lg:w-2/3"
                        autoComplete='country-name'
                        required
                    >
                        <option value="" disabled>-- Select --</option>
                        <option value="Canada">Canada</option>
                        <option value="United States">United States</option>
                        <option value="Other">Other</option>
                    </select>
                    {country === "Other" && (
                        <input
                            id="otherCountry"
                            className="rounded-md px-4 py-2 bg-background  mb-4 placeholder-gray-400 w-full lg:w-2/3"
                            name="otherCountry"
                            value={otherCountry}
                            onChange={handleInputChange}
                            placeholder="Trinidad and Tobago"
                            autoComplete="off"
                            required
                        />
                    )}
                </div>

                <div id='provinceState-field' className='flex flex-col'>
                    <label
                        htmlFor="province"
                        className="text-base lg:text-lg text-background pb-2 after:content-['*'] after:ml-0.5 after:text-red-500"
                    >
                        Province
                    </label>
                    {(country === "Canada") ? (
                    <select
                        id="province"
                        name="province"
                        value={province}
                        onChange={handleInputChange} // Corrected the set function
                        className="rounded-md px-4 py-2 bg-background mb-4 w-full lg:w-2/3"
                        required
                    >
                        <option value="" disabled>-- Select --</option>
                        <option value="Alberta">Alberta</option>
                        <option value="British Columbia">British Columbia</option>
                        <option value="Manitoba">Manitoba</option>
                        <option value="New Brunswick">New Brunswick</option>
                        <option value="Newfoundland and Labrador">Newfoundland and Labrador</option>
                        <option value="Northwest Territories">Northwest Territories</option>
                        <option value="Nova Scotia">Nova Scotia</option>
                        <option value="Nunavut">Nunavut</option>
                        <option value="Ontario">Ontario</option>
                        <option value="Prince Edward Island">Prince Edward Island</option>
                        <option value="Quebec">Quebec</option>
                        <option value="Saskatchewan">Saskatchewan</option>
                        <option value="Yukon">Yukon</option>
                    </select>
                    ) : (
                        <input
                            id="province"
                            className="rounded-md px-4 py-2 bg-background mb-4 text-gray-400 w-full lg:w-2/3"
                            name="province"
                            value={"Not in Canada"}
                            onChange={handleInputChange}
                            placeholder="Not in Canada"
                            disabled
                        />
                    )}
                </div>

                <div id='city-field' className='flex flex-col'>
                    <label
                        htmlFor="city"
                        className="text-base lg:text-lg text-background pb-2 after:content-['*'] after:ml-0.5 after:text-red-500"
                    >
                        City
                    </label>
                    {(country === "Canada") ? (
                        <select
                            id="city"
                            name="city"
                            value={city}
                            onChange={handleInputChange}
                            className="rounded-md px-4 py-2 bg-background mb-4 w-full lg:w-2/3"
                            required
                        >
                            <option value="" disabled>-- Select --</option>
                            {canadianCities.map((city) => (
                                <option key={city} value={city}>{city}</option>
                            ))}
                            <option value="Other">Other</option>
                        </select>
                    ) : (
                        <input
                            id="city"
                            className="rounded-md px-4 py-2 bg-background  mb-4 placeholder-gray-400 w-full lg:w-2/3"
                            name="city"
                            value={city}
                            onChange={handleInputChange}
                            placeholder="Toronto"
                            required
                        />
                    )}
                </div>

                <div id='level-field' className='flex flex-col'>
                    <label
                        htmlFor="levelOfStudy"
                        className="text-base lg:text-lg text-background pb-2 after:content-['*'] after:ml-0.5 after:text-red-500"
                    >
                        Level of study (as of Fall 2024)
                    </label>
                    <select
                        id="levelOfStudy"
                        name="levelOfStudy"
                        value={levelOfStudy}
                        onChange={handleInputChange}
                        className="rounded-md px-4 py-2 bg-background mb-4 w-full lg:w-2/3 cursor-pointer"
                        required
                    >
                        <option value="" disabled>-- Select --</option>
                        <option value="1st Year">1st Year</option>
                        <option value="2nd Year">2nd Year</option>
                        <option value="3rd Year">3rd Year</option>
                        <option value="4th Year">4th Year</option>
                        <option value="5th+ Year">5th+ Year</option>
                    </select>
                </div>

                <div id="graduation-field" className='flex flex-col'>
                    <label
                        htmlFor="expectedGraduation"
                        className="text-base lg:text-lg text-background pb-2 after:content-['*'] after:ml-0.5 after:text-red-500"
                    >
                        Expected graduation year
                    </label>
                    <select
                        id="expectedGraduation"
                        name="graduationYear"
                        value={graduationYear}
                        onChange={handleInputChange}
                        className="rounded-md px-4 py-2 bg-background mb-4 w-full lg:w-2/3 cursor-pointer"
                        required
                    >
                        <option value="" disabled>-- Select --</option>
                        <option value="2024">2024</option>
                        <option value="2025">2025</option>
                        <option value="2026">2026</option>
                        <option value="2027">2027</option>
                        <option value="2028">2028</option>
                        <option value="2029">2029</option>
                        <option value="2030 or later">2030 or later</option>
                    </select>
                </div>
            </div>

            <div className='grid grid-cols-1 gap-4 mt-4 lg:gap-6 lg:mt-6'>
                <div id='study-field' className='flex flex-col'>
                    <label
                        htmlFor="fieldOfStudy"
                        className="text-base lg:text-lg text-background pb-2 after:content-['*'] after:ml-0.5 after:text-red-500">
                        Field of study
                    </label>
                    <select
                        id="fieldOfStudy"
                        name="fieldOfStudy"
                        onChange={handleInputChange}
                        value={fieldOfStudy}
                        className="rounded-md px-4 py-2 bg-background mb-4 w-full lg:w-1/2 cursor-pointer"
                        required
                    >
                        <option value="" disabled>-- Select --</option>
                        <option value="Computer science">Computer Science</option>
                        <option value="Mathematics or statistics">Mathematics or statistics</option>
                        <option value="A natural science (such as biology, chemistry, physics, etc.) ">A natural science (such as biology, chemistry, physics, etc.) </option>
                        <option value="Computer engineering or software engineering" >Computer engineering or software engineering </option>
                        <option value="Another engineering discipline (such as civil, electrical, mechanical, etc.) ">Another engineering discipline (such as civil, electrical, mechanical, etc.) </option>
                        <option value="Information systems, information technology, or system administration">Information systems, information technology, or system administration</option>
                        <option value="Web development or web design">Web development or web design</option>
                        <option value="Business discipline (such as accounting, finance, marketing, etc.)">Business discipline (such as accounting, finance, marketing, etc.) </option>
                        <option value="Humanities discipline (such as literature, history, philosophy, etc.)"> Humanities discipline (such as literature, history, philosophy, etc.)  </option>
                        <option value="Social science (such as anthropology, psychology, political science, etc.)">Social science (such as anthropology, psychology, political science, etc.)</option>
                        <option value="Fine arts or performing arts (such as graphic design, music, studio art, etc.)">Fine arts or performing arts (such as graphic design, music, studio art, etc.)</option>
                        <option value="Health science (such as nursing, pharmacy, radiology, etc.)">Health science (such as nursing, pharmacy, radiology, etc.)</option>
                        <option value="Other">Other</option>
                        <option value="Undecided / No Declared Major">Undecided / No Declared Major</option>
                        <option value="My school does not offer majors / primary areas of study">My school does not offer majors / primary areas of study</option>
                        <option value="Prefer not to answer">Prefer not to answer</option>
                    </select>
                </div>

                <div id='school-field' className='flex flex-col'>
                    <label
                        htmlFor="school"
                        className="text-base lg:text-lg text-background pb-2 after:content-['*'] after:ml-0.5 after:text-red-500"
                    >
                        School
                    </label>
                    <select
                        id="school"
                        className="rounded-md px-4 py-2 bg-background mb-4 placeholder-gray-400 w-full lg:w-1/2 cursor-pointer"
                        name="school"
                        value={school}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="" disabled>-- Select --</option>
                        {canadianUniversities.map((uni) => (
                            <option key={uni} value={uni}>{uni}</option>
                        ))}
                        <option value="Other">Other</option>
                    </select>
                    {(school === "Other") && (
                        <input
                            id="otherSchool"
                            className="rounded-md px-4 py-2 bg-background  mb-4 placeholder-gray-400 w-full lg:w-1/2"
                            name="otherSchool"
                            value={otherSchool}
                            onChange={handleInputChange}
                            placeholder="Please enter your school"
                            required
                        />
                    )}
                    {school === "Toronto Metropolitan (Ryerson) University" && (
                        <input
                            id="tmuStudentID"
                            className="rounded-md px-4 py-2 bg-background  mb-4 placeholder-gray-400 w-full lg:w-1/2"
                            name="tmuStudentID"
                            value={tmuStudentID}
                            onChange={handleInputChange}
                            placeholder="Please enter your TMU student ID"
                            required
                        />
                    )}
                </div>

                <div id='accommodations-field' className='flex flex-col'>
                    <label
                        htmlFor="accommodationsBool"
                        className="text-base lg:text-lg text-background pb-2 after:content-['*'] after:ml-0.5 after:text-red-500 w-full lg:w-1/2"
                    >
                        Will you be needing any accommodations?
                    </label>
                    <select
                        id="accommodationsBool"
                        name="accommodationsBool"
                        value={accommodationsBool}
                        onChange={handleInputChange}
                        className="rounded-md px-4 py-2 bg-background mb-4 w-full lg:w-1/2 cursor-pointer"
                        required
                    >
                        <option value="" disabled>-- Select --</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                    {accommodationsBool === 'Yes' && (
                        <input
                            id="accommodationsDescription"
                            className="rounded-md px-4 py-2 bg-background  mb-4 placeholder-gray-400 w-full lg:w-1/2"
                            name="accommodationsDescription"
                            value={accommodationsDescription}
                            onChange={handleInputChange}
                            placeholder="Please describe accommodations needed"
                            required
                        />
                    )}
                </div>

                <div id='dietary-field' className='flex flex-col'>
                    <label
                        htmlFor="dietaryRestrictions"
                        className="text-base lg:text-lg text-background pb-2 after:content-['*'] after:ml-0.5 after:text-red-500"
                    >
                        Dietary Restrictions
                    </label>
                    <select
                        id="dietaryRestrictions"
                        name="dietaryRestrictions"
                        value={dietaryRestrictions}
                        onChange={handleInputChange}
                        className="rounded-md px-4 py-2 bg-background mb-4 w-full lg:w-1/2 cursor-pointer"
                        required
                    >
                        <option value="" disabled>-- Select --</option>
                        <option value="Vegetarian">Vegetarian</option>
                        <option value="Vegan">Vegan</option>
                        <option value="Celiac Disease">Celiac Disease</option>
                        <option value="Allergies">Allergies</option>
                        <option value="Kosher">Kosher</option>
                        <option value="Halal">Halal</option>
                        <option value="Other">Other</option>
                        <option value="N/A">N/A</option>
                    </select>
                    {dietaryRestrictions === 'Other' && (
                        <input
                            id="otherDietaryRestriction"
                            className="rounded-md px-4 py-2 bg-background  mb-4 placeholder-gray-400 w-full lg:w-1/2"
                            name="otherDietaryRestriction"
                            value={accommodationsDescription}
                            onChange={handleInputChange}
                            placeholder="Please describe dietary restrictions"
                            required
                        />
                    )}
                </div>

                <div id='github-field' className='flex flex-col'>
                    <label
                        htmlFor="githubURL"
                        className="text-base lg:text-lg text-background pb-2"
                    >
                        Github URL (Optional)
                    </label>
                    <input
                        id="githubURL"
                        name="githubURL"
                        value={githubURL}
                        onChange={handleInputChange}
                        className="rounded-md px-4 py-2 bg-background  mb-4 placeholder-gray-400 w-full lg:w-1/2"
                        placeholder="https://github.com/username"
                        pattern="https?://(www\.)?github\.com/[A-Za-z0-9_-]+/?"
                        title="Please enter a valid GitHub URL (e.g., https://www.github.com/username)"
                    />
                </div>

                <div id='linkedin-field' className='flex flex-col'>
                    <label
                        htmlFor="linkedinURL"
                        className="text-base lg:text-lg text-background pb-2"
                    >
                        Linkedin URL (Optional)
                    </label>
                    <input
                        id="linkedinURL"
                        className="rounded-md px-4 py-2 bg-background  mb-4 placeholder-gray-400 w-full lg:w-1/2"
                        name="linkedinURL"
                        value={linkedinURL}
                        onChange={handleInputChange}
                        placeholder="https://linkedin.com/in/username"
                        pattern="https?://(www\.)?linkedin\.com/in/[A-Za-z0-9_-]+/?"
                        title="Please enter a valid LinkedIn URL (e.g., https://www.linkedin.com/in/username)"
                    />
                </div>
            </div>
            <button
                onClick={() => setImage((image + 1) % 4)}
                className='hidden xl:inline absolute z-20 right-[5%] bottom-0 w-1/3'
                type='button'
            >
                <p className='text-background text-2xl'>Have you met our mascots?</p>
                <p className='text-background text-lg mt-4'>Click to see more!</p>
                <Image
                    src={`/assets/moles/${images[image]}.png`}
                    alt={`Mole mascot - ${images[image]}`}
                    width={1000}
                    height={1000}
                    className=''
                />
                <p className='text-background text-3xl'>{images[image]}</p>
            </button>
        </div>
    )
}
