import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAttractions } from "../api/attraction";
import { setAttractions } from "../redux/store/attractionsSlice";

export default function useGetAttractions() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchData() {
      try {
        const { data: attractions, isLoading } = await getAttractions();
        dispatch(setAttractions(attractions));
        setIsLoading(isLoading);
      } catch (error) {
        console.log(error);
        setError(error.response.data.errors[0].msg);
      }
    }
    fetchData();
  }, [dispatch]);

  return { error, isLoading };
}
