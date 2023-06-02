import { Navigate, useLocation } from "react-router-dom";
import Widget from "../../components/utils/widget/Widget";
import "./home.scss";
import { useEffect, useState } from "react";
import { GetCount } from "../../config/newReguest";

// import {
//   GetDryFruits,
//   GetJams,
//   GetPackageProducts,
// } from "../../config/newReguest";
// import { useEffect, useState } from "react";

const Home = () => {
  const [count, setCount] = useState();

  useEffect(() => {
    const getCount = async () => {
      try {
        const res = await GetCount();
        setCount(res);
      } catch (error) {
        <Navigate
          to="/errorpage"
          state={{ error: error.message }}
          replace={true}
        />;
      }
    };

    getCount();
  }, []);

  console.log(count);

  return (
    <div className="home">
      {count && (
        <div className="widget-wrapper">
          <Widget type="dryFruits" count={count.dry} />
          <Widget type="jams" count={count.jams} />
          <Widget type="packageProducts" count={count.package} />
          <Widget type="gallery" count={count.gallery} />
          <Widget type="recipes" count={count.recipes} />
        </div>
      )}
    </div>
  );
};

export default Home;
