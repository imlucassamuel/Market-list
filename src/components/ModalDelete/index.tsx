import { useContext, useState } from 'react';
import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

import { Product } from '../../hooks/useGetProducts';
import { AuthContext } from '../../context/AuthProvider';

import { api } from '../../services/axios';

type DeleteProductProps = {
  productId: string;
  productList: Product[];
  removeProduct: (products: Product[]) => void;
};

function DeleteProductDialog({
  productId,
  productList,
  removeProduct,
}: DeleteProductProps) {
  const { user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  async function handleDelete(id: string) {
    const token = user?.token;

    try {
      await api
        .delete(`/produto/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          removeProduct(
            productList.filter((product: Product) => product.id !== productId)
          );
        });
    } catch (error) {
      console.log(error);
    }
  }

  function handleConfirm() {
    handleDelete(productId);
    setOpen(false);
  }

  return (
    <>
      <IconButton color="secondary" onClick={handleOpen}>
        <DeleteIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirmação de exclusão</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Tem certeza que deseja excluir o produto?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Não</Button>
          <Button onClick={handleConfirm} color="secondary">
            Sim
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default DeleteProductDialog;
