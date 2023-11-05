import {SubmitHandler, useForm} from 'react-hook-form';
import {Box, Typography} from '@mui/material';
import Link from 'next/link';
import {CustomButton} from '@/components/Button/Button';
import {Input} from '@/components/Inputs/Input';
import Image from 'next/image';
import axios from 'axios';
import {useMutation} from 'react-query';

type ForgotPasswordType = {
  email: string;
};

const forgotPasswordHandler = async (userData: ForgotPasswordType) => {
  try {
    const data = await axios.post(
      'https://shoes-shop-strapi.herokuapp.com/api/auth/forgot-password',
      userData,
    );
    return data;
  } catch (e) {
    console.log(e);
  }
};

export default function ForgotPassword() {
  const {mutate} = useMutation({mutationFn: forgotPasswordHandler});
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<ForgotPasswordType>();

  const onSubmit: SubmitHandler<ForgotPasswordType> = async data => {
    mutate(data);
  };

  return (
    <Box sx={{display: 'flex'}}>
      <Box sx={{width: '960px', margin: '208px 286px 0 196px'}}>
        <Typography component="h2" sx={{fontSize: 45, marginBottom: 2}}>
          Forgot password?
        </Typography>
        <Typography component="h5" sx={{fontSize: 15, marginBottom: 6}}>
          Don’t worry, we’ll send you reset instructions.
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{display: 'flex', flexDirection: 'column'}}
        >
          <Input
            labelText="Email"
            register={register}
            name="email"
            validationSchema={{
              required: true,
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Entered value does not match email format',
              },
            }}
            required={true}
            style={{marginBottom: '24px'}}
          />

          <CustomButton type="submit">Reset password</CustomButton>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            gap: '15px',
            marginTop: '16px',
          }}
        >
          <Link href={'/auth/resetPassword'}>
            <Typography>Go to reset password page</Typography>
          </Link>
          <Link href={'/auth/signIn'}>
            <Typography>Back to log in</Typography>
          </Link>
        </Box>
      </Box>
      <Image
        src="/images/resetForgotBanner.png"
        alt="picture of our brand"
        width={960}
        height={930}
      />
    </Box>
  );
}
