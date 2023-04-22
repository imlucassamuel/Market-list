import * as Yup from 'yup';

interface FormValues {
  nome: string;
  avatar: string;
  preco: string;
  qt_estoque: number;
  qt_vendas: number;
  marca: string;
  createdAt: Date;
}

type ValidationSchema = Yup.Schema<FormValues>;

export const useValidationSchema = (): ValidationSchema => {
  const validationSchema: ValidationSchema = Yup.object().shape({
    nome: Yup.string().required('Campo obrigatório'),
    avatar: Yup.string().required('Campo obrigatório'),
    preco: Yup.string().required('Campo obrigatório'),
    qt_estoque: Yup.number().required('Campo obrigatório'),
    qt_vendas: Yup.number().required('Campo obrigatório'),
    marca: Yup.string().required('Campo obrigatório'),
    createdAt: Yup.date().required('Campo obrigatório'),
  });
  return validationSchema;
};
