import type { Metadata, Viewport } from 'next';
import './globals.css';
import Auth from '@/components/Auth';
import QueryProvider from '@/components/queryProvider';
import Recoil from '@/components/recoil';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // <RecoilRoot>
    <Recoil>
      <QueryProvider>
        <Auth>{children}</Auth>
      </QueryProvider>
    </Recoil>
    // </RecoilRoot>
  );
}

const APP_NAME = 'Reclos';
const APP_DEFAULT_TITLE = 'Reclos';
const APP_TITLE_TEMPLATE = 'Reclos | %s';
const APP_DESCRIPTION = '초간단 패션 중고 거래 플랫폼';

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: '/manifest.json',
  icons: {
    other: [
      { url: '/logo/favicon.ico', rel: 'icon', type: 'image/x-icon' },
      { url: '/logo/favicon-16x16.png', rel: 'icon', type: 'image/png', sizes: '16x16' },
      { url: '/logo/favicon-32x32.png', rel: 'icon', type: 'image/png', sizes: '32x32' },
      { url: 'logo/apple-touch-icon.png', rel: 'apple-touch-icon', sizes: '180x180' },
      { url: 'logo/android-chrome-192x192.png', rel: 'icon', type: 'image/png', sizes: '192x192' },
      { url: 'logo/android-chrome-512x512.png', rel: 'icon', type: 'image/png', sizes: '512x512' },

      {
        url: '/logo/basic-192x192.png',
        media: '(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)',
        rel: 'apple-touch-startup-image',
      },
      {
        url: '/logo/basic-384x384.png',
        media: '(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)',
        rel: 'apple-touch-startup-image',
      },
      {
        url: '/logo/basic-512x512.png',
        media: '(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)',
        rel: 'apple-touch-startup-image',
      },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: 'website',
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: 'summary',
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: '#000000',
};
