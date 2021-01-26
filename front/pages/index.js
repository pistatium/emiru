import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <footer className={styles.footer}>
        <a
          href="https://github.com/pistatium"
          target="_blank"
          rel="noopener noreferrer"
        >
          ©2021 pistatium
        </a>

      </footer>
    </div>
  )
}
