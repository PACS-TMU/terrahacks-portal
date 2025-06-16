"use client";
import { useState, useEffect } from "react";

export default function ErrorMessage({ searchParams }: { searchParams: { message: string } }) {
    const [showMessage, setShowMessage] = useState(true);

    useEffect(() => {
        setShowMessage(true);
        if (!searchParams || !searchParams.message || searchParams.message === "") return;
        if (searchParams.message.slice(0, 5) === "Error") {
            const scrollToMessage = (document.getElementById('message')?.offsetTop ?? 0) - 200;
            window.scrollTo({ top: scrollToMessage, behavior: "smooth" });
            const timer = setTimeout(() => {
                setShowMessage(false);
            }, 5000);
            return () => clearTimeout(timer);
        } else {
            window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
            const timer = setTimeout(() => {
                setShowMessage(false);
            }, 15000);
            return () => clearTimeout(timer);
        }
    }, [searchParams, searchParams.message]);

    if (!searchParams || !searchParams.message) {
        return null;
    }

    return (
        <>
            {searchParams.message.slice(0, 5) === "Error" ? (
                <div id="message" className={`absolute bottom-6 right-6 max-w-[50%] lg:max-w-[20%] bg-red-500 rounded-md p-3 ${showMessage ? "shake" : "fade-out"} text-sm lg:text-base 2xl:text-lg`}>
                    <p className="text-background text-center">
                        {searchParams.message}
                    </p>
                </div>
            ) : (
                <div className={`items-center justify-center bg-green-500 text-background max-w-[90%] lg:max-w-1/2 2xl:max-w-[30%] text-center p-3 my-10 rounded-md ${showMessage ? "shake" : "fade-out"} text-left text-sm lg:text-base 2xl:text-lg`}>
                    <p>
                        {searchParams.message}
                    </p>
                </div>
            )}
        </>
    );
}
