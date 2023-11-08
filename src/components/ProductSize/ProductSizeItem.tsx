import {Button, SxProps} from '@mui/material';
import {useState} from 'react';

const styles: Record<string, SxProps> = {
  button: {
    fontWeight: 'fontWeighRegular',
    fontSize: {xs: 10, sm: 15},
    textTransform: 'uppercase',
    borderColor: 'grey.A700',
    color: 'text.secondary',
    width: {xs: 52, sm: 85},
    height: {xs: 34, sm: 55},
    '&:hover': {
      borderColor: 'grey.A700',
      backgroundColor: 'grey.A100',
    },
  },
};

type SizeItemType = {
  id: number;
  value: number;
};

type SiteItemPropsType = {
  size: SizeItemType;
  onClick: (id: number, isChecked: boolean) => void;
};

const ProductSizeItem = ({size, onClick}: SiteItemPropsType) => {
  const [isChecked, setIsChecked] = useState(false);
  const handleClick = () => {
    setIsChecked(!isChecked);
    onClick(size.id, !isChecked);
  };
  return (
    <Button
      sx={styles.button}
      variant={isChecked ? 'contained' : 'outlined'}
      onClick={handleClick}
    >
      eu-{size.value}
    </Button>
  );
};

export default ProductSizeItem;
