import {
  Avatar,
  CardHeader,
  Toolbar,
  Typography,
  IconButton,
} from '@material-ui/core';
import styled from 'styled-components';

export const StyledToolbar = styled(Toolbar)`
  && {
    margin-top: 0;
    padding: 0;

    button {
      padding: 0;
    }

    @media (max-width: 500px) {
      & > * {
        font-size: 16px;
      }
    }
  }
`;

export const StyledIconButton = styled(IconButton)`
  && {
    transition: all 0.2s ease-in;

    &:hover {
      border-radius: 4px;
      padding: 4px;
      border-color: #000;
    }
  }
`;

export const StyledCardHeader = styled(CardHeader)`
  && {
    font-family: 'Sora', sans-serif;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.primary.dark};

    span {
      font-size: 16px;
      font-weight: bold;
    }
  }
`;

export const StyledAvatar = styled(Avatar)`
  && {
    background-color: ${({ theme }) => theme.colors.primary.darkeness};
  }
`;

export const StyledTypography = styled(Typography)`
  && {
    font-family: 'Sora', sans-serif;
  }
`;

export const StyledTypographyPrice = styled(Typography)`
  && {
    font-weight: bold;
    color: ${({ theme }) => theme.colors.primary.dark};
  }
`;
