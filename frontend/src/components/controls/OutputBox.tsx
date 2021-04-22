import React from "react";
import { CardContent, Card, Typography } from "@material-ui/core";

interface OutputBoxProps {
  show: boolean;
  message: string;
}
const OutputBox = (props: OutputBoxProps) => {
  if (props.show) {
    return (
      <Card
        variant="outlined"
        style={{
          width: "100%",
          height: "20vh",
        }}
      >
        <CardContent>
          <Typography variant="caption">Console</Typography>
        </CardContent>
        <CardContent>
          <Typography variant="h6">{props.message}</Typography>
        </CardContent>
      </Card>
    );
  } else {
    return <div />;
  }
};

export default OutputBox;
