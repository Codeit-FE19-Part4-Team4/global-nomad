import ModalContainer from '@/components/modal/ModalContainer';
import './globals.css';
import ModalProvider from '@/components/modal/ModalProvider';
// app 폴더 전용 글로벌 스타일이므로 상대경로 import 권장

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <ModalProvider>
        <body>
          <div className="page-wrapper">{children}</div>
          <ModalContainer />
          <div id="modal-root" />
        </body>
      </ModalProvider>
    </html>
  );
}
