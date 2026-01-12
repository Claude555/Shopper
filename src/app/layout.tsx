import Header from "@/components/layout/Header";
import "./globals.css";
import Footer from "@/components/layout/Footer";
import WelcomeModal from "@/components/ui/WelcomeModal";
import CategoryGrid from "@/components/layout/CategoryGrid";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#f5f5f5] text-[#282828]">
        <WelcomeModal /> {/* Add it here */}
        <Header />
        <main className="container mx-auto px-4 mt-4">
          {children}
        </main>
        <CategoryGrid />
        <Footer />
      </body>
    </html>
  );
}