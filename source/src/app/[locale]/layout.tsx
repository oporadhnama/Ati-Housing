import { Inter, Cormorant_Garamond } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import '../globals.css';

import { Hind_Siliguri } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const hindSiliguri = Hind_Siliguri({
  subsets: ['bengali'],
  variable: '--font-hind-siliguri',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const locales = ['en', 'bn'];

export async function generateMetadata() {
  return {
    title: {
      default: 'Ati Model Town | ATI Society',
      template: '%s | Ati Model Town',
    },
    description: 'RAJUK-approved residential and commercial plots in Keraniganj, Dhaka.',
  };
}

import { CustomCursor, PageTransition, AIChat } from '@/components';

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!locales.includes(params.locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={params.locale} className={`${inter.variable} ${cormorant.variable} ${hindSiliguri.variable}`}>
      <body className="antialiased font-body text-text-primary bg-surface-white min-h-screen flex flex-col">
        <NextIntlClientProvider messages={messages}>
          <CustomCursor />
          <PageTransition>
            {children}
          </PageTransition>
          <AIChat />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
