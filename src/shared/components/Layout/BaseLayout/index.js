import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Header from './Header';
import Footer from './Footer';
import styles from './styles.less';

const BaseLayout = ({ children }) => (
  <div className={classNames('container-fluid', styles.back)}>
    <div className={classNames('row', styles.box)}>
      <div className="col-12">
        <Header />
        {children}
        <Footer />
      </div>
    </div>
  </div>
);

BaseLayout.propTypes = {

};

export default BaseLayout;
