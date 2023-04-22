import { Link } from 'react-router-dom';
import { Grid, Icon } from '@material-ui/core';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import InputMask from 'react-input-mask';

import { Formik } from 'formik';
import useSignUpState from '../../hooks/useSignUp';
import Button from '../../components/ButtonDefault';

import {
  Container,
  FormWrapper,
  CustomTextWrapper,
  CustomTextField,
  CustomFormControlLabel,
  StyledRadioGroup,
  CustomRadio,
  Title,
} from './styles';

export default function SignUp() {
  const { signUpState, handleInputChange, handleDateChange, handleSubmit } =
    useSignUpState();

  return (
    <>
      <Container>
        <Link to="/">
          <Icon>
            <ArrowBackIcon />
          </Icon>
          <p>Voltar</p>
        </Link>
      </Container>
      <Formik
        initialValues={signUpState}
        validate={() => {
          const errors: Record<string, string> = {};
          if (signUpState.cpf.length !== 11) {
            errors.cpf = 'CPF deve ter 11 dígitos';
          }
          return errors;
        }}
        onSubmit={(_, { setSubmitting }) => {
          setTimeout(() => {
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ errors, touched, handleBlur }) => (
          <FormWrapper onSubmit={handleSubmit}>
            <Title>Registrar-se</Title>
            <CustomTextWrapper>
              <CustomTextField
                label="Nome"
                variant="outlined"
                required
                name="firstName"
                value={signUpState.firstName}
                onChange={handleInputChange}
              />
              <CustomTextField
                label="Sobrenome"
                variant="outlined"
                required
                name="lastName"
                value={signUpState.lastName}
                onChange={handleInputChange}
              />
            </CustomTextWrapper>
            <InputMask
              mask="999.999.999-99"
              value={signUpState.cpf}
              disabled={false}
              onChange={handleInputChange}
              onBlur={handleBlur}
            >
              <CustomTextField
                id="outlined-basic"
                label="CPF"
                name="cpf"
                variant="outlined"
              />
            </InputMask>
            {errors.cpf && touched.cpf && <small>{errors.cpf}</small>}
            <CustomTextField
              label="Email"
              variant="outlined"
              required
              name="email"
              value={signUpState.email}
              onChange={handleInputChange}
            />
            <CustomTextField
              label="Senha"
              variant="outlined"
              type="password"
              required
              name="password"
              value={signUpState.password}
              onChange={handleInputChange}
            />
            <Grid
              container
              spacing={2}
              alignItems="center"
              style={{ marginBottom: '2px' }}
            >
              <Grid item xs={12} sm={6}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <DatePicker
                    value={signUpState.selectedDate}
                    onChange={handleDateChange}
                    label="Data de Nascimento"
                    inputVariant="outlined"
                    format="dd/MM/yyyy"
                    required
                    name="selectedDate"
                  />
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid item xs={12} sm={6}>
                <StyledRadioGroup
                  row
                  aria-label="gender"
                  name="gender"
                  value={signUpState.gender}
                  onChange={handleInputChange}
                >
                  <CustomFormControlLabel
                    value="male"
                    control={<CustomRadio />}
                    label="Masculino"
                  />
                  <CustomFormControlLabel
                    value="female"
                    control={<CustomRadio />}
                    label="Feminino"
                  />
                </StyledRadioGroup>
              </Grid>
            </Grid>
            <InputMask
              mask="99999-999"
              value={signUpState.cep}
              disabled={false}
              onChange={handleInputChange}
            >
              <CustomTextField
                id="outlined-basic"
                label="CEP"
                name="cep"
                variant="outlined"
              />
            </InputMask>
            <CustomTextField
              label="Cidade"
              variant="outlined"
              required
              name="city"
              value={signUpState.city}
              onChange={handleInputChange}
            />
            <CustomTextField
              label="Estado"
              variant="outlined"
              required
              name="state"
              value={signUpState.state}
              onChange={handleInputChange}
            />
            <CustomTextField
              label="Logradouro"
              variant="outlined"
              required
              name="street"
              value={signUpState.street}
              onChange={handleInputChange}
            />
            <CustomTextField
              label="Bairro"
              variant="outlined"
              required
              name="neighborhood"
              value={signUpState.neighborhood}
              onChange={handleInputChange}
            />
            <CustomTextField
              label="Complemento"
              variant="outlined"
              required
              name="complement"
              value={signUpState.complement}
              onChange={handleInputChange}
            />
            <Button type="submit">Registrar</Button>
          </FormWrapper>
        )}
      </Formik>
    </>
  );
}
