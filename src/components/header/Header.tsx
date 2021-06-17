import React, { useState, useEffect } from 'react';
import styles from './Header.module.css';
import logo from '../../assets/logo.svg';
import { Layout, Typography, Input, Menu, Button, Dropdown } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';
import {
  useHistory
  // useLocation,
  // useParams,
  // useRouteMatch
} from 'react-router-dom';

import { useTranslation } from 'react-i18next'; // 语言包切换

import jwt_decode, { JwtPayload as DefaultJwtPayload } from 'jwt-decode'; // jwt 解码插件

// import { useSelector } from 'react-redux'; // 钩子函数 连接 store 中的 state 数据
// import { RootState } from '../../redux/store'; // state 的类型定义

import { useSelector } from '../../redux/hooks';
import { useDispatch } from 'react-redux';
// import { Dispatch } from 'redux';
import {
  // languageActionTypes,
  addLanguageActionCreator,
  changeLanguageActionCreator
} from '../../redux/language/languageActions';
import { UserSlice } from '../../redux/user/slice';

interface JwtPayload extends DefaultJwtPayload {
  username: string;
}

export const Header: React.FC = () => {
  const history = useHistory();
  // const location = useLocation();
  // const params = useParams();
  // const match = useRouteMatch();

  // 本地名称 当前语言 language，选择 store 中的 state 数据
  const language = useSelector((state) => state.language.language);
  const languageList = useSelector((state) => state.language.languageList);
  // const dispatch = useDispatch<Dispatch<languageActionTypes>>();
  const dispatch = useDispatch();

  const jwt = useSelector((state) => state.user.token);

  const [username, setUsername] = useState('');
  useEffect(() => {
    if (jwt) {
      const token = jwt_decode<JwtPayload>(jwt);
      setUsername(token.username);
    }
  }, [jwt]);

  const menuClickHandler = (e) => {
    if (e.key === 'new') {
      // 处理语言添加 action
      dispatch(addLanguageActionCreator('新语言', 'new_lang'));
    } else {
      dispatch(changeLanguageActionCreator(e.key));
    }
  };

  const { t } = useTranslation();

  const onLogout = () => {
    dispatch(UserSlice.actions.logOut());
    history.push('/');
    // window.location.reload(false); 不要加
  };

  const shoppingCartItems = useSelector((state) => state.shoppingCart.items);
  const shoppingCartLoading = useSelector(
    (state) => state.shoppingCart.loading
  );

  return (
    <div className={styles['App-header']}>
      {/* top-header */}
      <div className={styles['top-header']}>
        <div className={styles.inner}>
          <Typography.Text>{t('header.slogan')}</Typography.Text>
          <Dropdown.Button
            style={{ marginLeft: 15 }}
            overlay={
              <Menu onClick={menuClickHandler}>
                {languageList.map((lang) => {
                  return <Menu.Item key={lang.code}>{lang.name}</Menu.Item>;
                })}
                <Menu.Item key={'new'}>
                  {t('header.add_new_language')}
                </Menu.Item>
              </Menu>
            }
            icon={<GlobalOutlined />}
          >
            {language === 'zh' ? '中文' : 'English'}
          </Dropdown.Button>
          {jwt ? (
            <Button.Group className={styles['button-group']}>
              <span>
                {t('header.welcome')}
                <Typography.Text strong>{username}</Typography.Text>
              </span>
              <Button
                loading={shoppingCartLoading}
                onClick={() => history.push('/shoppingCart')}
              >
                {t('header.shoppingCart')}({shoppingCartItems.length})
              </Button>
              <Button onClick={onLogout}>{t('header.signOut')}</Button>
            </Button.Group>
          ) : (
            <Button.Group className={styles['button-group']}>
              <Button onClick={() => history.push('/register')}>
                {t('header.register')}
              </Button>
              <Button onClick={() => history.push('/signIn')}>
                {t('header.signin')}
              </Button>
            </Button.Group>
          )}
        </div>
      </div>
      <Layout.Header className={styles['main-header']}>
        <span onClick={() => history.push('/')}>
          <img src={logo} alt="log" className={styles['App-logo']} />
          <Typography.Title level={3} className={styles.title}>
            {t('header.title')}
          </Typography.Title>
        </span>
        <Input.Search
          placeholder={'请输入旅游目的地、主题、或关键字'}
          className={styles['search-input']}
          onSearch={(keywords) => history.push('/search/' + keywords)}
        />
      </Layout.Header>
      <Menu mode={'horizontal'} className={styles['main-menu']}>
        <Menu.Item key="1"> {t('header.home_page')} </Menu.Item>
        <Menu.Item key="2"> {t('header.weekend')} </Menu.Item>
        <Menu.Item key="3"> {t('header.group')} </Menu.Item>
        <Menu.Item key="4"> {t('header.backpack')} </Menu.Item>
        <Menu.Item key="5"> {t('header.private')} </Menu.Item>
        <Menu.Item key="6"> {t('header.cruise')} </Menu.Item>
        <Menu.Item key="7"> {t('header.hotel')} </Menu.Item>
        <Menu.Item key="8"> {t('header.local')} </Menu.Item>
        <Menu.Item key="9"> {t('header.theme')} </Menu.Item>
        <Menu.Item key="10"> {t('header.custom')} </Menu.Item>
        <Menu.Item key="11"> {t('header.study')} </Menu.Item>
        <Menu.Item key="12"> {t('header.visa')} </Menu.Item>
        <Menu.Item key="13"> {t('header.enterprise')} </Menu.Item>
        <Menu.Item key="14"> {t('header.high_end')} </Menu.Item>
        <Menu.Item key="15"> {t('header.outdoor')} </Menu.Item>
        <Menu.Item key="16"> {t('header.insurance')} </Menu.Item>
      </Menu>
    </div>
  );
};
