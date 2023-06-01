import { Link, Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import DeleteModal from "../../components/utils/modal/DeleteModal";
import { GetRecipes, DeleteRecipe } from "../../config/newReguest";
import { toast } from "react-toastify";
import Loader from "../../components/utils/Loader";
import { FaTrash, FaEdit } from "react-icons/fa";
import { MdAdd } from "react-icons/md";

import noImage from "/img/noImage.png";
import "./recipes.scss";

const Recipes = () => {
  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState();

  const {
    isLoading,
    data: recipes,
    error,
    refetch,
  } = useQuery({
    queryKey: ["recipes"],
    queryFn: GetRecipes,
    staleTime: 60000,
  });

  if (error)
    return (
      <Navigate
        to="/errorpage"
        state={{ error: error.message }}
        replace={true}
      />
    );

  const handleClick = (value) => {
    setProduct(value);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    await DeleteRecipe(id)
      .then(() => {
        toast.success("Resept silindi!");
        setProduct("");
        setOpen(false);
        refetch();
      })
      .catch(() => {
        toast.error("Resept silinmədi!");
      });
  };

  return (
    <div className="recipes">
      {isLoading ? (
        <div
          className="d-flex align-items-center justify-content-center w-100"
          style={{ height: "200px" }}
        >
          <Loader />
        </div>
      ) : (
        <>
          <main className="shadow p-4">
            <div className="recipes__header">
              <h1>Reseptlər</h1>
              <Link className="link" to="/recipe">
                <span>
                  Yeni resept <MdAdd />
                </span>
              </Link>
            </div>
            <div className="recipes__body ">
              <table>
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Şəkil</th>
                    <th>Başlıq</th>
                    <th>Tərkib</th>
                    <th>Tarix</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {recipes.data &&
                    recipes.data.map((recipe) => (
                      <tr key={recipe.id}>
                        <td>{recipe.id}</td>
                        <td>
                          <img src={recipe.image || noImage} alt="" />
                        </td>
                        <td style={{ minWidth: "200px" }}>{recipe.title}</td>
                        <td style={{ minWidth: "350px" }}>{recipe.content}</td>
                        <td style={{ minWidth: "150px" }}>
                          {recipe.created_at
                            ? recipe.created_at.split("T")[0]
                            : "-"}
                        </td>

                        <td style={{ minWidth: "100px" }}>
                          <Link to={`/recipe/${recipe.id}`}>
                            <FaEdit
                              style={{ marginRight: "15px", color: "gold" }}
                            />
                          </Link>
                          <FaTrash
                            style={{ color: "red", cursor: "pointer" }}
                            onClick={() => handleClick(recipe)}
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
        </>
      )}
    </div>
  );
};

export default Recipes;
