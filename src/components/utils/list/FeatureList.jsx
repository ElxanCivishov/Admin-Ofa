import { Link, Navigate, useParams } from "react-router-dom";

import "./list.scss";
import { FaEdit } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { GetProductFeatures } from "../../../config/newReguest";
import Loader from "../Loader";

function FeatureList() {
  const { id } = useParams();

  const { isLoading, data, error } = useQuery({
    queryKey: ["features"],
    queryFn: () => GetProductFeatures(id),
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

  return (
    <div className="products">
      {isLoading ? (
        <div
          className="d-flex align-items-center justify-content-center w-100"
          style={{ height: "200px" }}
        >
          <Loader />
        </div>
      ) : (
        <main className="table">
          <section className="table__header">
            <h1>{data.feature_title}</h1>
          </section>
          <section className="table__body">
            <table>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Xassə</th>
                  <th>Tarix</th>
                  <th>Düzənlə</th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  (data.features.length == 0 ? (
                    <div
                      className="d-flex align-items-center justify-content-center w-100"
                      style={{ height: "100px" }}
                    >
                      {console.log(data.features.length)}
                      Xüsusiyyət əlavə edilməyib!
                    </div>
                  ) : (
                    data.features.map((feature) => (
                      <tr key={feature.id}>
                        <td> {feature.id} </td>
                        <td>{feature.text}</td>
                        <td className="text-center">
                          {feature.created_at
                            ? feature.created_at.split("T")[0]
                            : "-"}
                        </td>
                        <td
                          style={{ minWidth: "100px" }}
                          className="text-center"
                        >
                          <Link to={`/edit-product/${id}`}>
                            <FaEdit
                              style={{ marginRight: "15px", color: "gold" }}
                            />
                          </Link>
                        </td>
                      </tr>
                    ))
                  ))}
              </tbody>
            </table>
          </section>
        </main>
      )}
    </div>
  );
}

export default FeatureList;
