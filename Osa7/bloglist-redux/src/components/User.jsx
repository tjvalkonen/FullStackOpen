import Table from 'react-bootstrap/Table'

const User = ({ fullname, blogs }) => {
  // console.log(blogs)

  // var blogsString = JSON.stringify(blogs)
  // console.log(blogsString)

  // var blogscount = JSON.parse(blogsString)
  // console.log(blogscount)

  var lenght = Object.keys(blogs).length
  // console.log(lenght)

  return (
    <div>
      <Table size="sm" bgcolor="white">
        <thead>
          <tr>
            <td width={'180'}>{fullname} </td>
            <td>{lenght}</td>
          </tr>
        </thead>
      </Table>
    </div>
  )
}

export default User
