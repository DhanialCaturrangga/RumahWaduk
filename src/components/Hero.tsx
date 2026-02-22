"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const scrollIndicatorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        // Initial Reveal Animation
        const tl = gsap.timeline();
        tl.fromTo(
            imageRef.current,
            { scale: 1.05, opacity: 0 },
            { scale: 1, opacity: 1, duration: 2, ease: "power2.out" }
        ).fromTo(
            textRef.current?.children as unknown as HTMLElement[],
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.2, stagger: 0.2, ease: "power3.out" },
            "-=1.5"
        ).fromTo(
            scrollIndicatorRef.current,
            { opacity: 0, y: -20 },
            { opacity: 1, y: 0, duration: 1.5, ease: "power2.out" },
            "-=0.5"
        );

        // Scroll Animations
        // 1. Background Image Zoom (Red Bull style depth)
        gsap.to(imageRef.current, {
            scale: 1.15,
            ease: "none",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "bottom top",
                scrub: true,
            },
        });

        // 2. Text Parallax & Fade (moves faster than background)
        gsap.to(textRef.current, {
            y: -150,
            opacity: 0,
            ease: "none",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "bottom top",
                scrub: true,
            },
        });

        // 3. Scroll Indicator Fade Out (disappears quickly upon scroll)
        gsap.to(scrollIndicatorRef.current, {
            opacity: 0,
            y: -20,
            ease: "none",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "top -20%",
                scrub: true,
            },
        });

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    return (
        <section ref={containerRef} id="home" className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-black z-0">

            {/* Full Bleed Background Image */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div
                    ref={imageRef}
                    className="w-full h-full relative bg-cover bg-center"
                    style={{
                        backgroundImage: "url('/assets/image/ARJ09350.jpg')",
                    }}
                >
                </div>
                {/* Gradient overlay to ensure text contrast (Editorial style uses dark vignette/gradient) */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/60 z-10" />
            </div>

            {/* Editorial Typography Center */}
            <div ref={textRef} className="relative z-20 text-center flex flex-col items-center px-6">
                <h1 className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-6 text-white leading-none">
                    <span className="text-6xl md:text-[8rem] lg:text-[11rem] font-bold tracking-tighter drop-shadow-2xl">
                        rumah
                    </span>
                    <span
                        className="text-6xl md:text-[8rem] lg:text-[11rem] tracking-tight lowercase font-serif italic text-(--color-brand-primary) drop-shadow-2xl"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                        waduk.
                    </span>
                </h1>
                <p className="mt-8 md:mt-12 text-white/90 text-xl md:text-3xl font-light tracking-wide max-w-3xl drop-shadow-lg">
                    Kopi <span className="font-serif italic text-(--color-brand-primary)">kudapan</span> dan cerita di setiap sudut <span className="font-serif italic text-(--color-brand-primary)">kota.</span>
                </p>
            </div>

            {/* Scroll Indicator (Red Bull Style) */}
            <div ref={scrollIndicatorRef} className="absolute bottom-12 w-full flex flex-col items-center justify-center z-20 pointer-events-none gap-6">
                <span className="text-[10px] sm:text-xs tracking-[0.25em] text-white/50 uppercase font-semibold">
                    Scroll to explore
                </span>
                <div className="w-[1px] h-16 bg-white/20 relative overflow-hidden">
                    <div className="w-full h-full bg-white absolute top-0 left-0 animate-[scroll-indicator_2s_ease-in-out_infinite]" />
                </div>
            </div>

            {/* Import Google Fonts and Custom Animation */}
            <style dangerouslySetInnerHTML={{
                __html: `
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,400;1,600&display=swap');
                
                @keyframes scroll-indicator {
                    0% { transform: translateY(-100%); }
                    50% { transform: translateY(0%); }
                    100% { transform: translateY(100%); }
                }
             `}} />
        </section>
    );
}
