import { useEffect, useState } from 'react';
import {
  Grid,
  Card,
  IconButton,
  CardContent,
  TablePagination,
  Typography,
} from '@material-ui/core';
import { useNavigate } from 'react-router-dom';

import { Add, Edit } from '@material-ui/icons';

import useGetProducts, { Product } from '../../hooks/useGetProducts';
import {
  StyledAvatar,
  StyledCardHeader,
  StyledIconButton,
  StyledToolbar,
  StyledTypography,
  StyledTypographyPrice,
} from './styles';
import DeleteProductDialog from '../../components/ModalDelete';

export default function ListProducts() {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(15);
  const { products, loading, error } = useGetProducts();
  const [productList, setProductList] = useState([...products]);
  const navigate = useNavigate();

  useEffect(() => {
    setProductList([...products]);
  }, [products]);

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleEdit = (editProduct: Product) => {
    navigate(`/produto/${editProduct.id}`, { state: { editProduct } });
  };

  return (
    <>
      <StyledToolbar>
        <StyledIconButton color="inherit" onClick={() => navigate('/produto')}>
          <Add />
          <Typography variant="h6" component="div">
            Produtos
          </Typography>
        </StyledIconButton>
      </StyledToolbar>
      <Grid container spacing={2} wrap="wrap">
        {productList
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <Card>
                <StyledCardHeader
                  avatar={<StyledAvatar aria-label={product.nome} />}
                  title={product.nome}
                  action={
                    <>
                      <IconButton
                        color="inherit"
                        aria-label="Editar"
                        onClick={() => handleEdit(product)}
                      >
                        <Edit />
                      </IconButton>
                      <DeleteProductDialog
                        productId={product.id!}
                        productList={products}
                        removeProduct={setProductList}
                      />
                    </>
                  }
                />
                <CardContent>
                  <StyledTypography color="primary" variant="body2">
                    <strong>Marca:</strong> {product.marca}
                  </StyledTypography>
                  <StyledTypographyPrice gutterBottom color="primary">
                    R${' '}
                    {parseFloat(product.preco).toLocaleString('pt-BR', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </StyledTypographyPrice>
                  <div
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <StyledTypography color="primary" variant="body2">
                      <strong>Qtde:</strong> {product.qt_estoque}
                    </StyledTypography>
                    <StyledTypography color="primary" variant="body2">
                      <strong>Vendas:</strong> {product.qt_vendas}
                    </StyledTypography>
                  </div>
                  <StyledTypography
                    color="textPrimary"
                    variant="body2"
                    align="center"
                  >
                    <strong>Criado:</strong>{' '}
                    {new Date(product.createdAt!).toLocaleDateString('pt-BR')}
                  </StyledTypography>
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>
      <TablePagination
        rowsPerPageOptions={[15, 20, 25]}
        component="div"
        count={products.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}
