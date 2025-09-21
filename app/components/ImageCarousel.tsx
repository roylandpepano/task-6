"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
   images: string[];
};

const VIDEO_SRC =
   "//primeputt.com/cdn/shop/videos/c/vp/fad11395d8044947afe8e699c64ceda1/fad11395d8044947afe8e699c64ceda1.HD-720p-1.6Mbps-19649230.mp4?v=0";
const VIDEO_POSTER =
   "//primeputt.com/cdn/shop/files/preview_images/fad11395d8044947afe8e699c64ceda1.thumbnail.0000000000_2048x.jpg?v=1697759017";

export default function ImageCarousel({ images }: Props) {
   const [index, setIndex] = useState(0);
   const [modalIndex, setModalIndex] = useState<number | null>(null);
   const closeBtnRef = useRef<HTMLButtonElement | null>(null);
   const thumbsRef = useRef<HTMLDivElement | null>(null);

   useEffect(() => {
      function onKey(e: KeyboardEvent) {
         if (modalIndex === null) {
            if (e.key === "ArrowRight") next();
            if (e.key === "ArrowLeft") prev();
         }
         if (e.key === "Escape" && modalIndex !== null) setModalIndex(null);
      }
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
   }, [index, modalIndex]);

   // lock scrolling when modal is open
   useEffect(() => {
      const prev = document.body.style.overflow;
      if (modalIndex !== null) {
         document.body.style.overflow = "hidden";
      } else {
         document.body.style.overflow = prev;
      }
      return () => {
         document.body.style.overflow = prev;
      };
   }, [modalIndex]);

   // focus the close button when modal opens for accessibility
   useEffect(() => {
      if (modalIndex !== null) {
         // small timeout to ensure element is mounted
         setTimeout(() => closeBtnRef.current?.focus(), 50);
      }
   }, [modalIndex]);

   useEffect(() => {
      // ensure selected thumbnail is visible
      const el = thumbsRef.current?.querySelectorAll(".thumb-item")[index] as
         | HTMLElement
         | undefined;
      if (el) {
         el.scrollIntoView({
            block: "nearest",
            inline: "nearest",
            behavior: "smooth",
         });
      }
   }, [index]);

   function next() {
      setIndex((i) => (i + 1) % images.length);
   }

   function prev() {
      setIndex((i) => (i - 1 + images.length) % images.length);
   }

   if (!images || images.length === 0) return null;

   return (
      <div className="w-full mt-2">
         <div className="rounded-2xl">
            <div className="relative w-full h-[420px] rounded-xl overflow-hidden flex items-center justify-center">
               <AnimatePresence mode="wait">
                  {index === 0 ? (
                     <motion.video
                        key="video"
                        src={VIDEO_SRC}
                        poster={VIDEO_POSTER}
                        playsInline
                        controls
                        autoPlay
                        muted
                        preload="none"
                        loop
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.02 }}
                        transition={{ duration: 0.28 }}
                        className="w-full h-full rounded-lg object-cover cursor-pointer"
                        onClick={() => setModalIndex(0)}
                     />
                  ) : (
                     <motion.img
                        key={images[index]}
                        src={images[index]}
                        alt={`product-${index}`}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.02 }}
                        transition={{ duration: 0.28 }}
                        className="w-full h-full rounded-lg object-cover cursor-pointer"
                        onClick={() => setModalIndex(index)}
                     />
                  )}
               </AnimatePresence>
            </div>

            {/* Fullscreen modal rendered into document.body to avoid stacking contexts */}
            {typeof document !== "undefined" &&
               createPortal(
                  <AnimatePresence>
                     {modalIndex !== null && (
                        <motion.div
                           initial={{ opacity: 0 }}
                           animate={{ opacity: 1 }}
                           exit={{ opacity: 0 }}
                           transition={{ duration: 0.18 }}
                           className="fixed inset-0 z-[99999] flex items-start justify-center pt-6 bg-black/80"
                           role="dialog"
                           aria-modal="true"
                           onClick={() => setModalIndex(null)}
                        >
                           <div
                              className="relative w-full flex justify-center"
                              style={{ maxWidth: "95%" }}
                           >
                              {modalIndex === 0 ? (
                                 <motion.video
                                    src={VIDEO_SRC}
                                    poster={VIDEO_POSTER}
                                    controls
                                    autoPlay
                                    muted
                                    loop
                                    initial={{ scale: 0.98 }}
                                    animate={{ scale: 1 }}
                                    exit={{ scale: 0.98 }}
                                    transition={{ duration: 0.2 }}
                                    className="max-w-full object-contain rounded"
                                    style={{ maxHeight: "calc(100vh - 3rem)" }}
                                    onClick={(e) => e.stopPropagation()}
                                 />
                              ) : (
                                 <motion.img
                                    src={images[modalIndex]}
                                    alt={`fullscreen-${modalIndex}`}
                                    initial={{ scale: 0.98 }}
                                    animate={{ scale: 1 }}
                                    exit={{ scale: 0.98 }}
                                    transition={{ duration: 0.2 }}
                                    className="max-w-full object-contain rounded"
                                    style={{ maxHeight: "calc(100vh - 3rem)" }}
                                    onClick={(e) => e.stopPropagation()}
                                 />
                              )}

                              <button
                                 onClick={() => setModalIndex(null)}
                                 aria-label="Close image"
                                 ref={closeBtnRef}
                                 className="fixed top-4 right-4 z-[100000] bg-white/10 hover:bg-white/20 text-white rounded-full p-2"
                              >
                                 <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="22"
                                    height="22"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                 >
                                    <path
                                       d="M18 6L6 18M6 6l12 12"
                                       stroke="#fff"
                                       strokeWidth="1.8"
                                       strokeLinecap="round"
                                       strokeLinejoin="round"
                                    />
                                 </svg>
                              </button>
                           </div>
                        </motion.div>
                     )}
                  </AnimatePresence>,
                  document.body
               )}

            {/* Thumbnails with side arrows */}
            <div className="mt-5 flex items-center justify-center gap-4">
               <button
                  onClick={prev}
                  aria-label="Previous"
                  className="flex items-center cursor-pointer justify-center w-10 h-10 rounded-full bg-black/60 hover:bg-black/70"
               >
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     width="26"
                     height="26"
                     viewBox="0 0 24 24"
                     fill="none"
                  >
                     <path
                        d="M15 18l-6-6 6-6"
                        stroke="#fff"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                     />
                  </svg>
               </button>

               <div
                  ref={thumbsRef}
                  className="flex gap-3 items-end overflow-x-auto overflow-hidden px-2 p-2"
               >
                  {images.map((src, i) => {
                     const thumbSrc = i === 0 ? VIDEO_POSTER : src;
                     return (
                        <button
                           key={(thumbSrc || src) + i}
                           onClick={() => setIndex(i)}
                           className={`thumb-item cursor-pointer rounded-md overflow-hidden transition-all duration-150 ${
                              i === index
                                 ? "ring-2 ring-[#ffc261] scale-105"
                                 : "bg-[#111]"
                           }`}
                           style={{ width: 120, height: 72 }}
                        >
                           <div className="relative w-full h-full">
                              <img
                                 src={thumbSrc}
                                 alt={`thumb-${i}`}
                                 className="object-cover w-full h-full"
                              />
                              {i === 0 && (
                                 <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <div className="bg-black/50 rounded-full p-2">
                                       <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="24"
                                          height="24"
                                          viewBox="0 0 24 24"
                                          fill="none"
                                       >
                                          <path d="M0 0h24v24H0z" fill="none" />
                                          <path d="M8 5v14l11-7z" fill="#fff" />
                                       </svg>
                                    </div>
                                 </div>
                              )}
                           </div>
                        </button>
                     );
                  })}
               </div>

               <button
                  onClick={next}
                  aria-label="Next"
                  className="cursor-pointer flex items-center justify-center w-10 h-10 rounded-full bg-black/60 hover:bg-black/70"
               >
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     width="26"
                     height="26"
                     viewBox="0 0 24 24"
                     fill="none"
                  >
                     <path
                        d="M9 6l6 6-6 6"
                        stroke="#fff"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                     />
                  </svg>
               </button>
            </div>
         </div>
      </div>
   );
}
