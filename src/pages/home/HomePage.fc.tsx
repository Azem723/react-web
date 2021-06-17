import React from 'react';
// import { Header } from "./components/header";
// import { Footer } from "./components/footer";
import {
  Header,
  Footer,
  SideMenu,
  Carousel,
  ProductCollection,
  BusinessPartners
} from '../../components';
import { Row, Col, Typography, Spin } from 'antd';
// import { productList1, productList2, productList3 } from './mockups'; // 假数据
import Styles from './HomePage.module.css';

// import { Link } from 'react-router-dom'

import sideImage from '../../assets/images/sider_2019_12-09.png';
import sideImage2 from '../../assets/images/sider_2019_02-04.png';
import sideImage3 from '../../assets/images/sider_2019_02-04-2.png';

// 高阶组件
import { useTranslation } from 'react-i18next';
// TS 类型定义

import { giveMeDataActionCreator } from '../../redux/recommendProducts/recommendProductsActions';

import { useSelector } from '../../redux/hooks';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

export const HomePage: React.FC = () => {
  // hook 函数 连接store获取 store 的数据
  const productList = useSelector(
    // (state) => state.recommendProductsReducer.productList
    (state) => state.recommendProducts.productList
  );
  const loading = useSelector(
    // (state) => state.recommendProductsReducer.loading
    (state) => state.recommendProducts.loading
  );
  // const error = useSelector((state) => state.recommendProductsReducer.error);
  const error = useSelector((state) => state.recommendProducts.error);
  
  const dispatch = useDispatch();

  // useEffect(获取api数据异步函数,[]) 参数2传入空数组使useEffect等于componentDidMount
  useEffect(() => {
    dispatch(giveMeDataActionCreator());
  }, []);

  // const { t, productList, loading, error } = this.props;
  const { t } = useTranslation();

  // 由于 store 数据的变化会触发重渲染，判断异步获取的 productList 数据是否已收到
  // 在未收到数据时暂时用 loading 画面填充页面，并等待异步函数返回数据
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
    <>
      <Header />
      {/* 页面内容 */}
      <div className={Styles['page-content']}>
        <Row style={{ marginTop: 20 }}>
          <Col span={6}>
            <SideMenu />
          </Col>
          <Col span={18}>
            <Carousel />
          </Col>
        </Row>
        <ProductCollection
          title={
            <Typography.Title level={3} type="warning">
              {t('home_page.hot_recommended')}
            </Typography.Title>
          }
          sideImage={sideImage}
          products={productList[0].touristRoutes}
        />
        <ProductCollection
          title={
            <Typography.Title level={3} type="danger">
              {t('home_page.new_arrival')}
            </Typography.Title>
          }
          sideImage={sideImage2}
          products={productList[1].touristRoutes}
        />
        <ProductCollection
          title={
            <Typography.Title level={3} type="success">
              {t('home_page.domestic_travel')}
            </Typography.Title>
          }
          sideImage={sideImage3}
          products={productList[2].touristRoutes}
        />
      </div>
      <BusinessPartners />
      <Footer />
    </>
  );
};
