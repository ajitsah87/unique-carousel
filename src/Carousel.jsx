
import { useEffect, useRef, useState } from "react";
import "./index.css";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";

const Carousel = () => {
  const sliderContainerRef = useRef(null);
  const slidesLeftRef = useRef(null);
  const slidesRightRef = useRef(null);
  const [activeSlidesIndex, setActiveSlidesIndex] = useState(0);

  const slidesData = [
    {
      className: "bg-green-500",
      title: "Nature Flower",
      description: "Road",
      imageUrl: "https://plus.unsplash.com/premium_photo-1661963972388-1da70b60752b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHdpZGV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    },
    {
      className: "bg-red-500",
      title: "Nature Flower",
      description: "Scenery",
      imageUrl: "https://images.unsplash.com/photo-1565432629946-62b4a2311557?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHdpZGV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    },
    {
      className: "bg-slate-500",
      title: "Nature Flower",
      description: "Scenery",
      imageUrl: "https://images.unsplash.com/photo-1565432629946-62b4a2311557?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHdpZGV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    },
  ];

  const changeSlide = (direction) => {

    const slidesLength = slidesRightRef.current.childElementCount;

    let newActiveSlideIndex = activeSlidesIndex;

    if (direction === "up") {
      newActiveSlideIndex = (activeSlidesIndex + 1) % slidesLength;
    } else if (direction === "down") {
      newActiveSlideIndex =
        (activeSlidesIndex - 1 + slidesLength) % slidesLength;
    }

    setActiveSlidesIndex(newActiveSlideIndex);
    const sliderHeight = sliderContainerRef.current.clientHeight;

    slidesRightRef.current.style.transform = `translateY(-${
      newActiveSlideIndex * sliderHeight
    }px)`;
    slidesLeftRef.current.style.transform = `translateY(${
      newActiveSlideIndex * sliderHeight
    }px)`;
  };

  useEffect(() => {
    const slidesLength = slidesRightRef.current.querySelectorAll("div").length;
    slidesLeftRef.current.style.top = `-${(slidesLength - 1) * 100}vh`;

    let interval = setInterval(() => {
      changeSlide("up");
    }, 2000);

    return () => clearInterval(interval);
  }, [activeSlidesIndex]);

  return (
    <div className="slider-container" ref={sliderContainerRef}>
      <div className="left-slide" ref={slidesLeftRef}>
        {slidesData.map((slide, index) => (
          <div key={index} className={slide.className}>
            <h1>{slide.title}</h1>
            <p>{slide.description}</p>
          </div>
        ))}
      </div>
      <div className="right-slide" ref={slidesRightRef}>
        {slidesData.map((slide, index) => (
          <div key={index} style={{ backgroundImage: `url('${slide.imageUrl}')` }}></div>
        ))}
      </div>
      <div className="action-buttons">
        <button className="up-button" onClick={() => changeSlide("up")}>
          <AiOutlineArrowUp />
        </button>
        <button className="down-button" onClick={() => changeSlide("down")}>
          <AiOutlineArrowDown />
        </button>
      </div>
    </div>
  );
};

export default Carousel;
