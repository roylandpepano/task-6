"use client";

import Image from "next/image";

export default function PromoBanner() {
   return (
      <div className="bg-[#0d0e0f] rounded-lg flex flex-row items-center w-full pointer-events-auto absolute left-1/2 bottom-4 transform -translate-x-1/2 z-20 w-[92%] max-w-3xl">
         <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-[#0f0f0f] rounded-md">
            <Image
               src="/icons/sports.png"
               alt="Promo Logo"
               width={40}
               height={40}
               className="ml-5"
            />
         </div>

         <div className="flex-1 min-w-0 p-5">
            <div className="text-xs text-[#ffb84d] font-medium mb-2">
               Official putting mat of the Korn Ferry Tour Championship
            </div>
            <div className="text-sm sm:text-base text-white font-semibold leading-tight">
               Train on the only putting mat officially recognized by a pro
               tour.
            </div>
         </div>
      </div>
   );
}
