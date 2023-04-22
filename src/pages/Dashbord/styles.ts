import {
  AppBar,
  Avatar,
  Drawer,
  IconButton,
  ListItem,
  Toolbar,
} from '@material-ui/core';
import styled from 'styled-components';

export const HeaderContainer = styled.div`
  height: 100%;
`;

export const HeaderAppBar = styled(AppBar)`
  height: 64px;

  && {
    background-color: ${({ theme }) => theme.colors.primary.main};
  }
`;

export const HeaderToolbar = styled(Toolbar)`
  display: flex;
  justify-content: flex-end;

  p {
    margin-right: 24px;
  }
`;

export const HeaderAvatar = styled(Avatar)`
  margin-right: 16px;
`;

export const HeaderMenuButton = styled(IconButton)`
  margin-left: 16px;
`;

export const StyledDrawer = styled(Drawer)`
  @media (max-width: 500px) {
    & .MuiDrawer-paper {
      width: 50px;
    }
  }
`;

export const CustomListProducts = styled.div`
  text-align: center;
  margin-top: 24px;
  margin-left: 150px;
  padding: 34px;

  @media (max-width: 500px) {
    & {
      margin-left: 50px;
    }
  }
`;
