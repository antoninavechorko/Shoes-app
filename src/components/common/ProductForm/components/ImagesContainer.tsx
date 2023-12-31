import {
  Box,
  Grid,
  InputBase,
  Skeleton,
  SxProps,
  Typography,
  useTheme,
} from '@mui/material';
import {useMutation} from '@tanstack/react-query';
import axios from 'axios';
import {useSession} from 'next-auth/react';
import Image from 'next/image';
import React, {useContext, useRef, useState} from 'react';
import {ProductFormContext} from '../ProductForm';
import ImageCard from './ImageCard';

const styles: Record<string, SxProps> = {
  imagesContainer: {
    flexShrink: 2.5,
    width: '100%',
  },
  conatinerHeader: {
    marginBottom: 1,
    color: 'text.secondary',
  },
  uploadImageCard: {
    border: '2px dashed',
    borderColor: 'text.secondary',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    aspectRatio: 320 / 380,
    padding: '20px',
    textAlign: 'center',
  },
  uploadImage: {
    color: 'primary.main',
    cursor: 'pointer',
    textDecoration: 'underline',
  },
  uploadImageDisabled: {
    color: 'text.secondary',
    textDecoration: 'underline',
  },
  skeletonBox: {
    aspectRatio: '320 / 380',
  },
};

const ImagesContainer = () => {
  const {
    images,
    setImages,
    isLoading: isSendLoading,
  } = useContext(ProductFormContext);
  const theme = useTheme();
  const session = useSession();
  const token = session.data?.user.accessToken;
  const inputRef = useRef<HTMLInputElement>();

  const [uploadingImages, setUploadingImages] = useState<any>([]);

  const {mutate, isPending: isUploadLoading} = useMutation({
    mutationFn: (file: FormData) =>
      axios.post(`${process.env.API_URL}/upload`, file),
    onSuccess: (data: any) => {
      setImages((prevImages: any) => [...prevImages, ...data.data]);
      setUploadingImages([]);
    },
  });

  const {mutate: deleteImage, isPending: isDeleteLoading} = useMutation({
    mutationFn: (id: number) =>
      axios.delete(`${process.env.API_URL}/upload/files/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      }),
  });
  const isLoading = isSendLoading || isUploadLoading || isDeleteLoading;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    let formData = new FormData();

    if (!e.target.files) {
      return;
    }

    for (let i = 0; i < e.target.files.length; i++) {
      formData.append('files', e.target.files[i]);
      uploadingImages.push(e.target.files[i]);
    }

    setUploadingImages(uploadingImages);
    e.target.value = '';

    mutate(formData);
  };

  const handleDeleteImage = (id: number) => {
    setImages((prevImages: any) =>
      prevImages.filter((image: any) => image.id !== id),
    );
  };

  return (
    <Box sx={styles.imagesContainer}>
      <Typography sx={styles.conatinerHeader}>Product images</Typography>
      <Grid container spacing={{sm: 2, md: 2, xs: 1}}>
        {images.map((image: {url: string; id: number}) => (
          <Grid item key={image.id} xs={12} sm={6} md={6} lg={8} xl={5}>
            <ImageCard
              image={image}
              onDelete={() => handleDeleteImage(image.id)}
              isLoading={isLoading}
            />
          </Grid>
        ))}
        {isUploadLoading &&
          uploadingImages.map((image: any, index: number) => (
            <Grid item key={image.name} xs={12} sm={6} md={6} lg={8} xl={5}>
              <Box sx={styles.skeletonBox}>
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height="100%"
                  animation="wave"
                />
              </Box>
            </Grid>
          ))}
        <Grid item xs={12} sm={6} md={6} lg={8} xl={5}>
          <Box sx={styles.uploadImageCard}>
            <Image
              width={30}
              height={30}
              src="/icons/imageUpload.svg"
              alt="image upload"
              style={{
                filter:
                  theme.palette.mode === 'dark'
                    ? 'brightness(10)'
                    : 'brightness(1)',
              }}
            />
            <Typography>
              Drop your image here, <br /> or select{' '}
              <Typography
                component="span"
                onClick={() => !isLoading && inputRef.current?.click()}
                sx={isLoading ? styles.uploadImageDisabled : styles.uploadImage}
              >
                click to browse
              </Typography>
            </Typography>
            <InputBase
              inputProps={{ref: inputRef, multiple: true, accept: 'image/*'}}
              type="file"
              sx={{display: 'none'}}
              onChange={handleFileChange}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ImagesContainer;
