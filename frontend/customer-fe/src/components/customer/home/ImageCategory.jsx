import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import { useNavigate } from 'react-router-dom';

export default function ImageCategory({category}) {

  const navigate =useNavigate();
  const handleClickCategory = (categoryId) => {
    navigate(`/category-list?categoryId=${categoryId}`);
    window.scrollTo(0, 0); 
  };
  return (
    <ImageList
      cols={3} // 3 ảnh trên mỗi hàng
      gap={20}  // Khoảng cách giữa các ảnh
      sx={{ width: '100%', margin: 'auto', maxWidth: 1200 }}
    >
      {category.map((item) => (
        <ImageListItem key={item.image} sx={{ height: 'auto' }}>
          <img
            src={`${item.image}?w=600&fit=crop&auto=format`}
            alt={item.name}
            loading="lazy"
            style={{
              width: '100%',  
              height: 'auto',  
              maxHeight: '400px',
              objectFit: 'cover',  
            }}
            onClick={()=>{handleClickCategory(item._id)}}
          />
          <ImageListItemBar
            title={item.name}
            subtitle={item.description}
            actionIcon={
              <IconButton
                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                aria-label={`info about ${item.title}`}
              >
                <InfoIcon />
              </IconButton>
            }
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}
