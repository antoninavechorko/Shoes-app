import {Box, InputBase, SxProps} from '@mui/material';
import {InputBaseProps} from '@mui/material/InputBase/InputBase';
import Image from 'next/image';
import searchIcon from 'public/icons/search.svg';
import {useId} from 'react';
import {RegisterOptions, UseFormRegister} from 'react-hook-form';

const styles: Record<string, SxProps> = {
  search: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    width: '320px',
    borderRadius: '50px',
    border: '1px solid #494949',
    paddingLeft: '15px',
  },
  input: {
    width: '100%',
    padding: '8px 15px',
    border: 'none',
    outline: 'none',
  },
  searchHuge: {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
    width: 1,
    paddingLeft: 4,
    border: '1px solid #494949',
    borderRadius: 10,
    overflow: 'hidden',
  },
  inputHuge: {
    flex: 1,
    padding: {xs: '10px 15px 10px', sm: '17px 15px 17px'},
    outline: 'none',
    border: 'none',

    '& .MuiInputBase-input': {
      fontSize: '24px',
      lineHeight: 'normal',
    },
  },
};

type SearchInputProps = InputBaseProps & {
  register: UseFormRegister<any> | false;
  validationSchema: RegisterOptions<any> | false;
  name: string;
  giantMode?: boolean;
  errorMessage?: string;
  enterPressHandler?: () => void;
};

const SearchInput = ({
  register,
  name,
  validationSchema,
  giantMode = false,
  errorMessage,
  enterPressHandler,
  ...props
}: SearchInputProps) => {
  const id = useId();

  const onEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      enterPressHandler && enterPressHandler();
    }
  };

  const registerProps =
    register && name
      ? register(name, validationSchema ? validationSchema : {})
      : {};
  return (
    <Box sx={giantMode ? styles.searchHuge : styles.search}>
      <Image width={20} height={20} src={searchIcon} alt="search" />
      <InputBase
        {...props}
        {...registerProps}
        id={id}
        sx={giantMode ? styles.inputHuge : styles.input}
        placeholder="Search"
        error={!!errorMessage}
        onKeyUp={onEnterPress}
      />
    </Box>
  );
};

export default SearchInput;
