import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-dracula";

import React from "react";

interface CodeEditorProps {
  onChange: (val: string) => void;
  lang: string;
  value: string;
}

const CodeEditor = (props: CodeEditorProps) => {
  let mode = "Python";
  const onChange = (newValue: string) => {
    props.onChange(newValue);
  };

  switch (props.lang) {
    case "Python":
      mode = "python";
      break;
    case "JavaScript":
      mode = "javascript";
      break;
    case "Java":
      mode = "java";
      break;
    case "C++":
    case "C":
      mode = "c_pp";
      break;

    default:
      mode = "python";
      break;
  }

  return (
    <AceEditor
      width={"100%"}
      height="40vh"
      placeholder=""
      mode={mode}
      theme="dracula"
      name="blah2"
      onChange={onChange}
      fontSize={14}
      showPrintMargin={true}
      showGutter={true}
      highlightActiveLine={true}
      value={props.value}
      setOptions={{
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        enableSnippets: true,
        showLineNumbers: true,
        wrap: true,
        tabSize: 2,
      }}
    />
  );
};

export default CodeEditor;
