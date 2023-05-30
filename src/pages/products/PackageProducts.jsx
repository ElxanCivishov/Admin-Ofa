import "./products.scss";
import List from "../../components/utils/list/List";
import { useQuery } from "@tanstack/react-query";

import { Navigate } from "react-router-dom";
import Loader from "../../components/utils/Loader";
import { GetPackageProducts } from "../../config/newReguest";

const PackageProducts = () => {
  const { isLoading, data, error } = useQuery({
    queryKey: ["packageProducts"],
    queryFn: GetPackageProducts,
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
        <List type="Paket məhsullar" data={data} />
      )}
    </div>
  );
};

export default PackageProducts;
