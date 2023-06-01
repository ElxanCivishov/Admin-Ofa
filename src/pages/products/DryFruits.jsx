import { useQuery } from "@tanstack/react-query";
import { Navigate } from "react-router-dom";
import Loader from "../../components/utils/Loader";
import List from "../../components/utils/list/List";
import { GetDryFruits } from "../../config/newReguest";
import "./products.scss";

const DryFruits = () => {
  const { isLoading, data, error } = useQuery({
    queryKey: ["dryFruits"],
    queryFn: GetDryFruits,
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
        <List type="Qurudulmuş meyvələr" data={data} />
      )}
    </div>
  );
};

export default DryFruits;
