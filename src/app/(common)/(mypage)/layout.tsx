import SideMenu from './components/SideMenu';

export default function MyPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mypage-layout">
      <SideMenu />
      <section className="mypage-content">{children}</section>
    </div>
  );
}
