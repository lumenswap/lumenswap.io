import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './styles.module.scss';

const NavLink = ({
  mainHref, href, name, className, activeClassName,
}) => {
  const { asPath } = useRouter();
  let linkClassName;
  if (asPath === href) {
    linkClassName = activeClassName ?? styles.header_link_active;
  } else if (asPath.search(mainHref ?? href) !== -1) {
    linkClassName = styles.header_link_active;
  } else {
    linkClassName = className ?? styles.header_link;
  }

  return (
    <>
      <Link href={href}>
        <a
          className={linkClassName}
        >
          {name}
        </a>
      </Link>
    </>
  );
};
export default NavLink;
