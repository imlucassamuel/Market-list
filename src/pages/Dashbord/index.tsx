import { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';

import {
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from '@material-ui/core';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import DashboardIcon from '@material-ui/icons/Dashboard';

import { AuthContext } from '../../context/AuthProvider';

import {
  HeaderAppBar,
  HeaderAvatar,
  HeaderContainer,
  HeaderMenuButton,
  HeaderToolbar,
  CustomListProducts,
  StyledDrawer,
} from './styles';
import ListProducts from '../ListProducts';

export default function Dashboard() {
  const location = useLocation();
  const { logout } = useContext(AuthContext);

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogoutClick = () => {
    logout();
    handleMenuClose();
  };

  return (
    <>
      <HeaderContainer>
        <HeaderAppBar position="static">
          <HeaderToolbar>
            <HeaderAvatar alt="Avatar" src={location.state?.image} />
            <p>{`${location.state?.nome} ${location.state?.sobrenome}`}</p>
            <HeaderMenuButton edge="start" color="inherit" aria-label="menu">
              <IconButton color="inherit" size="small" onClick={handleMenuOpen}>
                <ExpandMoreIcon />
              </IconButton>
            </HeaderMenuButton>
            <Menu
              anchorEl={anchorEl}
              getContentAnchorEl={null}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              variant="menu"
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
            >
              <MenuItem onClick={handleLogoutClick}>
                <ExitToAppIcon color="error" fontSize="small" />
                <p>Sair</p>
              </MenuItem>
            </Menu>
          </HeaderToolbar>
        </HeaderAppBar>
      </HeaderContainer>
      <StyledDrawer variant="persistent" anchor="left" open>
        <List>
          <ListItem button>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Produtos" />
          </ListItem>
        </List>
      </StyledDrawer>
      <CustomListProducts>
        <ListProducts />
      </CustomListProducts>
    </>
  );
}
