import { TextField } from '@material-ui/core';
import styled from 'styled-components';

export const HomePageWrapper = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  padding: 88px;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h1`
  margin-bottom: 32px;
`;

export const CustomTextField = styled(TextField)`
  && {
    font-size: 8px;
    height: 62px;
    margin-bottom: 24px;
  }
`;

export const SubmitError = styled.div`
  text-align: center;
  margin-bottom: 8px;
  color: red;
`;

export const ButtonsWrapper = styled.div`
  margin-top: 24px;
  display: flex;
  justify-content: center;
  gap: 24px;
`;
