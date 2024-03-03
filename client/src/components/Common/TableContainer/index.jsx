import { Card, CardContent, Box } from "@mui/material";

export default function Table({ children }) {
  return (
    <Box>
      <Card variant="outlined">
        <CardContent>{children}</CardContent>
      </Card>
    </Box>
  );
}
