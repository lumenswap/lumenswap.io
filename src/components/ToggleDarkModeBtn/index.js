import SunIcon from 'assets/images/sun';
import SunLightIcon from 'assets/images/sunLight';
import MoonIcon from 'assets/images/moon';
import MoonLightIcon from 'assets/images/moonLight';
import { useEffect, useState, useRef } from 'react';
import styles from './styles.module.scss';

function setDocumentElementAttribute(attribute, timeOut) {
  setTimeout(() => {
    if (attribute === 'light') {
      document.documentElement.removeAttribute('data-theme');
    } else if (attribute === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, timeOut ?? 0);
}
function ToggleDarkModeBtn() {
  const [theme, setTheme] = useState('light');
  const firstTimeRef = useRef(true);

  useEffect(() => {
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme && theme !== currentTheme) {
      setTheme(currentTheme);
    }
  }, []);
  useEffect(() => {
    setDocumentElementAttribute(theme, firstTimeRef.current ? 0 : 400);
  }, [theme]);
  const handleChangeTheme = () => {
    firstTimeRef.current = false;
    if (theme === 'light') {
      setTheme('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      setTheme('light');
      localStorage.setItem('theme', 'light');
    }
  };
  return (
    <div onClick={handleChangeTheme} className={styles.main}>
      <div className={styles['main-relative']}>
        <div className={theme === 'light' ? styles.toggle : styles.toggled} />
        <div className={styles['icon-container']}>
          <div className={styles.icon}>{theme === 'light' ? <SunLightIcon /> : <SunIcon />}</div>
          <div className={styles.icon}>{theme === 'light' ? <MoonLightIcon /> : <MoonIcon />}</div>
        </div>
      </div>
    </div>
  );
}

export default ToggleDarkModeBtn;
