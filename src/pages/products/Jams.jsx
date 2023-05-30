import "./products.scss";
import List from "../../components/utils/list/List";
import { useQuery } from "@tanstack/react-query";

import { Navigate } from "react-router-dom";
import Loader from "../../components/utils/Loader";
import { GetJams } from "../../config/newReguest";

const Jams = () => {
  const { isLoading, data, error } = useQuery({
    queryKey: ["jams"],
    queryFn: GetJams,
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
        <List type="Mürəbbələr və cemlər" data={data} />
      )}
    </div>
  );
};

export default Jams;
