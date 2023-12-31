import Input from '@/components/ui/Input/Input';
import {Box, Typography, Button, CircularProgress} from '@mui/material';
import Link from 'next/link';
import {SubmitHandler, useForm} from 'react-hook-form';
import {useMutation} from '@tanstack/react-query';
import axios from 'axios';
import {useRouter} from 'next/router';
import {toast} from 'react-toastify';
import {styles} from '@/components/layouts/AuthLayout/authPagesStyles';
import {ReactElement} from 'react';
import {AuthLayout} from '@/components/layouts/AuthLayout/AuthLayout';
import Head from 'next/head';

type SignUpType = {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
};

const SignUp = () => {
  const {mutate, isPending} = useMutation({
    mutationFn: (userData: Partial<SignUpType>) =>
      axios.post(`${process.env.API_URL}/auth/local/register`, userData),
    onSuccess: () => {
      toast.success('You are successfully sign up!');
      toast.info('The last step is to confirm your email');
      router.push('/auth/sign-in');
    },
    onError: (e: any) => {
      const errorMessage =
        e.response!.data.error.message ||
        'Account with such login or email already exist';
      toast.error(errorMessage);
    },
  });
  const {
    register,
    handleSubmit,
    watch,
    formState: {errors},
  } = useForm<SignUpType>();
  const router = useRouter();

  const onSubmit: SubmitHandler<SignUpType> = async data => {
    const {confirmPassword, ...restData} = data;
    mutate(restData);
  };

  return (
    <Box sx={styles.formBox}>
      {isPending && <CircularProgress sx={styles.loader} />}
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={styles.formContainer}
      >
        <Box sx={styles.form}>
          <Input
            labelText="Name"
            register={register}
            name="username"
            validationSchema={{
              required: 'This field is required',
            }}
            errorMessage={errors.username?.message}
          />
          <Input
            labelText="Email"
            register={register}
            name="email"
            validationSchema={{
              required: 'Entered value does not match email format',
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: 'Entered value does not match email format',
              },
            }}
            errorMessage={errors.email?.message}
          />
          <Input
            labelText="Password"
            register={register}
            name="password"
            validationSchema={{
              required: 'Min length is 8',
              minLength: {
                value: 8,
                message: 'Min length is 8',
              },
            }}
            type="password"
            errorMessage={errors.password?.message}
          />
          <Input
            labelText="Confirm password"
            register={register}
            name="confirmPassword"
            validationSchema={{
              required: 'Your passwords do no match',
              validate: (val: string) => {
                if (watch('password') != val) {
                  return 'Your passwords do no match';
                }
              },
            }}
            type="password"
            errorMessage={errors.confirmPassword?.message}
          />
        </Box>

        <Button type="submit" variant="contained" disabled={isPending}>
          Sign up
        </Button>
      </Box>
      <Box sx={styles.linksContainer}>
        <Typography variant="body1">Already have an account?</Typography>
        <Link href={'/auth/sign-in'} style={styles.link} aria-label="Log in">
          <Typography>Log in</Typography>
        </Link>
      </Box>
    </Box>
  );
};

SignUp.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <Head>
        <title>Sign up</title>
        <meta
          name="description"
          content="Create a new account to unlock exclusive benefits. Join our community, enjoy personalized recommendations, and stay updated on the latest offers and products."
        />
      </Head>
      <AuthLayout
        title="Create an account"
        subtTitle="Create an account to get an easy access to your dream shopping"
      >
        {page}
      </AuthLayout>
    </>
  );
};

export default SignUp;
