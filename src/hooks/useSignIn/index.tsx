import { useFormik } from 'formik';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthProvider';

export default function useSign() {
  const { login } = useContext(AuthContext);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate: (values) => {
      const errors: Record<string, string> = {};
      if (!values.email) {
        errors.email = 'Campo obrigatório';
      }
      if (!values.password) {
        errors.password = 'Campo obrigatório';
      }
      return errors;
    },
    onSubmit: async (values) => {
      const { email, password } = values;
      if (email && password) {
        await login(email, password);
      }
    },
  });

  return { formik };
}
