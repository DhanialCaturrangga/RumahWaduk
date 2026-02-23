import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import { About, Info } from "@/components/Sections";
import MenuSection from "@/components/MenuSection";
import Gallery from "@/components/Gallery";

export default function Home() {
  return (
    <main className="min-h-screen bg-(--color-brand-bg) text-(--color-brand-text) selection:bg-(--color-brand-primary) selection:text-white">
      <Navbar />
      <Hero />

      {/* Content wrapper with solid background to slide over sticky hero */}
      <div className="relative z-10 bg-(--color-brand-bg)">
        <About />
        <Gallery />
        <MenuSection />
        <Info />

        {/* Proper Florporto-style Footer */}
        <footer className="w-full bg-(--color-brand-text) text-(--color-brand-bg) pt-24 pb-12 px-6 md:px-16 mt-20 md:mt-40 font-sans">
          <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-24">

            {/* Brand / Logo Info */}
            <div className="md:col-span-1 space-y-6">
              <h3 className="text-2xl md:text-3xl lowercase">rumah waduk.</h3>
              <p className="text-xs tracking-widest uppercase opacity-50">kopi • kudapan • cerita</p>
            </div>

            {/* Footer Links - Navigation */}
            <div className="md:col-span-1 space-y-6">
              <p className="text-[10px] tracking-[0.2em] uppercase font-semibold opacity-50 mb-4">links</p>
              <ul className="space-y-3">
                {['home', 'menu', 'about', 'gallery'].map((link) => (
                  <li key={link}>
                    <a href={`#${link}`} className="text-sm font-light hover:opacity-100 opacity-70 transition-opacity lowercase">{link}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Footer Links - Contact */}
            <div className="md:col-span-1 space-y-6">
              <p className="text-[10px] tracking-[0.2em] uppercase font-semibold opacity-50 mb-4">contact</p>
              <ul className="space-y-3">
                <li><a href="#" className="text-sm font-light hover:opacity-100 opacity-70 transition-opacity">hello@rumahwaduk.com</a></li>
                <li><a href="#" className="text-sm font-light hover:opacity-100 opacity-70 transition-opacity">+62 812 3456 7890</a></li>
                <li className="text-sm font-light opacity-70 pt-2 leading-relaxed whitespace-pre-line">
                  {"jl. waduk tunggu pampang no.47\nbangkala, makassar"}
                </li>
              </ul>
            </div>

            {/* Footer Links - Socials */}
            <div className="md:col-span-1 space-y-6">
              <p className="text-[10px] tracking-[0.2em] uppercase font-semibold opacity-50 mb-4">socials</p>
              <ul className="space-y-3">
                <li><a href="https://instagram.com/rumahwaduk" target="_blank" rel="noopener noreferrer" className="text-sm font-light hover:opacity-100 opacity-70 transition-opacity lowercase">instagram</a></li>
                <li><a href="#" className="text-sm font-light hover:opacity-100 opacity-70 transition-opacity lowercase">tiktok</a></li>
              </ul>
            </div>

          </div>

          {/* Copyright & Est */}
          <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center border-t border-white/20 pt-8 mt-12 gap-4 md:gap-0">
            <p className="text-xs opacity-50 lowercase tracking-widest">&copy; {new Date().getFullYear()} rumah waduk. all rights reserved.</p>
            <a href="#home" className="text-xs uppercase tracking-[0.2em] font-medium hover:opacity-60 transition-opacity">back to top</a>
            <p className="text-xs opacity-50 uppercase tracking-[0.2em]">est. 2022</p>
          </div>

          {/* Animated Creator Watermark */}
          <div className="w-full flex justify-center mt-16 pb-4 overflow-hidden group">
            <a
              href="https://github.com/DhanialCaturrangga"
              target="_blank"
              rel="noopener noreferrer"
              className="relative flex items-center space-x-2 text-[10px] sm:text-xs tracking-[0.3em] uppercase opacity-40 hover:opacity-100 transition-all duration-500 transform hover:-translate-y-1"
            >
              <span className="font-light">develop by</span>
              <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-white bg-[length:200%_auto] animate-gradient-x group-hover:from-(--color-brand-primary) group-hover:via-(--color-brand-secondary) group-hover:to-(--color-brand-primary)">
                DanielCaturrangga
              </span>

              {/* Animated underline */}
              <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent transition-all duration-500 group-hover:w-full opacity-0 group-hover:opacity-100"></span>
            </a>
          </div>
        </footer>
      </div>
    </main>
  );
}
