import { Link } from "react-router-dom";

import { FaEye, FaTrash, FaEdit } from "react-icons/fa";
import { MdAdd, MdPreview } from "react-icons/md";
import DeleteModal from "../modal/DeleteModal";
import AdditionModal from "../modal/AdditionModal";
import noImage from "/img/noImage.png";

import "./list.scss";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DeleteProduct } from "../../../config/newReguest";
import { toast } from "react-toastify";
import { useState } from "react";

function List({ type, data }) {
  const [open, setOpen] = useState(false);
  const [openAddition, setOpenAddition] = useState(false);
  const [product, setProduct] = useState();

  const handleClick = (value) => {
    setProduct(value);
    setOpen(true);
  };

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id) => DeleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dryFruits"] });
      queryClient.invalidateQueries({ queryKey: ["jams"] });
      queryClient.invalidateQueries({ queryKey: ["packageProducts"] });
      toast.success("Məhsul silindi!");
      setProduct();
      setOpen(false);
    },
    onError: () => {
      toast.error("Məhsul silinmədi!");
    },
  });

  const handleDelete = async (id) => {
    mutation.mutate(id);
  };

  return (
    <>
      <main className="table">
        <div className="table__header mt-3">
          <h1 className="text-muted">{type}</h1>
          <Link className="link" to="/add-product">
            <span>
              Yeni məhsul <MdAdd />
            </span>
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
                <th className="text-center"> Tarix</th>
                <th>Qiymət</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td
                      style={{ minWidth: "300px" }}
                      className="d-flex align-items-center "
                    >
                      <div>
                        <img src={item.image || noImage} alt="" />
                      </div>
                      <div>{item.title}</div>
                    </td>
                    <td style={{ minWidth: "300px" }}>{item.content}</td>
                    <td style={{ minWidth: "250px" }}>{item.composition}</td>
                    <td style={{ minWidth: "200px" }}>{item.feature_title}</td>
                    <td style={{ textAlign: "center" }}>
                      <Link to={`/feature-list/${item.id}`}>
                        <FaEye
                          style={{
                            color: "rgb(15, 179, 45)",
                            fontSize: "18px",
                          }}
                        />
                      </Link>
                    </td>
                    <td style={{ textAlign: "center", minWidth: "150px" }}>
                      <MdPreview
                        onClick={() => {
                          setOpenAddition(true), setProduct(item);
                        }}
                        style={{
                          color: "rgb(15, 179, 45)",
                          fontSize: "18px",
                          cursor: "pointer",
                        }}
                      />
                    </td>
                    <td style={{ minWidth: "150px", textAlign: "center" }}>
                      {item.created_at ? item.created_at.split("T")[0] : "-"}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      <strong>{item.price}</strong>
                    </td>

                    <td style={{ minWidth: "100px", textAlign: "center" }}>
                      <Link to={`/edit-product/${item.id}`}>
                        <FaEdit
                          style={{ marginRight: "15px", color: "gold" }}
                        />
                      </Link>
                      <FaTrash
                        style={{ color: "red", cursor: "pointer" }}
                        onClick={() => handleClick(item)}
                      />
                    </td>
                  </tr>
                ))}
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
      <AdditionModal
        openAddition={openAddition}
        setOpenAddition={setOpenAddition}
        product={product}
      />
    </>
  );
}

export default List;
