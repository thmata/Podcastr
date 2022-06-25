import { GetStaticProps } from 'next'
import { ReactNode } from 'react';
import { api } from '../services/api';

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
  members: string;
  published_at: string;
}

type HomeProps = {
  episodes: Episode[];
}

export default function Home(props : HomeProps){
  return (
    <div>
      <p>Indesx</p>
      <p>{new Date(props.episodes[0].published_at).toLocaleDateString}</p>
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

    return {
      props:{
        episodes: data,
      },
      revalidate: 60 * 60 * 8 // 60 segun dos x 60 segundos * 8 = 8 horas
    }
    

}
