import React, { useEffect } from 'react';
import styles from './App.module.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {
  HomePage,
  SignInPage,
  RegisterPage,
  DetailPage,
  SearchPage,
  ShoppingCartPage,
  PlaceOrderPage
} from './pages';
import { Redirect } from 'react-router-dom';
import { useSelector } from './redux/hooks';

// shoppingCart
import { useDispatch } from 'react-redux';
import { getShoppingCart } from './redux/shoppingCart/slice';

const PrivateRoute = ({ component, isAuthenticated, ...rest }) => {
  const routeComponent = (props) => {
    return isAuthenticated ? (
      React.createElement(component, props)
    ) : (
      <Redirect to={{ pathname: '/signIn' }} />
    );
  };
  return <Route render={routeComponent} {...rest} />;
};

// router 的 path 匹配
// 默认：所有匹配路径同时渲染 /signIn + HomePage堆叠
// exact 完全匹配, Switch 只渲染匹配优先级最高的页面
function App() {
  const jwt = useSelector((state) => state.user.token);
  const dispatch = useDispatch();

  useEffect(() => {
    if (jwt) {
      dispatch(getShoppingCart(jwt));
    }
  }, [jwt]);

  return (
    <div className={styles.App}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/signIn" component={SignInPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/detail/:touristRouteId" component={DetailPage} />
          <Route path="/search/:keywords?" component={SearchPage} />
          <PrivateRoute
            isAuthenticated={jwt !== null}
            path="/shoppingCart"
            component={ShoppingCartPage}
          />
          <PrivateRoute
            isAuthenticated={jwt !== null}
            path="/placeOrder"
            component={PlaceOrderPage}
          />
          <Route
            render={() => (
              <>
                <h1>404 not found</h1>
                <div>Oh No! The page is missing</div>
              </>
            )}
          />
          {/* 404 页面要排在最后一位，没有任何匹配时才会渲染 */}
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

/**
 * Route 会向组件 props 传递 match location history
 */
