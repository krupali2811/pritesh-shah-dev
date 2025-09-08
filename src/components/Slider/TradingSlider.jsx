import { Link } from "react-router-dom";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { paths } from "../../routes/paths";

const TradingSlider = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 3000,
    arrows: true,
    initialSlide: 0,
    adaptiveHeight: false,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          arrows: false,
          dots: true,
          adaptiveHeight: true,
        },
      },
    ],
  };

  const slides = [
    {
      id: "slide1",
      image: "/assets/images/sliderImg-1.png",
      title: "Global Markets at Your Fingertips, Explore and Trade!",
      description:
        "Experience the freedom of global trading at your fingertips, allowing you to explore opportunities and execute trades anytime, anywhere effortlessly.",
    },
    {
      id: "slide2",
      image: "/assets/images/sliderImg-2.jpg",
      title: "Trade Smarter with Our Advanced Tools",
      description:
        "Leverage our cutting-edge trading solutions to make smarter investment decisions with real-time data and analysis.",
    },
    {
      id: "slide3",
      image: "/assets/images/sliderImg-3.jpg",
      title: "Secure & Fast Transactions",
      description:
        "Enjoy secure, seamless, and lightning-fast transactions with our advanced trading platform.",
    },
  ];

  return (
    <div className="tradingSoln-slider mx-auto">
      <Slider {...settings}>
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="tradingSoln-slide d-flex flex-column flex-md-row"
          >
            <div className="slide-img w-100 w-md-50">
              <img src={slide.image} alt="Trading Screen" className="w-100" />
            </div>
            <div className="slide-content w-100 w-md-50 d-flex flex-column justify-content-center">
              <div className="tradingSoln-slide-content text-center text-md-start">
                <h6>Trading Solutions</h6>
                <h2>{slide.title}</h2>
                <p>{slide.description}</p>
                
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default TradingSlider;
