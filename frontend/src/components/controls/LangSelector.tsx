import React from "react";
import { Select, MenuItem, FormControl, InputLabel } from "@material-ui/core";

interface LangSelectorProps {
  selectedIndex: number;
  onChange: (change: string) => void;
  langs: string[];
}

const LangSelector = (props: LangSelectorProps) => {
  const onChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    props.onChange(event.target.value as string);
  };

  return (
    <FormControl>
      <InputLabel>Language</InputLabel>

      <Select
        id="langs"
        value={props.selectedIndex}
        onChange={onChange}
        variant="filled"
      >
        {props.langs.map((lang: string, index: any) => (
          <MenuItem key={lang} value={index}>
            {lang}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default LangSelector;
