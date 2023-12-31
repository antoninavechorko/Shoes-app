import React, {ReactElement, useState} from 'react';
import {Box, Typography} from '@mui/material';
import ProductItem from '@/components/common/Cart/CartItem';
import SummarySection from '@/components/common/Cart/SummarySection';
import EmptyCartPage from '@/components/common/Cart/EmptyCartPage';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import theme from '@/config/theme';
import {useGet} from '@/hooks';
import {ProductsResponse} from '@/types';
import ProductItemSkeleton from '@/components/common/Cart/ProductItemSkeleton';
import SummarySectionSkeleton from '@/components/common/Cart/SummarySectionSkeleton';
import {SxProps} from '@mui/system';
import Head from 'next/head';
import HeaderLayout from '@/components/layouts/HeaderLayout/HeaderLayout';
import {NextPageWithLayout} from './_app';
import Checkout from '@/components/common/Cart/Checkout';

const styles: Record<string, SxProps> = {
  container: {
    maxWidth: {sm: 700, lg: 1100, xl: 1500},
    display: 'flex',
    gap: '5%',
    margin: {
      xl: '100px auto 50px auto',
      lg: '50px auto 50px auto',
      sm: '50px auto 50px auto',
      xs: '30px auto 50px auto',
    },
    paddingX: 4,
    [theme.breakpoints.down('lg')]: {
      flexDirection: 'column',
    },
  },
  emptyCartContainer: {
    fontSize: {
      xl: '155px 305px 0 196px',
      lg: '155px 13% 0 10%',
      sm: '180px 9% 0 6%',
      xs: '125px 20px 0',
    },
    width: '100%',
    textAlign: 'center',
  },
  cartItem: {
    width: {
      xl: '62%',
      lg: '100%',
      sm: '100%',
      xs: '100%',
    },
  },
  summarySection: {
    flexShrink: 2,
    width: {
      xl: '38%',
      lg: '100%',
      sm: '100%',
      xs: '100%',
    },
  },
  containerSkeleton: {
    gap: '10%',
    display: 'flex',
    flexDirection: {
      [theme.breakpoints.down('lg')]: {
        flexDirection: 'column',
      },
    },
    width: '100%',
  },
  containerSkeletonCartItems: {
    width: {
      xl: '62%',
      lg: '100%',
      sm: '100%',
      xs: '100%',
    },
    display: 'flex',
    flexDirection: 'column',
  },
  containerSkeletonSummer: {
    width: {
      xl: '38%',
      lg: '100%',
      sm: '100%',
      xs: '100%',
    },
  },
};

const txtAddFields = (ids: string[]) =>
  ids.map(id => `filters[id]=${id}`).join('&');

const CartPage: NextPageWithLayout = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();

  const {data: cartIds} = useQuery({
    queryKey: ['cart'],
    queryFn: async () => JSON.parse(localStorage.getItem('cart') || '{}'),
  });
  const params = cartIds && txtAddFields(Object.keys(cartIds));

  const isNotEmpty = params !== undefined && params.length !== 0;

  const {data: products, isLoading} = useGet<ProductsResponse>(
    `/products?${params}`,
    {
      enabled: isNotEmpty,
    },
    {
      populate: '*',
    },
  );

  return (
    <Box sx={styles.container}>
      {isLoading ? (
        <Box sx={styles.containerSkeleton}>
          <Box sx={styles.containerSkeletonCartItems}>
            {[...Array(3)].map((_, index) => (
              <ProductItemSkeleton key={index} />
            ))}
          </Box>
          <Box sx={styles.containerSkeletonSummer}>
            <SummarySectionSkeleton />
          </Box>
        </Box>
      ) : params !== undefined && params.length === 0 ? (
        <Box sx={styles.emptyCartContainer}>
          <Checkout flagCheck={setIsModalOpen} isModalOpen={isModalOpen} />
          <EmptyCartPage />
        </Box>
      ) : isNotEmpty ? (
        <>
          <Box sx={styles.cartItem}>
            <Typography variant="h1">Cart</Typography>
            {products &&
              products.data.map(({id, attributes}) => (
                <ProductItem
                  productID={id}
                  cartIds={cartIds}
                  key={id}
                  product={attributes}
                />
              ))}
          </Box>
          <Box sx={styles.summarySection}>
            <SummarySection
              flagCheck={setIsModalOpen}
              products={Object.entries(cartIds).map(([id, quantity]) => ({
                id,
                quantity,
                price:
                  products?.data.find(
                    ({id: productID}) => productID.toString() === id,
                  )?.attributes.price || 0,
              }))}
            />
          </Box>
        </>
      ) : null}
    </Box>
  );
};

CartPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <Head>
        <title>Cart</title>
        <meta
          name="description"
          content="View and manage your shopping cart. Securely store and review your selected items before making a purchase. A convenient way to shop online!"
        />
      </Head>
      <HeaderLayout>{page}</HeaderLayout>
    </>
  );
};

export default CartPage;
