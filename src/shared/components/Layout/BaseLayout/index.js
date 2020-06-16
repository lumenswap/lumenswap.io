import React from 'react';
import Header from './Header';
import Footer from './Footer';
import styles from './styles.less';

const BaseLayout = ({ children }) => (
  <>
    <div id="header" className={styles.back} style={{ paddingTop: '42px' }}>
      <Header />
    </div>
    <div id="content" className={styles.back}>
      {children}
    </div>
    <div id="footer" className={styles.back} style={{ paddingBottom: '24px' }}>
      <Footer />
    </div>
  </>
);

export default BaseLayout;
