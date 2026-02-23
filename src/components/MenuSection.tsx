"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const categoryHighlights = [
    {
        id: "makanan",
        title: "makanan utama.",
        subtitle: "cita rasa yang sesungguhnya",
        description: "nikmati hidangan utama pilihan yang diracik dengan bumbu rahasia dapur rumah waduk. dari nasi goreng aroma khas hingga soto ubi yang menghangatkan, setiap suapan adalah cerita dari nusantara yang disajikan dengan penuh cinta.",
        image: "/assets/image/ARJ09046.jpg",
        align: "right"
    },
    {
        id: "snack",
        title: "camilan & ringan.",
        subtitle: "kawan setia untuk segala suasana",
        description: "teman sempurna untuk obrolan sore hari. kami menyajikan pisang peppe klasik makassar dengan sambal terasi yang menggugah selera, dan aneka camilan renyah yang siap melengkapi momen santai anda di tepi waduk.",
        image: "/assets/image/ARJ08897.jpg",
        align: "left"
    },
    {
        id: "coffee",
        title: "kopi pilihan.",
        subtitle: "seduhan dari biji kopi nusantara",
        description: "rasakan kebangkitan energi dari racikan kopi susu gula aren andalan kami, atau seruput secangkir kopi hitam murni yang diseduh manual. setiap tetes kopi rumah waduk menjanjikan keseimbangan rasa yang sempurna untuk menemani hari.",
        image: "/assets/image/ARJ08943.jpg",
        align: "right"
    },
    {
        id: "non-coffee",
        title: "segar tanpakopi.",
        subtitle: "manis, dingin, dan menyegarkan",
        description: "bagi anda yang mencari kesegaran lain, nikmati sensasi thai tea yang autentik, kelembutan milk tea klasik, hingga kesegaran cincau kuah gula aren. pelepas dahaga terbaik sambil memandangi tenangnya air waduk.",
        image: "/assets/image/ARJ08860.jpg",
        align: "left"
    }
];

export default function MenuSection() {
    const sectionRef = useRef(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        const categories = gsap.utils.toArray(".category-block");

        // Header animation
        gsap.fromTo(
            ".menu-header-creative",
            { y: 50, opacity: 0 },
            {
                y: 0, opacity: 1, duration: 1, ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                }
            }
        );

        // Individual category scroll animations with slight parallax
        categories.forEach((cat: any, i) => {
            const imageContainer = cat.querySelector(".cat-image-container");
            const image = cat.querySelector(".cat-image");
            const textContent = cat.querySelector(".cat-text-content");

            // Pin the text while image scrolls past (Creative reveal)
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: cat,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            });

            tl.fromTo(imageContainer,
                { scale: 0.9, opacity: 0, clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" },
                { scale: 1, opacity: 1, clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", duration: 1.2, ease: "power4.inOut" }
            )
                .fromTo(textContent,
                    { y: 50, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
                    "-=0.6" // overlap animation
                );

            // Softened parallax on the image itself
            gsap.fromTo(image,
                { yPercent: -10 },
                {
                    yPercent: 10,
                    ease: "none",
                    scrollTrigger: {
                        trigger: cat,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 0.5 // Add a slight delay to scrubbing for smoother feel
                    }
                }
            );
        });

    }, []);

    return (
        <section ref={sectionRef} id="menu" className="py-24 md:py-40 w-full bg-(--color-brand-bg) relative overflow-hidden">
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-(--color-brand-secondary)/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-(--color-brand-primary)/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
                <div className="menu-header-creative text-center md:text-left mb-20 md:mb-32 flex flex-col md:flex-row md:items-end justify-between border-b border-black/10 pb-12 gap-8">
                    <div>
                        <p className="text-sm tracking-[0.3em] opacity-40 uppercase mb-6 text-(--color-brand-text) font-medium">Buku Menu</p>
                        <h2 className="text-5xl md:text-7xl lg:text-8xl font-normal tracking-tight lowercase text-(--color-brand-text) leading-[0.9]">
                            sajian <br />
                            <span className="text-(--color-brand-secondary) font-serif italic relative inline-block">
                                rasa.
                                <svg className="absolute -bottom-4 -right-12 w-24 h-6 opacity-30 text-(--color-brand-text)" viewBox="0 0 100 20" preserveAspectRatio="none">
                                    <path d="M0,10 Q50,20 100,5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                            </span>
                        </h2>
                    </div>
                    <div className="max-w-md text-right hidden md:block">
                        <p className="text-(--color-brand-text)/60 font-light lowercase leading-relaxed text-lg pb-4">
                            empat pilar rasa yang kami hadirkan khusus untuk menemani setiap cerita dan tawa anda di rumah waduk.
                        </p>
                    </div>
                </div>

                <div className="space-y-32 md:space-y-48">
                    {categoryHighlights.map((cat, index) => (
                        <div key={cat.id} className={`category-block flex flex-col ${cat.align === 'right' ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 md:gap-24`}>

                            {/* Image Side */}
                            <div className="w-full md:w-1/2 h-[500px] md:h-[700px] relative cat-image-container overflow-hidden rounded-sm group">
                                <div className="absolute inset-0 bg-black/10 z-10 group-hover:bg-black/0 transition-colors duration-700" />
                                <div
                                    className="cat-image absolute inset-[-20%] w-[140%] h-[140%] bg-cover bg-center"
                                    style={{ backgroundImage: `url(${cat.image})` }}
                                />
                                {/* Number indicator (01, 02, etc) */}
                                <div className="absolute top-8 left-8 z-20 overflow-hidden mix-blend-difference">
                                    <span className="text-5xl md:text-7xl font-serif italic text-white opacity-80 inline-block transform translate-y-0 group-hover:-translate-y-4 transition-transform duration-500">
                                        0{index + 1}
                                    </span>
                                </div>
                            </div>

                            {/* Text Side */}
                            <div className="w-full md:w-1/2 cat-text-content flex flex-col justify-center">
                                <div className="relative">
                                    <h3 className="text-4xl md:text-6xl lg:text-7xl font-light lowercase text-(--color-brand-text) mb-6 leading-tight">
                                        {cat.title}
                                    </h3>
                                    <div className="w-12 h-[2px] bg-(--color-brand-secondary) mb-8" />
                                    <p className="text-xl md:text-2xl font-serif italic text-(--color-brand-text)/80 mb-6 lowercase">
                                        {cat.subtitle}
                                    </p>
                                    <p className="text-base md:text-lg font-light text-(--color-brand-text)/60 leading-relaxed lowercase">
                                        {cat.description}
                                    </p>

                                    <div className="mt-12 overflow-hidden">
                                        <button className="relative group inline-flex items-center gap-4 text-sm tracking-widest uppercase font-medium text-(--color-brand-text)">
                                            <span className="relative z-10 transition-colors duration-300 group-hover:text-(--color-brand-secondary)">lihat menu {cat.id}</span>
                                            <div className="w-8 h-[1px] bg-currentColor relative z-10 transition-all duration-300 group-hover:w-12 group-hover:bg-(--color-brand-secondary)" />
                                            {/* Minimalist interactive underline */}
                                            <div className="absolute bottom-[-4px] left-0 w-full h-[1px] bg-(--color-brand-text)/20 scale-x-100 origin-right transition-transform duration-500 opacity-0 group-hover:opacity-100" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
