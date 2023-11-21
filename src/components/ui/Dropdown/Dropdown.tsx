import theme from '@/config/theme';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {Box, InputLabel, MenuItem, Select, SxProps} from '@mui/material';
import {SelectProps} from '@mui/material/Select/Select';
import React, {useId} from 'react';

const styles: Record<string, SxProps> = {
  dropdown: {
    width: '100%',
  },
  select: {
    width: '100%',
    borderRadius: '8px',
    border: `1px solid ${theme.palette.grey['A700']}`,
  },
  '.MuiOutlinedInput-root': {
    border: 'none',
  },
};

type DropdownProps = SelectProps & {
  labelText: string;
  options?: {value: number; name: string}[];
};

const Dropdown = ({labelText, options = [], ...props}: DropdownProps) => {
  const id = useId();
  return (
    <Box sx={styles.dropdown}>
      <InputLabel htmlFor={id}>{labelText}</InputLabel>
      <Select
        id={id}
        IconComponent={ExpandMoreIcon}
        sx={styles.select}
        MenuProps={{sx: {maxHeight: 400}}}
        {...props}
      >
        <MenuItem key="none" value={0}>
          None
        </MenuItem>
        {options.map(({value, name}) => (
          <MenuItem key={value} value={value}>
            {name}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
};

export default Dropdown;