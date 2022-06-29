import '../styles/global.scss'
import type { AppProps } from 'next/app'
import styles from '../styles/app.module.scss'
import { Header } from '../components/Header/Header'
import { Player } from '../components/Player/Player'
import { PlayerContext } from '../contexts/PlayerContext'
import { useState } from 'react'

function MyApp({ Component, pageProps }: AppProps) {
  
  const [episodeList, setEpisodeList] = useState([])
  const [currentEpisodeIndex, setcurrentEpisodeIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  function play(episode: any){
    setEpisodeList([episode]);
    setcurrentEpisodeIndex(0);
    setIsPlaying(true)
  }

  return (
  <PlayerContext.Provider value={{  episodeList, currentEpisodeIndex , play, isPlaying }}>
    <div className={styles.wrapper}>
      <main>
        <Header/>
        <Component {...pageProps} />
      </main>
      <Player/>
    </div>
  </PlayerContext.Provider>
  )
}

export default MyApp
