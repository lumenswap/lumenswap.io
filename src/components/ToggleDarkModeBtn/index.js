import SunIcon from 'assets/images/sun';
import SunLightIcon from 'assets/images/sunLight';
import MoonIcon from 'assets/images/moon';
import MoonLightIcon from 'assets/images/moonLight';
import { useEffect, useState, useRef } from 'react';
import { toggleTheme } from 'actions/theme';
import { useDispatch } from 'react-redux';
import useCurrentTheme from 'hooks/useCurrentTheme';
import useOptimizely from 'hooks/useOptimizely';
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
  const dispatch = useDispatch();
  const reduxTheme = useCurrentTheme();
  const isDarkModeEnabled = useOptimizely('is_dark_mode');

  useEffect(() => {
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme && theme !== currentTheme) {
      setTheme(currentTheme);
    }
  }, []);
  useEffect(() => {
    if (reduxTheme !== theme) {
      setTimeout(() => { dispatch(toggleTheme()); }, firstTimeRef.current ? 0 : 400);
    }
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

  if (!isDarkModeEnabled) {
    return null;
  }

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
