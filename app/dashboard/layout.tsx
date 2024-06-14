import Sidenav from "@/components/Sidenav";
import { Raleway } from 'next/font/google';
import Footer from "@/components/Footer";

const raleway = Raleway({
    subsets: ['latin'],
})

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <section className={`flex h-full w-full ${raleway.className}`}>
            <Sidenav />
            <div className="md:ml-72 lg:ml-80 flex-col">
                {children}
                <Footer />
            </div>
        </section>
    );
}
