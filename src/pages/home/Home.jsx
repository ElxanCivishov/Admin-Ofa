import Widget from "../../components/utils/widget/Widget";
import "./home.scss";

// import {
//   GetDryFruits,
//   GetJams,
//   GetPackageProducts,
// } from "../../config/newReguest";
// import { useEffect, useState } from "react";

const Home = () => {
  // const [count, setCount] = useState({
  //   dryFruits: 0,
  //   jams: 0,
  //   packageProducts: 0,
  //   gallery: 0,
  //   recipes: 0,
  // });

  // useEffect(() => {
  //   GetPackageProducts().then((res) => {
  //     setCount({ ...count, packageProducts: res.length });
  //   });
  //   GetDryFruits().then((res) => {
  //     setCount({ ...count, dryFruits: res.length });
  //   });
  //   GetJams().then((res) => {
  //     setCount({ ...count, jams: res.length });
  //   });
  // }, []);

  return (
    <div className="home">
      <div className="widget-wrapper">
        {/* {console.log(GetPackageProductsCount)} */}
        <Widget type="dryFruits" count="200" />
        <Widget type="jams" count="0" />
        <Widget type="packageProducts" count="35" />
        <Widget type="gallery" count="70" />
        <Widget type="recipes" count="20" />
      </div>
    </div>
  );
};

export default Home;
