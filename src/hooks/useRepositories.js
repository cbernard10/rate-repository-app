import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = () => {
  const [repositories, setRepositories] = useState();
  const [loading, setLoading] = useState(true);

  //   const fetchRepositories = async () => {
  //     setLoading(true);

  //     // Replace the IP address part with your own IP address!
  //     const response = await fetch("http://192.168.1.59:5000/api/repositories");
  //     const json = await response.json();

  //     setLoading(false);
  //     setRepositories(json);
  //   };

  const { data, error } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
  });

  useEffect(() => {
    if (data) {
      setRepositories(data.repositories);
      setLoading(false);
    }
  }, [data]);

  if (error) {
    throw new Error("could not fetch repositories");
    // return null;
  }

  return { repositories, loading };
};

export default useRepositories;
