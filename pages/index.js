import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/login.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Harsh Traders</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Harsh Traders</a>
          <br />
          <Link href="/admin/login">Admin Login </Link>
        </h1>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by Rs Infotech
        </a>
      </footer>
    </div>
  )
}
