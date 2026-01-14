import styles from './FullPageLoader.module.css';

export default function FullPageLoader() {
  return (
    <div className={styles.overlay}>
      <div className={styles.loader}>
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
      </div>
    </div>
  );
}
