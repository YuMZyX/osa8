import { useQuery } from "@apollo/client"
import { ALL_AUTHORS, UPDATE_AUTHOR } from "../queries"
import { useState } from 'react'
import { useMutation } from '@apollo/client'
import Select from 'react-select'

const Authors = (props) => {
  const [name, setName] = useState(null)
  const [born, setBorn] = useState('')
  const authors = useQuery(ALL_AUTHORS)
  const[updateAuthor] = useMutation(UPDATE_AUTHOR)

  const submit = async (event) => {
    event.preventDefault()
    const bornAsInt = parseInt(born)

    updateAuthor({ variables: { name: name.value, setBornTo: bornAsInt } })

    setName(null)
    setBorn('')
  }

  if (!props.show) {
    return null
  }
  if (authors.loading) {
    return <div>loading...</div>
  }

  const options = authors.data.allAuthors.map((a) => ({
    value: a.name,
    label: a.name
  }))

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <h4>Set birthyear:</h4>
      <form onSubmit={submit}>
        <div style={{ width: '300px' }}>
          Name: <Select options={options} onChange={setName} />
        </div>
        <div>
          Born: 
          <input
            type="number"
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">Update author</button>
      </form>
    </div>
  )
}

export default Authors