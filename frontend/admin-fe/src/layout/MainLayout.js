import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { createTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LayersIcon from '@mui/icons-material/Layers';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { useDemoRouter } from '@toolpad/core/internal';
import { useNavigate } from 'react-router-dom';
import CategoryIcon from '@mui/icons-material/Category';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import InventoryIcon from '@mui/icons-material/Inventory';
const NAVIGATION = [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
    link: '/dashboard',
  },
  {
    segment: 'products',
    title: 'Products',
    icon: <InventoryIcon />,
    link: '/products',
  },
  {
    segment: 'categories',
    title: 'Categories',
    icon: <CategoryIcon />,
    link: '/categories',
  },
  {
    segment: 'orders',
    title: 'Orders',
    icon: <ShoppingCartIcon />,
    link: '/orders',
  },
  {
    segment: 'users',
    title: 'Users',
    icon: <ManageAccountsIcon />,
    link: '/users',
  },


];

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function DashboardLayoutBasic(props) {
  const { window, children } = props;
  const router = useDemoRouter('/products');
  const demoWindow = window !== undefined ? window() : undefined;
  const navigate = useNavigate();

  const handleNavigation = (link) => {
    navigate(link);
    console.log("Navigating to:", link); // Kiểm tra xem link có đúng không
  };

  return (
    <AppProvider
      navigation={NAVIGATION}
    //   router={router}
      theme={demoTheme}
      window={demoWindow}
      sx={{zIndex: 1000}}
    >
      <DashboardLayout>
        <Box sx={{ padding: 4 }}>
          {children} 
        </Box>
      </DashboardLayout>
    </AppProvider>
  );
}

DashboardLayoutBasic.propTypes = {
  window: PropTypes.func,
};

export default DashboardLayoutBasic;
