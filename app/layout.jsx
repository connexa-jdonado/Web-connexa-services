import { Plus_Jakarta_Sans, Inter } from 'next/font/google';
import Providers from '@/components/Providers';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import '../styles/globals.css';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata = {
  title: 'Connexa Services | Field Service Management Experts',
  description:
    'Expertos en Field Service Management. Implementamos, optimizamos y soportamos Oracle Field Service Cloud y Zinier para empresas líderes en América Latina.',
  keywords: [
    'Oracle Field Service',
    'OFSC',
    'Field Service Management',
    'Zinier',
    'implementación OFSC',
    'consultoría FSM',
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${jakarta.variable} ${inter.variable}`}>
      <body suppressHydrationWarning>
        <Providers>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
