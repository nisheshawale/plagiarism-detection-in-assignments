import { Button, Grid, Typography } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";
import { useStyles } from "./styles";

const TextContainer = () => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Grid
      container
      direction="column"
      style={{
        marginBottom: 100,
        marginTop: 100,
      }}
    >
      <Grid item>
        <Typography variant="h4" gutterBottom>
          Plagiarism Detection
        </Typography>
      </Grid>
      <Grid item>
        <Typography>
          Plagiarism has been increasing in the student assignment submissions
          which affects the evaluation of students. This paper proposes an
          approach for plagiarism detection in electronic texts as well as
          programming assignments. For electronics text, most of the methods
          take only syntactic similarity into consideration. We propose a
          framework based on BERT which is able to detect semantic similarity.
          Our method outperforms the best performing method at PAN competition
          2014 in detecting verbatim and summary plagiarism.
        </Typography>
      </Grid>
      <Grid item>
        <Button
          className={classes.button}
          variant="outlined"
          onClick={() => {
            history.push("/about");
          }}
        >
          Learn More
        </Button>
      </Grid>
    </Grid>
  );
};

export default TextContainer;
