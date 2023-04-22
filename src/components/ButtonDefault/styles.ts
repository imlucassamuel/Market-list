import styled from 'styled-components';
import { Button } from '@material-ui/core';

export const CustomButton = styled(Button)`
  && {
    color: #fff;
    background-color: ${({ theme }) => theme.colors.primary.main};
    transition: all 0.2s ease-in;

    &:hover {
      color: #ccc;
      background-color: ${({ theme }) => theme.colors.primary.dark};
    }
  }
`;
