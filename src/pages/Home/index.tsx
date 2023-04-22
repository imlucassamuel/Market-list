import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import Button from '../../components/ButtonDefault';
import useSignIn from '../../hooks/useSignIn';

import {
  HomePageWrapper,
  FormWrapper,
  Title,
  CustomTextField,
  SubmitError,
  ButtonsWrapper,
} from './styles';

export default function Home() {
  const { formik } = useSignIn();
  const { submitError } = useContext(AuthContext);

  return (
    <HomePageWrapper>
      <FormWrapper onSubmit={formik.handleSubmit}>
        <Title>Bem-vindo á Onidata</Title>
        <CustomTextField
          label="Email"
          placeholder="johndoe@mail.com"
          variant="outlined"
          type="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <CustomTextField
          label="Senha"
          placeholder="*********"
          variant="outlined"
          type="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <SubmitError>{submitError && <div>{submitError}</div>}</SubmitError>
        <ButtonsWrapper>
          <Button type="submit" disabled={formik.isSubmitting}>
            Login
          </Button>
          <Link to="/registro">
            <Button>Registro</Button>
          </Link>
        </ButtonsWrapper>
      </FormWrapper>
    </HomePageWrapper>
  );
}
