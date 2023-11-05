import { useQuery } from "@apollo/client"
import { ME, GENRE_BOOKS } from "../queries"
import { useEffect, useState } from "react"

const Recommend = (props) => {
  const [genre, setGenre] = useState(null)
  const user = useQuery(ME, {
    fetchPolicy: 'cache-and-network'
  })
  const recommendBooks = useQuery(GENRE_BOOKS, {
    skip: !genre,
    variables: { genre },
    fetchPolicy: 'cache-and-network'
  })

  useEffect(() => {
    if (!user.loading && user.data) {
      setGenre(user.data.me.favoriteGenre)
    }
  }, [user.data]) // eslint-disable-line

  if (!props.show) {
    return null
  }
  if (recommendBooks.loading || user.loading) {
    return <div>loading...</div>
  }

  if (genre && recommendBooks.data) {
    return (
      <div>
        <h2>recommendations</h2>
        <p>books in your favorite genre <b>{genre}</b></p>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>author</th>
              <th>published</th>
            </tr>
            {recommendBooks.data.allBooks.map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  return (
    <div>
    </div>
  )
}

export default Recommend