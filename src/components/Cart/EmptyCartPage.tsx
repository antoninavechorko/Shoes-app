import React from 'react';
import {Box, Typography, Button} from '@mui/material';
import Image from 'next/image';
const EmptyCartPage = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <Image
        src="/icons/cart.svg"
        alt="cart"
        width={32}
        height={32}
        style={{
          padding: '24px',
          background: '#F9FAFB',
          borderRadius: '50%',
        }}
      />
      <Typography
        component="p"
        sx={{fontWeight: 700, fontSize: 20, marginBottom: 2}}
      >
        You don`&apos;t have any products yet.
      </Typography>
      <Typography
        component="p"
        sx={{color: '#5C5C5C', fontWeight: 300, fontSize: 15, marginBottom: 6}}
      >
        Post can contain video, images and text.
      </Typography>

      <Button variant="contained" sx={{width: '10%', height: '4%'}}>
        Add product
      </Button>
    </Box>
  );
};

export default EmptyCartPage;
