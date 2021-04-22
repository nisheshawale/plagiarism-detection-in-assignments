import React, { useEffect, useState } from "react";
import LangSelector from "./controls/LangSelector";
import CodeEditor from "./controls/CodeEditor";
import OutputBox from "./controls/OutputBox";
import CompilerApi from "../api/CompilerApi";
import { CloseOutlined, PlayArrow } from "@material-ui/icons";
import {
  Grid,
  CircularProgress,
  Button,
  Snackbar,
  IconButton,
  Backdrop,
  makeStyles,
  TextField,
  InputAdornment,
} from "@material-ui/core";
import CustomAlert from "./controls/CustomAlert";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import PlagiarismApi from "../api/PlagiarismApi";

let languages = ["Python", "JavaScript", "Java", "C", "C++"];
let extensions = ["py", "js", "java", "c", "cpp"];
const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

interface EditorProps {
  selectedLang: number;
  task: Task;
  response: Resp;
  isLoading: boolean;
  snackbar: SnackBarProp;
  showLoadingOverlay: boolean;
  fileName: string;
}

interface Task {
  lang: string;
  code: string;
}

interface Resp {
  status: string;
  message: string;
}

interface SnackBarProp {
  show: boolean;
  message: string;
}

const Editor = () => {
  const classes = useStyles();

  const [state, setState] = useState<EditorProps>({
    selectedLang: 0,
    task: {
      lang: "Python",
      code: "",
    },
    response: {
      status: "0",
      message: "",
    },
    isLoading: false,
    snackbar: {
      show: false,
      message: "",
    },
    showLoadingOverlay: true,
    fileName: "",
  });

  useEffect(() => {
    CompilerApi.getTask(languages[0])
      .then((task) => {
        const res: Resp = { status: "0", message: "" };

        setState({
          ...state,
          task: task,
          response: res,
          selectedLang: 0,
          showLoadingOverlay: false,
        });
      })
      .catch((err) => {
        setState({
          ...state,
          showLoadingOverlay: false,
          snackbar: {
            message: "Something went wrong",
            show: true,
          },
        });
      });
  }, []);

  function handleLangChange(lang: string) {
    const index = parseInt(lang, 10);

    setState((oldState: EditorProps) => ({
      ...oldState,
      selectedLang: index,
      task: {
        lang: languages[index],
        code: "",
      },
      showLoadingOverlay: true,
    }));

    CompilerApi.getTask(languages[index])
      .then((task) => {
        const res: Resp = { status: "0", message: "" };

        setState({
          ...state,
          task: task,
          response: res,
          selectedLang: index,
          showLoadingOverlay: false,
        });
      })
      .catch((err) => {
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

  function handleCodeChange(code: string) {
    console.log("changing the code to " + code);
    return setState({
      ...state,
      task: {
        ...state.task,
        code: code,
      },
      response: {
        status: "0",
        message: "",
      },
    });
  }

  function handleRun(event: any) {
    setState({ ...state, isLoading: true });
    event.preventDefault();

    CompilerApi.run(state.task)
      .then((resp: any) => {
        console.log(resp);
        setState({
          ...state,
          response: resp,
          isLoading: false,
        });

        console.log(state);
      })
      .catch((error) => {
        console.log(error);
        setState({
          ...state,
          isLoading: false,
          snackbar: {
            message: "Something went wrong",
            show: true,
          },
        });
      });
  }

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
          var fr = new FileReader();
          fr.onload = function (e) {
            // e.target.result should contain the text
            let text = e.target?.result?.toString();
            if (text) {
              console.log(text);
              let langIndex = extensions.indexOf(extension);
              setState({
                ...state,
                task: {
                  code: text,
                  lang: languages[langIndex],
                },
                selectedLang: langIndex,
              });
            }
          };
          fr.readAsText(file);
        }
      }
    }
  }
  const handleFileNameChange = (event: any) => {
    setState({
      ...state,
      fileName: event.target.value,
    });
  };

  const onFileUpload = () => {
    if (state.fileName === "") {
      setState({
        ...state,
        snackbar: {
          show: true,
          message: "Filename Can't be empty",
        },
      });
      return;
    }
    let tempFile = new File(
      [state.task.code],
      state.fileName + "." + extensions[state.selectedLang],
      {
        type: "text/plain",
      }
    );

    let formData = new FormData();
    formData.append("myFile", tempFile);

    setState({
      ...state,
      showLoadingOverlay: true,
    });

    PlagiarismApi.uploadCode(formData)
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
      .catch((err) => {
        setState({
          ...state,
          showLoadingOverlay: false,
          snackbar: {
            message: "Something went wrong",
            show: true,
          },
        });
      });
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
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Grid container alignItems="center" justify="space-between">
            <Grid item>
              <LangSelector
                langs={languages}
                selectedIndex={state.selectedLang}
                onChange={handleLangChange}
              />
            </Grid>
            <input
              id="file_upload"
              type="file"
              onChange={(e) => onFileSelect(e)}
              hidden
            />

            <Grid item>
              <Button
                variant="outlined"
                startIcon={<CloudUploadIcon />}
                onClick={() => onButtonClicked()}
              >
                Pick From File
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <CodeEditor
            onChange={handleCodeChange}
            lang={languages[state.selectedLang]}
            value={state.task.code}
          />
        </Grid>
        <Grid item>
          <Grid container spacing={2} direction="column">
            <Grid item>
              <div>
                {state.isLoading ? (
                  <CircularProgress size={20} />
                ) : (
                  <Button
                    variant="outlined"
                    color="primary"
                    disabled={state.isLoading}
                    startIcon={<PlayArrow />}
                    onClick={handleRun}
                  >
                    Run
                  </Button>
                )}
              </div>
            </Grid>

            <Grid item>
              <form className={classes.root}>
                {state.response.message !== "" && (
                  <Grid container alignItems="center" justify="space-evenly">
                    <Grid item>
                      <TextField
                        variant="filled"
                        margin="none"
                        helperText="File Name"
                        onChange={handleFileNameChange}
                        value={state.fileName}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              .{extensions[state.selectedLang]}
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item>
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={onFileUpload}
                      >
                        Upload File
                      </Button>
                    </Grid>
                  </Grid>
                )}
              </form>
              {/* <StatusImage
                hasError={state.response.status !== "0"}
                message={state.response.message}
              /> */}
            </Grid>
          </Grid>
        </Grid>

        <Grid item>
          <CustomAlert
            show={state.response.status !== "0"}
            message={state.response.message}
          />
        </Grid>

        <Grid item>
          <OutputBox
            show={state.response.status === "0"}
            message={state.response.message}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default Editor;
