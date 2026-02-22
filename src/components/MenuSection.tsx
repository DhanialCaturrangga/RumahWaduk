"use client";

import { useState, useRef, useEffect } from "react";
import { menuData, MenuItem } from "@/data/menu";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function MenuSection() {
    const [activeTab, setActiveTab] = useState(menuData[0].category);
    const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
    const sectionRef = useRef(null);

    const activeItems = menuData.find(m => m.category === activeTab)?.items || [];

    // GSAP scroll trigger for the whole section
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        gsap.fromTo(
            ".menu-header",
            { y: 30, opacity: 0 },
            {
                y: 0, opacity: 1, duration: 0.8, ease: "power2.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%"
                }
            }
        );
    }, []);

    // Handle locking body scroll when sidebar is open
    useEffect(() => {
        if (selectedItem) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [selectedItem]);

    return (
        <section ref={sectionRef} id="menu" className="py-24 w-full max-w-6xl mx-auto px-6 relative">
            <div className="menu-header mb-12 flex flex-col items-center">
                <h2 className="text-4xl md:text-5xl font-semibold lowercase mb-8">menu kami.</h2>

                {/* Category Tabs */}
                <div className="flex flex-wrap justify-center gap-4">
                    {menuData.map((cat) => (
                        <button
                            key={cat.category}
                            onClick={() => setActiveTab(cat.category)}
                            className={`px-6 py-2 rounded-full text-sm font-medium lowercase transition-all duration-300 ${activeTab === cat.category
                                ? "bg-(--color-brand-text) text-(--color-brand-bg) shadow-md"
                                : "glass-panel hover:bg-black/5 text-(--color-brand-text)/70 border-none shadow-sm"
                                }`}
                        >
                            {cat.category}
                        </button>
                    ))}
                </div>
            </div>

            {/* Menu Grid - 2-row horizontal scroll */}
            <div className="w-full overflow-x-auto pb-12 pt-4 snap-x snap-mandatory scrollbar-hide -mx-6 px-6 relative">
                <motion.div
                    layout
                    className="grid grid-rows-2 grid-flow-col auto-cols-[85vw] md:auto-cols-[400px] gap-6 md:gap-8 w-fit"
                >
                    <AnimatePresence mode="popLayout">
                        {activeItems.map((item) => (
                            <motion.div
                                key={item.id}
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.4 }}
                                onClick={() => setSelectedItem(item)}
                                className="snap-center glass-panel p-8 cursor-pointer group hover:bg-(--color-brand-secondary)/5 transition-colors border border-black/5 flex flex-col justify-between h-full"
                            >
                                <div>
                                    <div className="flex justify-between items-start mb-4 gap-4">
                                        <h3 className="text-xl md:text-2xl font-light lowercase group-hover:text-(--color-brand-secondary) transition-colors">{item.name}</h3>
                                        <span className="text-(--color-brand-primary) font-medium tracking-wide text-sm whitespace-nowrap">{item.price}</span>
                                    </div>
                                    <p className="text-(--color-brand-text)/50 text-sm font-light lowercase line-clamp-3 leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>
                                <div className="mt-8 flex justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="w-8 h-8 rounded-full border border-(--color-brand-primary)/30 flex items-center justify-center text-(--color-brand-primary)">
                                        <ChevronRight className="w-4 h-4" />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>

            {/* Sidebar Overlay */}
            <AnimatePresence>
                {selectedItem && (
                    <>
                        <motion.div
                            key="overlay"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedItem(null)}
                            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[60]"
                        />
                        <motion.div
                            key="sidebar"
                            initial={{ x: "100%" }}
                            animate={{ x: "0%" }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 h-full w-full max-w-md bg-(--color-brand-bg)/95 backdrop-blur-2xl z-[70] shadow-2xl border-l border-white/20 p-8 flex flex-col overflow-y-auto"
                        >
                            <button
                                onClick={() => setSelectedItem(null)}
                                className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center hover:bg-black/10 transition-colors self-end mb-8"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <div className="flex-1">
                                <div className="w-full aspect-[4/3] rounded-3xl bg-(--color-brand-primary)/10 flex items-center justify-center overflow-hidden mb-8 shadow-inner">
                                    {/* Image placeholder - will be replaced by actual high-res assets */}
                                    <div
                                        className="w-full h-full bg-cover bg-center transition-transform hover:scale-105 duration-700"
                                        style={{ backgroundImage: `url(${selectedItem.image})` }}
                                    >
                                        <div className="w-full h-full bg-black/5 flex items-center justify-center backdrop-blur-[2px]">
                                            <span className="text-white/80 lowercase text-sm">asset: {selectedItem.image.split('/').pop()}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex justify-between items-end">
                                        <h2 className="text-3xl font-semibold lowercase leading-none">{selectedItem.name}</h2>
                                        <span className="text-xl text-(--color-brand-primary) font-semibold">{selectedItem.price}</span>
                                    </div>
                                    <div className="w-full h-[1px] bg-black/10 my-6" />
                                    <p className="text-(--color-brand-text)/80 leading-relaxed font-light lowercase text-lg">
                                        {selectedItem.description}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

        </section>
    );
}
