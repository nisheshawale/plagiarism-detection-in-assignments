import {
  AppBar,
  Card,
  CircularProgress,
  Container,
  Dialog,
  Grid,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { CloseRounded } from "@material-ui/icons";
import React from "react";
import OpenTextDialogProps from "./dialog_interface";

const OpenTextDialog = (props: OpenTextDialogProps) => {
  function renderText(text: string, indexes: number[]) {
    console.log(indexes);
    const widgets: any = [];
    for (let i = 0; i < text.length; i++) {
      if (i >= indexes[0] && i <= indexes[1]) {
        widgets.push(
          <span
            style={{
              color: "yellow",
            }}
          >
            {text[i]}
          </span>
        );
      } else {
        widgets.push(
          <span
            style={{
              color: "white",
            }}
          >
            {text[i]}
          </span>
        );
      }
    }
    return widgets;
  }

  return (
    <Dialog open={props.isOpen} fullScreen onClose={props.onClose}>
      <AppBar>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={props.onClose}
            aria-label="close"
          >
            <CloseRounded />
          </IconButton>
          <Typography variant="h6">Plagiarised Files</Typography>
        </Toolbar>
      </AppBar>

      <div
        style={{
          paddingTop: 80,
        }}
      >
        {props.isLoading ? (
          <Grid
            container
            justify="center"
            alignContent="center"
            alignItems="center"
          >
            <Grid item>
              <CircularProgress />
            </Grid>
          </Grid>
        ) : (
          <Container>
            <Grid container spacing={4}>
              <Grid item xs={6}>
                <Card
                  variant="outlined"
                  style={{
                    width: "100%",
                    height: "100%",
                    margin: 8,
                    padding: 16,
                  }}
                >
                  {renderText(
                    props.files[0].fileContent,
                    props.files[0].indexes
                  )}
                </Card>
              </Grid>
              <Grid item xs={6}>
                <Card
                  variant="outlined"
                  style={{
                    width: "100%",
                    height: "100%",
                    margin: 8,
                    padding: 16,
                  }}
                >
                  {renderText(
                    props.files[1].fileContent,
                    props.files[1].indexes
                  )}
                </Card>
              </Grid>
            </Grid>
          </Container>
        )}
      </div>
    </Dialog>
  );
};

export default OpenTextDialog;
