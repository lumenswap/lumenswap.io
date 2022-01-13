import PropTypes from 'prop-types';
import classNames from 'classnames';
import Image from 'next/image';
import { useRouter } from 'next/router';

import Badge from 'components/Badge';
import SuccessIcon from 'assets/images/success-tick';

import styles from './styles.module.scss';

const ProposalItem = ({ item }) => {
  const router = useRouter();

  const {
    title, desc, detail, address, logo, status,
  } = item;

  const renderBadge = () => {
    if (status === 'active') {
      return <Badge variant="success" content="Active" />;
    }

    if (status === 'ended') {
      return <Badge variant="info" content="Ended" />;
    }

    return <Badge variant="danger" content="Not started" />;
  };

  const onChangeRoute = () => router.push(`${router.asPath}/proposal-info`);

  return (
    <div className={styles.item} onClick={onChangeRoute}>
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <div className={styles.img}>
            <Image
              src={logo}
              width={24}
              height={24}
              alt="sample"
            />
          </div>
          <div className={styles.text}>{address}</div>
        </div>
        <div>
          {renderBadge()}
        </div>
      </div>
      <h4 className={styles.title}>{title}</h4>
      <p className={classNames(styles.text, 'mt-2 mb-0')}>{desc}</p>

      <div className={classNames(styles.text, styles.detail, 'mt-4')}>
        {status !== 'active' && <SuccessIcon />}
        {detail}
      </div>
    </div>
  );
};

ProposalItem.propTypes = {
  item: PropTypes.object.isRequired,
};

export default ProposalItem;
