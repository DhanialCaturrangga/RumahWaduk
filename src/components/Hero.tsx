"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        // Initial Reveal Animation
        const tl = gsap.timeline();
        tl.fromTo(
            cardRef.current,
            { y: 50, opacity: 0, scale: 0.95 },
            { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: "power3.out" }
        ).fromTo(
            textRef.current?.children as unknown as HTMLElement[],
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out" },
            "-=0.8"
        );

        // Parallax on Scroll for the background blur
        gsap.to(imageRef.current, {
            yPercent: 15,
            ease: "none",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "bottom top",
                scrub: true,
            },
        });

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    return (
        <section ref={containerRef} id="home" className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-(--color-brand-bg)">

            {/* Heavily Blurred Full Background */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div
                    ref={imageRef}
                    className="w-full h-[120%] -top-[10%] relative bg-cover bg-center"
                    style={{
                        backgroundImage: "url('/assets/image/ARJ08969.jpg')",
                        filter: 'blur(40px) brightness(0.9)',
                        transform: 'scale(1.1)'
                    }}
                >
                    {/* Fallback pattern */}
                    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--color-brand-secondary)_1px,_transparent_1px)] bg-[size:24px_24px]"></div>
                </div>
                {/* Vignette/Gradient overlay for deeper contrast like florporto */}
                <div className="absolute inset-0 bg-gradient-to-b from-(--color-brand-primary)/20 via-transparent to-(--color-brand-bg) z-10" />
            </div>

            {/* Top Indicator (Like FLORPORTO local time) */}
            <div className="absolute top-10 w-full text-center z-20 pointer-events-none">
                <p className="text-xs tracking-[0.2em] text-(--color-brand-text)/60 uppercase font-medium">
                    est. 2022
                </p>
            </div>

            {/* Center Card Container */}
            <div className="relative z-30 w-full max-w-5xl px-6 lg:px-12 flex flex-col items-center flex-grow justify-center">
                <div
                    ref={cardRef}
                    className="relative w-full aspect-[16/9] md:aspect-[2.5/1] rounded-[2rem] overflow-hidden shadow-2xl flex items-center justify-center"
                >
                    {/* Actual Sharp Image */}
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: "url('/assets/image/ARJ08969.jpg')" }}
                    >
                        <div className="absolute inset-0 bg-black/20" /> {/* Slight dark overlay to make text pop */}
                    </div>

                    {/* Overlay Text inside card */}
                    <div ref={textRef} className="relative z-10 text-center flex flex-col items-center">
                        <h1
                            className="text-7xl md:text-9xl tracking-tight text-white mb-2"
                            style={{
                                fontFamily: "'Caveat', 'Playball', cursive", // Using a cursive fallback for "Flôr" script style
                                textShadow: '0 4px 20px rgba(0,0,0,0.3)'
                            }}
                        >
                            rumah waduk
                        </h1>
                    </div>
                </div>
            </div>

            {/* Bottom Breadcrumbs/Nav indicators */}
            <div className="absolute bottom-10 w-full z-20 flex justify-center space-x-6 text-sm tracking-widest text-(--color-brand-text)/70 lowercase pointer-events-none font-light">
                <span>kopi</span>
                <span className="opacity-50">•</span>
                <span>kudapan</span>
                <span className="opacity-50">•</span>
                <span>cerita</span>
            </div>

            {/* Import Google Font for cursive script */}
            <style dangerouslySetInnerHTML={{
                __html: `
                @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@600&display=swap');
             `}} />
        </section>
    );
}
