import React, {useEffect, useState} from "react"
import mondaySdk from "monday-sdk-js"
const monday = mondaySdk()

const UserContext = React.createContext()
function UserContextProvider(props) {
  const [id, setId] = useState()
  useEffect(() => {
    monday.setToken('eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjE3NjMzMzUyMiwidWlkIjozMzM4NjAzOCwiaWFkIjoiMjAyMi0wOC0xOFQyMjozMzowOS4wMDBaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6MTMxNDQ3NTYsInJnbiI6InVzZTEifQ.gai4a2YB1yJhoqJ-mGIX2pBNF91iArRerKqbB6n3u0s');
    
    monday.api(
      `query {
        me {
          id
        }            
      }`
    ).then(res => setId(res.data.me.id.toString()))
  }, [])
  
  return (
    <UserContext.Provider value={{id}}>
        {props.children}
    </UserContext.Provider>
  )
}

export {UserContextProvider, UserContext}