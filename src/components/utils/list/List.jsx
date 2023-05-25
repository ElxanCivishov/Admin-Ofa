import "./list.scss";
import noImage from "/img/noImage.png";

import { Link } from "react-router-dom";
import { FaEye, FaTrash, FaEdit } from "react-icons/fa";
import { useState } from "react";
import DeleteModal from "../modal/DeleteModal";

function List({ type }) {
  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState();

  const handleClick = (value) => {
    setProduct(value);
    setOpen(true);
  };
  const handleDelete = () => {
    alert(product);
  };
  return (
    <>
      <main className="table">
        <div className="table__header">
          <h1>{type}</h1>
          <Link to="/add-product">
            <span>Yeni məhsul</span>
          </Link>
        </div>
        <div className="table__body">
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Məhsul</th>
                <th>Əsas mətn</th>
                <th>Tərkib</th>
                <th>Xüsusiyyət başlığı</th>
                <th>Xüsusiyyətlər</th>
                <th>Əlavə mətn</th>
                <th>Tarix</th>
                <th>Qiymət - azn</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td style={{ minWidth: "250px" }}>
                  <img src={noImage} alt="" />
                  Qurudulmuş alma
                </td>
                <td style={{ minWidth: "300px" }}>
                  Qurutma zamanı bütün vitaminlər və faydalı xüsusiyyətlər
                  qorunur.
                </td>
                <td style={{ minWidth: "250px" }}>
                  Qurudulmuş alma dilimləri.
                </td>
                <td style={{ minWidth: "200px" }}>
                  Qurudulmuş almanın faydalı xüsusiyyətləri
                </td>
                <td>
                  <Link to="/feature-list/123">
                    <FaEye style={{ color: "rgb(15, 179, 45)" }} />
                  </Link>
                </td>
                <td style={{ minWidth: "300px" }}>
                  asasc asica coiacmasocacoasc acoas coasc,asoca scoasc ascoasc
                  asocasmcoac aoscasmcoasc,aocasoascasocass caskc ascoascmo
                </td>
                <td style={{ minWidth: "200px" }}> 17 Dec, 2022 </td>
                <td style={{ minWidth: "200px" }}>
                  <strong>180</strong>
                </td>
                <td>
                  <p className="status positive">Aktiv</p>
                </td>
                <td style={{ minWidth: "200px" }}>
                  <Link to="/edit-product/12">
                    <FaEdit style={{ marginRight: "15px", color: "gold" }} />
                  </Link>
                  <FaTrash
                    style={{ color: "red", cursor: "pointer" }}
                    onClick={() => handleClick("test")}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
      <DeleteModal
        open={open}
        setOpen={setOpen}
        product={product}
        handleDelete={handleDelete}
      />
    </>
  );
}

export default List;
