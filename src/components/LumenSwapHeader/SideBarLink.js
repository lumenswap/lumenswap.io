import NavLink from 'components/LumenSwapHeader/NavLink';
import arrowHeaderIcon from '../../assets/images/arrow-header.svg';
import styles from './styles.module.scss';

function SideBarLink({ link }) {
  if (link.external) {
    return (
      <li>
        <a
          className={styles['out-link']}
          target="_blank"
          href={link.link}
          rel="noreferrer"
        >
          {link.name}
          <div><img src={arrowHeaderIcon} width={14} height={14} /></div>
        </a>
      </li>
    );
  }
  return (
    <li>
      <NavLink
        name={link.name}
        href={link.link}
        mainHref={link.mainHref}
        disableMainHref={link.disableMainHref}
      />
    </li>
  );
}

export default SideBarLink;
