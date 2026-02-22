"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(!isOpen);

    // Overlay Animation Variants
    const overlayVariants = {
        closed: { opacity: 0, y: "-10%" },
        open: { opacity: 1, y: "0%", transition: { duration: 0.6, ease: "easeOut" as const } }
    };

    const linkVariants = {
        closed: { y: 20, opacity: 0 },
        open: (i: number) => ({
            y: 0,
            opacity: 1,
            transition: { delay: 0.2 + (0.1 * i), duration: 0.6, ease: "easeOut" as const }
        })
    };

    return (
        <>
            {/* Top Fixed Header matches florporto.com */}
            <header className={`fixed top-0 left-0 w-full z-[80] px-6 md:px-12 py-8 flex justify-between items-center bg-transparent pointer-events-none transition-colors duration-500 ${isOpen ? 'text-white' : 'text-(--color-brand-text)'}`}>

                {/* Logo Section (Acts as Home Button) */}
                <div className="pointer-events-auto">
                    <a href="#home" onClick={() => setIsOpen(false)} className="flex items-center space-x-2">
                        <div className={`relative w-32 h-10 md:w-40 md:h-12 transition-all duration-500 ${isOpen ? 'brightness-0 invert' : ''}`}>
                            <Image
                                src="/assets/rumahwaduk_logo.png"
                                alt="Rumah Waduk Logo"
                                fill
                                className="object-contain object-left"
                                priority
                            />
                        </div>
                    </a>
                </div>

                {/* Right Actions Section (Language, Book, Burger Menu) */}
                <div className="flex items-center space-x-6 md:space-x-10 pointer-events-auto">
                    <div className="hidden md:flex items-center space-x-6 text-xs font-semibold tracking-widest opacity-90 uppercase">
                        <button className="hover:opacity-60 transition-opacity">ID / EN</button>
                        <button className="hover:opacity-60 transition-opacity">book a table</button>
                    </div>

                    {/* Florporto Style Burger / Close Button */}
                    <button
                        onClick={toggleMenu}
                        className="group flex flex-col justify-center items-end w-8 h-8 space-y-2 pointer-events-auto focus:outline-none z-[90]"
                        aria-label="Toggle Menu"
                    >
                        <span className={`block h-[1px] transition-all duration-300 ease-in-out ${isOpen ? 'w-8 rotate-45 translate-y-[9px] bg-white' : 'w-8 bg-current group-hover:w-6'}`}></span>
                        <span className={`block h-[1px] transition-all duration-300 ease-in-out ${isOpen ? 'w-8 -rotate-45 -translate-y-[9px] bg-white' : 'w-6 bg-current group-hover:w-8'}`}></span>
                    </button>
                </div>
            </header>

            {/* Full-Screen Navigation Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={overlayVariants}
                        className="fixed inset-0 z-[70] bg-[#3B3A36]/90 text-white flex flex-col"
                        style={{ backdropFilter: "blur(20px)" }}
                    >
                        {/* Main Overlay Content */}
                        <div className="flex-1 w-full max-w-[1400px] mx-auto px-6 md:px-16 flex flex-col md:flex-row items-start justify-between pt-40 pb-16 h-full overflow-y-auto relative">

                            {/* Navigation Links Column (Left) */}
                            <div className="flex flex-col space-y-6 md:space-y-8 w-full md:w-1/3 z-10 mt-0">
                                <p className="text-[10px] tracking-[0.2em] opacity-60 uppercase mb-2 font-medium">Navigation</p>
                                {['Home', 'Menu', 'About', 'Gallery'].map((item, i) => (
                                    <motion.a
                                        key={item}
                                        href={`#${item.toLowerCase()}`}
                                        onClick={toggleMenu}
                                        custom={i}
                                        variants={linkVariants}
                                        className="text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight hover:text-[#A4B28C] mb-2 transition-colors"
                                    >
                                        {item}
                                    </motion.a>
                                ))}
                            </div>

                            {/* Center Blurred Image (Florporto style) */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1, transition: { delay: 0.4, duration: 1 } }}
                                className="hidden md:flex absolute inset-0 w-full h-[80%] mt-20 items-center justify-center pointer-events-none z-0"
                            >
                                <div className="w-[60%] h-full relative overflow-hidden rounded-sm mix-blend-lighten opacity-30 blur-[4px]">
                                    {/* Using standard img tag to prevent next/image loading issues in dev */}
                                    <img src="/assets/image/ARJ09250.jpg" alt="Rumah Waduk Menu Background" className="object-cover w-full h-full" />
                                </div>
                            </motion.div>

                            {/* Contact & Hours Column (Right) */}
                            <div className="flex flex-col space-y-8 w-full md:w-1/3 md:pl-24 z-10 mt-12 md:mt-0">
                                <p className="text-[10px] tracking-[0.2em] opacity-60 uppercase mb-2 font-medium hidden md:block">Contact & Hours</p>

                                <motion.div variants={linkVariants} custom={2} className="space-y-2">
                                    <h3 className="text-sm font-medium opacity-100">Address</h3>
                                    <p className="text-xs opacity-80 font-normal leading-relaxed">
                                        Jl. Waduk Tunggu Pampang No.47<br />
                                        Bangkala, Manggala, Makassar
                                    </p>
                                </motion.div>

                                <motion.div variants={linkVariants} custom={3} className="space-y-2">
                                    <h3 className="text-sm font-medium opacity-100">Phone</h3>
                                    <p className="text-xs opacity-80 font-normal">
                                        +62 812 3456 7890
                                    </p>
                                </motion.div>

                                <motion.div variants={linkVariants} custom={4} className="space-y-2">
                                    <h3 className="text-sm font-medium opacity-100">Email</h3>
                                    <p className="text-xs opacity-80 font-normal">
                                        hello@rumahwaduk.com
                                    </p>
                                </motion.div>

                                <motion.div variants={linkVariants} custom={5} className="space-y-2">
                                    <h3 className="text-sm font-medium opacity-100">Hours</h3>
                                    <p className="text-xs opacity-80 font-normal leading-relaxed">
                                        open daily 16:00 to 23:00
                                    </p>
                                </motion.div>
                            </div>

                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
