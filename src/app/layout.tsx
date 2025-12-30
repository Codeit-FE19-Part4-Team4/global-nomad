import { Noto_Sans_KR } from 'next/font/google';

import './globals.css';

import ModalContainer from '@/components/modal/ModalContainer';
import ModalProvider from '@/components/modal/ModalProvider';
import { ToastProvider } from '@/components/toast/ToastProvider';

/**
 * Noto Sans KR 폰트 설정
 *
 * - next/font/google을 사용해 최적화된 Google Font 로드
 * - Turbopack 환경에서도 안정적으로 동작
 * - Windows / macOS 환경에서 동일한 폰트 렌더링 보장
 */
const notoSansKR = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-noto',
  display: 'swap',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={notoSansKR.variable}>
      <body className={notoSansKR.className}>
        <ModalProvider>
          <ToastProvider>
            <div className="page-wrapper">{children}</div>
            <ModalContainer />
            <div id="modal-root" />
          </ToastProvider>
        </ModalProvider>
      </body>
    </html>
  );
}
