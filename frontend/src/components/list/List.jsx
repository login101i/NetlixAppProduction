import { useRef, useState } from "react";

import "./list.scss";

import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ListItems from "../listitems/Listitems";

const List = ({ list }) => {
  const listRef = useRef();
  const [slideNumber, setSlideNumber] = useState(0);
  const [isMoved, setIsMoved] = useState(0);
  const [clickLimit, setClickLimit] = useState(window.innerWidth / 230);

  console.log(list);

  const handleClick = (direction) => {
    setIsMoved(true);
    let distance = listRef.current.getBoundingClientRect().x - 50;
    if (direction === "left" && slideNumber > 0) {
      setSlideNumber(slideNumber - 1);
      listRef.current.style.transform = `translateX(${230 + distance}px)`;
    }
    if (direction === "right" && slideNumber < 10 - clickLimit) {
      setSlideNumber(slideNumber + 1);
      listRef.current.style.transform = `translateX(${-230 + distance}px)`;
    }
  };

  return (
    <div className="Lcontainer">
      <div className="containerTitle">{list.type}</div>

      <div className="wrapper">
        <ChevronLeftIcon className="sliderIcon left" onClick={() => handleClick("left")} style={{ display: isMoved ? "block" : "none" }} />
        <div className="listContainer" ref={listRef}>
          {list.content.map((item, index) => (
            <>
              <ListItems item={item} index={index} key={index} />
            </>
          ))}
        </div>

        <ChevronRightIcon className="sliderIcon right" onClick={() => handleClick("right")} />
      </div>
    </div>
  );
};

export default List;
