import { memo, useState } from "react"
import { Globe} from "monday-ui-react-core/dist/allIcons";
import { UserContext } from "../../context/userContext";
import {
  Box,
  Flex,
  Button,
  Loader,
  Heading,
} from "monday-ui-react-core"
import { useEffect, useContext } from "react"
import {
  createItemService,
  findUserItemInBoardService,
  updateUserPointsService
} from "../../services/mondayService";
import {findById, updateRecord} from "../../services/userDataService";
import getEmissionStatus from "../../utils/statusMapper";
import './TakeAction.css'

const STORAGE_KEY = "is-claimed"

function TakeAction() {
  const {id, boardId, name} = useContext(UserContext)
  const [points, setPoints] = useState(-1)
  const [dailyRewards, setDailyRewards] = useState({
    isClaimed: localStorage.getItem(STORAGE_KEY) ? JSON.parse(localStorage.getItem(STORAGE_KEY)).isClaimed : [false, false, false, false, false],
    claimDay: localStorage.getItem(STORAGE_KEY) ? JSON.parse(localStorage.getItem(STORAGE_KEY)).claimDay : new Date().getDay()
  })


  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY)) {
      const currentDay = new Date().getDay()
      if (JSON.parse(localStorage.getItem(STORAGE_KEY)).claimDay !== currentDay) {
        const newDailyRewards = {
          isClaimed: [false, false, false, false, false],
          claimDay: currentDay
        }
        setDailyRewards(newDailyRewards)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newDailyRewards))
      }
    }

    findById(id).then(data => setPoints(data.data.document.points))
  }, [id])

  function updatePoints(saves, index) {
    const updates = {id, points: points + Math.round(saves)}
    updateRecord(updates).then(() => {
      updateBoard(boardId, points + Math.round(saves));
      setPoints(prevPoints => prevPoints + Math.round(saves));
    })

    setDailyRewards(prevDailyRewards => {
      const isClaimed = [...prevDailyRewards.isClaimed]
      isClaimed[index] = true
      localStorage.setItem(STORAGE_KEY, JSON.stringify({isClaimed, claimDay: prevDailyRewards.claimDay}))
      return {...prevDailyRewards, isClaimed}
    })
  }


  const actions = [
    {
      id: 1,
      task: "Print double sided",
      saves: 0.82,
    },
    {
      id: 2,
      task: "Turn off extra lights",
      saves: 0.55,
    },
    {
      id: 3,
      task: "Carpool to work",
      saves: 2.5,
    },
    {
      id: 4,
      task: "Take public transportation",
      saves: 1,
    },
    {
      id: 5,
      task: "Telecommute to work",
      saves: 2.74,
    },
  ]

  const displayActions = actions.map((action, index) => {
    return(
        <Box
            border={Box.borders.DEFAULT}
            padding={Box.paddings.LARGE}
            rounded={Box.roundeds.SMALL}
            marginBottom={Box.marginBottoms.LARGE}
            className="Action-box"
            key={action.id}
        >
          <Flex direction={Flex.directions.COLUMN}
                align={Flex.align.STRETCH}
          >
            <Box className="Action-text">{action.task} & save <b>{action.saves} kg CO<sub>2</sub></b></Box>
            <Button
                className="Action-button"
                kind={Button.kinds.SECONDARY}
                disabled={dailyRewards.isClaimed[index]}
                onClick={() => updatePoints(action.saves, index)}
            >
              I did this today
            </Button>
          </Flex>
        </Box>
    )
  })

  async function updateBoard(boardId, points) {

    if (boardId !== -1){
      const user = {
        id,
        name,

      }
      const userItemId =  await findUserItemInBoardService(boardId, user.id);
      if (userItemId == null){
        console.log("Something went wrong");
      } else if (userItemId === 'ComplexityException'){
        setTimeout(() => {updateBoard(boardId, user, points)}, 10000);
      }
      else if (userItemId === -1){
        let baseUser = {
          cfp: 0,
          ...user,
        }
        const res = await findById(user.id);
        if (res == null) {
        } else {
          const userInDb = res.data.document;
          if (userInDb != null) {
            baseUser = {
              ...userInDb,
              points: points,
            }
          }
        }
        baseUser.status = getEmissionStatus(parseFloat(baseUser.cfp));
        return await createUser(baseUser, "ranking", boardId);
      }else {
        return await updateUser(boardId, userItemId, points)
      }
      return false;
    }
  }

  async function createUser(user, groupId, boardId) {

    const res = await createItemService(user, groupId, boardId)
    if (res === null) console.log("Something went wrong")
    else if (res === 'ComplexityException') setTimeout(()=>{createUser(user, groupId, boardId)}, 10000);
    else return true

  }

  async function updateUser(boardId, itemId, points) {

    const res = await updateUserPointsService(boardId, itemId, points);
    if (res === null) console.log("Something went wrong")
    else if (res === 'ComplexityException') setTimeout(()=>{updateUserPointsService(boardId, itemId, points)}, 10000);
    else return true

  }

  console.log("TakeAction rendered..")
  return (
      <Box padding={Box.paddings.MEDIUM} margin={Box.margins.XL} >
        <Heading type={Heading.types.h1} value="Take action" brandFont />
        <Box marginY={Box.marginYs.MEDIUM}>
          <Flex align={Flex.align.END}>
            <Globe/>
            {/*<Heading type={Heading.types.h4} value="Eco-points" brandFont />*/}
            &nbsp; Eco Points &nbsp;
            {points === -1 ? <Loader size={15} /> : points}
          </Flex>
        </Box>
        <Flex gap={Flex.gaps.MEDIUM} wrap={true}>
          {displayActions}
        </Flex>
      </Box>
  )
}

export default memo(TakeAction)