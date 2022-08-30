import React, {useEffect, useState} from "react"
import mondaySdk from "monday-sdk-js"
import { compareCFP, findById } from "../services/userDataService";
const monday = mondaySdk()

const UserContext = React.createContext()
function UserContextProvider(props) {
  const [id, setId] = useState();
  const [name, setName] = useState();
  const [boardId, setBoardId] = useState(-1);
  const [cfp, setCfp] = useState(-1)
  const [percentage, setPercentage] = useState()

  useEffect(() => {
    monday.setToken('eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjE3NjMzMzUyMiwidWlkIjozMzM4NjAzOCwiaWFkIjoiMjAyMi0wOC0xOFQyMjozMzowOS4wMDBaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6MTMxNDQ3NTYsInJnbiI6InVzZTEifQ.gai4a2YB1yJhoqJ-mGIX2pBNF91iArRerKqbB6n3u0s');

    monday.api(
      `query {
        me {
        name
          id
        }   
        boards {
          id
          name
        } 
                
      }`
    ).then(res => {
      const board = res.data.boards.find(board => board.name === "Green Board");
      if (typeof board !== 'undefined') {
        setBoardId(board.id);
      }
      setId(res.data.me.id.toString());
      findById(res.data.me.id.toString()).then(res =>  {
        setCfp(res.data.document.cfp)
        compareCFP(res.data.document.cfp).then(res => {
          if (res.data.total === 0) {
            setPercentage(0) 
          } else if (res.data.total === 1) {
            setPercentage(100)
          } else {
            setPercentage(Math.round((res.data.countGreater/--res.data.total)*100))
          } 
        })
      }) 
      setName(res.data.me.name);
    })
  }, [])

  return (
    <UserContext.Provider value={{id, name, cfp, percentage, boardId, setBoardId}}>
        {props.children}
    </UserContext.Provider>
  )
}

export {UserContextProvider, UserContext}
