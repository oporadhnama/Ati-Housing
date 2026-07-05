import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';

const locales = ['en', 'bn'];


export default getRequestConfig(async ({requestLocale}) => {
  const locale = await requestLocale;
  console.log('[i18n] getRequestConfig called, resolved locale:', locale);
  
  if (!locale || !locales.includes(locale)) {
    console.log('[i18n] locale is invalid or undefined, calling notFound()');
    notFound();
  }

  return {
    locale: locale as string,
    messages: (await import(`./messages/${locale}.json`)).default
  };
});
