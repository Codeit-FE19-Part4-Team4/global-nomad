import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';

export default function CommonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header isLoggedIn={true} />
      <main className="px-6 md:px-8 lg:px-10">{children}</main>
      <Footer />
    </>
  );
}
