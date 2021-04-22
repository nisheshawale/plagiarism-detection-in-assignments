import React, { useState } from "react";

import { AttachFile, Clear, CloseOutlined } from "@material-ui/icons";
import {
  Grid,
  CircularProgress,
  Button,
  Snackbar,
  IconButton,
  Backdrop,
  makeStyles,
  Typography,
} from "@material-ui/core";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import Upload from "./file.svg";
import CustomDivider from "../../components/CustomDivider";
import PlagiarismApi from "../../api/PlagiarismApi";

const extensions: string[] = ["txt"];
const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

interface DocUploadProps {
  snackbar: SnackBarProp;
  showLoadingOverlay: boolean;
  selectedFile: File | any;
}

interface SnackBarProp {
  show: boolean;
  message: string;
}

const DocUpload = () => {
  const classes = useStyles();

  const [state, setState] = useState<DocUploadProps>({
    snackbar: {
      show: false,
      message: "",
    },
    showLoadingOverlay: false,
    selectedFile: null,
  });

  const handleSnackBarClose = () => {
    setState({
      ...state,
      snackbar: {
        ...state.snackbar,
        show: false,
      },
    });
  };

  const onButtonClicked = () => {
    document?.getElementById("file_upload")?.click();
  };

  async function onFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    console.log(e);
    if (e.target.files) {
      if (e.target.files[0]) {
        let file = e.target.files[0];
        let fileName = file["name"];
        let extension = fileName.substr(fileName.lastIndexOf(".") + 1);
        if (!extensions.includes(extension)) {
          setState({
            ...state,
            snackbar: {
              show: true,
              message: "File not Supported",
            },
          });
        } else {
          setState({
            ...state,
            selectedFile: file,
            snackbar: {
              show: true,
              message: "File picked successfully",
            },
          });
        }
      }
    }
  }

  const onFileUpload = () => {
    if (!state.selectedFile) {
      setState({
        ...state,
        snackbar: {
          show: true,
          message: "Please select a file",
        },
      });
      return;
    } else {
      let formData = new FormData();
      formData.append("myFile", state.selectedFile);

      setState({
        ...state,
        showLoadingOverlay: true,
      });

      PlagiarismApi.uploadText(formData)
        .then((res) => {
          setState({
            ...state,
            showLoadingOverlay: false,
            snackbar: {
              message: "File uploaded successfully",
              show: true,
            },
          });

          console.log(`Success` + res.data);
        })
        .catch(() => {
          setState({
            ...state,
            showLoadingOverlay: false,
            snackbar: {
              message: "Something went wrong",
              show: true,
            },
          });
        });
    }
  };

  return (
    <div className="container">
      <Backdrop className={classes.backdrop} open={state.showLoadingOverlay}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Snackbar
        open={state.snackbar.show}
        onClose={handleSnackBarClose}
        message={state.snackbar.message}
        autoHideDuration={2000}
        action={
          <React.Fragment>
            <IconButton
              aria-label="close"
              color="inherit"
              onClick={handleSnackBarClose}
            >
              <CloseOutlined />
            </IconButton>
          </React.Fragment>
        }
      />
      <Grid
        container
        direction="column"
        justify="space-evenly"
        alignItems="center"
      >
        <Grid item>
          <img
            src={Upload}
            alt="upload "
            height="300"
            width="100%"
            style={{
              padding: 40,
            }}
          />
        </Grid>

        <Grid item>
          {state.selectedFile && (
            <Grid container justify="center" alignItems="center">
              <Grid item>
                <Typography
                  style={{
                    padding: 16,
                  }}
                >
                  {state.selectedFile["name"]}
                </Typography>
              </Grid>

              <Grid item>
                <IconButton
                  onClick={() => {
                    setState({
                      ...state,
                      selectedFile: null,
                    });
                  }}
                >
                  <Clear />
                </IconButton>
              </Grid>
            </Grid>
          )}
        </Grid>
        <Grid item>
          <CustomDivider />
        </Grid>
        <Grid item container justify="center">
          <input
            id="file_upload"
            type="file"
            onChange={(e) => onFileSelect(e)}
            hidden
          />

          <Grid item>
            <Button
              variant="outlined"
              startIcon={<AttachFile />}
              onClick={() => onButtonClicked()}
            >
              Pick File
            </Button>
          </Grid>
          <Grid item>
            <div
              style={{
                width: 40,
              }}
            />
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              startIcon={<CloudUploadIcon />}
              onClick={onFileUpload}
            >
              Upload File
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default DocUpload;
