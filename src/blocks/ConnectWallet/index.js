import rabetIcon from 'assets/images/rabet.svg';
import privateKeyIcon from 'assets/images/keyword.svg';
import albedoIcon from 'assets/images/albedo.svg';
import ledgerIcon from 'assets/images/ledger.svg';
import freighterIcon from 'assets/images/freighter.svg';
import styles from './styles.module.scss';

const ConnectWallet = (props) => {
  const items = [
    { icon: privateKeyIcon, iconSize: '16', text: 'Private key' },
    { icon: albedoIcon, iconSize: '18', text: 'Albedo' },
    { icon: ledgerIcon, iconSize: '18', text: 'Ledger' },
    { icon: freighterIcon, iconSize: '16', text: 'Freighter' },
    { icon: rabetIcon, iconSize: '14', text: 'Rabet' },
  ];
  return (
    <div className={styles.box}>
      {items.map((item, index) => (
        <button type="button" className={styles.btn}>
          <div className="d-flex align-items-center">
            <div className={styles.circle}><img src={item.icon} width={item.icon} alt="icon" /></div>
            {item.text}
          </div>
          <span className="icon-arrow-left" />
        </button>
      ))}
    </div>
  );
};

ConnectWallet.propTypes = {

};

export default ConnectWallet;
