import React from 'react';
import { Image, Typography } from 'antd';
import { Link } from 'react-router-dom';

interface PropsType {
  id: string | number;
  size: 'large' | 'small';
  title: string;
  imageSrc: string;
  price: string | number;
}

export const ProductImage: React.FC<PropsType> = ({
  id,
  size,
  title,
  imageSrc,
  price
}) => {
  return (
    <Link to={`detail/${id}`}>
      {size === 'large' ? (
        <Image src={imageSrc} height={285} width={490} />
      ) : (
        <Image src={imageSrc} height={120} width={240} />
      )}
      <div>
        <Typography.Text type="secondary">{title.slice(0, 25)}</Typography.Text>
        <Typography.Text type="danger" strong>
          ￥ {price} 起
        </Typography.Text>
      </div>
    </Link>
  );
};

// HOC 实现

// export const ProductImage = withRouter(ProductImageComponent);

/** 
interface PropsType extends RouteComponentProps {
  id: string | number;
  size: 'large' | 'small';
  title: string;
  imageSrc: string;
  price: string | number;
}

const ProductImageComponent: React.FC<PropsType> = ({
  id,
  size,
  title,
  imageSrc,
  price,
  history,
  location,
  match
}) => {
  return (
    <div onClick={() => history.push(`detail/${id}`)}>
      {size === 'large' ? (
        <Image src={imageSrc} height={285} width={490} />
      ) : (
        <Image src={imageSrc} height={120} width={240} />
      )}
      <div>
        <Typography.Text type="secondary">{title.slice(0, 25)}</Typography.Text>
        <Typography.Text type="danger" strong>
          ￥ {price} 起
        </Typography.Text>
      </div>
    </div>
  );
};

export const ProductImage = withRouter(ProductImageComponent);
*/

/** 

Link组件的底层实现：

interface LinkProps {
  to: string;
}
const Link: React.FC<LinkProps> = ({ children, to }) => {
  const history = useHistory();
  return <a href={to} onClick={() => {history.push(to)}}>
    {children}
  </a>;
};
*/
