import {
  Card,
  CardActionArea,
  CircularProgress,
  Divider,
  Grid,
  List,
  ListItem,
  Typography,
} from "@material-ui/core";
import { ArrowRight, ArrowRightAltRounded } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import PlagiarismApi from "../../api/PlagiarismApi";
import OpenTextDialogProps from "./dialog_interface";
import OpenTextDialog from "./open_text_dialog";
import PlagiarisedFile from "./plagiarised_file";

// the graph configuration, just override the ones you need
interface CheckTextProps {
  isLoading: boolean;
  files: string[];
  links: string[][];
  originalFinalOp?: any;
  dialogProps: OpenTextDialogProps;
  sourceRet: SourceRet[];
  plagiarisedPairs: PlagiarisedPair[];
}
interface SourceRet {
  file: string;
  files: string[];
}
interface PlagiarisedPair {
  file: string[];
  indexes: number[][];
}

const CheckTextPlag = () => {
  const [state, setState] = useState<CheckTextProps>({
    isLoading: true,
    files: [],
    links: [],
    sourceRet: [],
    plagiarisedPairs: [],
    dialogProps: {
      isLoading: true,
      isOpen: false,
      files: [],
    },
  });

  useEffect(() => {
    const temp_files: string[] = [];

    PlagiarismApi.getFileNames()
      .then((resp) => {
        const respList: string[] = resp.data as string[];

        respList.forEach((item) => {
          temp_files.push(item);
        });
        PlagiarismApi.checkTextPlag()
          .then((res) => {
            const obj = res.data;
            const final_output = obj["final_output"];

            let tmp_links: string[][] = [];

            const source_ret = obj["source_retrieval"];
            let temp_source_ret: SourceRet[] = [];
            let temp_plag_pairs: PlagiarisedPair[] = [];

            for (const key in source_ret) {
              temp_source_ret.push({
                file: key,
                files: source_ret[key],
              });
            }

            for (const key in final_output) {
              const newObj = final_output[key];

              let files: string[] = [];
              let indexes: number[][] = [];

              for (const newKey in newObj) {
                files.push(newKey);
                indexes.push(newObj[newKey]);
              }
              temp_plag_pairs.push({
                file: files,
                indexes: indexes,
              });
            }

            setState({
              ...state,
              isLoading: false,
              files: temp_files,
              links: tmp_links,
              sourceRet: temp_source_ret,
              plagiarisedPairs: temp_plag_pairs,
              originalFinalOp: obj,
            });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const fetchFiles = (files: string[]) => {
    setState({
      ...state,
      dialogProps: {
        isOpen: true,
        isLoading: true,
        files: [],
      },
    });

    let resps: PlagiarisedFile[] = [];

    PlagiarismApi.getFile(files[0])
      .then((resp) => {
        console.log(resp);
        const testdata = state.plagiarisedPairs.filter((o) =>
          o.file.includes(files[0])
        );
        resps.push({
          fileContent: resp.data,
          indexes: testdata[0].indexes[0],
        });
        PlagiarismApi.getFile(files[1])
          .then((res) => {
            const testdata = state.plagiarisedPairs.filter((o) =>
              o.file.includes(files[0])
            );
            resps.push({
              fileContent: res.data,
              indexes: testdata[0].indexes[0],
            });
            setState({
              ...state,
              dialogProps: {
                isLoading: false,
                files: resps,
                isOpen: true,
              },
            });
          })
          .catch((err) => {
            console.log(err);
            setState({
              ...state,
              dialogProps: {
                isLoading: false,
                files: [],
                isOpen: false,
              },
            });
          });
      })
      .catch((err) => {
        console.log(err);
        setState({
          ...state,
          dialogProps: {
            isLoading: false,
            files: [],
            isOpen: false,
          },
        });
      });
  };

  return (
    <div>
      {state.isLoading ? (
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
        <div>
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <Card
                variant="outlined"
                style={{
                  padding: 8,
                }}
              >
                <Typography>Files</Typography>
                <Divider
                  style={{
                    marginTop: 16,
                  }}
                />
                <List>
                  {state.files.map((item) => (
                    <ListItem>
                      <Typography>{item}</Typography>
                    </ListItem>
                  ))}
                </List>
              </Card>
            </Grid>
            <Grid item xs={1}>
              <ArrowRightAltRounded />
            </Grid>

            <Grid item xs={3}>
              <Card
                variant="outlined"
                style={{
                  padding: 8,
                }}
              >
                <Typography>Source Retrieval</Typography>
                <Divider
                  style={{
                    marginTop: 16,
                  }}
                />
                <List>
                  {state.sourceRet.map((item) => (
                    <ListItem key={item.toString()}>
                      <Card
                        variant="outlined"
                        style={{
                          width: "100%",
                        }}
                      >
                        <Typography
                          style={{
                            margin: 8,
                          }}
                        >
                          {item.file}
                        </Typography>
                        <Divider />

                        <List>
                          {item.files.map((it) => (
                            <ListItem key={it}>
                              <Typography>{it}</Typography>
                            </ListItem>
                          ))}
                        </List>
                      </Card>
                    </ListItem>
                  ))}
                </List>
              </Card>
            </Grid>

            <Grid item xs={1}>
              <ArrowRightAltRounded />
            </Grid>

            <Grid item xs={3}>
              <Card
                variant="outlined"
                style={{
                  padding: 8,
                }}
              >
                <Typography>Plagiarised Pair</Typography>
                <Divider
                  style={{
                    marginTop: 16,
                  }}
                />
                <List>
                  {state.plagiarisedPairs.map((item) => (
                    <ListItem key={item.toString()}>
                      <Card
                        variant="outlined"
                        style={{
                          width: "100%",
                        }}
                      >
                        <CardActionArea
                          onClick={() => {
                            fetchFiles(item.file);
                          }}
                        >
                          <List>
                            {item.file.map((it) => (
                              <ListItem key={it.toString()}>
                                <Typography>{it}</Typography>
                              </ListItem>
                            ))}
                          </List>
                        </CardActionArea>
                      </Card>
                    </ListItem>
                  ))}
                </List>
              </Card>
            </Grid>
          </Grid>
          <OpenTextDialog
            isOpen={state.dialogProps.isOpen}
            files={state.dialogProps.files}
            isLoading={state.dialogProps.isLoading}
            onClose={() => {
              setState({
                ...state,
                dialogProps: {
                  ...state.dialogProps,
                  isOpen: false,
                },
              });
            }}
          />
        </div>
      )}
    </div>
  );
};
export default CheckTextPlag;
