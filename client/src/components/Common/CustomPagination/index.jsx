import { useState } from "react";
import { useSearchParams } from "react-router-dom";

import { Pagination } from "@mui/material";

<<<<<<< HEAD
const ITEMS_PAGE_SIZE = 9;

export default function CustomPagination({
  itemsLength,
  setIndexOfLastItem,
  setIndexOfFirstItem,
  itemPageSize = ITEMS_PAGE_SIZE,
}) {
=======
const ITEMS_PAGE_SIZE = 9

export default function CustomPagination({
  itemsLength,
  setIndexOfFirstItem,
  setIndexOfLastItem,
  itemPageSize = ITEMS_PAGE_SIZE,
})
{
>>>>>>> 886ab8f (fix: page filters)
  const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  const handleChange = (event, value) => {
    setPage(value);
    searchParams.set("page", value);
    setSearchParams(searchParams);
  };

  const pageCount = Math.ceil(itemsLength / itemPageSize);
  const indexOfLastItem = currentPage * itemPageSize;
  const indexOfFirstItem = indexOfLastItem - itemPageSize;
  setIndexOfLastItem(indexOfLastItem);
  setIndexOfFirstItem(indexOfFirstItem);

  return (
    <Pagination count={pageCount} sx={{ mt: 5 }} onChange={handleChange} />
  );
}
