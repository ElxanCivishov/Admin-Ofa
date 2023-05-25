import "./recipes.scss";
import noImage from "/img/noImage.png";

import { Link } from "react-router-dom";
import { FaTrash, FaEdit } from "react-icons/fa";
import { useState } from "react";
import DeleteModal from "../../components/utils/modal/DeleteModal";

const Recipes = () => {
  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState();

  const handleDelete = (value) => {
    setProduct(value);
    setOpen(true);
  };
  return (
    <div className="recipes">
      <main>
        <div className="recipes__header">
          <h1>Reseptlər</h1>
          <Link to="/recipe">
            <span>Yeni məhsul</span>
          </Link>
        </div>
        <div className="recipes__body">
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Şəkil</th>
                <th>Başlıq</th>
                <th>Tərkib</th>
                <th>Tarix</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>
                  <img src={noImage} alt="" />
                </td>
                <td style={{ minWidth: "200px" }}>Qurutma zamanı</td>
                <td style={{ minWidth: "250px" }}>
                  Qurudulmuş alma dilimləri. Qurutma zamanı bütün vitaminlər və
                  faydalı Qurutma zamanı bütün vitaminlər və faydalı
                </td>
                <td style={{ minWidth: "200px" }}> 17 Dec, 2022 </td>
                <td>
                  <p className="status positive">Aktiv</p>
                </td>
                <td style={{ minWidth: "200px" }}>
                  <Link to="/recipe/12">
                    <FaEdit style={{ marginRight: "15px", color: "gold" }} />
                  </Link>
                  <FaTrash
                    style={{ color: "red", cursor: "pointer" }}
                    onClick={() => handleDelete("test")}
                  />
                </td>
              </tr>{" "}
              <tr>
                <td>1</td>
                <td>
                  <img src={noImage} alt="" />
                </td>
                <td style={{ minWidth: "200px" }}>Qurutma zamanı</td>
                <td style={{ minWidth: "250px" }}>
                  Qurudulmuş alma dilimləri. Qurutma zamanı bütün vitaminlər və
                  faydalı Qurutma zamanı bütün vitaminlər və faydalı
                </td>
                <td style={{ minWidth: "200px" }}> 17 Dec, 2022 </td>
                <td>
                  <p className="status positive">Aktiv</p>
                </td>
                <td style={{ minWidth: "200px" }}>
                  <Link to="/recipe/12">
                    <FaEdit style={{ marginRight: "15px", color: "gold" }} />
                  </Link>
                  <FaTrash
                    style={{ color: "red", cursor: "pointer" }}
                    onClick={() => handleDelete("test")}
                  />
                </td>
              </tr>
              <tr>
                <td>1</td>
                <td>
                  <img src={noImage} alt="" />
                </td>
                <td style={{ minWidth: "200px" }}>Qurutma zamanı</td>
                <td style={{ minWidth: "250px" }}>
                  Qurudulmuş alma dilimləri. Qurutma zamanı bütün vitaminlər və
                  faydalı Qurutma zamanı bütün vitaminlər və faydalı
                </td>
                <td style={{ minWidth: "200px" }}> 17 Dec, 2022 </td>
                <td>
                  <p className="status positive">Aktiv</p>
                </td>
                <td style={{ minWidth: "200px" }}>
                  <Link to="/recipe/12">
                    <FaEdit style={{ marginRight: "15px", color: "gold" }} />
                  </Link>
                  <FaTrash
                    style={{ color: "red", cursor: "pointer" }}
                    onClick={() => handleDelete("test")}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
      <DeleteModal open={open} setOpen={setOpen} product={product} />
    </div>
  );
};

export default Recipes;
