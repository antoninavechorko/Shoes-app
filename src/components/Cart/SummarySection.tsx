import {Box, Typography} from '@mui/material';
import Button from '@/components/Button/Button';

const SummarySection = ({products}: {products: any[]}) => {
  return (
    <Box>
      <Typography
        component="h4"
        sx={{fontWeight: '500', fontSize: 45, marginBottom: '70px'}}
      >
        Summary
      </Typography>

      <Typography
        component="h4"
        sx={{
          fontWeight: '400',
          fontSize: 20,
          marginTop: 4,
          marginBottom: '20px',
        }}
      >
        Do you have a promocode?
      </Typography>

      <Box sx={{display: 'flex', flexDirection: 'Column'}}>
        <Box
          sx={{
            fontWeight: '400',
            fontSize: 30,
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Typography
            component="h4"
            sx={{fontWeight: '400', fontSize: 30, marginTop: 4}}
          >
            Subtotal
          </Typography>
          <Typography component="h4" sx={{fontSize: 30, marginTop: 4}}>
            0
          </Typography>
        </Box>

        <Box
          sx={{
            fontWeight: '400',
            fontSize: 30,
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Typography
            component="h4"
            sx={{fontWeight: '400', fontSize: 30, marginTop: 4}}
          >
            Shipping
          </Typography>
          <Typography
            component="h4"
            sx={{fontWeight: '400', fontSize: 30, marginTop: 4}}
          >
            0
          </Typography>
        </Box>

        <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
          <Typography
            component="h4"
            sx={{fontWeight: '400', fontSize: 30, marginTop: 4}}
          >
            Tax
          </Typography>
          <Typography
            component="h4"
            sx={{fontWeight: '400', fontSize: 30, marginTop: 4}}
          >
            0
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '60px',
          paddingBottom: '30px',
          borderTop: '1px solid #EAECF0',
          borderBottom: '1px solid #EAECF0',
        }}
      >
        <Typography
          component="h4"
          sx={{fontWeight: '600', fontSize: 30, marginTop: 4}}
        >
          Total
        </Typography>
        <Typography
          component="h4"
          sx={{fontWeight: '600', fontSize: 30, marginTop: 4}}
        >
          0
        </Typography>
      </Box>
      <Button isTransparent={false} width="100%" height="40px">
        Checkout
      </Button>
    </Box>
  );
};

export default SummarySection;