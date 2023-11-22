import {Box, InputBase} from '@mui/material';
import {InputBaseProps} from '@mui/material/InputBase/InputBase';
import Image from 'next/image';
import {useId} from 'react';
import {RegisterOptions, UseFormRegister} from 'react-hook-form';
import searchIcon from 'public/icons/search.svg';

const styles = {
  search: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    width: '320px',
    borderRadius: '50px',
    border: '1px solid #494949',
    paddingLeft: '15px',
  },
  searchHuge: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    width: '100%',
    maxWidth: '1071px',
    paddingLeft: '32px',
    border: '1px solid #494949',
    borderRadius: '50px',
  },
  input: {
    width: '100%',
    padding: '8px 15px',
    border: 'none',
    outline: 'none',
  },
  inputHuge: {
    width: '100%',
    padding: '19px 15px 17px',
    border: 'none',
    outline: 'none',

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
  onInputChange?: (value: string) => void;
};

const SearchInput = ({
  register,
  name,
  validationSchema,
  giantMode = false,
  errorMessage,
  enterPressHandler,
  onInputChange,
  ...props
}: SearchInputProps) => {
  const id = useId();

  const onEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      enterPressHandler && enterPressHandler();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onInputChange?.(value);
  };

  const registerProps =
    register && name
      ? register(name, validationSchema ? validationSchema : {})
      : {};
  return (
    <Box sx={giantMode ? styles.searchHuge : styles.search}>
      <Image width={20} height={20} src={searchIcon} alt="search" />
      <InputBase
        placeholder="Search"
        id={id}
        sx={giantMode ? styles.inputHuge : styles.input}
        {...props}
        {...registerProps}
        error={!!errorMessage}
        onKeyDown={onEnterPress}
        onInput={handleInputChange}
      />
    </Box>
  );
};

export default SearchInput;
