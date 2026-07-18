import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <link rel="preload" href="/images/DSC_0010.JPG.jpeg" as="image" />
      <Header />
      <main className="min-h-screen pt-16 lg:pt-20">{children}</main>
      <Footer />
    </>
  )
}
