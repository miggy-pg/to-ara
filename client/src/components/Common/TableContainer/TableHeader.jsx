import { Typography, TableCell, TableHead, TableRow } from "@mui/material";

export default function TableHeader({ data }) {
  return (
    <TableHead>
      <TableRow>
        {data.map((header) => (
          <TableCell key={header}>
            <Typography color="textSecondary" variant="h6">
              {header}
            </Typography>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
