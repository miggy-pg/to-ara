import { Card, CardMedia } from "@mui/material";
import { styled } from "@mui/material/styles";

const CardCoverStyle = styled(Card)(
  ({ theme }) => `
    position: relative;
    .MuiCardMedia-root {
      height: ${theme.spacing(46)};
    }
`
);

export default function CardCover({ record, recordPath }) {
  return (
    <CardCoverStyle>
      <CardMedia
        image={
          record?.image
            ? `http://localhost:4000/images/${recordPath}/${record?.image}`
            : `http://localhost:4000/images/${recordPath}/image-placeholder.jpg`
        }
        sx={{
          width: "100%",
          height: "100%",
        }}
      />
    </CardCoverStyle>
  );
}
