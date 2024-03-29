import axios from "axios"
import { useEffect, useState } from "react"
import styles from './RandomPosters.module.scss'

export const RandomPosters = () => {
    const [apiData, setApiData] = useState([])
  
    const getData = async () => {
      const url=`http://localhost:3000/posters?sort_key=random&limit=2&attributes=id,name,image,description`
      const result = await axios.get(url)
      console.log(result.data);
      setApiData(result.data);
    }
    useEffect(() => {
      getData()
    }, [setApiData])

    return (
        <div>
            <h2>Sidste nyt...</h2>
            <div className={styles.randomPosters}>
            {apiData && apiData.map(item => {
                const array_genre = item.genres.map(a=> a.title)
                return (
                    <div className={styles.indhold} key={item.id}>
                        <img src={item.image} alt={item.title} />
                        <article>
                        <h3>{item.name}</h3>
                        <div dangerouslySetInnerHTML={{__html: item.description}}/>
                        <p>Genre: {array_genre.join(', ')}</p>
                        <a href="#">Læs mere</a>
                        </article>
                    </div>
                )
            })}
        </div>
        </div>
    )
}
