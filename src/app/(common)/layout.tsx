'use client';

import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import { useAuthStatus } from '@/hooks/useAuthStatus';

export default function CommonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading } = useAuthStatus();
  if (isLoading) return null;
  return (
    <>
      <Header isLoggedIn={!!isAuthenticated} />
      <main className="px-6 md:px-8 lg:px-10">{children}</main>
      <Footer />
    </>
  );
}
