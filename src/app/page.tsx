import styles from './page.module.css';
import Link from 'next/link';

export default function Home() {
  return (
    <div className={styles.mainContainer}>
      <h1>Welcome to the teachers Dashboard</h1>
      <Link href={"/dashboard"}>Get in</Link>
    </div>    
  );
}
