import Widget from "../../components/utils/widget/Widget";
import "./home.scss";

const Home = () => {
  return (
    <div className="home">
      <div className="widget-wrapper">
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
