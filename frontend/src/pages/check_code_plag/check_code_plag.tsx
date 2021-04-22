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
import React, { useEffect, useState } from "react";
import PlagiarismApi from "../../api/PlagiarismApi";
import OpenCodeDialogProps from "./dialog_interface";
import OpenCodeDialog from "./open_code_dialog";

// the graph configuration, just override the ones you need
interface CheckCodeProps {
  isLoading: boolean;
  nodes: string[];
  links: string[][];
  dialogProps: OpenCodeDialogProps;
}

const CheckCodePlag = () => {
  const [state, setState] = useState<CheckCodeProps>({
    isLoading: true,
    nodes: [],
    links: [],
    dialogProps: {
      isLoading: true,
      isOpen: false,
      files: [],
      responses: [],
    },
  });

  useEffect(() => {
    const temp_nodes: string[] = [];

    PlagiarismApi.getCodeNames()
      .then((resp) => {
        const respList: string[] = resp.data as string[];

        respList.forEach((item) => {
          temp_nodes.push(item);
        });
        PlagiarismApi.checkCodePlag()
          .then((res) => {
            const obj = res.data;

            let tmp_links: string[][] = [];

            for (const key in obj) {
              const lst = obj[key];
              if (lst.length >= 2) {
                tmp_links.push([lst[0], lst[1]]);
              }
            }

            setState({
              ...state,
              isLoading: false,
              nodes: temp_nodes,
              links: tmp_links,
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
        files: files,
        responses: [],
      },
    });

    let resps: string[] = [];

    PlagiarismApi.getCode(files[0])
      .then((resp) => {
        console.log(resp);
        resps.push(resp.data);
        PlagiarismApi.getCode(files[1])
          .then((res) => {
            resps.push(res.data);
            setState({
              ...state,
              dialogProps: {
                isLoading: false,
                files: files,
                isOpen: true,
                responses: resps,
              },
            });
          })
          .catch((err) => {
            console.log(err);
            setState({
              ...state,
              dialogProps: {
                isLoading: false,
                files: files,
                isOpen: false,
                responses: [],
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
            files: files,
            isOpen: false,
            responses: [],
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
          <Grid container spacing={4}>
            <Grid item xs={6}>
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
                  {state.nodes.map((item) => (
                    <ListItem>
                      <Typography>{item}</Typography>
                    </ListItem>
                  ))}
                </List>
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Card
                variant="outlined"
                style={{
                  padding: 8,
                }}
              >
                <Typography>Plagiarised Files</Typography>
                <Divider
                  style={{
                    marginTop: 16,
                  }}
                />
                <List>
                  {state.links.map((item) => (
                    <ListItem key={state.links.indexOf(item)}>
                      <Card
                        variant="outlined"
                        style={{
                          width: "100%",
                        }}
                      >
                        <CardActionArea
                          onClick={() => {
                            fetchFiles(item);
                          }}
                        >
                          <List>
                            {item.map((it) => (
                              <ListItem key={it}>
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
          <OpenCodeDialog
            isOpen={state.dialogProps.isOpen}
            files={state.dialogProps.files}
            isLoading={state.dialogProps.isLoading}
            responses={state.dialogProps.responses}
            onClose={() => {
              setState({
                ...state,
                dialogProps: {
                  isOpen: false,
                  files: [],
                  isLoading: false,
                  responses: [],
                },
              });
            }}
          />
        </div>
      )}
    </div>
  );
};
export default CheckCodePlag;
