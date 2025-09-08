import Slider from "react-slick";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CardSlider = ({fund, unified}) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 3000,
    arrows: false,
    initialSlide: 0,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          arrows: false,
          dots: true,
        },
      },
    ],
  };

  const slides = [
    {
      id: "slide1",
      name: "Funding",
      mainBalance: fund,
      cardHolder: "hkg4587",
      expiryDate: "08/27",
      image: "/assets/images/master-card.svg",
      cardNumber: "**** **** **** 2530",
    },
    {
      id: "slide2",
      name: "Unified Trading",
      mainBalance: unified,
      cardHolder: "abc1234",
      expiryDate: "05/25",
      image: "/assets/images/visa-card.svg",
      cardNumber: "**** **** **** 1234",
    },
  ];

  return (
      <Slider {...settings} className="cardSlider">
        {slides.map((slide) => (
          <div className="cardSlide" key={slide.id}>
            <div className="row h-100 gx-3 gx-lg-5">
              <div className="col-6">
                <div className="d-flex justify-content-between flex-column h-100">
                  <div className="balanceDetail">
                    <h5
                      className="mb-2 ff-regular"
                      style={{ color: "#447044" }}
                    >
                     {slide.name}
                    </h5>

                    <h1 className="mb-2">${slide.mainBalance}</h1>
                  </div>
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="cardDetail">
                      <p className="mb-2">Card Holder</p>
                      <h5 className="">{slide.cardHolder}</h5>
                    </div>
                    <div className="cardDetail">
                      <p className="mb-2">Expiration Date</p>
                      <h5 className="">{slide.expiryDate}</h5>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="h-60 text-end d-flex justify-content-between flex-column">
                  <Link
                    to="#"
                    className="edit z-1 d-inline-flex align-self-end"
                  >
                    <svg
                      width="21"
                      height="21"
                      viewBox="0 0 21 21"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M0.53125 19.79C0.53125 19.2378 0.978965 18.79 1.53125 18.79H19.5312C20.0835 18.79 20.5312 19.2378 20.5312 19.79C20.5312 20.3423 20.0835 20.79 19.5312 20.79H1.53125C0.978965 20.79 0.53125 20.3423 0.53125 19.79Z"
                        fill="#595A5B"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M16.2384 1.08293C15.8478 0.692408 15.2147 0.692408 14.8241 1.08293L11.8244 4.08272C11.8243 4.08279 11.8242 4.08286 11.8241 4.08293C11.8241 4.083 11.824 4.08307 11.8239 4.08314L4.82414 11.0829C4.63661 11.2705 4.53125 11.5248 4.53125 11.79V15.79C4.53125 16.3423 4.97897 16.79 5.53125 16.79H9.53125C9.79647 16.79 10.0508 16.6847 10.2384 16.4971L17.2384 9.49715L20.2384 6.49715C20.6289 6.10662 20.6289 5.47346 20.2384 5.08293L16.2384 1.08293ZM16.5312 7.37583L18.117 5.79004L15.5312 3.20425L13.9455 4.79004L16.5312 7.37583ZM12.5312 6.20425L15.117 8.79004L9.11704 14.79H6.53125V12.2043L12.5312 6.20425Z"
                        fill="#595A5B"
                      />
                    </svg>
                  </Link>
                  <div className="d-flex align-items-center justify-content-between cardDetail cardNumber">
                    <div className="cardType me-3">
                      <img src={slide.image} alt="Master Card" />
                    </div>
                    <h5>{slide.cardNumber}</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
  );
};

export default CardSlider;
