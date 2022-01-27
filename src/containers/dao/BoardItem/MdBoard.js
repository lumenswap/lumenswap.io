import PropTypes from 'prop-types';
import Image from 'next/image';
import classNames from 'classnames';
import Link from 'next/link';
import numeral from 'numeral';
import urlMaker from 'helpers/urlMaker';
import styles from './styles.module.scss';

const MdBoard = ({ item, button }) => {
  const {
    logo, officialName, name, desc, proposals, members, tiker,
  } = item;

  return (
    <Link href={urlMaker.dao.singleDao.root(officialName)} passHref>
      <a className="text-decoration-none">
        <div className={classNames(styles.item, styles['md-item'])}>
          <div className="px-3">
            <div className="d-flex align-items-center justify-content-between">
              <div className={styles.img}>
                <Image src={logo} width={40} height={40} alt={name} />
              </div>
              <div>
                {button}
              </div>
            </div>
            <h3 className={styles.title}>{name}</h3>
            <p className={styles.para}>{desc}</p>
            <div className={styles.proposal}>
              <div className={styles.badge}>{proposals}</div>
              Active proposal
            </div>
          </div>
          <div className={styles.info}>
            <div className={styles['info-col']}>
              <div className={styles.value}>{numeral(members).format('0,0')}</div>
              <div className={styles.subject}>Community member</div>
            </div>
            <div className={styles['info-col']}>
              <div className={styles.value}>{tiker}</div>
              <div className={styles.subject}>Tiker</div>
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
};

MdBoard.propTypes = {
  item: PropTypes.object.isRequired,
  button: PropTypes.func.isRequired,
};

export default MdBoard;
