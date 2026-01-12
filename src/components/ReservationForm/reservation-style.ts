import icoNext from '@/assets/icons/activities/ic-calender-next.svg';
import icoPrev from '@/assets/icons/activities/ic-calender-prev.svg';

/**
 * calendar 스타일
 */
export const calendarStyle = {
  '--bg-prev': `url(${icoPrev.src})`,
  '--bg-next': `url(${icoNext.src})`,
} as React.CSSProperties;
export const calendarClasses = {
  month_caption:
    '[&>span]:text-[16px] [&>span]:font-[var(--weight-title-md)] text-[#1F1F22]',
  weekdays: 'flex h-[45px] items-center justify-between',
  weekday:
    'w-[45px] items-center text-center  text-[16px] font-[600] text-[#49494C]',
  week: 'flex justify-between pt-[12px] first:pt-[8px]',
  day: '[&>button]:text-[16px] [&>button]:font-[var(--weight-title-md)]',
  outside: '[&>button]:text-[13px] [&>button]:text-[#B3B4BC]',
  today: 'bg-none',
  selected:
    '[&>button]:bg-primary-500 [&>button]:cursor-pointer [&>button]:rounded-[50%] [&>button]:text-white',
  nav: 'absolute top-0 right-0 h-6',
  button_previous: 'w-6 h-6 cursor-pointer bg-[image:var(--bg-prev)] bg-cover',
  button_next: 'w-6 h-6 cursor-pointer ml-3 bg-[image:var(--bg-next)] bg-cover',
};
export const calendar = [
  'w-full',
  'md:w-[48.387vw]',
  'lg:w-[350px] [--cell-size:46px] p-0',
];

/**
 * ReservationLayout 스타일
 */
export const reservationWrap = [
  'fixed flex left-0 right-0 bottom-0 items-end z-1',
  'lg:static lg:w-[410px] lg:h-auto lg:min-h-[856px]',
];
export const reservationDimmed = [
  'fixed inset-0 bg-[rgba(0,0,0,0.5)] z-[-1] lg:hidden',
];
export const reservationInner = ['md:h-[100%]', 'lg:block'];
export const reservationBox = [
  'flex flex-col justify-between w-full rounded-t-[24px] bg-white overflow-hidden z-1',
  'md:h-auto pt-[24px] px-[24px]',
  'lg:block lg:h-[100%] lg:min-h-[856px] lg:p-[30px] lg:pt-[83px] lg:rounded-[24px] lg:shadow-[0_4px_24px_0_rgba(156,180,202,0.2)] lg:border lg:border-[#ddd] lg:relative',
];
export const reservationBoxHide = [
  'relative md:min-h-[124px] rounded-[0] pt-[0]',
];
export const reservationArea = [
  'flex justify-between flex-col mb-[9px]',
  'md:flex-row md:mb-[34px]',
  'lg:flex-wrap lg:gap-6 lg:relative lg:mb-0',
];

/**
 * ReservationOption 스타일
 */
export const title =
  'text-title-sm font-bold tracking-[-1px] mb-[8px] md:mb-[24px] lg:mb-[8px]';
export const subTitle = 'font-bold tracking-[-1px] md:mb-[20px]';
export const optionBox = [
  'w-full',
  'md:flex md:flex-col md:justify-end md:w-[40.322vw] md:flex-col-reverse  md:gap-[36px] md:pt-[30px] md:pb-[52px] md:px-[24px] md:rounded-[24px] md:shadow-[0_4px_24px_0_rgba(156,180,202,0.2)]',
  'lg:flex-col lg:shadow-none lg:rounded-[0] lg:gap-6 lg:p-0',
];
export const countArea = [
  'w-full flex items-center justify-between',
  'md:flex-wrap',
];
export const countBox = [
  'w-[144px] h-[48px] px-[10px] border border-[#E0E0E5] rounded-[12px] flex items-center justify-between',
  'md:w-full md:h-[52px] md:mt-[20px] md:px-[20px]',
  'lg:w-[140px] lg:h-10 lg:mt-0 lg:px-[9px] lg:rounded-[40px] lg:border-[#eee]',
];
export const countBtn = [
  'flex items-center justify-center w-10 h-10 relative cursor-pointer',
];
export const timeArea = ['w-full mt-[24px] md:mt-0'];
export const timeBox = [
  'flex items-center justify-start flex-wrap gap-[9px] overflow-y-auto max-h-[116px]',
  'md:min-h-[244px] md:max-h-[244px] md:flex-nowrap',
  'lg:min-h-[116px]',
  '[&::-webkit-scrollbar]:w-[6px] [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-gray-400',
  'md:flex-col md:gap-3',
];
export const timeRadio = [
  'w-full h-[52px] flex items-center justify-center border border-[#B3B4BC] rounded-[11px] text-[16px] text-[#1F1F22] font-[var(--weight-title-md)] cursor-pointer peer-checked:border-[2px] peer-checked:border-primary-500 peer-checked:bg-primary-100 peer-checked:text-primary-500',
];

/**
 * ReservationFooter 스타일
 */
export const infoPrice =
  'absolute top-[20px] left-[24px] items-center flex lg:gap-1 lg:top-[30px] lg:left-[30px] lg:flex';
export const txtPrice = 'text-[20px] leading-1 tracking-[-1px]';
export const txtPerson =
  'ml-[6px] text-[16px] tracking-[-1px] text-[#79747e] lg:hidden';

export const footerInr =
  'w-full flex justify-between mb-[12px] h-[26px] lg:mb-0';
export const footerBox = [
  'relative flex flex-col items-center justify-between',
  '-mx-[24px] px-[24px] pt-[18px] pb-[18px] w-[calc(100%+48px)]',
  'md:border-t md:border-[#ddd]',
  'lg:w-full lg:flex-row lg:mt-[33px] lg:mx-0 lg:px-0 lg:pt-[20px] lg:pb-[10px] lg:static',
];
export const footerTextBtn = [
  'text-primary-500 border-primary-500 cursor-pointer border-b-[2px] text-[16px] leading-[24px] font-[var(--weight-title-md)] tracking-[-1px] align-top -mt-[1px]',
  'lg:hidden',
];
export const mobileBtns = [
  'w-full hidden gap-2 grid-cols-[1fr_2fr]',
  'md:gap-4',
];
