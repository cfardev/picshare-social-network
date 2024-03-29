import React from "react";
import Mansory from "react-masonry-css";
import Pin from "./Pin";

const breackPointObject = {
  default: 4,
  3000: 6,
  2000: 5,
  1200: 3,
  1000: 2,
  599: 1,
};

const MansoryLayout = ({ pins }) => {
  return (
    <Mansory
      className="flex animate-slide-fwd"
      breakpointCols={breackPointObject}
    >
      {pins?.map((pin) => (
        <Pin key={pin._id} pin={pin} className="w-max" />
      ))}
    </Mansory>
  );
};

export default MansoryLayout;
