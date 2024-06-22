'use client';
import React, { useState } from 'react'

const ApplicationSegment1 = () => {
    const [pronouns, setPronouns] = useState('');
    const [gender, setGender] = useState('');
    const [race, setRace] = useState('');
    const [sexuality, setSexuality] = useState('');
    const [fieldOfStudy, setFieldOfStudy] = useState('');
    const [school, setSchool] = useState('');
    const [tmuStudentBool, setTmuStudentBool] = useState('');
    const [accommodationsBool, setAccommodationsBool] = useState('');

    return (
        <div className='flex flex-col gap-2'>

            <div id="pronouns-field" className='flex flex-col'>
                <label
                    className="text-md text-white pb-2 after:content-['*'] after:ml-0.5 after:text-red-500"
                    htmlFor="pronouns">
                    Pronouns
                </label>
                <select id="pronouns-select" name="pronouncs"
                    onChange={(e) => { setPronouns(e.target.value) }}
                    className="rounded-md px-4 py-2 bg-white  mb-4 w-1/2" required>
                    <option value="" selected disabled hidden >Select</option>
                    <option value="Man" >She/Her</option>
                    <option value="Woman">He/Him</option>
                    <option value="Nonbinary">They/Them</option>
                    <option value="She/They">She/They</option>
                    <option value="He/They">He/They</option>
                    <option value="Other">Other</option>
                    <option value="Prefer not to answer">Prefer not to answer</option>
                </select>
                {pronouns === 'Other' && (
                    <input
                        id="otherPronouns"
                        className="rounded-md px-4 py-2 bg-white  mb-4 placeholder-grey-500 w-1/2"
                        name="otherPronouns"
                        placeholder="If other, please specify"
                        required
                    />)}
            </div>

            <div id="gender-field" className='flex flex-col'>
                <label
                    htmlFor='gender'
                    className="text-md text-white pb-2 after:content-['*'] after:ml-0.5 after:text-red-500">
                    Gender
                </label>
                <select
                    id="gender-select" name="gender"
                    onChange={(e) => { setGender(e.target.value) }}
                    className="rounded-md px-4 py-2 bg-white  mb-4 w-1/2" required>
                    <option value="" selected disabled hidden >Select</option>
                    <option value="Man" >Male</option>
                    <option value="Woman">Female</option>
                    <option value="Nonbinary">Non-binary</option>
                    <option value="Other">Prefer to self-describe</option>
                    <option value="Prefer not to answer">Prefer not to answer</option>
                </select>
                {gender === 'Other' && (
                    <input
                        id="otherGender"
                        className="rounded-md px-4 py-2 bg-white  mb-4 placeholder-grey-500 w-1/2"
                        name="otherGender"
                        placeholder="Describe here"
                        required
                    />)}
            </div>

            <div id="race-field" className='flex flex-col'>
                <label
                    htmlFor="race"
                    className="text-md text-white pb-2 after:content-['*'] after:ml-0.5 after:text-red-500">
                    Race/Ethnicity
                </label>
                <select
                    id="race-select" name="race"
                    onChange={(e) => { setRace(e.target.value) }}
                    className="rounded-md px-4 py-2 bg-white  mb-4 w-1/2" required>
                    <option value="" selected disabled hidden >Select</option>
                    <option value="Asian Indian">Asian Indian</option>
                    <option value="Black or African">Black or African</option>
                    <option value="Chinese">Chinese</option>
                    <option value="Filipino">Filipino</option>
                    <option value="Guamanian or Chamorro">Guamanian or Chamorro</option>
                    <option value="Hispanic / Latino / Spanish Origin">Hispanic / Latino / Spanish Origin</option>
                    <option value="Japanese">Japanese</option>
                    <option value="Korean">Korean</option>
                    <option value="Middle Eastern">Middle Eastern</option>
                    <option value="Native American or Alaskan Native">Native American or Alaskan Native</option>
                    <option value="Native Hawaiian">Native Hawaiian</option>
                    <option value="Samoan">Samoan</option>
                    <option value="Vietnamese">Vietnamese</option>
                    <option value="White">White </option>
                    <option value="Other Asian">Other Asian</option>
                    <option value="Other Pacific Islander">Other Pacific Islander</option>
                    <option value="Other">Other</option>
                    <option value="Prefer not to answer">Prefer not to answer</option>
                </select>
                {race === 'Other' && (
                    <input
                        id="otherRace"
                        className="rounded-md px-4 py-2 bg-white  mb-4 placeholder-grey-500 w-1/2"
                        name="otherRace"
                        placeholder="If other, please specify"
                        required
                    />)}
            </div>

            <div id="phonenumber-field" className='flex flex-col'>
                <label
                    htmlFor="phoneNumber"
                    className="text-md text-white pb-2 after:content-['*'] after:ml-0.5 after:text-red-500">
                    Phone number
                </label>
                <input
                    id="phoneNumber"
                    className="rounded-md px-4 py-2 bg-white  mb-4 placeholder-grey-500 w-1/2"
                    name="phoneNumber"
                    placeholder="(123) 456-7890)"
                    pattern="\(\d{3}\) \d{3}-\d{4}"
                    title="Phone number should be in the format (123) 456-7890"
                    required
                />
            </div>

            <div id="sexuality-field" className='flex flex-col'>
                <label
                    htmlFor='sexuality'
                    className="text-md text-white pb-2 after:content-['*'] after:ml-0.5 after:text-red-500">
                    Do you consider yourself to be any of the following?
                </label>
                <select
                    id="sexuality-select" name="sexuality"
                    onChange={(e) => { setSexuality(e.target.value) }}
                    className="rounded-md px-4 py-2 bg-white  mb-4 w-1/2" required>
                    <option value="" selected disabled hidden >Select</option>
                    <option value="Heterosexual or Straight" >Heterosexual or Straight</option>
                    <option value="Gay or lesbian">Gay or lesbian</option>
                    <option value="Bisexual">Bisexual</option>
                    <option value="Different identity">Different identity</option>
                    <option value="Prefer not to answer">Prefer not to answer</option>
                </select>
                {sexuality === 'Different identity' && (<input
                    id="otherSexuality"
                    className="rounded-md px-4 py-2 bg-white  mb-4 placeholder-grey-500 w-1/2"
                    name="otherSexuality"
                    placeholder="Please specify"
                    required
                />)}
            </div>

            <div id='fieldOfStudy-field' className='flex flex-col'>
                <label
                    htmlFor="fieldOfStudy"
                    className="text-md text-white pb-2 after:content-['*'] after:ml-0.5 after:text-red-500">
                    Field of study
                </label>
                <select
                    id="fieldOfStudy-select" name="fieldOfStudy"
                    onChange={(e) => { setFieldOfStudy(e.target.value) }}
                    className="rounded-md px-4 py-2 bg-white  mb-4 w-1/2" required>
                    <option value="" selected disabled hidden >Select</option>
                    <option value="Computer science, computer engineering, or software engineering " >Computer science, computer engineering, or software engineering </option>
                    <option value="Another engineering discipline (such as civil, electrical, mechanical, etc.) ">Another engineering discipline (such as civil, electrical, mechanical, etc.) </option>
                    <option value="Information systems, information technology, or system administration">Information systems, information technology, or system administration</option>
                    <option value="A natural science (such as biology, chemistry, physics, etc.) ">A natural science (such as biology, chemistry, physics, etc.) </option>
                    <option value="Mathematics or statistics">Mathematics or statistics</option>
                    <option value="Web development or web design">Web development or web design</option>
                    <option value="Business discipline (such as accounting, finance, marketing, etc.)">Business discipline (such as accounting, finance, marketing, etc.) </option>
                    <option value=" Humanities discipline (such as literature, history, philosophy, etc.)"> Humanities discipline (such as literature, history, philosophy, etc.)  </option>
                    <option value="Social science (such as anthropology, psychology, political science, etc.)">Social science (such as anthropology, psychology, political science, etc.)</option>
                    <option value="Fine arts or performing arts (such as graphic design, music, studio art, etc.)">Fine arts or performing arts (such as graphic design, music, studio art, etc.)</option>
                    <option value="Health science (such as nursing, pharmacy, radiology, etc.)">Health science (such as nursing, pharmacy, radiology, etc.)</option>
                    <option value="Other">Other</option>
                    <option value="Undecided / No Declared Major">Undecided / No Declared Major</option>
                    <option value="My school does not offer majors / primary areas of study">My school does not offer majors / primary areas of study</option>
                    <option value="Prefer not to answer">Prefer not to answer</option>
                </select>
                {fieldOfStudy === 'Other' && (<input
                    id="otherFieldOfStudy"
                    className="rounded-md px-4 py-2 bg-white  mb-4 placeholder-grey-500 w-1/2"
                    name="otherFieldOfStudy"
                    placeholder="If other, please specify"
                    required
                />)}
            </div>

            <div id='school-field' className='flex flex-col'>
                <label
                    htmlFor="school"
                    className="text-md text-white pb-2 after:content-['*'] after:ml-0.5 after:text-red-500">
                    School
                </label>
                <input
                    id="school"
                    className="rounded-md px-4 py-2 bg-white  mb-4 placeholder-grey-500 w-2/3"
                    name="school"
                    placeholder="School"
                    required
                />
            </div>

            <div id='levelOfStudy-field' className='flex flex-col'>
                <label
                    htmlFor="levelOfStudy"
                    className="text-md text-white pb-2 after:content-['*'] after:ml-0.5 after:text-red-500">
                    Level of study (as of Fall 2024)
                </label>
                <select id="expectedGraduationYear-select" name="expectedGraduationYear" className="rounded-md px-4 py-2 bg-white  mb-4 w-1/2" required>
                    <option value="" selected disabled hidden >Select</option>
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                    <option value="5th Year">5th Year</option>
                </select>
            </div>

            <div id="expectedGraduationYear-field" className='flex flex-col'>
                <label
                    htmlFor="expectedGraduationYear"
                    className="text-md text-white pb-2 after:content-['*'] after:ml-0.5 after:text-red-500">
                    Expected graduation year
                </label>
                <select id="expectedGraduationYear-select" name="expectedGraduationYear" className="rounded-md px-4 py-2 bg-white  mb-4 w-1/2" required>
                    <option value="" selected disabled hidden >Select</option>
                    <option value="2025">2025</option>
                    <option value="2026">2026</option>
                    <option value="2027">2027</option>
                    <option value="2028">2028</option>
                    <option value="2029">2029</option>
                </select>
            </div>

            <div id='city-field' className='flex flex-col'>
                <label
                    htmlFor="city"
                    className="text-md text-white pb-2 after:content-['*'] after:ml-0.5 after:text-red-500">
                    City
                </label>
                <input
                    id="city"
                    className="rounded-md px-4 py-2 bg-white  mb-4 placeholder-grey-500 w-1/2"
                    name="city"
                    placeholder="Toronto"
                    required
                />
            </div>

            <div id='provinceState-field' className='flex flex-col'>
                <label
                    htmlFor="provinceState"
                    className="text-md text-white pb-2 after:content-['*'] after:ml-0.5 after:text-red-500">
                    Province/ State
                </label>
                <input
                    id="provinceState"
                    className="rounded-md px-4 py-2 bg-white  mb-4 placeholder-grey-500 w-1/2"
                    name="provinceState"
                    placeholder="ON"
                    required
                />
            </div>

            <div id="country-field" className='flex flex-col'>
                <label
                    htmlFor="country"
                    className="text-md text-white pb-2 after:content-['*'] after:ml-0.5 after:text-red-500">
                    Country
                </label>
                <input
                    id="country"
                    className="rounded-md px-4 py-2 bg-white  mb-4 placeholder-grey-500 w-1/2"
                    name="country"
                    placeholder="Canada"
                    required
                />
            </div>

            <div id='tmuStudentBool-field' className='flex flex-col'>
                <label
                    htmlFor="tmuStudentBool"
                    className="text-md text-white pb-2 after:content-['*'] after:ml-0.5 after:text-red-500">
                    Are you a student at Toronto Metropolitan University?</label>
                <select
                    id="tmuStudentBool-select" name="tmuStudentBool"
                    onChange={(e) => { setTmuStudentBool(e.target.value) }}
                    className="rounded-md px-4 py-2 bg-white  mb-4 w-1/3 " required>
                    <option value="" selected disabled hidden >Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                </select>
                {tmuStudentBool === 'Yes' && (
                    <input
                        id="tmuStudentID"
                        className="rounded-md px-4 py-2 bg-white  mb-4 placeholder-grey-500 w-1/2"
                        name="tmuStudentID"
                        placeholder="Please enter your TMU student ID"
                        required />)}
            </div>

            <div id='accommodationsBool' className='flex flex-col'>
                <label
                    htmlFor="accomodationsBool"
                    className="text-md text-white pb-2 after:content-['*'] after:ml-0.5 after:text-red-500">
                    Will you be needing any accommodations?</label>
                <select
                    id="accomodations-select" name="accomodations"
                    onChange={(e) => { setAccommodationsBool(e.target.value) }}
                    className="rounded-md px-4 py-2 bg-white  mb-4 w-1/3" required>
                    <option value="" selected disabled hidden >Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                </select>
                {accommodationsBool === 'Yes' && (
                    <input
                        id="accomodationsDescription"
                        className="rounded-md px-4 py-2 bg-white  mb-4 placeholder-grey-500 w-1/2"
                        name="accomodationsDescription"
                        placeholder="Please describe"
                        required />)}
            </div>

            <div id='dietaryRestrictions-field' className='flex flex-col'>
                <label
                    htmlFor="dietaryRestrictions"
                    className="text-md text-white pb-2 after:content-['*'] after:ml-0.5 after:text-red-500">
                    Dietary Restrictions
                </label>
                <select id="dietary-select" name="dietaryRestrictions" className="rounded-md px-4 py-2 bg-white  mb-4 w-1/3" required>
                    <option value="" selected disabled hidden >Select</option>
                    <option value="Yes">Vegetarian</option>
                    <option value="Vegan">Vegan</option>
                    <option value="Celiac Disease">Celiac Disease</option>
                    <option value="Allergies">Allergies</option>
                    <option value="Kosher">Kosher</option>
                    <option value="Halal">Halal</option>
                </select>
            </div>

            <div id='githubURL-field' className='flex flex-col'>
                <label
                    htmlFor="githubURL"
                    className="text-md text-white pb-2">
                    Github URL
                </label>
                <input
                    id="githubURL"
                    className="rounded-md px-4 py-2 bg-white  mb-4 placeholder-grey-500 w-1/2"
                    name="githubURL"
                    placeholder="github.com/username"
                    pattern="https?://(www\.)?github\.com/[A-Za-z0-9_-]+/?"
                    title="Please enter a valid GitHub URL (e.g., https://www.github.com/username)"

                />
            </div>

            <div id='linkedinURL-field' className='flex flex-col'>
                <label
                    htmlFor="linkedinURL"
                    className="text-md text-white pb-2">
                    Linkedin URL
                </label>
                <input
                    id="linkedinURL"
                    className="rounded-md px-4 py-2 bg-white  mb-4 placeholder-grey-500 w-1/2"
                    name="linkedinURL"
                    placeholder="linkedin.com/in/username"
                    pattern="https?://(www\.)?linkedin\.com/in/[A-Za-z0-9_-]+/?"
                    title="Please enter a valid LinkedIn URL (e.g., https://www.linkedin.com/in/username)"
                />
            </div>

            <div id='resume-field' className='flex flex-col'>
                <label
                    htmlFor="resumeFile"
                    className="text-md text-white pb-2">
                    Resume
                </label>
                <input type="file" id="resumeFile" name="resumeFile"
                    className="block w-full text-sm text-slate-500
                    file:mr-4 file:py-2 file:px-4      
                    file:rounded-md file:border-0      
                    file:text-sm file:font-semibold      
                    file:bg-white file:text-[#2A6C82]      
                    hover:file:bg-[#1D5162] hover:file:text-gray-200      
                    file:placeholder:text-white
                    transition ease-in-out duration-300
              "
                />
            </div>
        </div>
    )
}

export default ApplicationSegment1