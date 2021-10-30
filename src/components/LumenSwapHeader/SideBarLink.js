import NavLink from 'components/NavLink';
import Image from 'next/image';
import arrowHeaderIcon from '../../assets/images/arrow-header.svg';
import styles from './styles.module.scss';

function SideBarLink({ link }) {
  return (
    <li>
      {!link.external ? (
        <NavLink
          name={link.name}
          href={link.link}
          mainHref={link.mainHref}
          disableMainHref={link.disableMainHref}
        />

      )
        : (
          <a
            className={styles['out-link']}
            target="_blank"
            href={link.link}
            rel="noreferrer"
          >
            {link.name}
            <div><Image src={arrowHeaderIcon} width={12} height={12} /></div>
          </a>
        ) }
    </li>
  );
}

export default SideBarLink;
