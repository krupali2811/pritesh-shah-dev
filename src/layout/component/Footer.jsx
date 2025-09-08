import { Link } from "react-router-dom";
// import { ScrollToTopButton } from "../../components/buttons/scrollToTop";

const Footer = () => {
  return (
    <>
      <footer className="text-black pb-0 px-0">
        <div className="row">
          <div className="col-md-6 text-center text-md-start">
            <p>
              Copyright © 2024 All rights reserved. | <span>Develop by </span>
              <Link to="https://aaryasoftex.com/" target="_blank">
                Aarya SoftEx LLP
              </Link>
            </p>
          </div>
          <div className="col-md-6 text-center text-md-end">
            <Link href="#">
              Version: <span>1.0.0</span>
            </Link>
          </div>
        </div>
      </footer>
      <button
        onClick={() => window.scrollTo(0, 0)}
        className="btn-scrollToTop"
        type="button"
      >
        <i className="bi bi-chevron-up"></i>
      </button>
      {/* <ScrollToTopButton /> */}
    </>
  );
};

export default Footer;
