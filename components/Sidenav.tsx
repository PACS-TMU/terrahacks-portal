"use client";
import { useState, useEffect, ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import SignoutButton from "@/components/SignoutButton";
import Loading from "@/components/Loading";
import { IoHomeOutline, IoCalendarClearOutline, IoTicketOutline, IoLocationOutline, IoDocumentsOutline, IoMailOpenOutline } from 'react-icons/io5';
import { AiOutlineTeam } from 'react-icons/ai';

const iconMapping: Record<string, ReactNode> = {
    "<IoHomeOutline />": <IoHomeOutline size={32} />,
    "<IoDocumentsOutline />": <IoDocumentsOutline size={32} />,
    "<IoCalendarClearOutline />": <IoCalendarClearOutline size={32} />,
    "<AiOutlineTeam />": <AiOutlineTeam size={32} />,
    "<IoTicketOutline />": <IoTicketOutline size={32} />,
    "<IoLocationOutline />": <IoLocationOutline size={32} />,
    "<IoMailOpenOutline />": <IoMailOpenOutline size={32} />,
};

export default function Sidenav() {
    type NavItem = {
        id: number;
        name: string;
        path: string;
        icon: string;
    };

    type User = {
        email: string;
        user_metadata: {
            full_name: string;
        };
    }

    const [navItems, setNavItems] = useState<NavItem[]>([]);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const fetchNavItems = async () => {
            try {
                const response = await fetch("/data/nav-items.json");
                const data = await response.json();
                console.log("Nav items: ", data);
                setNavItems(data);
            }
            catch (error) {
                console.log("Error fetching nav items: ", error);
            }
        };

        const fetchUserData = async () => {
            try {
                const response = await fetch('/api/getUser');
                const result = await response.json();

                if (response.ok) {
                    setUser(result.user);
                } else {
                    console.error('Failed to fetch user data: ', result.error);
                }
            } catch (err) {
                console.error('Failed to fetch user data: ', err);
            }
        };

        fetchUserData();

        fetchNavItems();
    }, []);


    return (
        <nav className="h-screen p-4 bg-[#63ACC4] text-background transition-all duration-300 gap-12 flex-col w-[60px] font-medium hidden md:block md:fixed md:inset-y-0 md:z-10 md:w-72 2xl:w-80 border-r-2 border-r-gray-300 2xl:text-lg">
            {!user || !navItems ? <Loading /> : (
                <>
                    <div className="flex items-start justify-start p-4">
                        <Link aria-label="TerraHacks Home" href="/dashboard" className="flex gap-4 items-center justify-start">
                            <Image
                                src="/assets/th-text.png"
                                alt="Terrahacks text logo"
                                width={3000}
                                height={500}
                                className="w-full h-auto"
                            />
                            <h1 className="opacity-0">TerraHacks</h1>
                        </Link>
                    </div>

                    <hr className="border-t-2 border-t-gray-300 w-full" />

                    <div className="flex items-left justify-left p-4">
                        Welcome,
                        <span className="ml-1 font-bold"> {user!.user_metadata.full_name}</span>
                        !
                    </div>

                    <aside className="flex flex-col items-start justify-between h-[83%] overflow-y-auto">
                        <ul className="flex flex-col gap-4 w-full">
                            {navItems.map((item) => (
                                <Link key={item.id} aria-label={`Path to ${item.name}`} href={item.path} className="w-full" rel="noopener noreferrer">
                                    <li className="p-4 hover:bg-[#E5F0F4] duration-300 ease-in-out rounded-md w-full hover:text-foreground cursor-pointer flex items-center justify-start gap-2">
                                        {iconMapping[item.icon]}
                                        {item.name}
                                    </li>
                                </Link>
                            ))}
                        </ul>
                        <SignoutButton />
                    </aside>
                </>
            )}
        </nav>
    );
}
