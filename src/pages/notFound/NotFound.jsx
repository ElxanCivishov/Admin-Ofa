import { Link } from "react-router-dom";
import notfound from "../../../public/img/notfound.svg";

const NotFound = () => {
  return (
    <div>
      <section>
        <div className="container d-flex flex-column">
          <div className="row min-vh-100 justify-content-center align-items-center">
            <div className="offset-lg-1 col-lg-10  py-8 py-xl-0">
              <div className="row justify-content-center align-items-center">
                <div className="col-md-6">
                  <div className=" mb-6 mb-lg-0">
                    <h3> Səhifə tapılmadı :(</h3>
                    <p className="mb-8"></p>
                    <Link to="/" className="btn btn-success ms-2">
                      Ana səhifəyə qayıt
                    </Link>
                  </div>
                </div>
                <div className="col-md-6">
                  <div>
                    <img src={notfound} alt="" className="img-fluid" />
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

export default NotFound;
