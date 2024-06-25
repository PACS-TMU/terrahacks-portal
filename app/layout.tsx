import { GeistSans } from "geist/font/sans";
import "./globals.css";

const defaultUrl = process.env.NEXT_PUBLIC_BASE_URL ? `https://${process.env.NEXT_PUBLIC_BASE_URL}` : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "TerraHacks Portal - Hacker Dashboard",
  description: "Everything a Hacker needs in one place! Application portal for TerraHacks 2024. Apply, view, and edit your application here; as well as view your status and other information.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-[#f7fafc] text-foreground">
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
