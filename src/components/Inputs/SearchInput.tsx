import {Box, InputBase} from '@mui/material';
import {InputBaseProps} from '@mui/material/InputBase/InputBase';
import Image from 'next/image';
import {useId} from 'react';
import {UseFormRegister} from 'react-hook-form';

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
};

type SearchInputProps = InputBaseProps & {
  register: UseFormRegister<any>;
  validationSchema: any;
  name: string;
  giantMode?: boolean;
};

export const SearchInput = ({
  register,
  name,
  validationSchema,
  giantMode = false,
  ...props
}: SearchInputProps) => {
  const id = useId();
  return (
    <Box sx={giantMode ? styles.searchHuge : styles.search}>
      <Image width={20} height={20} src="icons/search.svg" alt="search" />
      <InputBase
        placeholder="Search"
        id={id}
        sx={styles.input}
        {...props}
        {...register(name, validationSchema)}
      />
    </Box>
  );
};
