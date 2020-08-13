import React from 'react';
import {useSelector} from 'react-redux';
import Header from './Header';
import Footer from './Footer';
import styles from './styles.module.scss';
import ResponsiveMenu from './ResponsiveMenu';

const BaseLayout = ({ children }) => {
  const userData = useSelector((state) => state.user);

  return(
  <>
    <div id="header">
      {userData.logged && <ResponsiveMenu /> }
      <div className={styles.back} style={{ paddingTop: '42px' }}>
        <Header />
      </div>
    </div>
    <div id="content" className={styles.back}>
      {children}
    </div>
    <div id="footer" className={styles.back} style={{ paddingBottom: '24px' }}>
      <Footer />
    </div>
  </>
)};

export default BaseLayout;
