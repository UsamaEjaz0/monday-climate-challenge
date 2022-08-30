import { useState } from "react"
import { Globe, Help } from "monday-ui-react-core/dist/allIcons";
import { UserContext } from "../../userContext";
import {
  Box,
  Flex,
  Button,
  Loader,
  Heading,
} from "monday-ui-react-core"
import { useEffect, useContext } from "react"
const STORAGE_KEY = "is-claimed"

export default function TakeAction() {
  const {id} = useContext(UserContext)
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

    fetch("https://www.car7parts.ae/monday/user-data/find", {
      method: "POST",
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({id})
    }).then(res => res.json()).then(data => setPoints(data.data.document.points))
  }, [id])

  function updatePoints(saves, index) {
    fetch("https://www.car7parts.ae/monday/user-data/update", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id,
            points: points + Math.round(saves)
        })
    }).then(res => res.json()).then(data => setPoints(prevPoints => prevPoints + Math.round(saves)))

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
        <div style={{backgroundColor: "#f5f6f8"}} key={action.id}>
          <Box
              padding={Box.paddings.MEDIUM}
              rounded={Box.roundeds.SMALL}
          >
            <Flex  gap={Flex.gaps.MEDIUM} justify={Flex.justify.SPACE_BETWEEN}>
              <span>{action.task} & save <b>{action.saves} kg CO<sub>2</sub></b></span>
              <Button disabled={dailyRewards.isClaimed[index]} onClick={() => updatePoints(action.saves, index)}>I did this today</Button>
            </Flex>
          </Box>
        </div>
    )
  })

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
      <Flex gap={Flex.gaps.MEDIUM} direction={Flex.directions.COLUMN} align={Flex.align.STRETCH}>
        {displayActions}
      </Flex>
    </Box>
  )
}
