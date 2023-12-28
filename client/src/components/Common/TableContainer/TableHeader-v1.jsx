import { Typography, TableCell, TableHead, TableRow } from "@mui/material";

export default function TableHeader() {
  return (
    <TableHead>
      <TableRow>
        <TableCell>
          <Typography color="textSecondary" variant="h6">
            ID
          </Typography>
        </TableCell>
        <TableCell>
          <Typography color="textSecondary" variant="h6">
            Name
          </Typography>
        </TableCell>

        <TableCell>
          <Typography color="textSecondary" variant="h6">
            Phone
          </Typography>
        </TableCell>
        <TableCell>
          <Typography color="textSecondary" variant="h6">
            Address
          </Typography>
        </TableCell>
        <TableCell align="center">
          <Typography color="textSecondary" variant="h6">
            Actions
          </Typography>
        </TableCell>
      </TableRow>
    </TableHead>
  );
}
