import React from 'react';
// import React, { useState } from 'react';
// import classNames from 'classnames';
// import { arrowRightSvg } from 'src/constants/valus';
// import { connectModalTab } from 'src/constants/enum';
// import PublicKeyForm from './PublicKeyForm';
import PrivateKeyForm from './PrivateKeyForm';
// import styles from './styles.module.scss';

// const buttonContent = (text) => (
//   <>
//     <span className={styles['icon-holder']}>
//       <span className="icon-link center-ver-hor" />
//     </span>
//     <span>{text}</span>
//     <span className={classNames('ml-auto', styles.svg)}>{arrowRightSvg}</span>
//   </>
// );

// const ConnectWalletContent = ({ tab, setTab }) => {
//   const toggleTab = (value) => {
//     setTab(value);
//   };
//   return (
//     <div>
//       {(() => {
//         switch (tab) {
//           case connectModalTab.PUBLIC:
//             return <PublicKeyForm />;
//           case connectModalTab.PRIVATE:
//             return <PrivateKeyForm />;
//           default:
//             return (
//               <div className="mt-3 pt-1">
//                 <button
//                   type="button"
//                   className={styles.btn}
//                   onClick={() => toggleTab(connectModalTab.PUBLIC)}
//                 >
//                   {buttonContent('Public key')}
//                 </button>
//                 <button
//                   type="button"
//                   className={classNames(styles.btn, 'mt-4')}
//                   style={{ marginBottom: '20px' }}
//                   onClick={() => toggleTab(connectModalTab.PRIVATE)}
//                 >
//                   {buttonContent('Private key')}
//                 </button>
//               </div>
//             );
//         }
//       })()}
//     </div>
//   );
// };

const ConnectWalletContent = () => <PrivateKeyForm />;

export default ConnectWalletContent;
