import React from "react";
import macPhoto from "./mac.png";
import { useStyles } from "./styles";

const ImageContainer = () => {
  const classes = useStyles();
  return (
    <div className={classes.imageContainer}>
      <img alt="Logo" src={macPhoto} className={classes.image} width="100%" />
    </div>
  );
};

export default ImageContainer;
