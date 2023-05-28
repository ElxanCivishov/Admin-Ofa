import "./list.scss";

import { Link } from "react-router-dom";
import { FaTrash, FaEdit } from "react-icons/fa";
import { useState } from "react";
import DeleteModal from "../modal/DeleteModal";

function FeatureList() {
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
    <div className="products">
      <main className="table">
        <section className="table__header">
          <h1>Qurudulmuş almanın xüsusiyyətləri</h1>
        </section>
        <section className="table__body">
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Xassə</th>
                <th>Tarix</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td> 1 </td>
                <td>Qurudulmuş alma dilimləri.</td>
                <td> 17 Dec, 2022 </td>

                <td style={{ minWidth: "200px" }}>
                  <Link to="/edit-product/12">
                    <FaEdit style={{ marginRight: "15px", color: "gold" }} />
                  </Link>
                  <FaTrash
                    style={{ color: "red" }}
                    onClick={() => handleClick("xassse1")}
                  />
                </td>
              </tr>
              <tr>
                <td> 1 </td>
                <td>Qurudulmuş alma dilimləri.</td>
                <td> 17 Dec, 2022 </td>

                <td style={{ minWidth: "200px" }}>
                  <Link to="/edit-product/12">
                    <FaEdit style={{ marginRight: "15px", color: "gold" }} />
                  </Link>
                  <FaTrash
                    style={{ color: "red" }}
                    onClick={() => handleClick("xassse1")}
                  />
                </td>
              </tr>
              <tr>
                <td> 1 </td>
                <td>Qurudulmuş alma dilimləri.</td>
                <td> 17 Dec, 2022 </td>

                <td style={{ minWidth: "200px" }}>
                  <Link to="/edit-product/12">
                    <FaEdit style={{ marginRight: "15px", color: "gold" }} />
                  </Link>
                  <FaTrash
                    style={{ color: "red" }}
                    onClick={() => handleClick("xassse1")}
                  />
                </td>
              </tr>
              <tr>
                <td> 1 </td>
                <td>Qurudulmuş alma dilimləri.</td>
                <td> 17 Dec, 2022 </td>

                <td style={{ minWidth: "200px" }}>
                  <Link to="/edit-product/12">
                    <FaEdit style={{ marginRight: "15px", color: "gold" }} />
                  </Link>
                  <FaTrash
                    style={{ color: "red" }}
                    onClick={() => handleClick("xassse1")}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>
      <DeleteModal
        open={open}
        setOpen={setOpen}
        product={product}
        handleDelete={handleDelete}
      />
    </div>
  );
}

export default FeatureList;
