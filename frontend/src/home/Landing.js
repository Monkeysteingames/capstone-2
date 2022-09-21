import React, { useState } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators
} from 'reactstrap';
import LogoImg from "../assets/logo.png"
import SearchImg from "../assets/search-img.png"
import FavImg from "../assets/fav-img.png"



const items = [
  {
    src: LogoImg,
    key: 1,
  },
  {
    src: SearchImg,
    key: 2,
  },
  {
    src: FavImg,
    key: 3,
  },
];

function LandingCarousel(args) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const slides = items.map((item) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.src}
      >
        <img className="d-block mx-auto img-fluid w-50" src={item.src} alt={item.altText} />
      </CarouselItem>
    );
  });

  return (
    <Carousel
        fade
        activeIndex={activeIndex}
        next={next}
        previous={previous}
        {...args}
    >
    <CarouselIndicators
        items={items}
        activeIndex={activeIndex}
        onClickHandler={goToIndex}
    />
    {slides}
    <CarouselControl
        direction="prev"
        directionText=""
        onClickHandler={previous}
    />
    <CarouselControl
        direction="next"
        directionText=""
        onClickHandler={next}
    />
    </Carousel>
  );
}

export default LandingCarousel;