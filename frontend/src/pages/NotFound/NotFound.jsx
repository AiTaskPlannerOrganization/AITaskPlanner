import { Link } from 'react-router-dom';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import styles from './NotFound.module.css';

export function NotFound() {
  useDocumentTitle('404 Не знайдено');

  return (
    <div className={styles.container}>
      <span className={styles.errorCode}>404</span>
      <h1 className={styles.title}>Сторінку не знайдено</h1>
      <p className={styles.description}>
        Запитуваної сторінки не існує або її було переміщено. Перевірте правильність URL.
      </p>
      <Link to="/" className={styles.homeLink}>
        Повернутися на головну
      </Link>
    </div>
  );
}

export default NotFound;
