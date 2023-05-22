import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Users() {
  //取的資料用
  const [users, setUsers] = useState([])
  const [usersDisplay, setUsersDisplay] = useState([])

  const ages = ['全部', '大於20歲', '小於20歲']
  const [ageFilter, setAgeFilter] = useState('全部')

  const [sortType, setSortType] = useState(3)

  //用於input內的輸入狀態
  const [inputText, setInputText] = useState('')
  //用於input篩選用
  const [keyword, setKeyword] = useState('')

  const getUsersData = async () => {
    const res = await axios.get(
      'https://my-json-server.typicode.com/eyesofkids/json-fake-data/users'
    )
    setUsers(res.data)
    setUsersDisplay(res.data)
  }

  const filterByKeyword = (users, keyword) => {
    return users.filter((v, i) => {
      return v.name.includes(keyword)
    })
  }

  const filterByAge = (users, ageFilter) => {
    return users.filter((v, i) => {
      switch (ageFilter) {
        case '大於20歲':
          return v.age >= 20
        case '小於20歲':
          return v.age < 20
        case '全部':
        default:
          return users
      }
    })
  }

  const sortUsers = (users, sortType) => {
    switch (sortType) {
      case 1:
        return [...users].sort((a, b) => {
          return a.age - b.age
        })
      case 2:
        return [...users].sort((a, b) => {
          return b.age - a.age
        })
      case 3:
        return [...users].sort((a, b) => {
          return Number(b.id) - Number(a.id)
        })
      case 4:
        return [...users].sort((a, b) => {
          return Number(a.id) - Number(b.id)
        })
      default:
        return users
    }
  }

  useEffect(() => {
    getUsersData()
  }, [])

  useEffect(() => {
    let newUsers = filterByKeyword(users, keyword)
    newUsers = filterByAge(newUsers, ageFilter)
    newUsers = sortUsers(newUsers, sortType)
    setUsersDisplay(newUsers)
  }, [keyword, ageFilter, sortType])

  return (
    <>
      <div className="container">
        <div className="row">
          {/* h1 title */}
          <section>
            <h1>學生資料表</h1>
          </section>
          {/* search input */}
          <section>
            <div className="search">
              <input
                type="text"
                value={inputText}
                onChange={(e) => {
                  setInputText(e.target.value)

                  if (e.target.value === '') {
                    setKeyword('')
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setKeyword(inputText)
                  }
                }}
              />
              <button
                onClick={(e) => {
                  setKeyword(inputText)
                }}
              >
                search
              </button>
            </div>
          </section>
          {/* age filter */}
          <section className="section3_age">
            {ages.map((v, i) => {
              return (
                <>
                  <input
                    type="radio"
                    key={i}
                    value={ageFilter}
                    checked={v === ageFilter}
                    onChange={() => {
                      setAgeFilter(v)
                    }}
                  />
                  <label>{v}</label>
                </>
              )
            })}
          </section>

          {/* sort  */}
          <section className="section4_sort">
            <button
              className={sortType === 1 ? 'sortButton_Active' : ''}
              onClick={() => {
                setSortType(1)
              }}
            >
              age 小到大
            </button>
            <button
              className={sortType === 2 ? 'sortButton_Active' : ''}
              onClick={() => {
                setSortType(2)
              }}
            >
              age 大到小
            </button>
            <button
              className={sortType === 3 ? 'sortButton_Active' : ''}
              onClick={() => {
                setSortType(3)
              }}
            >
              id 大到小
            </button>
            <button
              className={sortType === 4 ? 'sortButton_Active' : ''}
              onClick={() => {
                setSortType(4)
              }}
            >
              id 小到大
            </button>
          </section>
          {/* display Data */}
          <section>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th className="text-center">學號</th>
                  <th className="text-center">名字</th>
                  <th className="text-center">年齡</th>
                </tr>
              </thead>
              <tbody>
                {usersDisplay.map((v, i) => {
                  return (
                    <tr key={i}>
                      <td className="text-center">{v.id}</td>
                      <td className="text-center">{v.name}</td>
                      <td className="text-center">{v.age}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </section>
        </div>
      </div>
    </>
  )
}

export default Users
