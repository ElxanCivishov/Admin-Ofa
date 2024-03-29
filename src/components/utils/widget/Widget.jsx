import { Link } from "react-router-dom";
import { MdFormatListBulletedAdd } from "react-icons/md";
import "./widget.scss";

const Widget = ({ type, count }) => {
  let data;

  switch (type) {
    case "dryFruits":
      data = {
        title: "Quru meyvələr",
        link: "Hamısına bax",
        url: "/dry-fruits",
        icon: (
          <MdFormatListBulletedAdd
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "jams":
      data = {
        title: "Mürəbbələr",
        link: "Hamısına bax",
        url: "/jams",
        icon: (
          <MdFormatListBulletedAdd
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "packageProducts":
      data = {
        title: "Paket məhsullar",
        link: "Hamısına bax",
        url: "/package-products",
        icon: (
          <MdFormatListBulletedAdd
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    case "gallery":
      data = {
        title: "Qalareya",
        link: "Hamısına bax",
        url: "/gallery",
        icon: (
          <MdFormatListBulletedAdd
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    case "recipes":
      data = {
        title: "Reseptlər",
        link: "Hamısına bax",
        url: "/recipes",
        icon: (
          <MdFormatListBulletedAdd
            className="icon"
            style={{
              backgroundColor: "rgba(28, 12 , 18, 0.4)",
              color: "black",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title text-muted">{data.title}</span>
        <span className={count > 0 ? "counter positive" : "counter negative"}>
          {count}
        </span>
      </div>
      <div className="right">
        {data.icon}
        <Link className="link" to={data.url}>
          <span className="widget-link-text">{data.link}</span>
        </Link>
      </div>
    </div>
  );
};

export default Widget;
