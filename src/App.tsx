/**
 * 应用根组件
 * 配置 React Router 路由
 */
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import HomePage from './pages/HomePage';
import StockDetailPage from './pages/StockDetailPage';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="stock/:code" element={<StockDetailPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
