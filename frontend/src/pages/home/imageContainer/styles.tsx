import { makeStyles } from "@material-ui/core"

export const useStyles = makeStyles((theme) => ({
  imageContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 700,
  },
  image: {
    objectFit: "contain",
    width: "100%",
  },
}))
