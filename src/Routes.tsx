import { Routes as Switch, Route } from 'react-router-dom';

import SignUp from './pages/SignUp';
import Home from './pages/Home';
import { PrivateRoute } from './components/PrivateRoute';
import { AuthProvider } from './context/AuthProvider';
import Dashboard from './pages/Dashbord';
import ProductForm from './components/FormProduct';

export default function Routes() {
  return (
    <AuthProvider>
      <Switch>
        <Route path="/" element={<Home />} />
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/produto" element={<ProductForm />} />
          <Route path="/produto/:id" element={<ProductForm />} />
        </Route>
        <Route path="/registro" element={<SignUp />} />
      </Switch>
    </AuthProvider>
  );
}
