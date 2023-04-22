import { useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';

import {
  Button,
  TextField,
  DialogActions,
  DialogContent,
  DialogTitle,
  Dialog,
} from '@material-ui/core';

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import DateFnsUtils from '@date-io/date-fns';
import { useValidationSchema } from '../../hooks/useValidate';

import { AuthContext } from '../../context/AuthProvider';
import { Product } from '../../hooks/useGetProducts';

import { api } from '../../services/axios';
import { SubmitError } from './styles';

export default function ProductForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const validationSchema = useValidationSchema();
  const { user } = useContext(AuthContext);

  const product = location.state?.editProduct || [];

  const [formData, setFormData] = useState<Product>({
    nome: product?.nome || '',
    avatar: product?.avatar || '',
    preco: product?.preco || '',
    qt_estoque: product?.qt_estoque || 0,
    qt_vendas: product?.qt_vendas || 0,
    marca: product?.marca || '',
    createdAt: product?.createdAt || new Date(),
  });

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <Dialog open onClose={handleCancel}>
      <DialogTitle>
        {product.id ? 'Editar Produto' : 'Criar Produto'}
      </DialogTitle>
      <Formik
        initialValues={formData}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          try {
            const token = localStorage.getItem('token');

            if (values.id) {
              await api
                .put(`/produto/${formData.id}`, {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                })
                .then(() => navigate(-1));
            } else {
              await api
                .post('/produto', {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                })
                .then(() => navigate(-1));
            }
          } catch (error) {
            console.error(error);
          }
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <DialogContent>
              <Field
                autoFocus
                margin="dense"
                label="Nome"
                type="text"
                name="nome"
                fullWidth
                as={TextField}
              />
              {errors.nome && touched.nome && (
                <SubmitError>{errors.nome}</SubmitError>
              )}
              <Field
                margin="dense"
                label="Avatar"
                type="text"
                name="avatar"
                fullWidth
                as={TextField}
              />
              {errors.avatar && touched.avatar && (
                <SubmitError>{errors.avatar}</SubmitError>
              )}
              <Field
                margin="dense"
                label="Preço"
                type="text"
                name="preco"
                fullWidth
                as={TextField}
              />
              {errors.preco && touched.preco && (
                <SubmitError>{errors.preco}</SubmitError>
              )}
              <Field
                margin="dense"
                label="Quantidade em Estoque"
                type="number"
                name="qt_estoque"
                fullWidth
                as={TextField}
              />
              {errors.qt_estoque && touched.qt_estoque && (
                <SubmitError>{errors.qt_estoque}</SubmitError>
              )}
              <Field
                margin="dense"
                label="Quantidade de Vendas"
                type="number"
                name="qt_vendas"
                fullWidth
                as={TextField}
              />
              {errors.qt_vendas && touched.qt_vendas && (
                <SubmitError>{errors.qt_vendas}</SubmitError>
              )}
              <Field
                margin="dense"
                label="Marca"
                type="text"
                name="marca"
                fullWidth
                as={TextField}
              />
              {errors.marca && touched.marca && (
                <SubmitError>{errors.marca}</SubmitError>
              )}
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Field
                  margin="dense"
                  label="Data de Criação"
                  name="createdAt"
                  fullWidth
                  as={KeyboardDatePicker}
                  format="dd/MM/yyyy"
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </MuiPickersUtilsProvider>
              {errors.createdAt && touched.createdAt && (
                <SubmitError>{errors.createdAt}</SubmitError>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCancel} color="primary">
                Cancelar
              </Button>
              <Button type="submit" color="primary">
                Salvar
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
}
