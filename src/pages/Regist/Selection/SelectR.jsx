import * as React from 'react';
import "./SelectR.module.css";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const BasicSelect = (props) => {

  return (
    <Box sx={{ minWidth: 20 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">* Gender</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={props.gender}
          label="Gender"
          onChange={(event) => props.setValue(event.target.value)}
          className="selectR"
        >
          <MenuItem className="selectR-option" value={"none"}>Don't want to say</MenuItem>
          <MenuItem className="selectR-option" value={"male"}>Male</MenuItem>
          <MenuItem className="selectR-option" value={"female"}>Female</MenuItem>
        </Select>
      </FormControl>
    </Box> 
    );
}
 
export default BasicSelect;
