import React from "react";
import { Alert, AlertTitle } from "@material-ui/lab";

interface CustomAlertProps {
  show: boolean;
  message: string;
}

const CustomAlert = (props: CustomAlertProps) => {
  if (props.show) {
    return (
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        <strong>{props.message}</strong>
      </Alert>
    );
  }

  return <div></div>;
};

export default CustomAlert;
