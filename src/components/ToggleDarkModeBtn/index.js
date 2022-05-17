import SunIcon from 'assets/images/sun';
import { useEffect, useState } from 'react';
import styles from './styles.module.scss';

function ToggleDarkModeBtn() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme && theme !== currentTheme) {
      setTheme(currentTheme);
    }
  }, []);
  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.removeAttribute('data-theme');
    } else if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, [theme]);
  const handleChangeTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
      localStorage.setItem('theme', 'dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      setTheme('light');
      localStorage.setItem('theme', 'light');
      document.documentElement.removeAttribute('data-theme');
    }
  };
  return (
    <div onClick={handleChangeTheme} className={styles.main}>
      <div className={styles['main-relative']}>
        <div className={theme === 'light' ? styles.toggle : styles.toggled} />
        <div className={styles['icon-container']}>
          <div className={styles.icon}><SunIcon /></div>
          <div className={styles.icon}><SunIcon /></div>
        </div>
      </div>
    </div>
  );
}

export default ToggleDarkModeBtn;
