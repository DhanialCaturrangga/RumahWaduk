"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isReservationOpen, setIsReservationOpen] = useState(false);

    const toggleMenu = () => {
        if (isReservationOpen) setIsReservationOpen(false);
        setIsOpen(!isOpen);
    };

    const toggleReservation = () => {
        if (isOpen) setIsOpen(false);
        setIsReservationOpen(!isReservationOpen);
    };

    // Full-Screen Menu Overlay Animation Variants
    const overlayVariants = {
        closed: { opacity: 0, y: "-10%" },
        open: { opacity: 1, y: "0%", transition: { duration: 0.6, ease: "easeOut" as const } }
    };

    // Slide-out Reservation Panel Variants
    const reservationPanelVariants = {
        closed: { x: "100%", transition: { duration: 0.5, ease: "easeInOut" as const } },
        open: { x: "0%", transition: { duration: 0.5, ease: "easeOut" as const } }
    };

    const blurBackdropVariants = {
        closed: { opacity: 0, transition: { duration: 0.3 } },
        open: { opacity: 1, transition: { duration: 0.3 } }
    };

    const linkVariants = {
        closed: { y: 20, opacity: 0 },
        open: (i: number) => ({
            y: 0,
            opacity: 1,
            transition: { delay: 0.2 + (0.1 * i), duration: 0.6, ease: "easeOut" as const }
        })
    };

    // Reservation Form States
    const [resName, setResName] = useState("");
    const [resDate, setResDate] = useState(() => new Date().toISOString().split('T')[0]);
    const [resTime, setResTime] = useState("18:00");
    const [resGuests, setResGuests] = useState("");
    const [resArea, setResArea] = useState("");
    const [resNotes, setResNotes] = useState("");

    const handleReservationSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Target WhatsApp Number (without + and spaces)
        const waNumber = "6285173113170";

        // Format the WhatsApp message
        const message = `Halo Rumah Waduk,%0A%0ASaya ingin reservasi meja dengan detail berikut:%0A- Nama: ${resName}%0A- Tanggal: ${resDate}%0A- Jam: ${resTime}%0A- Jumlah Tamu: ${resGuests}%0A- Area: ${resArea}%0A- Catatan: ${resNotes || "-"}%0A%0AMohon konfirmasi ketersediaannya. Terima kasih!`;

        // Open WhatsApp Web/App
        window.open(`https://wa.me/${waNumber}?text=${message}`, '_blank');

        // Optional: close the panel after sending
        setIsReservationOpen(false);
    };

    return (
        <>
            {/* Top Fixed Header matches florporto.com */}
            {/* The color changes depending on either the menu or the reservation panel being open */}
            <header className={`fixed top-0 left-0 w-full z-[80] px-6 md:px-12 py-8 flex justify-between items-center bg-transparent pointer-events-none transition-colors duration-500 ${(isOpen || isReservationOpen) ? 'text-white' : 'text-(--color-brand-text)'}`}>

                {/* Logo Section (Acts as Home Button) */}
                <div className="pointer-events-auto z-[100]">
                    <a href="#home" onClick={() => { setIsOpen(false); setIsReservationOpen(false); }} className="flex items-center space-x-2">
                        <div className={`relative w-32 h-10 md:w-40 md:h-12 transition-all duration-500 ${(isOpen || isReservationOpen) ? 'brightness-0 invert' : ''}`}>
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
                <div className="flex items-center space-x-6 md:space-x-10 pointer-events-auto z-[100]">
                    <div className="hidden md:flex items-center space-x-6 text-xs font-semibold tracking-widest opacity-90 uppercase">
                        <button className="hover:opacity-60 transition-opacity">ID / EN</button>
                        <button onClick={toggleReservation} className="hover:opacity-60 transition-opacity">
                            {isReservationOpen ? 'tutup' : 'book a table'}
                        </button>
                    </div>

                    {/* Florporto Style Burger / Close Button */}
                    <button
                        onClick={isReservationOpen ? toggleReservation : toggleMenu}
                        className={`group flex flex-col justify-center items-end w-8 h-8 space-y-2 pointer-events-auto focus:outline-none transition-all duration-300 ${(isReservationOpen && 'md:hidden')} `}
                        aria-label="Toggle Menu"
                    >
                        <span className={`block h-[1px] transition-all duration-300 ease-in-out ${(isOpen || isReservationOpen) ? 'w-8 rotate-45 translate-y-[9px] bg-white' : 'w-8 bg-current group-hover:w-6'}`}></span>
                        <span className={`block h-[1px] transition-all duration-300 ease-in-out ${(isOpen || isReservationOpen) ? 'w-8 -rotate-45 -translate-y-[9px] bg-white' : 'w-6 bg-current group-hover:w-8'}`}></span>
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
                        className="fixed inset-0 z-[70] bg-[#3B3A36]/50 text-white flex flex-col"
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
                                <motion.button
                                    onClick={() => { toggleMenu(); toggleReservation(); }}
                                    custom={4}
                                    variants={linkVariants}
                                    className="text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight hover:text-[#A4B28C] mb-2 transition-colors text-left md:hidden"
                                >
                                    Reservasi
                                </motion.button>
                            </div>

                            {/* Center Blurred Image (Florporto style) */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1, transition: { delay: 0.4, duration: 1 } }}
                                className="hidden md:flex absolute inset-0 w-full h-[80%] mt-20 items-center justify-center pointer-events-none z-0"
                            >
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

            {/* Slide-out Reservation Panel */}
            <AnimatePresence>
                {isReservationOpen && (
                    <>
                        {/* Blur Backdrop (covers the entire screen) */}
                        <motion.div
                            initial="closed"
                            animate="open"
                            exit="closed"
                            variants={blurBackdropVariants}
                            onClick={toggleReservation}
                            className="fixed inset-0 z-[85] bg-black/60 backdrop-blur-sm"
                        />

                        {/* Slide-in Panel from the Right */}
                        <motion.div
                            initial="closed"
                            animate="open"
                            exit="closed"
                            variants={reservationPanelVariants}
                            className="fixed top-0 right-0 h-screen w-full md:w-[500px] bg-(--color-brand-bg) text-(--color-brand-text) z-[95] shadow-2xl flex flex-col pt-32 px-8 pb-12 overflow-y-auto"
                        >
                            {/* Panel specific Close button logic handled securely by the top bar mostly, but we add a specific one anyway */}
                            <button
                                onClick={toggleReservation}
                                className="absolute top-10 right-8 w-8 h-8 flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity md:hidden"
                                aria-label="Close Reservation"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>

                            <div className="mb-10">
                                <h2 className="text-4xl md:text-5xl font-light tracking-tight lowercase">
                                    reservasi <span className="font-serif italic text-(--color-brand-secondary) font-medium">meja.</span>
                                </h2>
                                <p className="text-sm opacity-60 font-light lowercase mt-4 leading-relaxed">
                                    tentukan waktu terbaik Anda. silakan lengkapi detail pesanan untuk suasana santai di tepi waduk.
                                </p>
                            </div>

                            <form className="flex flex-col space-y-8 flex-grow" onSubmit={handleReservationSubmit}>
                                {/* Name Input */}
                                <div className="space-y-3 relative">
                                    <label className="text-[10px] uppercase tracking-[0.2em] font-medium opacity-50">nama lengkap</label>
                                    <input
                                        type="text"
                                        className="w-full bg-transparent border-b border-black/20 pb-3 focus:outline-none focus:border-(--color-brand-secondary) transition-colors text-base font-light font-sans rounded-none"
                                        required
                                        placeholder="nama anda"
                                        value={resName}
                                        onChange={(e) => setResName(e.target.value)}
                                    />
                                </div>

                                {/* Date Input */}
                                <div className="space-y-3 relative">
                                    <label className="text-[10px] uppercase tracking-[0.2em] font-medium opacity-50">tanggal</label>
                                    <input
                                        type="date"
                                        className="w-full bg-transparent border-b border-black/20 pb-3 focus:outline-none focus:border-(--color-brand-secondary) transition-colors text-base font-light font-sans appearance-none rounded-none"
                                        required
                                        value={resDate}
                                        onChange={(e) => setResDate(e.target.value)}
                                    />
                                </div>

                                {/* Time Input */}
                                <div className="space-y-3 relative">
                                    <label className="text-[10px] uppercase tracking-[0.2em] font-medium opacity-50">jam</label>
                                    <input
                                        type="time"
                                        className="w-full bg-transparent border-b border-black/20 pb-3 focus:outline-none focus:border-(--color-brand-secondary) transition-colors text-base font-light font-sans appearance-none rounded-none"
                                        required
                                        value={resTime}
                                        onChange={(e) => setResTime(e.target.value)}
                                    />
                                </div>

                                {/* Number of Guests */}
                                <div className="space-y-3 relative">
                                    <label className="text-[10px] uppercase tracking-[0.2em] font-medium opacity-50">jumlah tamu</label>
                                    <select
                                        className="w-full bg-transparent border-b border-black/20 pb-3 focus:outline-none focus:border-(--color-brand-secondary) transition-colors text-base font-light font-sans appearance-none rounded-none cursor-pointer"
                                        required
                                        value={resGuests}
                                        onChange={(e) => setResGuests(e.target.value)}
                                    >
                                        <option value="" disabled>pilih jumlah orang...</option>
                                        <option value="1-2 pax">1 - 2 pax</option>
                                        <option value="3-4 pax">3 - 4 pax</option>
                                        <option value="5-6 pax">5 - 6 pax</option>
                                        <option value="7+ pax (Grup)">7+ pax (Grup)</option>
                                    </select>
                                    {/* Custom Dropdown Arrow */}
                                    <span className="absolute right-0 bottom-4 pointer-events-none opacity-50">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6" /></svg>
                                    </span>
                                </div>

                                {/* Seating Area */}
                                <div className="space-y-3 relative">
                                    <label className="text-[10px] uppercase tracking-[0.2em] font-medium opacity-50">area duduk</label>
                                    <select
                                        className="w-full bg-transparent border-b border-black/20 pb-3 focus:outline-none focus:border-(--color-brand-secondary) transition-colors text-base font-light font-sans appearance-none rounded-none cursor-pointer"
                                        required
                                        value={resArea}
                                        onChange={(e) => setResArea(e.target.value)}
                                    >
                                        <option value="" disabled>pilih area...</option>
                                        <option value="Indoor (AC)">Indoor (AC)</option>
                                        <option value="Outdoor (Tepi Waduk)">Outdoor (Tepi Waduk)</option>
                                        <option value="Semi Outdoor (Teras)">Semi Outdoor (Teras)</option>
                                    </select>
                                    <span className="absolute right-0 bottom-4 pointer-events-none opacity-50">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6" /></svg>
                                    </span>
                                </div>

                                {/* Notes Input */}
                                <div className="space-y-3 relative">
                                    <label className="text-[10px] uppercase tracking-[0.2em] font-medium opacity-50">catatan khusus (opsional)</label>
                                    <textarea
                                        className="w-full bg-transparent border-b border-black/20 pb-3 h-12 focus:outline-none focus:border-(--color-brand-secondary) transition-colors text-base font-light font-sans resize-none"
                                        placeholder="ada permintaan khusus atau alergi?"
                                        value={resNotes}
                                        onChange={(e) => setResNotes(e.target.value)}
                                    />
                                </div>

                                <div className="pt-8 mt-auto hidden md:block" />

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    className="w-full bg-(--color-brand-secondary) text-(--color-brand-bg) py-4 mt-6 text-xs tracking-[0.2em] font-semibold uppercase hover:opacity-90 transition-opacity"
                                >
                                    konfirmasi pesanan
                                </motion.button>
                            </form>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
