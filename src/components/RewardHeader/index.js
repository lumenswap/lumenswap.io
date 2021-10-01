import Logo from 'assets/images/logo';
import Link from 'next/link';
import urlMaker from 'helpers/urlMaker';
import classNames from 'classnames';
import CustomDropdown from 'components/Dropdown';
import Button from 'components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { openConnectModal } from 'actions/modal';
import NavLink from 'components/NavLink';
import Image from 'next/image';
import styles from './styles.module.scss';
import arrowIcon from '../../../public/images/arrow-down.svg';

const RewardHeader = () => {
  const isLogged = useSelector((state) => state.user.logged);
  const dispatch = useDispatch();

  return (
    <div className={classNames(styles.layout, 'layout')}>
      <ul className={styles.list}>
        <div>
          <li><Link href={urlMaker.root()}><a><Logo /></a></Link></li>
          <li><NavLink name="Dashboard" href={urlMaker.reward.root()} /></li>
          <li>
            <a
              className={styles['out-link']}
              target="_blank"
              href="https://medium.com/lumenswap/lumenswap-ecosystem-reward-25f1ddd61ab7"
              rel="noreferrer"
            >
              How to get rewards
              <div><Image src={arrowIcon} width={12} height={12} /></div>
            </a>
          </li>
        </div>
      </ul>
      {isLogged ? <CustomDropdown height="40px" width="160px" />
        : (
          <Button
            variant="secondary"
            content="Connect Wallet"
            fontWeight={500}
            className={styles.btn}
            onClick={() => {
              dispatch(openConnectModal());
            }}
          />
        ) }
    </div>
  );
};

export default RewardHeader;
