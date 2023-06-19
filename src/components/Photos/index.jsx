import React from "react";
import "./photo.scss";
import Photo1 from "../../assets/images/photos/photo1.jpg";
import Photo2 from "../../assets/images/photos/photo2.jpg";
import Photo3 from "../../assets/images/photos/photo3.jpg";
import Photo4 from "../../assets/images/photos/photo4.jpg";
import Photo5 from "../../assets/images/photos/photo5.jpg";
import Photo6 from "../../assets/images/photos/photo6.jpg";

const listPhotos = [Photo1, Photo2, Photo3, Photo4, Photo5, Photo6];

function Photos() {
  const renderItemPhoto = (() => {
    return listPhotos.map((item) => {
      return (
        <div className="itemPhoto" key={item}>
          <img src={item} alt="-" />
        </div>
      );
    });
  })();

  return <div className="wrapPhoto">{renderItemPhoto}</div>;
}

export default Photos;
