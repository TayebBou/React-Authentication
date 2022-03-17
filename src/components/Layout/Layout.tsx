import { Fragment, FC } from 'react';

import MainNavigation from './MainNavigation';

const Layout : FC = (props) => {
  return (
    <Fragment>
      <MainNavigation />
      <main>{props.children}</main>
    </Fragment>
  );
};

export default Layout;
