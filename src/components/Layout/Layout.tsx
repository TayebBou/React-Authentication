import { Fragment, FC } from 'react';

import MainNavigation from '../../containers/Layout/MainNavigation/MainNavigation';

const Layout : FC = (props) => {
  return (
    <Fragment>
      <MainNavigation />
      <main>{props.children}</main>
    </Fragment>
  );
};

export default Layout;
