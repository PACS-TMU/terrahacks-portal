import Sidenav from "@/components/Sidenav";
import { Raleway } from 'next/font/google';
import Footer from "@/components/Footer";

const raleway = Raleway({
    subsets: ['latin'],
})

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <section className={`${raleway.className}`}>
            <Sidenav />
            <div className="md:pl-72 lg:pl-80">
                {children}
                <Footer />
            </div>
        </section>
    );
}
