import { Link, useLocation } from "react-router-dom";
import "./ErrorPage.scss";
import errorImg from "../../../public/img/error.png";

const ErrorPage = () => {
  const { error } = useLocation().state;
  return (
    <div>
      <section>
        <div className="container d-flex flex-column">
          <div className="row min-vh-100 justify-content-center align-items-center">
            <div className="offset-lg-1 col-lg-10  py-8 py-xl-0">
              <div className="row justify-content-center align-items-center">
                <div className="col-md-6">
                  <div className=" mb-6 mb-lg-0">
                    <h1>{error ? error : "Something’s wrong here..."}</h1>
                    <Link to="/" className="btn btn-danger ms-2">
                      Ana səhifə
                    </Link>
                  </div>
                </div>
                <div className="col-md-6">
                  <div>
                    <img src={errorImg} alt="" className="img-fluid" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ErrorPage;
