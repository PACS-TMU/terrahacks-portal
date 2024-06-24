"use client";
import { useRef, useState, useEffect } from 'react';
import { IoClose } from 'react-icons/io5';
import { useClickAway } from 'react-use';
import { useRouter, useSearchParams } from 'next/navigation';

export default function ApplicationError({ searchParams }: { searchParams: { page?: string, message: string } }) {
    const [message, setMessage] = useState(searchParams.message);
    const contentRef = useRef(null);
    const router = useRouter();
    const currentSearchParams = useSearchParams();

    useClickAway(contentRef, () => {
        setMessage("");
    });

    useEffect(() => {
        if (!message) {
            const newSearchParams = new URLSearchParams(currentSearchParams.toString());
            newSearchParams.set('message', '');
            router.replace(`?${newSearchParams.toString()}`);
        }
    }, [message, router, currentSearchParams]);

    useEffect(() => {
        const handleEscape = () => {
            setMessage("");
        };
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                handleEscape();
            }
        });
        return () => {
            window.removeEventListener('keydown', handleEscape);
        };
    }, []);

    if (!message) {
        return null;
    }

    return (
        <div className="fixed flex justify-center items-center top-0 left-0 h-full w-full bg-foreground bg-opacity-60 z-30">
            <div ref={contentRef} className="relative w-[90%] md:w-3/4 xl:w-1/4 mx-auto my-auto p-4 gap-4 flex flex-col justify-center items-center bg-background text-foreground rounded-md shadow-sm">
                <button
                    aria-label="Close Modal Button"
                    onClick={() => {
                        setMessage("");
                    }}
                    className="flex w-full"
                >
                    <IoClose className="absolute top-0 right-0 w-10 h-auto m-2" />
                </button>
                <h2 className="text-2xl lg:text-3xl text-center font-semibold">Error</h2>
                <p className="text-center text-lg lg:text-xl text-red-500">{message}</p>
            </div>
        </div>
    );
}
