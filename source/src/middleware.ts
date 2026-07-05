import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en', 'bn'],
  defaultLocale: 'en',
  localePrefix: 'always'
});

export const config = {
  // Match all pathnames except for public folders, api routes, metadata files
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'  ]
};
