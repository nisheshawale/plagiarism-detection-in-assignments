import React from "react";
import { Clear } from "@material-ui/icons";
import { Button, Grid } from "@material-ui/core";

interface StatusImageProps {
  hasError: boolean;
  message: string;
}

const StatusImage = (params: StatusImageProps) => {
  if (params.hasError) {
    return <Clear color="error" fontSize="large" />;
  } else if (params.message !== "") {
    return (
      <Grid container alignItems="stretch">
        <Grid item>
          <Button variant="outlined" color="primary">
            Check Plagiarism
          </Button>
        </Grid>
      </Grid>
    );
  } else return <div />;
};

export default StatusImage;
