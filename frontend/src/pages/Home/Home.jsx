import { useState } from 'react';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { apiClient } from '../../api/client';
import styles from './Home.module.css';

export function Home() {
  useDocumentTitle('Головна');

  const [apiStatus, setApiStatus] = useState({ state: 'idle', message: '' });

  const handleTestApi = async () => {
    setApiStatus({ state: 'loading', message: 'Надсилання запиту...' });
    try {
      const data = await apiClient('/api/health');
      setApiStatus({
        state: 'success',
        message: `Відповідь бекенду: ${JSON.stringify(data)}`,
      });
    } catch (err) {
      setApiStatus({
        state: 'error',
        message: `Запит до бекенду: ${err.message} (очікувано, якщо бекенд ще не запущений)`,
      });
    }
  };

  const configuredApiUrl = import.meta.env.VITE_API_URL;

  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <div className={styles.badge}>
          <span className={styles.statusDot} />
          <span>ПР4: Frontend проект налаштовано</span>
        </div>
        <h1 className={styles.title}>
          Плануйте задачі з <span className={styles.gradientText}>AITaskPlanner</span>
        </h1>
        <p className={styles.subtitle}>
          Застосунок для розробників, який за допомогою штучного інтелекту перетворює
          масштабну задачу на структурований покроковий план робіт та чеклісти.
        </p>
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.primaryButton}
            onClick={() => alert('Функціонал створення плану буде реалізовано в наступних етапах!')}
          >
            Створити план задачі
          </button>
          <a
            href="https://github.com/AiTaskPlannerOrganization/AITaskPlanner"
            target="_blank"
            rel="noreferrer"
            className={styles.secondaryButton}
          >
            Репозиторій на GitHub
          </a>
        </div>
      </section>

      <section className={styles.featuresGrid}>
        <article className={styles.featureCard}>
          <span className={styles.featureIcon}>⚡</span>
          <h2 className={styles.featureTitle}>React + Vite</h2>
          <p className={styles.featureDescription}>
            Сучасна та надшвидка збірка за допомогою Vite 8 із підтримкою React 19 та HMR.
          </p>
        </article>

        <article className={styles.featureCard}>
          <span className={styles.featureIcon}>🎨</span>
          <h2 className={styles.featureTitle}>CSS Modules</h2>
          <p className={styles.featureDescription}>
            Ізольовані локальні стилі з дизайн-токенами, CSS-змінними та сучасною системою шарів.
          </p>
        </article>

        <article className={styles.featureCard}>
          <span className={styles.featureIcon}>🧭</span>
          <h2 className={styles.featureTitle}>Маршрутизація</h2>
          <p className={styles.featureDescription}>
            Клієнтський роутинг на базі React Router v7 із підтримкою вкладених Layout-компонентів.
          </p>
        </article>
      </section>

      <section className={styles.apiCheckCard}>
        <div className={styles.apiHeader}>
          <h3 className={styles.apiTitle}>Перевірка зв'язку з бекендом</h3>
          <span className={styles.statusIndicator}>
            Proxy: /api → http://localhost:3000
            {configuredApiUrl ? ` | VITE_API_URL: ${configuredApiUrl}` : ''}
          </span>
        </div>
        <p className={styles.featureDescription}>
          Запити за замовчуванням виконуються відносно через Vite proxy (ціль: <code>http://localhost:3000</code>).
          {configuredApiUrl ? (
            <> Встановлено кастомний <code>VITE_API_URL={configuredApiUrl}</code>.</>
          ) : (
            <> Змінну <code>VITE_API_URL</code> залишено порожньою для локальної розробки без CORS.</>
          )}
        </p>
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.secondaryButton}
            onClick={handleTestApi}
            disabled={apiStatus.state === 'loading'}
          >
            {apiStatus.state === 'loading' ? 'Перевірка...' : 'Тестовий запит до /api/health'}
          </button>
        </div>
        {apiStatus.message && (
          <div className={styles.codeBlock}>
            {apiStatus.message}
          </div>
        )}
      </section>
    </div>
  );
}

export default Home;
