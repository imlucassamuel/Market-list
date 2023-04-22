import styled from 'styled-components';
import {
  TextField,
  Button,
  FormControlLabel,
  RadioGroup,
  Radio,
} from '@material-ui/core';

export const Container = styled.div`
  margin-top: 4px;
  padding: 0 8px;
  font-weight: bold;

  a {
    display: flex;
    align-items: center;
    color: ${({ theme }) => theme.colors.primary.main};
    text-decoration: none;
  }
`;

export const Title = styled.h2`
  display: block;
  margin-bottom: 8px;
`;

export const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 600px;
  padding: 16px;
  border-radius: 8px;

  small {
    color: red;
    margin-bottom: 4px;
  }
`;

export const CustomTextWrapper = styled.div`
  display: flex;
  gap: 40px;
`;

export const CustomTextField = styled(TextField)`
  && {
    font-size: 8px;
    height: 62px;
  }

  & > * {
    margin-bottom: 8px;
  }
`;

export const StyledRadioGroup = styled(RadioGroup)`
  && {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
`;

export const CustomFormControlLabel = styled(FormControlLabel)`
  && {
    margin-right: 4px;
  }
`;

export const CustomRadio = styled(Radio)`
  color: ${({ theme }) => theme.colors.primary.main};

  && {
    &.Mui-checked {
      color: ${({ theme }) => theme.colors.primary.dark};
    }
  }
`;
