import Image from 'next/image'
import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.logoWrapper}>
        <Image className={styles.logo} src="/WebIcon.png" alt="icon" width={200} height={200} priority />
      </div>
    </main>
  )
}
