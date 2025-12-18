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
import {
  ImgEmpty,
  ImgLogo,
  ImgMainBg,
  ImgMainVisual,
  ImgProfile,
  ImgWarning,
} from '@/assets/images';

export default function assets() {
  const boxStyle = {
    display: 'flex',
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
          <IcArtActive />
          <IcBusActive />
          <IcFoodActive />
          <IcTourActive />
          <IcSportActive />
          <IcWellbeingActive />
        </span>
        <IcArt />
        <IcBus />
        <IcFood />
        <IcTour />
        <IcSport />
        <IcWellbeing />
        <IcSetting />
        <IcSettingActive />
        <IcCalendar />
        <IcCalendarActive />
        <IcUser />
        <IcUserActive />
        <IcList />
        <IcListActive />
        <IcBell />
        <IcBack />
        <IcClose />
        <IcCalenderNext />
        <IcCalenderPrev />
        <IcDropDown />
        <IcDropUp />
        <IcPageBack />
        <IcEdit />
        <IcImageDelete />
        <IcImageAdd />
        <IcImageDisabled />
        <IcMinus />
        <IcPlus />
        <IcMap />
        <IcMore />
        <IcPageLeft />
        <IcPageLeftOff />
        <IcPageRight />
        <IcPageRightOff />
        <IcPasswordHidden />
        <IcPasswordShow />
        <IcSearch />
        <IcStarOff />
        <IcStartOn />
        <IcTrash />
        <IcKakao />
        <IcYoutube />
        <IcX />
        <IcFacebook />
        <IcInstagram />
      </div>

      <br />
      <h1>assets/images</h1>
      <div style={boxStyle}>
        <ImgLogo />
        <ImgEmpty />
        <ImgWarning />
        <ImgProfile />
        <ImgMainVisual />
        <ImgMainBg />
      </div>
    </div>
  );
}
