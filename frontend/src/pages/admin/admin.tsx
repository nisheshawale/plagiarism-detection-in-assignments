import { Button, Grid } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";
import AdminImge from "./admin.svg";

const Admin = () => {
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
        <img src={AdminImge} alt="404 " height="250" width="100%" />
      </Grid>

      <Grid item container justify="space-evenly" spacing={4}>
        <Grid item>
          <Button
            variant="outlined"
            color="primary"
            size="large"
            onClick={() => history.push("/check_text_plag")}
          >
            Check Text Plagiarism
          </Button>
        </Grid>

        <Grid item>
          <Button
            variant="outlined"
            color="primary"
            size="large"
            onClick={() => history.push("/check_code_plag")}
          >
            Check Code Plagiarism
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default Admin;
