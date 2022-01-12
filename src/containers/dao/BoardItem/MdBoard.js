import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import Image from 'next/image';
import classNames from 'classnames';
import styles from './styles.module.scss';

const MdBoard = ({ item, button }) => {
  const {
    logo, name, desc, proposals, member, tiker,
  } = item;

  const router = useRouter();
  const onChangeRoute = () => router.push(`${router.pathname}/${name}`);

  return (
    <div className={classNames(styles.item, styles['md-item'])} onClick={onChangeRoute}>
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
          <div className={styles.value}>{member}</div>
          <div className={styles.subject}>Community member</div>
        </div>
        <div className={styles['info-col']}>
          <div className={styles.value}>{tiker}</div>
          <div className={styles.subject}>Tiker</div>
        </div>
      </div>
    </div>
  );
};

MdBoard.propTypes = {
  item: PropTypes.object.isRequired,
  button: PropTypes.func.isRequired,
};

export default MdBoard;
