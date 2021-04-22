import { Button, Grid } from "@material-ui/core";
import { HomeOutlined } from "@material-ui/icons";
import React from "react";
import { useHistory } from "react-router-dom";
import Image404 from "./404.svg";

const Page404 = () => {
  const history = useHistory();

  return (
    <Grid
      container
      alignContent="center"
      alignItems="center"
      direction="column"
      spacing={8}
    >
      <Grid item>
        <img src={Image404} alt="404 " height="250" width="100%" />
      </Grid>
      <Grid item>
        <Button
          variant="outlined"
          color="primary"
          size="large"
          onClick={() => history.push("/")}
        >
          <HomeOutlined
            style={{
              paddingRight: 4,
            }}
          />
          Go Home
        </Button>
      </Grid>
    </Grid>
  );
};
export default Page404;
