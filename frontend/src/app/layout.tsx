// 'use client';

// import type { Metadata } from 'next';
// import { Inter } from 'next/font/google';
// import './globals.css';
// import Navbar from '@/components/layout/Navbar';
// import Footer from '@/components/sections/Footer';
// import ModalOffer from '@/components/ui/ModalOffer';
// import CookieConsent from '@/components/ui/CookieConsent';
// import Providers from './providers';
// import { usePathname } from 'next/navigation';
// import { Toaster } from 'react-hot-toast';

// const inter = Inter({
//   subsets: ['latin'],
//   display: 'swap',
//   variable: '--font-inter',
// });

//  const metadata: Metadata = {
//   title: {
//     default: 'Teenz Skin - Natural Skincare for Children and Adults',
//     template: '%s | Teenz Skin',
//   },
//   description:
//     'Premium natural skincare products specially formulated for children and adults. Safe, gentle, and effective solutions for healthy, glowing skin at every age.',
//   keywords: [
//     'skincare',
//     'natural skincare',
//     'children skincare',
//     'teen skincare',
//     'adult skincare',
//     'organic skincare',
//     'gentle skincare',
//     'safe skincare',
//     'skin care products',
//     'face care',
//     'body care',
//   ],
//   authors: [{ name: 'Teenz Skin' }],
//   creator: 'Teenz Skin',
//   publisher: 'Teenz Skin',
//   formatDetection: {
//     email: false,
//     address: false,
//     telephone: false,
//   },
//   metadataBase: new URL('https://teenzskin.com'),
//   alternates: {
//     canonical: '/',
//   },
//   openGraph: {
//     title: 'Teenz Skin - Natural Skincare for Children and Adults',
//     description:
//       'Premium natural skincare products specially formulated for children and adults. Safe, gentle, and effective solutions for healthy, glowing skin at every age.',
//     url: 'https://teenzskin.com',
//     siteName: 'Teenz Skin',
//     images: [
//       {
//         url: 'https://images.pexels.com/photos/3762875/pexels-photo-3762875.jpeg',
//         width: 1200,
//         height: 630,
//         alt: 'Teenz Skin Natural Skincare Products',
//       },
//     ],
//     locale: 'en_US',
//     type: 'website',
//   },
//   twitter: {
//     card: 'summary_large_image',
//     title: 'Teenz Skin - Natural Skincare for Children and Adults',
//     description:
//       'Premium natural skincare products specially formulated for children and adults. Safe, gentle, and effective solutions for healthy, glowing skin at every age.',
//     images: ['https://images.pexels.com/photos/3762875/pexels-photo-3762875.jpeg'],
//     creator: '@teenzskin',
//     site: '@teenzskin',
//   },
//   robots: {
//     index: true,
//     follow: true,
//     googleBot: {
//       index: true,
//       follow: true,
//       'max-video-preview': -1,
//       'max-image-preview': 'large',
//       'max-snippet': -1,
//     },
//   },
//   verification: {
//     google: 'your-google-verification-code',
//   },
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   const pathname = usePathname();
//   const isAdminRoute = pathname?.startsWith('/admin');

//   return (
//     <html lang="en" className={inter.variable}>
//       <body className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
//         <Providers>
//           {!isAdminRoute ? (
//             <>
//               <Navbar className="fixed top-0 left-0 right-0 z-50" />
//               <main className="flex-grow  overflow-y-auto max-h-[calc(100vh-64px)] relative">
//                 <div className="h-full overflow-y-auto">
//                   {children}
//                 </div>
//               </main>
//               <Footer
//                 columns={4}
//                 links={['Help Center', 'Returns', 'Shipping', 'Privacy Policy', 'Terms of Use']}
//                 socials={['Instagram', 'Facebook', 'Pinterest', 'YouTube']}
//                 paymentIcons={true}
//                 newsletter={true}
//                 contactInfo={true}
//                 appLinks={true}
//               />
//               <ModalOffer
//                 headline="Wait! Here's 10% Off"
//                 subtext="Subscribe now to claim your discount."
//                 inputType="email"
//                 dismissable={true}
//                 style="promo-card"
//               />
//               <CookieConsent />
//             </>
//           ) : (
//             <div className="h-screen overflow-y-auto">
//               {children}
//             </div>
//           )}
//         </Providers>
//         <Toaster position="top-right" />
//       </body>
//     </html>
//   );
// }


'use client';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import ModalOffer from '@/components/ui/ModalOffer';
import CookieConsent from '@/components/ui/CookieConsent';
import Providers from './providers';
import { usePathname } from 'next/navigation';
import { Toaster } from 'react-hot-toast';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

 const metadata: Metadata = {
  title: {
    default: 'Teenz Skin - Natural Skincare for Children and Adults',
    template: '%s | Teenz Skin',
  },
  description:
    'Premium natural skincare products specially formulated for children and adults. Safe, gentle, and effective solutions for healthy, glowing skin at every age.',
  keywords: [
    'skincare',
    'natural skincare',
    'children skincare',
    'teen skincare',
    'adult skincare',
    'organic skincare',
    'gentle skincare',
    'safe skincare',
    'skin care products',
    'face care',
    'body care',
  ],
  authors: [{ name: 'Teenz Skin' }],
  creator: 'Teenz Skin',
  publisher: 'Teenz Skin',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://teenzskin.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Teenz Skin - Natural Skincare for Children and Adults',
    description:
      'Premium natural skincare products specially formulated for children and adults. Safe, gentle, and effective solutions for healthy, glowing skin at every age.',
    url: 'https://teenzskin.com',
    siteName: 'Teenz Skin',
    images: [
      {
        url: 'https://images.pexels.com/photos/3762875/pexels-photo-3762875.jpeg',
        width: 1200,
        height: 630,
        alt: 'Teenz Skin Natural Skincare Products',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Teenz Skin - Natural Skincare for Children and Adults',
    description:
      'Premium natural skincare products specially formulated for children and adults. Safe, gentle, and effective solutions for healthy, glowing skin at every age.',
    images: ['https://images.pexels.com/photos/3762875/pexels-photo-3762875.jpeg'],
    creator: '@teenzskin',
    site: '@teenzskin',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');

  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Providers>
          {!isAdminRoute ? (
            <>
              <Navbar className="fixed top-0 left-0 right-0 z-50" />
              <main className="pt-20">
                {children}
              </main>
              <Footer
                columns={4}
                links={['Help Center', 'Returns', 'Shipping', 'Privacy Policy', 'Terms of Use']}
                socials={['Instagram', 'Facebook', 'Pinterest', 'YouTube']}
                paymentIcons={true}
                newsletter={true}
                contactInfo={true}
                appLinks={true}
              />
              <ModalOffer
                headline="Wait! Here's 10% Off"
                subtext="Subscribe now to claim your discount."
                inputType="email"
                dismissable={true}
                style="promo-card"
              />
              <CookieConsent />
            </>
          ) : (
            <div className="h-screen overflow-y-auto">
              {children}
            </div>
          )}
        </Providers>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}