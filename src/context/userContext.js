import React, {useEffect, useState} from "react"
import { compareCFP, findById } from "../services/userDataService";
import {findGreenBoardService, getCurrentUserService} from "../services/mondayService";

const UserContext = React.createContext()
function UserContextProvider(props) {
  const [id, setId] = useState();
  const [name, setName] = useState();
  const [boardId, setBoardId] = useState(-1);

  async function findGreenBoard (boardName) {
    const boardId = await findGreenBoardService("Green Board");
    if (boardId === null) {
    } else if (boardId === 'ComplexityException') {
      setTimeout(() => {
        this.findGreenBoard(boardName)
      }, 10000);
    } else {
      setBoardId(boardId);
      return boardId;
    }
  }

  async function getCurrentUser(){
    const res = await getCurrentUserService();
    if (res === null) {
    } else if (res === 'ComplexityException') {
      setTimeout(() => {
        getCurrentUser()
      }, 10000);
    } else {
      setName(res.name)
      setId(res.id)

      return res
    }
  }
  useEffect(() => {

      findGreenBoard("Green Board").then((boardId)=> {

      });

      getCurrentUser().then((res) => {

      })


  }, [])

  return (
    <UserContext.Provider value={{id, name, boardId, setBoardId}}>
        {props.children}
    </UserContext.Provider>
  )
}

export {UserContextProvider, UserContext}
