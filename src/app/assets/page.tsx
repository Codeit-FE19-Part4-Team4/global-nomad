import { CSSProperties } from 'react';
import {
  IcArt,
  IcArtActive,
  IcBack,
  IcBell,
  IcBus,
  IcBusActive,
  IcCalendar,
  IcCalendarActive,
  IcCalenderNext,
  IcCalenderPrev,
  IcClose,
  IcDropDown,
  IcDropUp,
  IcEdit,
  IcFacebook,
  IcFood,
  IcFoodActive,
  IcImageAdd,
  IcImageDelete,
  IcImageDisabled,
  IcInstagram,
  IcKakao,
  IcList,
  IcListActive,
  IcMap,
  IcMinus,
  IcMore,
  IcPageBack,
  IcPageLeft,
  IcPageLeftOff,
  IcPageRight,
  IcPageRightOff,
  IcPasswordHidden,
  IcPasswordShow,
  IcPlus,
  IcSearch,
  IcSetting,
  IcSettingActive,
  IcSport,
  IcSportActive,
  IcStarOff,
  IcStartOn,
  IcTour,
  IcTourActive,
  IcTrash,
  IcUser,
  IcUserActive,
  IcWellbeing,
  IcWellbeingActive,
  IcX,
  IcYoutube,
} from '@/assets/icons';
import { ImgEmpty, ImgLogo, ImgProfile, ImgWarning } from '@/assets/images';

export default function assets() {
  const boxStyle: CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
  };
  return (
    <div>
      <h1>assets/icons</h1>
      <div style={boxStyle}>
        <span
          style={{
            display: 'flex',
            backgroundColor: '#000',
          }}>
          <IcArtActive className="h-[24px] w-[24px]" />
          <IcBusActive className="h-[24px] w-[24px]" />
          <IcFoodActive className="h-[24px] w-[24px]" />
          <IcTourActive className="h-[24px] w-[24px]" />
          <IcSportActive className="h-[24px] w-[24px]" />
          <IcWellbeingActive className="h-[24px] w-[24px]" />
        </span>
        <IcArt className="h-[24px] w-[24px]" />
        <IcBus className="h-[24px] w-[24px]" />
        <IcFood className="h-[24px] w-[24px]" />
        <IcTour className="h-[24px] w-[24px]" />
        <IcSport className="h-[24px] w-[24px]" />
        <IcWellbeing className="h-[24px] w-[24px]" />
        <IcSetting className="h-[20px] w-[20px]" />
        <IcSettingActive className="h-[20px] w-[20px]" />
        <IcCalendar className="h-[20px] w-[20px]" />
        <IcCalendarActive className="h-[20px] w-[20px]" />
        <IcUser className="h-[20px] w-[20px]" />
        <IcUserActive className="h-[20px] w-[20px]" />
        <IcList className="h-[20px] w-[20px]" />
        <IcListActive className="h-[20px] w-[20px]" />
        <IcBell className="h-[24px] w-[24px]" />
        <IcBack className="h-[24px] w-[24px]" />
        <IcClose className="h-[24px] w-[24px]" />
        <IcCalenderNext className="h-[24px] w-[24px]" />
        <IcCalenderPrev className="h-[24px] w-[24px]" />
        <IcDropDown className="h-[24px] w-[24px]" />
        <IcDropUp className="h-[24px] w-[24px]" />
        <IcPageBack className="h-[39px] w-[39px]" />
        <IcEdit className="h-[30px] w-[30px]" />
        <IcImageDelete className="h-[26px] w-[26px]" />
        <IcImageAdd className="h-[40px] w-[40px]" />
        <IcImageDisabled className="h-[40px] w-[40px]" />
        <IcMinus className="h-[24px] w-[24px]" />
        <IcPlus className="h-[24px] w-[24px]" />
        <IcMap className="h-[24px] w-[24px]" />
        <IcMore className="h-[24px] w-[24px]" />
        <IcPageLeft className="h-[40px] w-[40px]" />
        <IcPageLeftOff className="h-[40px] w-[40px]" />
        <IcPageRight className="h-[40px] w-[40px]" />
        <IcPageRightOff className="h-[40px] w-[40px]" />
        <IcPasswordHidden className="h-[24px] w-[24px]" />
        <IcPasswordShow className="h-[24px] w-[24px]" />
        <IcSearch className="h-[24px] w-[24px]" />
        <IcStarOff className="h-[24px] w-[24px]" />
        <IcStartOn className="h-[24px] w-[24px]" />
        <IcTrash className="h-[22px] w-[22px]" />
        <IcKakao className="h-[24px] w-[24px]" />
        <IcYoutube className="h-[24px] w-[24px]" />
        <IcX className="h-[24px] w-[24px]" />
        <IcFacebook className="h-[24px] w-[24px]" />
        <IcInstagram className="h-[24px] w-[24px]" />
      </div>
      <br />
      <h1>assets/images</h1>
      <div style={boxStyle}>
        <ImgLogo className="h-[144px] w-[144px]" />
        <ImgEmpty className="h-[122px] w-[122px]" />
        <ImgWarning className="h-[88px] w-[88px]" />
        <ImgProfile className="h-[120px] w-[120px]" />
      </div>
    </div>
  );
}
