import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@material-ui/core";
import React from "react";
import CodeReview from "./code_rev.svg";
import Assignment from "./assignment.svg";
import { useHistory } from "react-router-dom";

const Products = () => {
  const history = useHistory();

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Products
      </Typography>
      <Grid container spacing={8}>
        <Grid item md={6} sm={6}>
          <CustomCard
            image={CodeReview}
            title="Code Plagiarism"
            subtitle="Detect plagiarism in code"
            onLaunch={() => {
              history.push("/editor");
            }}
            onLearn={() => {}}
          />
        </Grid>

        <Grid item md={6} sm={6}>
          <CustomCard
            image={Assignment}
            title="Assigment Plagiarism"
            subtitle="Detect plagiarism in assignment"
            onLaunch={() => {
              history.push("/docUpload");
            }}
            onLearn={() => {}}
          />
        </Grid>
      </Grid>
    </div>
  );
};

interface CardProps {
  image: string;
  title: string;
  subtitle: string;
  onLaunch: () => void;
  onLearn: () => void;
}
const CustomCard = (props: CardProps) => {
  return (
    <Card elevation={0} variant="outlined">
      <CardActionArea>
        <img src={props.image} alt="Card description" height="250" />

        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.title}
          </Typography>
          {/* <Typography variant="body2" color="textSecondary" component="p">
            {props.subtitle}
          </Typography> */}
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={props.onLaunch}>
          Launch
        </Button>
        <Button size="small" color="primary" onClick={props.onLearn}>
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
};
export default Products;
