"use client";

import { useState, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Section = {
   id: string;
   title: string;
   content?: ReactNode;
   icon?: ReactNode;
};

export default function Accordion({ sections }: { sections: Section[] }) {
   const [openId, setOpenId] = useState<string | null>(null);

   function toggle(id: string) {
      setOpenId((prev) => (prev === id ? null : id));
   }

   return (
      <div className="w-full mt-4 border-t border-white/5 text-sm text-white/80">
         <ul className="divide-y divide-white/5">
            {sections.map((s) => {
               const isOpen = openId === s.id;
               return (
                  <li key={s.id} className="py-4">
                     <button
                        onClick={() => toggle(s.id)}
                        className="w-full flex items-center justify-between gap-4 text-left px-2 py-2 hover:bg-white/2 rounded transition"
                        aria-expanded={isOpen}
                     >
                        <div className="flex items-center gap-3">
                           <div className="w-5 h-5 flex items-center justify-center text-white/70">
                              {s.icon ?? (
                                 <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                 >
                                    <path
                                       d="M12 2a10 10 0 100 20 10 10 0 000-20z"
                                       stroke="#ffffff66"
                                       strokeWidth="1"
                                       fill="none"
                                    />
                                    <path
                                       d="M9 12h6"
                                       stroke="#ffffffcc"
                                       strokeWidth="1.5"
                                       strokeLinecap="round"
                                    />
                                 </svg>
                              )}
                           </div>

                           <span
                              className={`font-medium ${
                                 isOpen ? "text-white" : "text-white/90"
                              }`}
                           >
                              {s.title}
                           </span>
                        </div>

                        {/* Single arrow SVG rotated based on isOpen (down when open) */}
                        <svg
                           className={`transform transition-transform duration-150 ${
                              isOpen ? "rotate-180" : "rotate-0"
                           }`}
                           xmlns="http://www.w3.org/2000/svg"
                           width="24"
                           height="24"
                           viewBox="0 0 24 24"
                           fill="none"
                        >
                           <path
                              d="M11 16.172L11 4L13 4L13 16.172L18.364 10.808L19.778 12.222L12 20L4.22196 12.222L5.63595 10.808L11 16.172Z"
                              fill="#D9D9D9"
                           ></path>
                        </svg>
                     </button>

                     <AnimatePresence initial={false}>
                        {isOpen && (
                           <motion.div
                              key={s.id}
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.28, ease: "easeInOut" }}
                              className="mt-3 px-2 text-white/70 overflow-hidden"
                           >
                              <div className="py-1">
                                 {s.content ??
                                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
                              </div>
                           </motion.div>
                        )}
                     </AnimatePresence>
                  </li>
               );
            })}
         </ul>
      </div>
   );
}
