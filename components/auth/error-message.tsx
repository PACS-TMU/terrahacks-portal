"use client";
import { useState, useEffect } from "react";

export default function ErrorMessage({ searchParams }: { searchParams: { message: string } }) {
    const [showMessage, setShowMessage] = useState(true);

    useEffect(() => {
        setShowMessage(true);
        if (searchParams.message === "") return;
        if (searchParams.message.slice(0, 5) === "Error") {
            const timer = setTimeout(() => {
                setShowMessage(false);
            }, 5000);
            return () => clearTimeout(timer);
        }
        else {
            const timer = setTimeout(() => {
                setShowMessage(false);
            }, 15000);
            return () => clearTimeout(timer);
        }
    }, []);

    return (
        <>
            {searchParams.message.slice(0, 5) === "Error" ? (
                <div className={`absolute bottom-6 right-6 max-w-[50%] lg:max-w-[20%] bg-red-500 rounded-md p-3 ${showMessage ? "shake" : "fade-out"} text-sm lg:text-md 2xl:text-lg`}>
                    <p className="text-background text-center">
                        {searchParams.message}
                    </p>
                </div>
            ) : (
                <div className={`items-center justify-center bg-green-500 text-background p-3 my-10 rounded-md ${showMessage ? "shake" : "fade-out"} text-left text-sm lg:text-md 2xl:text-lg`}>
                    <p>
                        {searchParams.message}
                    </p>
                </div>
            )}
        </>

    );
}
