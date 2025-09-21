"use client";

import Image from "next/image";
import PromoFeatures from "./components/PromoFeatures";
import Accordion from "./components/Accordion";
import { useState, useEffect, useRef } from "react";
import primeputtImages from "../data/primeputtImages";
import ImageCarousel from "./components/ImageCarousel";
import PromoBanner from "./components/PromoBanner";

export default function Home() {
   const [selectedSize, setSelectedSize] = useState("Standard");
   const [leftScrolledUp, setLeftScrolledUp] = useState(false);
   const priceMap: Record<string, number> = {
      Compact: 21800,
      Standard: 28800,
      XL: 32300,
      XXL: 36400,
   };
   const rightRef = useRef<HTMLDivElement | null>(null);

   useEffect(() => {
      function checkWindowBottom() {
         return (
            window.innerHeight + window.scrollY >=
            document.documentElement.scrollHeight - 2
         );
      }

      function checkElementBottom(el: HTMLElement | null) {
         if (!el) return false;
         return el.scrollHeight - el.scrollTop - el.clientHeight <= 2;
      }

      function onWindowScroll() {
         const atBottom = checkWindowBottom();
         // also consider right panel bottom
         const rightAtBottom = checkElementBottom(rightRef.current);
         setLeftScrolledUp(atBottom || rightAtBottom);
      }

      function onRightScroll() {
         const rightAtBottom = checkElementBottom(rightRef.current);
         const atBottom = checkWindowBottom();
         setLeftScrolledUp(atBottom || rightAtBottom);
      }

      window.addEventListener("scroll", onWindowScroll, { passive: true });
      const el = rightRef.current;
      if (el) el.addEventListener("scroll", onRightScroll, { passive: true });
      // initial check
      onWindowScroll();

      return () => {
         window.removeEventListener("scroll", onWindowScroll);
         if (el)
            el.removeEventListener("scroll", onRightScroll as EventListener);
      };
   }, []);
   return (
      <div className="min-h-screen bg-black text-white font-sans">
         <header className="sticky top-0 z-40 bg-black/40 backdrop-blur-md border-b border-white/5">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between relative">
               <div className="flex items-center gap-3 z-10">
                  <div className="text-xl font-bold">
                     <Image
                        src={
                           "https://primeputt.com/cdn/shop/files/PrimePutt_Logo_White.png?v=1665516462"
                        }
                        width={120}
                        height={30}
                        alt={"Logo"}
                     />
                  </div>
               </div>

               <nav className="hidden md:flex gap-6 text-sm text-white/80 absolute left-1/2 transform -translate-x-1/2">
                  <a className="px-2 py-1 hover:text-white underline font-bold cursor-pointer">
                     Putting Mat
                  </a>
                  <a className="px-2 py-1 hover:text-white cursor-pointer hover:underline">
                     All Products
                  </a>
                  <a className="px-2 py-1 hover:text-white cursor-pointer hover:underline">
                     Contact
                  </a>
               </nav>

               <div className="flex items-center gap-4 text-white/80 z-10">
                  <button className="p-2 rounded hover:bg-white/5 hover:cursor-pointer hover:scale-105 transition">
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="30"
                        viewBox="0 0 24 24"
                        fill="none"
                     >
                        <g clip-path="url(#clip0_15_152)">
                           <rect width="24" height="24" />
                           <circle
                              cx="10.5"
                              cy="10.5"
                              r="6.5"
                              stroke="#C6C6C6"
                           />
                           <path
                              d="M19.6464 20.3536C19.8417 20.5488 20.1583 20.5488 20.3536 20.3536C20.5488 20.1583 20.5488 19.8417 20.3536 19.6464L19.6464 20.3536ZM20.3536 19.6464L15.3536 14.6464L14.6464 15.3536L19.6464 20.3536L20.3536 19.6464Z"
                              fill="#C6C6C6"
                           />
                        </g>
                     </svg>
                  </button>
                  <button className="p-2 rounded hover:bg-white/5 hover:cursor-pointer hover:scale-105 transition">
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="40"
                        height="40"
                        viewBox="0 0 44 44"
                        fill="none"
                     >
                        <path
                           fill-rule="evenodd"
                           clip-rule="evenodd"
                           d="M19.1176 15.3333C19.1176 14.2725 19.5267 13.2551 20.2548 12.5049C20.9828 11.7548 21.9703 11.3333 23 11.3333C24.0297 11.3333 25.0172 11.7548 25.7452 12.5049C26.4733 13.2551 26.8824 14.2725 26.8824 15.3333C26.8824 16.3942 26.4733 17.4116 25.7452 18.1618C25.0172 18.9119 24.0297 19.3333 23 19.3333C21.9703 19.3333 20.9828 18.9119 20.2548 18.1618C19.5267 17.4116 19.1176 16.3942 19.1176 15.3333ZM23 10C21.6271 10 20.3105 10.5619 19.3397 11.5621C18.3689 12.5623 17.8235 13.9188 17.8235 15.3333C17.8235 16.7478 18.3689 18.1044 19.3397 19.1046C20.3105 20.1048 21.6271 20.6667 23 20.6667C24.3729 20.6667 25.6895 20.1048 26.6603 19.1046C27.6311 18.1044 28.1765 16.7478 28.1765 15.3333C28.1765 13.9188 27.6311 12.5623 26.6603 11.5621C25.6895 10.5619 24.3729 10 23 10ZM30.2212 26.2C31.6706 27.2933 32.5894 29.1867 32.6929 32.6667H13.3071C13.4106 29.2 14.3294 27.2933 15.7659 26.2C17.3835 25 19.7647 24.6667 23 24.6667C26.2353 24.6667 28.6294 25.0133 30.2212 26.2ZM23 23.3333C19.7647 23.3333 16.9824 23.6533 15.0153 25.1333C12.9965 26.64 12 29.24 12 33.3333V34H34V33.3333C34 29.24 33.0035 26.64 30.9847 25.1333C29.0176 23.6667 26.2353 23.3333 23 23.3333Z"
                           fill="#C6C6C6"
                        ></path>
                     </svg>
                  </button>
                  <button className="p-2 rounded hover:bg-white/5 hover:cursor-pointer hover:scale-105 transition">
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="40"
                        height="40"
                        viewBox="0 0 44 44"
                        fill="none"
                     >
                        <path
                           fill-rule="evenodd"
                           clip-rule="evenodd"
                           d="M16.2154 11H12.0342L11.0153 26.0649C10.9536 26.953 11.0787 27.844 11.3826 28.6826C11.6865 29.5213 12.1628 30.2896 12.782 30.94C13.4012 31.5903 14.15 32.1088 14.9819 32.4632C15.8138 32.8176 16.7111 33.0003 17.6179 33H27.3829C28.2886 33.0002 29.1847 32.8178 30.0157 32.4642C30.8466 32.1106 31.5948 31.5933 32.2138 30.9444C32.8327 30.2955 33.3094 29.5287 33.6142 28.6916C33.9189 27.8545 34.0453 26.9649 33.9856 26.0779L32.9535 11H16.2154ZM16.2154 12.2987H13.2779L12.3385 26.1558C12.2895 26.8659 12.3898 27.5782 12.6329 28.2486C12.876 28.919 13.2569 29.5333 13.752 30.0532C14.247 30.5732 14.8456 30.9878 15.5106 31.2713C16.1756 31.5548 16.8929 31.7011 17.6179 31.7013H27.3829C28.1091 31.7029 28.8278 31.5579 29.4944 31.2752C30.161 30.9924 30.7612 30.5781 31.2576 30.058C31.7541 29.5378 32.1362 28.923 32.3801 28.2517C32.6241 27.5803 32.7247 26.8669 32.6756 26.1558L31.7229 12.2987H28.7855V13.1169C28.7855 13.927 28.6229 14.7292 28.3071 15.4776C27.9912 16.226 27.5283 16.9061 26.9447 17.4789C26.361 18.0517 25.6682 18.5061 24.9056 18.8161C24.1431 19.1262 23.3258 19.2857 22.5004 19.2857C21.6751 19.2857 20.8578 19.1262 20.0953 18.8161C19.3327 18.5061 18.6399 18.0517 18.0562 17.4789C17.4726 16.9061 17.0097 16.226 16.6938 15.4776C16.3779 14.7292 16.2154 13.927 16.2154 13.1169V12.2987ZM27.4623 12.2987H17.5386V13.1169C17.5386 14.4085 18.0613 15.6473 18.9919 16.5606C19.9224 17.4739 21.1845 17.987 22.5004 17.987C23.8164 17.987 25.0785 17.4739 26.009 16.5606C26.9396 15.6473 27.4623 14.4085 27.4623 13.1169V12.2987Z"
                           fill="#C6C6C6"
                        ></path>
                     </svg>
                  </button>
               </div>
            </div>
         </header>

         <main className="max-w-7xl mx-auto px-6 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-7xl mx-auto">
               {/* Left: Image carousel */}
               <section
                  className={`w-full sticky top-24 self-start ${
                     leftScrolledUp
                        ? "-translate-y-10 transition-transform duration-300"
                        : ""
                  }`}
               >
                  <ImageCarousel images={primeputtImages} />
                  <div className="mt-[15vh]">
                     <PromoBanner />
                  </div>
               </section>

               {/* Right: Product details */}
               <aside
                  ref={rightRef}
                  className="flex flex-col gap-6 scrollbar-hide overflow-auto p-2"
                  style={{ maxHeight: "calc(100vh - 6rem)" }}
               >
                  <div className="flex items-center gap-3 text-yellow-400">
                     <svg
                        width="84"
                        height="16"
                        viewBox="0 0 84 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                     >
                        <g fill="#ffc261">
                           {Array.from({ length: 5 }).map((_, idx) => (
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

                  <h1 className="text-2xl md:text-4xl font-extrabold">
                     Tour-Quality Indoor/Outdoor Golf Putting Green
                  </h1>

                  <div className="text-4xl text-white/90 font-semibold mt-5">
                     {`₱${priceMap[selectedSize].toLocaleString("en-US")} PHP`}
                  </div>

                  <hr />

                  <div className="border-t border-white/5 ">
                     <div className="text-sm text-white/70 mb-3">
                        Available size options:
                     </div>

                     <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {[
                           {
                              title: "Compact",
                              label: "Single Hole",
                              subtitle: "9' x 1.5'",
                           },
                           {
                              title: "Standard",
                              label: "",
                              subtitle: "9' x 3'",
                           },
                           { title: "XL", label: "", subtitle: "12' x 3'" },
                           { title: "XXL", label: "", subtitle: "15' x 3'" },
                        ].map((opt) => {
                           const selected = selectedSize === opt.title;
                           return (
                              <button
                                 key={opt.title}
                                 onClick={() => setSelectedSize(opt.title)}
                                 className={`bg-[#101112] hover:cursor-pointer p-4 rounded-md text-center transition transform focus:outline-none flex flex-col items-center justify-between ${
                                    selected
                                       ? "border-2 border-[#ffc261] bg-white/5 scale-105 shadow-lg"
                                       : "border border-white/5 hover:border-white/20 hover:bg-white/2"
                                 }`}
                                 style={{ height: 96 }}
                              >
                                 <div
                                    className={`text-sm font-semibold ${
                                       selected
                                          ? "text-[#ffc261]"
                                          : "text-white"
                                    }`}
                                 >
                                    {opt.title}
                                 </div>

                                 <div className="flex-1 flex items-center justify-center">
                                    <div className="text-[10px] text-white/60">
                                       {opt.label}
                                    </div>
                                 </div>

                                 <div className="text-xs text-white/70">
                                    {opt.subtitle}
                                 </div>
                              </button>
                           );
                        })}
                     </div>
                  </div>

                  <div className="flex flex-col gap-3">
                     <button className="hover:bg-[#ffb848] w-full bg-[#ffc261] text-black font-semibold py-3 rounded-md cursor-pointer">
                        ADD TO CART
                     </button>
                     <button className="w-full hover:bg-[#421de9] bg-[#5534eb] cursor-pointer text-white font-semibold py-3 rounded-md flex items-center justify-center gap-1">
                        Buy with
                        <span className="flex items-center">
                           <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="50"
                              height="30"
                              aria-labelledby="shop-logo"
                              viewBox="0 -15 206 81"
                           >
                              <title id="shop-logo">Shop</title>
                              <path
                                 id="shop-logo"
                                 fill="#fff"
                                 d="M29.514 35.18c-7.934-1.697-11.469-2.36-11.469-5.374 0-2.834 2.392-4.246 7.176-4.246 4.207 0 7.283 1.813 9.546 5.363.171.274.524.369.812.222l8.927-4.447a.616.616 0 0 0 .256-.864c-3.705-6.332-10.55-9.798-19.562-9.798-11.843 0-19.2 5.752-19.2 14.898 0 9.714 8.96 12.169 16.904 13.865 7.944 1.697 11.49 2.36 11.49 5.373 0 3.014-2.584 4.436-7.742 4.436-4.763 0-8.297-2.15-10.433-6.321a.63.63 0 0 0-.843-.274L6.47 52.364a.623.623 0 0 0-.278.843c3.535 7.006 10.785 10.947 20.47 10.947 12.334 0 19.787-5.658 19.787-15.088s-9.001-12.169-16.935-13.865v-.021ZM77.353 16.036c-5.062 0-9.536 1.77-12.75 4.92-.203.19-.534.053-.534-.221V.622a.62.62 0 0 0-.63-.622h-11.17a.62.62 0 0 0-.63.622v62.426a.62.62 0 0 0 .63.621h11.17a.62.62 0 0 0 .63-.621V35.664c0-5.289 4.11-9.345 9.653-9.345 5.542 0 9.557 3.972 9.557 9.345v27.384a.62.62 0 0 0 .63.621h11.17a.62.62 0 0 0 .63-.621V35.664c0-11.505-7.646-19.618-18.356-19.618v-.01ZM118.389 14.255c-6.065 0-11.767 1.823-15.847 4.467a.618.618 0 0 0-.202.833l4.922 8.292c.182.295.566.4.865.22a19.82 19.82 0 0 1 10.262-2.78c9.749 0 16.914 6.785 16.914 15.75 0 7.64-5.734 13.297-13.006 13.297-5.926 0-10.037-3.403-10.037-8.207 0-2.75 1.185-5.005 4.271-6.596a.607.607 0 0 0 .246-.864l-4.645-7.754a.632.632 0 0 0-.759-.264c-6.225 2.276-10.593 7.755-10.593 15.109 0 11.126 8.981 19.428 21.507 19.428 14.629 0 25.147-9.998 25.147-24.338 0-15.372-12.237-26.603-29.066-26.603l.021.01ZM180.098 15.951c-5.649 0-10.689 2.055-14.373 5.68a.313.313 0 0 1-.534-.222v-4.362a.62.62 0 0 0-.63-.621H153.68a.62.62 0 0 0-.63.621v62.331a.62.62 0 0 0 .63.622h11.169a.62.62 0 0 0 .631-.622v-20.44c0-.274.331-.41.533-.231 3.674 3.371 8.532 5.342 14.096 5.342 13.102 0 23.321-10.463 23.321-24.054 0-13.592-10.23-24.054-23.321-24.054l-.011.01Zm-2.103 37.54c-7.454 0-13.103-5.847-13.103-13.58 0-7.734 5.638-13.582 13.103-13.582 7.464 0 13.091 5.753 13.091 13.581 0 7.829-5.553 13.581-13.102 13.581h.011Z"
                              ></path>
                           </svg>
                        </span>
                     </button>
                     <a className="mt-1 text-xs text-white/70 underline underline-offset-2 text-center hover:text-white cursor-pointer">
                        More payment options
                     </a>
                  </div>

                  <PromoFeatures />

                  {/* American Turf. Tour Tested. heading + paragraph */}
                  <div className="pt-4">
                     <h2 className="text-xl text-center font-extrabold mb-8">
                        American Turf. Tour Tested.
                     </h2>
                     <p className="text-white/70">
                        Lower your score and increase consistency by practicing
                        daily on a quality, tour-grade turf putting green for
                        both indoors &amp; outdoors. Our product offers a true
                        roll with a 9–11 Stimpmeter reading and the most
                        realistic experience you'll find anywhere outside a real
                        course.
                     </p>
                  </div>

                  {/* Product accordion sections (Details, Dimensions, What's Included, Setup & Care, Description) */}
                  <Accordion
                     sections={[
                        {
                           id: "details",
                           title: "Details",
                           icon: (
                              <svg
                                 xmlns="http://www.w3.org/2000/svg"
                                 width="20"
                                 height="20"
                                 viewBox="0 0 20 20"
                                 stroke="#c6c6c6"
                              >
                                 <path d="M9.5235 4.79973C6.76257 4.92905 4.08307 6.62063 1.1722 9.66543C0.993412 9.85244 0.993412 10.1474 1.1722 10.3344C4.08307 13.3793 6.76258 15.0709 9.52351 15.2003C12.2733 15.3291 15.2667 13.9138 18.8217 10.3399C19.0086 10.152 19.0086 9.84814 18.8217 9.6602C15.2667 6.0863 12.2733 4.67093 9.5235 4.79973ZM9.47509 3.7592C12.6521 3.61039 15.9149 5.26347 19.5564 8.92433C20.1479 9.5189 20.1479 10.4812 19.5564 11.0758C15.9149 14.7366 12.6521 16.3897 9.47508 16.2408C6.30917 16.0924 3.3912 14.1603 0.42305 11.0555C-0.141017 10.4655 -0.141017 9.53435 0.423051 8.94433C3.3912 5.8396 6.30918 3.90749 9.47509 3.7592Z"></path>
                                 <path d="M13.5807 10.0002C13.5807 11.9741 11.9742 13.5586 10.012 13.5586C8.04979 13.5586 6.44327 11.9741 6.44327 10.0002C6.44327 8.02617 8.04979 6.44176 10.012 6.44176C11.9742 6.44176 13.5807 8.02617 13.5807 10.0002ZM10.012 12.5169C11.4096 12.5169 12.5426 11.3901 12.5426 10.0002C12.5426 8.6102 11.4096 7.48342 10.012 7.48342C8.61438 7.48342 7.48138 8.6102 7.48138 10.0002C7.48138 11.3901 8.61438 12.5169 10.012 12.5169Z"></path>
                              </svg>
                           ),
                           content: (
                              <ul className="list-disc pl-5 space-y-2 text-white/80">
                                 <li>
                                    Engineered for at-home practice to master
                                    skills that translate to the course.
                                 </li>
                                 <li>
                                    Designed to fit spaces of any size, from
                                    living rooms and offices to studio
                                    apartments.
                                 </li>
                                 <li>
                                    Durable, easy to store and set up, and
                                    immediately lays flat and is ready to use.
                                 </li>
                                 <li>
                                    Uses premium materials like US-made nylon,
                                    natural rubber, and the same plastic as
                                    regulation golf cups.
                                 </li>
                                 <li>Made in the USA.</li>
                              </ul>
                           ),
                        },
                        {
                           id: "dimensions",
                           title: "Dimensions",
                           icon: (
                              <svg
                                 xmlns="http://www.w3.org/2000/svg"
                                 width="20"
                                 height="20"
                                 viewBox="0 0 20 20"
                                 stroke="#c6c6c6"
                              >
                                 <path
                                    d="M18.9836 5.32852L14.6715 1.01638L1.01638 14.6715L5.32852 18.9836L18.9836 5.32852ZM15.3902 0.297691C14.9933 -0.0992303 14.3497 -0.0992303 13.9528 0.297691L0.297691 13.9528C-0.0992301 14.3497 -0.0992305 14.9932 0.297691 15.3902L4.60983 19.7023C5.00675 20.0992 5.65029 20.0992 6.04721 19.7023L19.7023 6.04721C20.0992 5.65029 20.0992 5.00675 19.7023 4.60983L15.3902 0.297691Z"
                                    fill-rule="evenodd"
                                 ></path>
                                 <path d="M11.7863 2.67056C11.9848 2.4721 12.3065 2.4721 12.505 2.67056L14.4237 4.58927C14.6222 4.78774 14.6222 5.1095 14.4237 5.30796C14.2252 5.50642 13.9035 5.50642 13.705 5.30796L11.7863 3.38925C11.5878 3.19079 11.5878 2.86902 11.7863 2.67056Z"></path>
                                 <path d="M8.93891 5.36331C9.13737 5.16485 9.45914 5.16485 9.6576 5.36331L11.5763 7.28202C11.7748 7.48048 11.7748 7.80225 11.5763 8.00071C11.3779 8.19917 11.0561 8.19917 10.8576 8.00071L8.93891 6.082C8.74045 5.88354 8.74045 5.56177 8.93891 5.36331Z"></path>
                                 <path d="M6.24307 8.20742C6.44153 8.00896 6.76329 8.00896 6.96175 8.20742L8.88047 10.1261C9.07893 10.3246 9.07893 10.6464 8.88047 10.8448C8.68201 11.0433 8.36024 11.0433 8.16178 10.8448L6.24307 8.92611C6.0446 8.72765 6.0446 8.40588 6.24307 8.20742Z"></path>
                                 <path d="M3.37296 10.8776C3.57142 10.6791 3.89319 10.6791 4.09165 10.8776L6.01036 12.7963C6.20882 12.9948 6.20882 13.3165 6.01036 13.515C5.8119 13.7134 5.49013 13.7134 5.29167 13.515L3.37296 11.5963C3.1745 11.3978 3.1745 11.076 3.37296 10.8776Z"></path>
                              </svg>
                           ),
                           content: (
                              <ul className="list-disc pl-5 space-y-2 text-white/80">
                                 <li>Mat Size: 1.5 feet x 9 feet</li>
                                 <li>Mat Thickness: 1/2 inch</li>
                                 <li>Max. Putt Length: 8 feet</li>
                                 <li>Cup Size: Regulation (4.25 inches)</li>
                                 <li>Speed: (9-11 stimpmeter rating)</li>
                              </ul>
                           ),
                        },
                        {
                           id: "included",
                           title: "What's Included",
                           icon: (
                              <svg
                                 xmlns="http://www.w3.org/2000/svg"
                                 width="20"
                                 height="20"
                                 viewBox="0 0 20 20"
                                 stroke="#c6c6c6"
                              >
                                 <path
                                    d="M9.69502 0.6786C9.91338 0.601796 10.1516 0.603123 10.3691 0.682353L18.2151 3.54058C18.61 3.68445 18.8728 4.05988 18.8728 4.48018V14.4287C18.8728 14.8074 18.6588 15.1537 18.32 15.3231L10.4731 19.2465C10.196 19.385 9.87022 19.3873 9.59117 19.2526L1.45405 15.3244C1.10843 15.1576 0.888794 14.8076 0.888794 14.4239V4.48434C0.888794 4.05997 1.15665 3.68181 1.55699 3.541L9.69502 0.6786ZM6.07999 3.01017L2.5346 4.25719L10.149 7.63545L13.5692 6.118L6.07999 3.01017ZM6.78606 2.76183L14.1997 5.83828L17.5367 4.35774L10.0268 1.62195L6.78606 2.76183ZM1.88879 14.4239L1.88879 5.06467L9.64898 8.50762V18.1701L1.88879 14.4239ZM17.8728 14.4287L10.649 18.0405V8.50762L17.8728 5.30263V14.4287Z"
                                    fill-rule="evenodd"
                                 ></path>
                              </svg>
                           ),
                           content: (
                              <ul className="list-disc pl-5 space-y-2 text-white/80">
                                 <li>
                                    Tour-grade turf mat that gives the same
                                    feedback as a grass green.
                                 </li>
                                 <li>
                                    Innovative multi-make cups that hold up to 3
                                    putts in a row.
                                 </li>
                                 <li>
                                    Custom-engineered backstop that keeps missed
                                    putts out of the way.
                                 </li>
                                 <li>
                                    Alignment aids at three-foot intervals that
                                    let you dial in your distances.
                                 </li>
                              </ul>
                           ),
                        },
                        {
                           id: "care",
                           title: "Setup & Care",
                           icon: (
                              <svg
                                 xmlns="http://www.w3.org/2000/svg"
                                 width="20"
                                 height="20"
                                 viewBox="0 0 20 20"
                                 stroke="#c6c6c6"
                              >
                                 <path
                                    d="M10 5.2393L8.5149 3.77392C6.79996 2.08174 4.01945 2.08174 2.30451 3.77392C0.589562 5.4661 0.589563 8.2097 2.30451 9.90188L10 17.4952L17.6955 9.90188C19.4104 8.2097 19.4104 5.4661 17.6955 3.77392C15.9805 2.08174 13.2 2.08174 11.4851 3.77392L10 5.2393ZM10.765 3.06343C12.8777 0.978857 16.3029 0.978856 18.4155 3.06343C20.5282 5.148 20.5282 8.52779 18.4155 10.6124L10.72 18.2057C10.3224 18.5981 9.67763 18.5981 9.27996 18.2057L1.58446 10.6124C-0.528154 8.52779 -0.528154 5.14801 1.58446 3.06343C3.69708 0.978859 7.12233 0.978858 9.23495 3.06343L10 3.81832L10.765 3.06343Z"
                                    fill-rule="evenodd"
                                 ></path>
                              </svg>
                           ),
                           content: (
                              <p className="text-white/80">
                                 Start practice in less than a few minutes.
                                 Simply open the box, unroll the mat, position
                                 the backstop, set up your cups, and start
                                 putting.
                              </p>
                           ),
                        },
                        {
                           id: "description",
                           title: "Description",
                           icon: (
                              <svg
                                 xmlns="http://www.w3.org/2000/svg"
                                 width="20"
                                 height="20"
                                 viewBox="0 0 20 20"
                                 stroke="#c6c6c6"
                              >
                                 <path d="M6.31104 9.13574C6.31104 8.99767 6.42296 8.88574 6.56104 8.88574H13.7464C13.8844 8.88574 13.9964 8.99767 13.9964 9.13574C13.9964 9.27381 13.8844 9.38574 13.7464 9.38574H6.56104C6.42296 9.38574 6.31104 9.27381 6.31104 9.13574Z"></path>
                                 <path d="M6.31104 14.0544C6.31104 13.9164 6.42296 13.8044 6.56104 13.8044H13.439C13.577 13.8044 13.689 13.9164 13.689 14.0544C13.689 14.1925 13.577 14.3044 13.439 14.3044H6.56104C6.42296 14.3044 6.31104 14.1925 6.31104 14.0544Z"></path>
                                 <path d="M6.92587 11.5952C6.92587 11.4571 7.0378 11.3452 7.17587 11.3452H12.8241C12.9622 11.3452 13.0741 11.4571 13.0741 11.5952C13.0741 11.7333 12.9622 11.8452 12.8241 11.8452H7.17587C7.0378 11.8452 6.92587 11.7333 6.92587 11.5952Z"></path>
                                 <path d="M5.19623 1.77832C5.19623 0.949892 5.8678 0.27832 6.69623 0.27832H13.3038C14.1322 0.27832 14.8038 0.949893 14.8038 1.77832V3.46728C14.8038 4.29571 14.1322 4.96728 13.3038 4.96728H6.69623C5.8678 4.96728 5.19623 4.29571 5.19623 3.46728V1.77832ZM6.69623 1.27832C6.42009 1.27832 6.19623 1.50218 6.19623 1.77832V3.46728C6.19623 3.74342 6.42009 3.96728 6.69623 3.96728H13.3038C13.5799 3.96728 13.8038 3.74342 13.8038 3.46728V1.77832C13.8038 1.50218 13.5799 1.27832 13.3038 1.27832H6.69623Z"></path>
                                 <path d="M3.73691 2.50806V18.7232H16.2631V2.50806H14.4981V1.50806H16.2631C16.8154 1.50806 17.2631 1.95577 17.2631 2.50806V18.7232C17.2631 19.2755 16.8154 19.7232 16.2631 19.7232H3.73691C3.18462 19.7232 2.73691 19.2755 2.73691 18.7232V2.50806C2.73691 1.95577 3.18462 1.50806 3.73691 1.50806H5.75974V2.50806L3.73691 2.50806Z"></path>
                              </svg>
                           ),
                           content: (
                              <div className="text-white/80 space-y-4">
                                 <p>
                                    Bar none, our PrimePutt putting mat is the
                                    premium indoor putting mat designed for
                                    golfers, by golfers. We know how important
                                    putting is to lowering your scores, so we
                                    set out to create the most realistic,
                                    high-quality putting mat on the market. In
                                    doing so, we dedicated months of research
                                    alongside turf-grass experts, material
                                    scientists, and PGA professionals to find
                                    the closest surface to a real grass putting
                                    green.
                                 </p>

                                 <p>
                                    Our tour-grade nylon turf material
                                    guarantees the most realistic feedback of
                                    any other putting mat, which is why PGA tour
                                    pros and golf experts everywhere use it.
                                    Regardless of skill level, PrimePutt offers
                                    the perfect practice surface for golfers
                                    looking to lower their scores and build
                                    short-game confidence. And no matter what
                                    home or office space you have to dedicate to
                                    your practice time, our various sizes
                                    provide the flexibility to fit any area and
                                    practice any distance.
                                 </p>

                                 <p>
                                    Even better, PrimePutt's proprietary cup
                                    design guarantees you'll never have a putt
                                    blocked by another ball. At the same time,
                                    these innovative cups perfectly replicate
                                    full-depth golf cups: the misses miss, and
                                    the makes go in. For setup, our
                                    specially-designed rubberized bottom and
                                    no-memory material mean the PrimePutt mat
                                    lays flat and doesn't move right out of the
                                    box every time. These same materials lend
                                    incredible durability to our putting mats,
                                    so you can use yours indoors or outdoors,
                                    putt with the kids, and let the dog walk
                                    over it—still rest assured that your
                                    PrimePutt indoor putting mat will last a
                                    lifetime.
                                 </p>

                                 <p>
                                    All told, our mat is just what you need to
                                    start making more 5-8 footers, stop
                                    three-putting from longer distances, and
                                    start lowering your score today.
                                 </p>
                              </div>
                           ),
                        },
                     ]}
                  />
               </aside>
            </div>
         </main>
      </div>
   );
}
