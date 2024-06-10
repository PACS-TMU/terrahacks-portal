"use client";
import { useState } from "react";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

export default function PasswordField() {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <>
            <label className="text-md text-background" htmlFor="password">
                Password
            </label>
            <div className="relative flex flex-row border items-center border-background rounded-md mb-2 text-sm lg:text-md xl:text-lg tracking-wider">
                <input
                    className="bg-inherit placeholder-gray-300 w-[90%] px-4 py-2 rounded-md focus:border-none focus:ring-0 focus:outline-none"
                    id="password"
                    type={
                        showPassword ? "text" : "password"
                    }
                    name="password"
                    placeholder="Password"
                    required
                />
                {
                    !showPassword ? (
                        <button aria-label="Show Password Button" type="button" onClick={() => setShowPassword(true)} className="h-full flex items-center justify-center">
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