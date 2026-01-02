import Footer from '@/components/Footer';
import Header from '@/components/Header/Header';

export default function CommonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header isLoggedIn={true} />
      <main className="main-content">{children}</main>
      <Footer />
    </>
  );
}
