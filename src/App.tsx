import { BrowserRouter, Routes, Route } from 'react-router-dom';

import UsersPage from './pages/UsersPage';
import AppLayout from './layouts/AppLayout';
import ProductsPage from './pages/ProductsPage';
import SettingsPage from './pages/SettingsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CreateProductPage from './pages/CreateProductPage';
import CategoryCreatePage from './pages/CreateCategoryPage';

function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<ProductsPage />} />
          <Route path="/products/new" element={<CreateProductPage />} />
          <Route path="/categories/new" element={<CategoryCreatePage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;
