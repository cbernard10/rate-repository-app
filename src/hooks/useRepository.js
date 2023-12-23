import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_REPOSITORY } from "../graphql/queries";

const useRepository = (id) => {
  const [repository, setRepository] = useState();
  const [loading, setLoading] = useState(true);

  const { data, error } = useQuery(GET_REPOSITORY, {
    fetchPolicy: "cache-and-network",
    variables: { id },
  });

  useEffect(() => {
    if (data) {
      console.log("data", data);
      setRepository(data.repository);
      setLoading(false);
    }
  }, [data]);

  if (error) {
    throw new Error(`could not fetch repository ${id}: ${error}`);
  }

  return { repository, loading };
};

export default useRepository;
