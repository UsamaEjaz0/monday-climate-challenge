import React, {useEffect, useState} from "react"
import { compareCFP, findById } from "../services/userDataService";
import {findGreenBoardService, getCurrentUserService} from "../services/mondayService";

const UserContext = React.createContext()
function UserContextProvider(props) {
  const [id, setId] = useState();
  const [name, setName] = useState();
  const [boardId, setBoardId] = useState(-1);
  const [cfp, setCfp] = useState(-1)
  const [percentage, setPercentage] = useState("-")

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
        findById(res.id.toString()).then(res =>  {

          if(!res){

          }
          else if (!res.data.document){
            setCfp(0)
          }
          else if (!res.data.document.cfp){
            setCfp(0)
          }
          else{
            setCfp(res.data.document.cfp)
            compareCFP(res.data.document.cfp).then(res => {
              if (!res){
                if (res.data.total === 0) {
                  setPercentage(0)
                } else if (res.data.total === 1) {
                  setPercentage(100)
                } else {
                  setPercentage(Math.round((res.data.countGreater/--res.data.total)*100))
                }
              }
            })
          }


        })
      })


  }, [])

  return (
    <UserContext.Provider value={{id, name, cfp, percentage, boardId, setBoardId}}>
        {props.children}
    </UserContext.Provider>
  )
}

export {UserContextProvider, UserContext}
