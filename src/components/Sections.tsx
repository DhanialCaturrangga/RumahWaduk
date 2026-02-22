"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin, Clock, Star } from "lucide-react";

export function About() {
    const secRef = useRef(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        gsap.fromTo(
            ".about-item",
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.2,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: secRef.current,
                    start: "top 80%",
                }
            }
        );
    }, []);

    return (
        <section ref={secRef} id="about" className="py-40 w-full max-w-7xl mx-auto px-6 md:px-12 bg-(--color-brand-bg)">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
                <div className="space-y-12 about-item">
                    <div>
                        <p className="text-xs tracking-[0.2em] opacity-50 uppercase mb-4 text-(--color-brand-text)">Cerita</p>
                        <h2 className="text-4xl md:text-6xl font-normal tracking-tight lowercase text-(--color-brand-text)">
                            ruang untuk <br /> <span className="text-(--color-brand-secondary) font-serif italic">semua rasa.</span>
                        </h2>
                    </div>
                    <p className="text-xl text-(--color-brand-text)/70 font-light leading-relaxed lowercase max-w-md">
                        didesain dengan nuansa yang tenang dan natural, rumah waduk menawarkan tempat pelarian dari hiruk-pikuk kota. nikmati pemandangan matahari terbenam yang memukau sambil menikmati hidangan kami.
                    </p>
                    <div className="flex items-center space-x-3 text-(--color-brand-primary)">
                        <Star className="w-5 h-5 fill-current" />
                        <span className="font-medium text-(--color-brand-text)/80 lowercase">4.7/5 dari ulasan pilihan</span>
                    </div>
                </div>
                {/* Clean image block without heavy glassmorphism for better florporto emulation */}
                <div className="relative aspect-[3/4] w-full rounded-sm overflow-hidden about-item flex items-center justify-center bg-(--color-brand-secondary)/10">
                    <img src="/assets/image/ARJ09014.jpg" alt="Interior Rumah Waduk" className="absolute inset-0 w-full h-full object-cover filter brightness-95" />
                    <span className="text-(--color-brand-secondary) font-light lowercase z-10 opacity-0">waktu luang</span>
                </div>
            </div>
        </section>
    );
}

export function Info() {
    const infoRef = useRef(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        gsap.fromTo(
            ".info-card",
            { y: 30, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.15,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: infoRef.current,
                    start: "top 85%",
                }
            }
        );
    }, []);

    return (
        <section ref={infoRef} id="info" className="py-32 w-full bg-(--color-brand-secondary) text-(--color-brand-bg)">
            <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
                <div className="col-span-1 lg:col-span-1 info-card flex items-center">
                    <h2 className="text-4xl md:text-5xl font-light tracking-tight lowercase">
                        kunjungi <br /> <span className="font-serif italic font-medium opacity-90">kami.</span>
                    </h2>
                </div>

                <div className="info-card flex flex-col items-start space-y-6">
                    <div className="text-(--color-brand-primary)">
                        <Clock className="w-8 h-8 stroke-[1.5]" />
                    </div>
                    <div>
                        <h3 className="text-sm tracking-[0.2em] uppercase opacity-70 mb-3">Jam Buka</h3>
                        <p className="text-lg font-light lowercase leading-relaxed">
                            buka setiap hari <br /> 16:00 - 23:00 wita
                        </p>
                    </div>
                </div>

                <div className="info-card flex flex-col items-start space-y-6">
                    <div className="text-(--color-brand-primary)">
                        <MapPin className="w-8 h-8 stroke-[1.5]" />
                    </div>
                    <div>
                        <h3 className="text-sm tracking-[0.2em] uppercase opacity-70 mb-3">Lokasi</h3>
                        <p className="text-lg font-light lowercase leading-relaxed">
                            jl. waduk tunggu pampang no.47<br />
                            bangkala, kec. manggala, makassar
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
