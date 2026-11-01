import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-white text-slate-900 selection:bg-blue-600 selection:text-white">
      <Navbar />
      <main className="flex-1 flex flex-col">
        {children}
      </main>
      <Footer />
    </div>
  );
}
