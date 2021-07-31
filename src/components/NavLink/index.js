import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './styles.module.scss';

const NavLink = ({
  href, name, className, activeClassName,
}) => {
  const router = useRouter();
  const currentHref = router.asPath;
  let linkClassName;
  if (currentHref.indexOf(href) !== -1) {
    linkClassName = styles.header_link_active;
  } else {
    linkClassName = currentHref === href
      ? activeClassName || styles.header_link_active
      : className || styles.header_link;
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
