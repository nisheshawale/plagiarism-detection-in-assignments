import {
  AppBar,
  CircularProgress,
  Dialog,
  Grid,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { CloseRounded } from "@material-ui/icons";
import React from "react";
import OpenCodeDialogProps from "./dialog_interface";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-dracula";

const OpenCodeDialog = (props: OpenCodeDialogProps) => {
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
          <Typography variant="h6">Plagiarised Code</Typography>
        </Toolbar>
      </AppBar>

      <div
        style={{
          marginTop: 50,
          margin: "auto",
          display: "flex",
        }}
      >
        {props.isLoading ? (
          <CircularProgress />
        ) : (
          <Grid container spacing={4}>
            {props.responses?.map((item) => (
              <Grid item xs={6}>
                <Typography>
                  {props.files[props.responses?.indexOf(item)]}
                </Typography>
                <AceEditor
                  mode="java"
                  theme="github"
                  name={item.toString()}
                  value={item}
                  setOptions={{
                    readOnly: true,
                  }}
                  editorProps={{ $blockScrolling: true }}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </div>
    </Dialog>
  );
};
export default OpenCodeDialog;
