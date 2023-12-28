import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getFestivals } from "../api/festival";
import { setFestivals } from "../redux/store/festivalSlice";

export default function useGetFestivals() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchData() {
      try {
        const { data: festivals, isLoading } = await getFestivals();
        dispatch(setFestivals(festivals));
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
