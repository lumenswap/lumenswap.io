import PropTypes from 'prop-types';
import Image from 'next/image';
import classNames from 'classnames';
import ExternalBlueArrow from 'assets/images/ExternalBlueArrow';

import numeral from 'numeral';
import styles from './styles.module.scss';

const LgBoard = ({ item, button }) => {
  const {
    logo, name, desc, members, tiker, web, webLink, assetLink,
  } = item;

  return (
    <div className={classNames(styles.item, styles['lg-item'])}>
      <div className="d-flex justify-content-between">
        <div className="d-flex align-items-center">
          <div className={styles.img}>
            <Image src={logo} width={80} height={80} alt={name} />
          </div>
          <div className="d-flex flex-column">
            <div className={styles.title}>{name}</div>
            <div className={styles.text}>{numeral(members).format('0,0')} member</div>
          </div>
        </div>
        <div>
          {button}
        </div>
      </div>
      <p className={classNames(styles.text, 'mb-0 mt-2')}>{desc}</p>
      <div className="mt-4">
        <div className={styles.detail}>
          <span className={styles.text}>Asset:</span>
          <a
            href={assetLink}
            target="_blank"
            rel="noreferrer"
            className={styles['asset-link']}
          >{tiker}
            <ExternalBlueArrow />
          </a>
        </div>
        <div className={styles.detail}>
          <span className={styles.text}>Website:</span>
          <a
            href={webLink}
            target="_blank"
            rel="noreferrer"
            className={styles['web-link']}
          >{web}
          </a>
        </div>
      </div>
    </div>
  );
};

LgBoard.propTypes = {
  item: PropTypes.object.isRequired,
  button: PropTypes.func.isRequired,
};

export default LgBoard;
