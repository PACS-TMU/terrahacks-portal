"use client";
import { useState } from "react";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

export default function PasswordField({ name }: { name: string }) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <>
            <label className="text-md text-background" htmlFor={name}>
                {name === "password" ? "Password" : "Confirm Password"}
            </label>
            <div className="relative flex flex-row border items-center border-background rounded-md mb-2 text-sm lg:text-md xl:text-lg tracking-wider">
                <input
                    className="bg-inherit placeholder-gray-300 w-[90%] px-4 py-2 rounded-md focus:border-none focus:ring-0 focus:outline-none"
                    id={name}
                    type={
                        showPassword ? "text" : "password"
                    }
                    name={name}
                    placeholder={
                        name === "password" ? "Password" : "Confirm Password"
                    }
                    required
                />
                {
                    !showPassword ? (
                        <button aria-label="Show Password Button" type="button" onClick={() => setShowPassword(true)} className="h-full flex items-center justify-center focus:border-gray-200">
                            <IoEyeOffOutline className="absolute right-4 mt-0.5 text-gray-300" />
                        </button>

                    ) : (
                        <button aria-label="Hide Password Button" type="button" onClick={() => setShowPassword(false)} className="h-full flex items-center justify-center">
                            <IoEyeOutline className="absolute right-4 mt-0.5 text-gray-300" />
                        </button>
                    )
                }
            </div>
        </>

    )
}