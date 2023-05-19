import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Users() {
  const [users, setUsers] = useState([])
  const [keyword, setKeyword] = useState('')
  const getUsersData = async () => {
    const res = await axios.get(
      'https://my-json-server.typicode.com/eyesofkids/json-fake-data/users'
    )
    setUsers(res.data)
  }

  const filterByKeyword = (users, keyword) => {
    return users.filter((v, i) => {
      return v.name.includes(keyword)
    })
  }

  useEffect(() => {
    getUsersData()
  }, [])

  return (
    <>
      <div className="container">
        <div className="row">
          <h1>學生資料表</h1>
          <div className="search">
            <input
              type="text"
              value={keyword}
              onChange={(e) => {
                setKeyword(e.target.value)
              }}
            />
            <button onChange={() => {}}>search</button>
          </div>
          <table className="table table-striped">
            <thead>
              <tr>
                <th className="text-center">學號</th>
                <th className="text-center">名字</th>
                <th className="text-center">年齡</th>
              </tr>
            </thead>
            <tbody>
              {filterByKeyword(users, keyword).map((v, i) => {
                return (
                  <tr>
                    <td className="text-center">{v.id}</td>
                    <td className="text-center">{v.name}</td>
                    <td className="text-center">{v.age}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default Users
