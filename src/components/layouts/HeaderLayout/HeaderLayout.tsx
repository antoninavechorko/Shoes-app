import {Box, SxProps} from '@mui/material';
import {ReactNode} from 'react';
import Header from '@/components/common/Header/Header';

const styles: Record<string, SxProps> = {
  layout: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
  },
  children: {
    overflowY: 'auto',
    height: '100%',
  },
};

type HeaderLayoutProps = {
  children: ReactNode;
};

const HeaderLayout = ({children}: HeaderLayoutProps) => {
  return (
    <Box sx={styles.layout}>
      <Header />
      <Box sx={styles.children}>{children}</Box>
    </Box>
  );
};

export default HeaderLayout;