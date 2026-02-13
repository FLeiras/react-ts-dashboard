import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import UsersPage from './pages/UsersPage';
import SettingsPage from './pages/SettingsPage';
import AppLayout from './layouts/AppLayout';

function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<ProductsPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;
