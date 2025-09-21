import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
   weight: ["300", "400", "600", "700", "800"],
   variable: "--font-plus-jakarta",
   subsets: ["latin"],
   display: "swap",
});

export const metadata: Metadata = {
   title: "Rated Best Indoor /Outdoor Golf Putting Green | Primeputt",
   description:
      "Shop the best indoor/outdoor golf putting green at Primeputt. Perfect for all skill levels, our greens offer a realistic putting experience. Improve your game today!",
};

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html lang="en">
         <body
            className={`${plusJakarta.className} ${plusJakarta.variable} antialiased`}
            style={{
               fontFamily:
                  "var(--font-plus-jakarta), system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
            }}
         >
            {children}
         </body>
      </html>
   );
}
