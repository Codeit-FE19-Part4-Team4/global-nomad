/**
 * 로딩 중임을 표시하는 스피너 컴포넌트
 */
export default function LoadingSpinner() {
  return (
    <div className="fixed top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center py-10">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900" />
    </div>
  );
}
