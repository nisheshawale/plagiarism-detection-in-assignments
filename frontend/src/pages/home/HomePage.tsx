import { Container } from "@material-ui/core";
import React from "react";

import TextContainer from "./textContainer/TextContainer";
import Team from "../team/team";
import CustomDivider from "../../components/CustomDivider";
import Products from "../products/products";

const HomePage = () => {
  return (
    <Container>
      <TextContainer />

      <CustomDivider />

      <Products />

      <CustomDivider />

      <Team />
    </Container>
  );
};

export default HomePage;
