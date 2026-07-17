import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import ClientProviders from '@/components/client-providers'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: {
    default: 'SmartLink Rwanda | ICT Solutions & Digital Training',
    template: '%s | SmartLink Rwanda',
  },
  description:
    'SmartLink Rwanda provides innovative ICT solutions, web development, mobile apps, cloud services, and digital skills training in Rwanda.',
  keywords: [
    'SmartLink Rwanda',
    'ICT Rwanda',
    'web development Rwanda',
    'digital skills training',
    'technology Rwanda',
    'IT solutions Kigali',
    'e-learning Rwanda',
    'cloud services Africa',
  ],
  authors: [{ name: 'SmartLink Rwanda' }],
  openGraph: {
    title: 'SmartLink Rwanda | ICT Solutions & Digital Training',
    description:
      'Empowering Rwanda through innovative ICT solutions, digital skills training, and technology-driven programs.',
    url: 'https://smartlinkrw.com',
    siteName: 'SmartLink Rwanda',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SmartLink Rwanda | ICT Solutions & Digital Training',
    description:
      'Empowering Rwanda through innovative ICT solutions, digital skills training, and technology-driven programs.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300`}>
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  )
}
