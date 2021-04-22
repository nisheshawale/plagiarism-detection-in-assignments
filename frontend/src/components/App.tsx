import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import {
  createMuiTheme,
  CssBaseline,
  MuiThemeProvider,
  Container,
} from "@material-ui/core";
import HomePage from "../pages/home/HomePage";
import CodeEditorPage from "../pages/CodeEditorPage";
import Page404 from "../pages/404/404";
import { Header } from "./header/header";
import Team from "../pages/team/team";
import About from "../pages/about/about";
import Admin from "../pages/admin/admin";
import Products from "../pages/products/products";
import DocUpload from "../pages/doc_upload/doc_upload";
import CheckTextPlag from "../pages/check_text_plag/check_text_plag";
import CheckCodePlag from "../pages/check_code_plag/check_code_plag";

const App = () => {
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: "#e5b700",
      },
      background: {
        paper: "#031a30",
        default: "#031a30",
      },
      type: "dark",
    },

    overrides: {
      MuiFormLabel: {
        root: {
          padding: "0.5rem",
        },
      },
    },
    typography: {
      fontFamily: [
        "-apple-system",
        "Fira Code",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
    },
  });

  return (
    <MuiThemeProvider theme={theme}>
      <Container>
        <CssBaseline />
        <Router>
          <Header />
          <Container
            style={{
              padding: 16,
              marginTop: 100,
              maxWidth: 900,
            }}
          >
            <Switch>
              <Route exact path="/">
                <HomePage />
              </Route>
              <Route exact path="/major_project_frontend">
                <HomePage />
              </Route>
              <Route path="/editor">
                <CodeEditorPage />
              </Route>
              <Route path="/docUpload">
                <DocUpload />
              </Route>
              <Route path="/team">
                <Team />
              </Route>
              <Route path="/about">
                <About />
              </Route>
              <Route path="/products">
                <Products />
              </Route>
              <Route path="/admin">
                <Admin />
              </Route>
              <Route path="/check_text_plag">
                <CheckTextPlag />
              </Route>
              <Route path="/check_code_plag">
                <CheckCodePlag />
              </Route>
              <Route path="*">
                <Page404 />
              </Route>
            </Switch>
          </Container>
        </Router>
      </Container>
    </MuiThemeProvider>
  );
};

export default App;
