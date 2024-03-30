import { useState } from "react";
import Carousel from "react-simply-carousel";

export default function PreviewCarousel({activeSlide, setActiveSlide}) {
  const itemsCount = 10;
  return (
    <div>
      <Carousel
        containerProps={{
          style: {
            width: "100%",
            justifyContent: 'center',
            userSelect: "none",
          }
        }}
        updateOnItemClick={true}
        preventScrollOnSwipe
        swipeTreshold={60}
        activeSlideIndex={activeSlide}
        activeSlideProps={{
          style: {
            background: "blue",
            border: '2px solid',
            borderColor: 'lightgreen'
          }
        }}
        onRequestChange={setActiveSlide}
        forwardBtnProps={{
          children: ">",
          style: {
            width: 30,
            height: 30,
            minWidth: 30,
            alignSelf: "center",
            display:'none'
          }
        }}
        backwardBtnProps={{
          children: "",
          style: {
            width: 0,
            height: 0,
            minWidth: 0,
            alignSelf: "center",
            display:'none'
          }
        }}
        dotsNav={{
          show: true,
          itemBtnProps: {
            style: {
              height: 15,
              width: 15,
              borderRadius: "50%",
              border: 0,
            }
          },
         
          activeItemBtnProps: {
            style: {
              height: 15,
              width: 15,
              borderRadius: "50%",
              border: 0,
              background: "lightgreen"
            }
          }
        }}
        itemsToShow={itemsCount}
        speed={300}
        centerMode
      >
        {Array.from({ length: itemsCount }).map((item, index) => (
          <div
            style={{
              background: "white",
              width: 100,
              height: 140,
              border: "4px solid ",
              textAlign: "center",
              lineHeight: "140px",
              boxSizing: "border-box",
            }}
            key={index}
          >
            {index}
          </div>
        ))}
      </Carousel>
    </div>
  );
}
