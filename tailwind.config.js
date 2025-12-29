/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{ts,tsx,js,jsx}', // Next.js App Router
    './src/pages/**/*.{ts,tsx,js,jsx}', // Pages Router
    './src/components/**/*.{ts,tsx,js,jsx}', // 컴포넌트
    './src/lib/**/*.{ts,tsx,js,jsx}', // 유틸 함수, shadcn ui
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
