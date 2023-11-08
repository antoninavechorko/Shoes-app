import Dropdown from '@/components/Dropdown/Dropdown';
import {Input} from '@/components/Inputs/Input';
import ProductSizeList from '@/components/ProductSize/ProductSizeList';
import theme from '@/styles/theme/commonTheme';
import {
  BrandsResponse,
  ColorsResponse,
  GendersResponse,
  SizesResponse,
} from '@/types';
import {useQuery} from '@tanstack/react-query';
import axios, {AxiosResponse} from 'axios';
import {ProductData} from '../ProductForm';
import {Box, Grid, SxProps} from '@mui/material';
import React from 'react';
import {UseFormReturn} from 'react-hook-form';
import Textarea from '@/components/Textarea/Textarea';

const styles: Record<string, SxProps> = {
  dropdowns: {
    display: 'flex',
    gap: '1rem',
  },
  form: {
    display: 'flex',
    columnGap: '5rem',
    rowGap: '3rem',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
  formContainer: {
    width: 440,
    [theme.breakpoints.down('md')]: {
      width: 'auto',
    },
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    flexShrink: 1,
  },
};

type FormContainerProps = {
  formProps: Pick<
    UseFormReturn<ProductData>,
    'register' | 'control' | 'getValues' | 'setValue'
  >;
};

const FormContainer = ({formProps}: FormContainerProps) => {
  const {data: genders} = useQuery<AxiosResponse<GendersResponse>>({
    queryKey: ['genders'],
    queryFn: () => axios.get(`${process.env.API_URL}/genders`),
  });
  const {data: colors} = useQuery<AxiosResponse<ColorsResponse>>({
    queryKey: ['colors'],
    queryFn: () => axios.get(`${process.env.API_URL}/colors`),
  });
  const {data: brands} = useQuery<AxiosResponse<BrandsResponse>>({
    queryKey: ['brands'],
    queryFn: () => axios.get(`${process.env.API_URL}/brands`),
  });
  const {data: sizes} = useQuery<AxiosResponse<SizesResponse>>({
    queryKey: ['sizes'],
    queryFn: () => axios.get(`${process.env.API_URL}/sizes`),
  });

  const sizesMapped =
    sizes?.data.data.map(({id, attributes: {value}}) => ({
      id,
      value,
    })) || [];

  const checkSize = (id: number, isChecked: boolean) => {
    const oldSizes = formProps.getValues('sizes') || [];
    const oldSize = sizesMapped.find(size => size.id === id);
    const newSizes =
      oldSize && isChecked
        ? [...oldSizes, oldSize]
        : oldSizes.filter(size => size.id !== id);
    formProps.setValue('sizes', newSizes);
  };
  return (
    <Grid sx={styles.formContainer}>
      <Input
        labelText="Product name"
        register={formProps.register}
        validationSchema={{required: 'Product name is required'}}
        name="name"
        placeholder="Nike Air Max 90"
      />
      <Input
        labelText="Price"
        register={formProps.register}
        validationSchema={{required: 'Price is required'}}
        name="price"
      />
      <Box sx={styles.dropdowns}>
        <Dropdown
          name="gender"
          labelText="Gender"
          register={formProps.register}
          validationSchema={undefined}
          options={genders?.data.data.map(({id, attributes}) => ({
            value: id,
            text: attributes.name,
          }))}
        />
        <Dropdown
          name="brand"
          labelText="Brand"
          register={formProps.register}
          validationSchema={undefined}
          options={brands?.data.data.map(({id, attributes}) => ({
            value: id,
            text: attributes.name,
          }))}
        />
      </Box>
      <Textarea
        labelText="Description"
        register={formProps.register}
        validationSchema={{required: 'Description is required'}}
        name="description"
        minRows={8}
        placeholder="Do not exceed 300 characters."
      />
      <ProductSizeList
        control={formProps.control}
        header="Add size"
        sizes={sizesMapped}
        onClick={checkSize}
      />
    </Grid>
  );
};

export default FormContainer;
