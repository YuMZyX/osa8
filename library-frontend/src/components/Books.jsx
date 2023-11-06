import { useQuery } from "@apollo/client"
import { ALL_BOOKS, GENRE_BOOKS } from "../queries"
import Select from 'react-select'
import { useState } from "react"

const Books = (props) => {
  const options = [
    { value: 'all_genres', label: 'All genres' },
    { value: 'refactoring', label: 'Refactoring' },
    { value: 'agile', label: 'Agile' },
    { value: 'patterns', label: 'Patterns' },
    { value: 'design', label: 'Design' },
    { value: 'crime', label: 'Crime' },
    { value: 'classic', label: 'Classic' },
    { value: 'testing', label: 'Testing' },
    { value: 'fantasy', label: 'Fantasy' },
    { value: 'horror', label: 'Horror' }
  ]
  const [genre, setGenre] = useState(options)
  const books = useQuery(ALL_BOOKS, {
    //fetchPolicy: 'cache-and-network'
  })
  const genreBooks = useQuery(GENRE_BOOKS, {
    skip: !genre.value || genre.value === 'all_genres',
    variables: { genre: genre.value },
    //fetchPolicy: 'cache-and-network'
  })

  if (!props.show) {
    return null
  }
  if (books.loading || genreBooks.loading) {
    return <div>loading...</div>
  }

  if (genre.value && genreBooks.data && genre.value !== 'all_genres') {
    return (
      <div>
        <h2>books</h2>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>author</th>
              <th>published</th>
            </tr>
            {genreBooks.data.allBooks.map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <br />
        <div style={{ width: '300px' }}>
          Select genre: <Select options={options} onChange={setGenre} defaultValue={null} />
        </div>
      </div>
    )
  }

  return (
    <div>
      <h2>books</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.data.allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <div style={{ width: '300px' }}>
        Select genre: <Select options={options} onChange={setGenre} defaultValue={null} />
      </div>
    </div>
  )
}

export default Books