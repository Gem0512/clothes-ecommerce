import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import { useNavigate } from 'react-router-dom';

export default function ListCategory({ category }) {

  const navigate =useNavigate();
  const handleClickCategory = (categoryId) => {
    navigate(`/category-list?categoryId=${categoryId}`);
    window.scrollTo(0, 0); 
  };

  return (
    <List sx={{ maxWidth: 400, bgcolor: 'background.paper', borderRadius: 2 }} className="shadow-xl">
      {category && category.map((item, index) => (
        <React.Fragment key={index}>
          <ListItem
            alignItems="flex-start"
            sx={{
              transition: 'background-color 0.3s ease',
              '&:hover': {
                bgcolor: 'rgba(0, 0, 0, 0.04)', // Màu nền thay đổi khi hover
                cursor: 'pointer',
              },
            }}
            onClick ={()=>{handleClickCategory(item._id)}}
          >
            <ListItemAvatar>
              {/* Thay Avatar bằng thẻ img */}
              <img 
                src={item.image} 
                alt={item.name} 
                style={{ width: 50, height: 50, borderRadius: '50%' }} 
              />
            </ListItemAvatar>
            <ListItemText
              primary={item.name}
              secondary={ 
                <React.Fragment>
                  {`— ${item.description}`}
                </React.Fragment>
              }
            />
          </ListItem>
          {index < category.length - 1 && <Divider variant="inset" component="li" />}
        </React.Fragment>
      ))}
    </List>
  );
}
