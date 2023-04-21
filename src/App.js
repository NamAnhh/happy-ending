import bgLove from "./assets/images/bgLove.jpg";
import imgMyAvatar from "./assets/images/myAvatar.jpeg";
import imgHerAvatar from "./assets/images/herAvatar.jpg";
import imgHeart from "./assets/images/imgHeart.jpeg";
import "./App.scss";
import Gaming from "./components/Gaming";
import { useState } from "react";

function App() {
  const [selectArea, setSelectArea] = useState(0);
  const renderItemSelected = () => {
    const arr = ["Địa điểm ăn chơi", "Cùng nhau đi"];
    return arr.map((item, index) => {
      return (
        <div
          key={item}
          onClick={() => setSelectArea(index)}
          className={`itemSelectArea ${
            selectArea === index ? "itemSelectAreaActive" : ""
          }`}
        >
          {item}
        </div>
      );
    });
  };
  return (
    <div className="wrapLayout">
      <div className="layout">
        <div className="logo">
          <img src={bgLove} alt="bg-logo" />
        </div>
        <div className="wrapLover">
          <img src={imgMyAvatar} alt="" className="loverAvatar" />
          <img src={imgHeart} alt="" className="icHeart" />
          <img src={imgHerAvatar} alt="" className="loverAvatar" />
        </div>
        <div className="wrapSelectArea">{renderItemSelected()}</div>
        {selectArea === 0 && <Gaming />}
        {selectArea === 1 && <div>Đợi anh nhé :P</div>}
      </div>
    </div>
  );
}

export default App;
