import Image from "next/image";

export default function PromoFeatures() {
   return (
      <div className="w-full pt-2 border-t border-white/5 text-sm text-white/80">
         <nav aria-label="Promotional features" className="w-full">
            <ul className="flex flex-col sm:flex-row items-center justify-center">
               <li className="w-full sm:w-1/3 flex items-center justify-center gap-3 px-4 py-3 text-center">
                  <Image
                     src="https://primeputt.com/cdn/shop/files/american-flag-us-flag-usa-flag-on-the-circle-shape-format-png-1.webp?v=1743086285&width=140"
                     alt="Made in the USA"
                     width={24}
                     height={24}
                  />
                  <span>Made in the USA</span>
               </li>

               <li
                  aria-hidden
                  className="hidden sm:block h-6 w-px bg-white/20 mx-2"
               />

               <li className="w-full sm:w-1/3 flex items-center justify-center gap-3 px-4 py-3 text-center">
                  <Image
                     src="https://primeputt.com/cdn/shop/files/fi_2829963.svg?v=1695711715&width=140"
                     alt="Stimpmeter Rating"
                     width={24}
                     height={24}
                  />
                  <div className="flex flex-col leading-tight">
                     <span className="text-[13px] text-white/80">
                        Stimpmeter
                     </span>
                     <span className="text-sm font-medium">Rating: 9–11</span>
                  </div>
               </li>

               <li
                  aria-hidden
                  className="hidden sm:block h-6 w-px bg-white/20 mx-2"
               />

               <li className="w-full sm:w-1/3 flex items-center justify-center gap-3 px-4 py-3 text-center">
                  <Image
                     src="https://primeputt.com/cdn/shop/files/fi_1585176.svg?v=1695711715&width=140"
                     alt="Free shipping in Continental US"
                     width={24}
                     height={24}
                  />
                  <div className="flex flex-col leading-tight">
                     <span className="text-[13px] text-white/80">
                        Free shipping in
                     </span>
                     <span className="text-sm font-medium">Continental US</span>
                  </div>
               </li>
            </ul>
         </nav>
      </div>
   );
}
