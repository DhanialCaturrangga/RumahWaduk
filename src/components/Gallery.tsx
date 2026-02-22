"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

// Sample of the best images from the provided folder
const galleryImages = [
    { src: "/assets/image/ARJ08806.jpg", alt: "Rumah Waduk Vibe 1", aspect: "aspect-[4/5]" },
    { src: "/assets/image/ARJ08813.jpg", alt: "Rumah Waduk Vibe 2", aspect: "aspect-square" },
    { src: "/assets/image/ARJ08852.jpg", alt: "Rumah Waduk Vibe 3", aspect: "aspect-[16/9]" },
    { src: "/assets/image/ARJ08888.jpg", alt: "Rumah Waduk Vibe 4", aspect: "aspect-[3/4]" },
    { src: "/assets/image/ARJ09051.jpg", alt: "Rumah Waduk Vibe 5", aspect: "aspect-square" },
    { src: "/assets/image/ARJ09350.jpg", alt: "Rumah Waduk Vibe 6", aspect: "aspect-[4/5]" },
];

export default function Gallery() {
    const galleryRef = useRef(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const items = gsap.utils.toArray(".gallery-item");

        gsap.fromTo(
            items,
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.15,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: galleryRef.current,
                    start: "top 75%",
                }
            }
        );
    }, []);

    return (
        <section ref={galleryRef} id="gallery" className="py-24 md:py-40 w-full bg-(--color-brand-bg)">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12">

                {/* Header */}
                <div className="mb-16 md:mb-24 flex flex-col items-center text-center">
                    <p className="text-xs tracking-[0.2em] opacity-50 uppercase mb-4 text-(--color-brand-text)">Ruang Visual</p>
                    <h2 className="text-4xl md:text-6xl font-normal tracking-tight lowercase text-(--color-brand-text)">
                        sudut <span className="text-(--color-brand-secondary) font-serif italic">pandang.</span>
                    </h2>
                </div>

                {/* Masonry-like Grid Layout */}
                <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                    {galleryImages.map((img, index) => (
                        <div
                            key={index}
                            className={`gallery-item relative w-full overflow-hidden rounded-sm break-inside-avoid ${img.aspect} group cursor-pointer bg-(--color-brand-secondary)/10`}
                        >
                            <img
                                src={img.src}
                                alt={img.alt}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-[0.22,1,0.36,1] group-hover:scale-105 filter brightness-95 group-hover:brightness-100"
                                loading="lazy"
                            />
                            {/* Overlay hover effect */}
                            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out"></div>
                        </div>
                    ))}
                </div>

                <div className="mt-20 flex justify-center gallery-item">
                    <a href="https://instagram.com/rumahwaduk" target="_blank" rel="noopener noreferrer" className="inline-flex items-center space-x-2 text-sm tracking-widest uppercase text-(--color-brand-text) hover:opacity-60 transition-opacity border-b border-(--color-brand-text)/30 pb-1">
                        <span>follow our instagram</span>
                    </a>
                </div>
            </div>
        </section>
    );
}
