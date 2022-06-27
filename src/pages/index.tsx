import { GetStaticProps } from 'next'
import Image from 'next/image'
import { ReactNode } from 'react';
import { api } from '../services/api';
import { format, parseISO } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { convertDurationToTimeString } from '../utils/convertDurationToTimeString';
import styles from './home.module.scss'

import dynamic from 'next/dynamic'


/* // SPA
    useEffect(() => {
        fetch('http://localhost:3333/episodes')
          .then(response => response.json())
          .then(data => console.log(data))
      }, [])
*/

// SSR -> Vai  executar toda vez que acessar a home, se ela não sofre muitas alterações não tem porque ele toda vez ir na API buscar.

      // export async function getServerSideProps() {
      //   const response = await fetch('http://localhost:3333/episodes')
      //   const data = await response.json()

      //   return {
      //     props:{
      //       episodes: data,
      //     }
      //   } 

//      }


// SSG -> Vai ser usado para formas estáticas, já que não vai ter muitas mudanças/ muitas requisições.


      // export async function getStaticProps() {
      //   const response = await fetch('http://localhost:3333/episodes')
      //   const data = await response.json()

      //   return {
      //     props:{
      //       episodes: data,
      //     },
      //    revalidate: 60 * 60 * 8 // 60 segundos x 60 segundos * 8 = 8 horas
      //   } 

      // }

type Episode = {
  id: string; 
  title: string; 
  thumbnail: string;
  duration: number;
  description: string ; 
  durationAsString: string,  
  members: string; 
  publishedAt: string; 
  file: { duration: any; url: any; }; 
  url: string;
}

type HomeProps = {
  latestEpisodes: Episode[];
  allEpisodes: Episode[];
}

export default function Home({latestEpisodes, allEpisodes}:HomeProps ){
  return (
    <div className={styles.homePage}>
      <section className={styles.latestEpisodes}>
        <h2>Útimos lançamentos</h2>

        <ul>
          {latestEpisodes.map(episodes =>{
            return(
              <li key={episodes.id}>
                <Image 
                  width={192} 
                  height={192} 
                  src={episodes.thumbnail} 
                  alt={episodes.title}
                  objectFit="cover" 
                />

                <div className={styles.episodeDetails}>
                  <a href="">{episodes.title}</a>
                  <p>{episodes.members}</p>
                  <span>{episodes.publishedAt}</span>
                  <span>{episodes.durationAsString}</span>
                </div>

                <button type='button'>  
                  <img src="/play-green.svg" alt="Tocar Episodio" />
                </button>
              </li>
            )
          })}
        </ul>
        
      </section>

      <section className={styles.allEpisodes}>
          <h2>Todos episódios</h2>

          <table cellSpacing='0'>
            <tr>
              <th>123</th>
              <th>Podcast</th>
              <th>Integrantes</th>
              <th>Data</th>
              <th>Duração</th>
              <th>321</th>
            </tr>
            <tbody>
              {allEpisodes.map(episode => {
                return(
                  <tr key={episode.id}>
                    <td>
                      <Image 
                        width={120}
                        height={120}
                        src={episode.thumbnail}
                        alt={episode.title}
                        objectFit="cover"
                      />
                    </td>
                    <td>
                      <a href="">{episode.title}</a>
                    </td>
                    <td>{episode.members}</td>
                    <td>{episode.publishedAt}</td>
                    <td>{episode.durationAsString}</td>
                    <td>
                      <button type='button'>
                        <img src="/play-green.svg" alt="" />
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
      </section>
    </div>
  );
}


export const getStaticProps: GetStaticProps  = async () =>  {
    const { data } = await api.get('episodes', {
      params: {
        _limit: 12,
        _sort: 'published_at',
        _order: 'desc'
      }
    })

    const episodes = data.map((episodes: { 
          id: any; 
          title: any; 
          thumbnail: any; 
          members: any; 
          published_at: string; 
          file: { duration: any; url: any; }; 
          description: any; }) => {
      return {
        id: episodes.id,
        title: episodes.title,
        thumbnail: episodes.thumbnail,
        members: episodes.members,
        publishedAt:format(parseISO(episodes.published_at), 'd MMM yy', {locale: ptBR }),
        duration: Number(episodes.file.duration),
        durationAsString: convertDurationToTimeString(Number(episodes.file.duration)),
        description: episodes.description,
        url: episodes.file.url
      }
    })

    const latestEpisodes = episodes.slice(0,2)
    const allEpisodes = episodes.slice(2, episodes.length)

    return {
      props:{
        latestEpisodes,
        allEpisodes
      },
      revalidate: 60 * 60 * 8 // 60 segun dos x 60 segundos * 8 = 8 horas
    }
    

}
