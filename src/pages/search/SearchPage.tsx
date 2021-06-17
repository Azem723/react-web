import React, { useEffect } from 'react';
import styles from './SearchPage.module.css';
import { Header, Footer, FilterArea, ProductList } from '../../components';
import { MainLayout } from '../../layouts/mainLayout';

import { useParams, useLocation } from 'react-router';
import { Spin } from 'antd';
import { searchProduct } from '../../redux/productSeatch/slice';
import { useSelector } from '../../redux/hooks';
import { useDispatch } from 'react-redux';

interface MatchParams {
  keywords: string;
}

export const SearchPage: React.FC = (params) => {
  const { keywords } = useParams<MatchParams>();

  const loading = useSelector((state) => state.productSearch.loading);
  const error = useSelector((state) => state.productSearch.error);
  const pagination = useSelector((state) => state.productSearch.pagination);
  const productList = useSelector((state) => state.productSearch.data);

  const dispatch = useDispatch();
  const location = useLocation();

  // 第二个参数传入 location 表示 url 变化时启动这个函数
  useEffect(() => {
    dispatch(searchProduct({ nextPage: 1, pageSize: 10, keywords }));
  }, [location]);

  const onPageChange = (nextPage, pageSize) => {
    dispatch(searchProduct({ nextPage, pageSize, keywords }));
  };

  if (loading) {
    return (
      <Spin
        size="large"
        style={{
          marginTop: 200,
          marginBottom: 200,
          marginLeft: 'auto',
          marginRight: 'auto',
          width: '100%'
        }}
      />
    );
  }

  if (error !== null) {
    return <div>网站出错：{error}</div>;
  }

  return (
    <MainLayout>
      {/* 分类过滤器 */}
      <div className={styles['product-list-container']}>
        <FilterArea />
      </div>
      {/* 产品列表 */}
      <div className={styles['product-list-container']}>
        <ProductList
          data={productList}
          paging={pagination}
          onPageChange={onPageChange}
        />
      </div>
    </MainLayout>
  );
};
