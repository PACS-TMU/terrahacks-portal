import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import Item from "@/components/contact/Item";
// import { FaDiscord } from "react-icons/fa6";
// import { IoLogoDiscord, IoLogoInstagram } from "react-icons/io5";

export default async function Contact() {
    const supabase = createClient();

    //Check with Supabase to see if user is logged in by getUser() call. 
    //If logged in, does nothing
    const {
        data: { user },
    } = await supabase.auth.getUser();

    //If not logged in, redirect to login page
    if (!user) {
        return redirect("/login");
    }

    return (
        <>
            <div className="md:sticky top-0 z-10 shrink-0 px-6 md:py-8 py-2 border-b-2 border-b-gray-300 bg-[#f7fafc]">
                <h1 className="text-xl md:text-4xl text-gray-800 font-bold font-sans">Got Questions?</h1>
                <p className="md:text-xl text-gray-400 md:mt-4 font-sans whitespace-pre-line">Our team is happy to help you in any way we can! </p>
                <p className="text-gray-800 mt-2">The best way to get a fast response to your inquiries is to email us at {" "}

                    <a
                        aria-label="Send us an email"
                        href="mailto:contact@terrahacks.ca"
                        target="_blank"
                        rel="nooppener noreferrer"
                        className="text-sky-600 font-bold underline hover:text-sky-400 duration-300 ease-in-out"
                    >
                        contact@terrahacks.ca
                    </a>!
                </p>
            </div>
            {/* apply grid, configure rows, 2 cols on lg or bigger, 1 col smaller than lg*/}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:text-lg w-[90%] gap-4 lg:gap-6 2xl:gap-8">
                <Item
                    name={"Discord"}
                    link={"https://discord.gg/982AkBQea7"}
                    linkText={"Join Our Discord Server!"}
                    description={"TerraHack's discord server is the center of all information for this event. Join our server to get the latest updates and ask questions to our team!"}
                />

                <Item
                    name={"Instagram"}
                    link={"https://www.instagram.com/terrahacks.tmu"}
                    linkText={"Follow us on Instagram!"}
                    description={"Follow our journey on Instagram! We post updates, behind-the-scenes, sponsorship highlights, and more!"}
                />

                <Item
                    name={"TikTok"}
                    link={"https://www.tiktok.com/@terrahacks"}
                    linkText={"Follow us on TikTok!"}
                    description={"Follow us on Tiktok for funny content, skits, and event information!"}
                />

                <Item
                    name={"LinkedIn"}
                    link={"https://www.linkedin.com/company/terrahacks"}
                    linkText={"Connect with us on LinkedIn!"}
                    description={"Visit our LinkedIn for professional updates, sponsor highlights, and more!"}
                />

                <Item
                    name={"Newsletter"}
                    link={"https://www.terrahacks.ca/newsletter"}
                    linkText={"Join our Newsletter!"}
                    description={"Aside from our social media, we also have a newsletter! Subscribe to get the latest updates and information about TerraHacks!"}
                />

                <Item
                    name={"Linktree"}
                    link={"https://linktr.ee/terrahacks"}
                    linkText={"Our Linktree!"}
                    description={"Linktree is a hub for all of our social media links! Visit our Linktree to find all of our social media links in one place!"}
                />
            </div>
        </>
    );
}
