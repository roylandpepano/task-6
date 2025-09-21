import Image from "next/image";
import primeputtImages from "../data/primeputtImages";

export default function Home() {
   return (
      <div className="min-h-screen bg-black text-white font-sans">
         <header className="sticky top-0 z-40 bg-black/40 backdrop-blur-md border-b border-white/5">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between relative">
               <div className="flex items-center gap-3 z-10">
                  <div className="text-xl font-bold">PrimePutt</div>
               </div>

               <nav className="hidden md:flex gap-6 text-sm text-white/80 absolute left-1/2 transform -translate-x-1/2">
                  <a className="px-2 py-1 hover:text-white">Putting Mat</a>
                  <a className="px-2 py-1 hover:text-white">All Products</a>
                  <a className="px-2 py-1 hover:text-white">Contact</a>
               </nav>

               <div className="flex items-center gap-4 text-white/80 z-10">
                  <button className="p-2 rounded hover:bg-white/5">🔍</button>
                  <button className="p-2 rounded hover:bg-white/5">👤</button>
                  <button className="p-2 rounded hover:bg-white/5">🛒</button>
               </div>
            </div>
         </header>

         <main className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Left: Image and thumbnails (static) */}
            <section className="flex flex-col items-center lg:items-start gap-6">
               <div className="w-full rounded-2xl bg-[#0f0f0f] p-8 shadow-lg">
                  <div className="relative w-full h-[420px] rounded-xl overflow-hidden flex items-center justify-center">
                     {primeputtImages[0] ? (
                        // Use plain img for external images to avoid Next.js remote config
                        // First image as main
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                           src={primeputtImages[0]}
                           alt="Product image"
                           className="object-contain w-full h-full"
                        />
                     ) : (
                        <Image
                           src="/next.svg"
                           alt="Product image"
                           width={900}
                           height={420}
                           className="object-contain"
                           priority
                        />
                     )}
                  </div>
               </div>

               <div className="w-full flex items-center gap-3 overflow-x-auto">
                  <div className="flex gap-3">
                     {primeputtImages.map((src, idx) => (
                        <div
                           key={idx}
                           className="w-24 h-14 rounded-md bg-[#111] p-1 flex items-center justify-center"
                        >
                           {/* eslint-disable-next-line @next/next/no-img-element */}
                           <img
                              src={src}
                              alt={`thumb-${idx}`}
                              className="object-contain w-full h-full"
                           />
                        </div>
                     ))}
                  </div>
               </div>
            </section>

            {/* Right: Product details */}
            <aside className="flex flex-col gap-6">
               <div className="flex items-center gap-3 text-yellow-400">
                  <svg
                     width="84"
                     height="16"
                     viewBox="0 0 84 16"
                     fill="none"
                     xmlns="http://www.w3.org/2000/svg"
                  >
                     <g fill="#FBBF24">
                        {Array.from({ length: 5 }).map((_, idx) => (
                           // simple star representation
                           <path
                              key={idx}
                              d="M8 0l2.4 5.2L16 6l-4 3.2L13.2 16 8 13.2 2.8 16 4 9.2 0 6l5.6-.8L8 0z"
                              transform={`translate(${idx * 16} 0)`}
                           />
                        ))}
                     </g>
                  </svg>
                  <div className="text-sm text-white/80">
                     238+ Reviews by PGA Pros, Coaches & Players
                  </div>
               </div>

               <h1 className="text-3xl md:text-4xl font-extrabold">
                  Tour-Quality Indoor/Outdoor Golf Putting Green
               </h1>

               <div className="text-2xl text-white/90 font-semibold">
                  ₱28,800 PHP
               </div>

               <div className="border-t border-white/5 pt-4">
                  <div className="text-sm text-white/70 mb-3">
                     Available size options:
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                     {[
                        { title: "Compact", subtitle: "9' x 1.5'" },
                        {
                           title: "Standard",
                           subtitle: "9' x 3'",
                           featured: true,
                        },
                        { title: "XL", subtitle: "12' x 3'" },
                        { title: "XXL", subtitle: "15' x 3'" },
                     ].map((opt) => (
                        <div
                           key={opt.title}
                           className={`p-3 rounded-md border ${
                              opt.featured
                                 ? "border-yellow-400 bg-white/5"
                                 : "border-white/5"
                           } text-left`}
                        >
                           <div
                              className={`text-sm font-semibold ${
                                 opt.featured ? "text-yellow-300" : "text-white"
                              }`}
                           >
                              {opt.title}
                           </div>
                           <div className="text-xs text-white/70 mt-1">
                              {opt.subtitle}
                           </div>
                        </div>
                     ))}
                  </div>
               </div>

               <div className="flex flex-col gap-3">
                  <button className="w-full bg-yellow-400 text-black font-semibold py-3 rounded-md">
                     ADD TO CART
                  </button>
                  <button className="w-full bg-purple-700 text-white font-semibold py-3 rounded-md">
                     Buy with shop
                  </button>
                  <a className="text-sm text-white/70 underline underline-offset-2 self-start">
                     More payment options
                  </a>
               </div>

               <div className="pt-2 border-t border-white/5 flex flex-wrap gap-4 text-sm text-white/80">
                  <div className="flex items-center gap-2">
                     <Image
                        src="/file.svg"
                        alt="Made in USA"
                        width={20}
                        height={20}
                     />
                     <div>Made in the USA</div>
                  </div>
                  <div className="flex items-center gap-2">
                     <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                     >
                        <circle
                           cx="12"
                           cy="12"
                           r="10"
                           stroke="white"
                           strokeOpacity="0.9"
                           strokeWidth="1.2"
                        />
                     </svg>
                     <div>Stimpmeter Rating: 9–11</div>
                  </div>
                  <div className="flex items-center gap-2">
                     <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                     >
                        <rect
                           x="3"
                           y="6"
                           width="18"
                           height="12"
                           rx="2"
                           stroke="white"
                           strokeOpacity="0.9"
                           strokeWidth="1.2"
                        />
                     </svg>
                     <div>Free shipping in Continental US</div>
                  </div>
               </div>
            </aside>
         </main>
      </div>
   );
}
