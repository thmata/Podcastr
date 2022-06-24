import '../styles/global.scss'
import type { AppProps } from 'next/app'
import styles from '../styles/app.module.scss'
import { Header } from '../components/Header/Header'
import { Player } from '../components/Player/Player'

function MyApp({ Component, pageProps }: AppProps) {
  return (
  <div className={styles.wrapper}>
    <main>
      <Header/>
      <Component {...pageProps} />
    </main>
    <Player/>
  </div>
  )
}

export default MyApp
