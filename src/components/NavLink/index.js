import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './styles.module.scss';

const NavLink = ({
  href, name, className, activeClassName,
}) => {
  const { asPath } = useRouter();
  const currentHref = asPath;
  let linkClassName;
  const classNameConditon = currentHref === href
    ? activeClassName || styles.header_link_active
    : className || styles.header_link;

  if (currentHref.search(href) !== -1) {
    linkClassName = styles.header_link_active;
  } else {
    linkClassName = classNameConditon;
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
