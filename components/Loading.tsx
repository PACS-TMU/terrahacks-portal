import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function Loading() {
    return (
        <div className={`h-screen flex flex-col gap-6 items-center justify-center`}>
                <p className="text-2xl font-medium text-cadetBlue text-foreground">Loading...</p>
                <div className="text-foreground animate-spin"><AiOutlineLoading3Quarters size={32} /></div>
        </div>
    );
}