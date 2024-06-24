import { IoLogoDiscord, IoLogoInstagram, IoLogoTiktok, IoLogoLinkedin, IoNewspaperSharp} from "react-icons/io5";
import { SiLinktree } from "react-icons/si";

export default function Item({name, link, linkText, description}: {name: string, link: string, linkText: string, description: string}) {
    let icon = <></>;

    if (name === "Instagram") {
        icon = <IoLogoInstagram size={93} className="text-foreground" />;
    }
    else if (name === "Discord") {
        icon = <IoLogoDiscord size={93} className="text-foreground" />;
    }
    else if (name === "TikTok") {
        icon = <IoLogoTiktok size={93} className="text-foreground" />;
    }
    else if (name === "LinkedIn") {
        icon = <IoLogoLinkedin size={93} className="text-foreground" />;
    }
    else if (name === "Newsletter") {
        icon = <IoNewspaperSharp size={93} className="text-foreground" />;
    }
    else if (name === "Linktree") {
        icon = <SiLinktree size={93} className="text-foreground" />;
    }

    return (
        <div className="flex flex-row items-center justify-center p-4">
            <a
                aria-label={`${name} Logo`}
                href={link}
                target="_blank"
                rel="nooppener noreferrer"
                className='hover:scale-105 duration-300 ease-in-out flex items-center justify-end mr-8 w-[40%]'
            >
                {icon}
            </a>
            <div className="w-[60%]">
                <a
                    aria-label={`${name} Logo`}
                    href={link}
                    target="_blank"
                    rel="nooppener noreferrer"
                    className='text-sky-600 font-bold underline hover:text-sky-400 duration-300 ease-in-out'
                >
                    {linkText}
                </a>
                <p className="text-sm lg:text-base">
                    {description}
                </p>
            </div>
        </div>
    );
}