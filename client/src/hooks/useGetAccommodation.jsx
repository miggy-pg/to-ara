import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAccommodations } from "../api/accommodation";
import { setAccommodations } from "../redux/store/accommodationSlice";

export default function useGetAccommodations() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchData() {
      try {
        const { data: accommodations, isLoading } = await getAccommodations();
        console.log("useGetAccomodations: ", accommodations);
        dispatch(setAccommodations(accommodations));
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
