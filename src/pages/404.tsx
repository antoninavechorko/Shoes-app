import HeaderLayout from '@/components/layouts/HeaderLayout/HeaderLayout';
import theme from '@/config/theme';
import {
  Box,
  Button,
  Stack,
  SxProps,
  Typography,
  useMediaQuery,
} from '@mui/material';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import {useRouter} from 'next/router';

const styles: Record<string, SxProps> = {
  page: {
    height: '100vh',
    flexGrow: 1,
    flexDirection: 'column',
  },
  main: {
    display: 'flex',
    flexGrow: 1,
    height: '100%',
    maxWidth: 1850,
    marginX: 'auto',
    marginLeft: '32px',
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: '28px',
    padding: {sm: '0 20px', md: '0 0px', lg: '0 120px'},
    width: '50vw',
  },
  banner: {
    width: '50vw',
    height: '100%',
    position: 'relative',
  },
  mobile: {
    width: '100vw',
    flexBasis: '81.25%',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: '10vh',
  },
  text: {
    maxWidth: '305px',
    position: 'relative',
    textAlign: 'center',
    color: '#000',
  },
  buttons: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 'auto',
  },
};

const Error404 = () => {
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const router = useRouter();

  return (
    <Stack sx={styles.page}>
      {isMobile ? (
        <>
          <Head>
            <title>Not found</title>
          </Head>
          <Box sx={styles.mobile}>
            <Image
              src="/images/404PageBanner.png"
              alt="404 error"
              fill
              priority
              sizes="100vw"
              style={{objectFit: 'cover'}}
            />
            <Stack spacing={2} sx={styles.text}>
              <Typography variant="h1">Error 404</Typography>
              <Typography variant="body1">
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                diam
              </Typography>
            </Stack>
          </Box>

          <Box sx={styles.buttons}>
            <Stack direction="row" spacing={3}>
              <Link href="#" passHref>
                <Button
                  variant="outlined"
                  sx={{width: '152px', height: '40px'}}
                  onClick={() => router.back()}
                >
                  Go Back
                </Button>
              </Link>
              <Link href="/products">
                <Button
                  variant="contained"
                  sx={{width: '152px', height: '40px'}}
                >
                  Home
                </Button>
              </Link>
            </Stack>
          </Box>
        </>
      ) : (
        <>
          <Head>
            <title>Not found</title>
          </Head>
          <HeaderLayout>
            <Box sx={styles.main}>
              <Box sx={styles.info}>
                <Typography variant="h1">Error 404</Typography>
                <Typography variant="h4">
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                  diam nonummy nibh euismod tincidunt ut laoreet dolore magna
                </Typography>
                <Stack direction="row" spacing={4} flexWrap="wrap">
                  <Link href="#" passHref>
                    <Button
                      variant="outlined"
                      sx={{width: '152px', height: '40px'}}
                      onClick={() => router.back()}
                    >
                      Go Back
                    </Button>
                  </Link>
                  <Link href="/products">
                    <Button
                      variant="contained"
                      sx={{width: '152px', height: '40px'}}
                    >
                      Home
                    </Button>
                  </Link>
                </Stack>
              </Box>
              <Box sx={styles.banner}>
                <Image
                  src="/images/404PageBanner.png"
                  alt="404 error"
                  fill
                  priority
                  sizes="50vw"
                  style={{objectFit: 'cover'}}
                />
              </Box>
            </Box>
          </HeaderLayout>
        </>
      )}
    </Stack>
  );
};

export default Error404;
