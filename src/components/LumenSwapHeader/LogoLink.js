import Link from 'next/link';
import urlMaker from 'helpers/urlMaker';
import Logo from 'assets/images/logo';

function LogoLink() {
  return <Link href={urlMaker.root()}><a><Logo /></a></Link>;
}

export default LogoLink;
