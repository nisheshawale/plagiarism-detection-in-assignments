import { Button } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";

export const NavButton = ({
  title,
  redirectTo,
  type,
}: {
  title: string;
  redirectTo: string;
  type: "button" | "menuItem";
}) => {
  const history = useHistory();
  return (
    <Button variant="text" onClick={() => history.push(redirectTo)}>
      {title}
    </Button>
  );
};
