import {useState} from "react"
import mondaySdk from "monday-sdk-js";
import { Globe } from "monday-ui-react-core/dist/allIcons";
import {
  Box,
  Flex,
  Button,
  Loader,
  Heading
} from "monday-ui-react-core"
import { useEffect } from "react"

const monday = mondaySdk();
const STORAGE_KEY = "is-claimed"

export default function TakeAction() {
  const [points, setPoints] = useState(-1)
  const [id, setId] = useState()
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

    monday.setToken('eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjE3NjMzMzUyMiwidWlkIjozMzM4NjAzOCwiaWFkIjoiMjAyMi0wOC0xOFQyMjozMzowOS4wMDBaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6MTMxNDQ3NTYsInJnbiI6InVzZTEifQ.gai4a2YB1yJhoqJ-mGIX2pBNF91iArRerKqbB6n3u0s');

    monday.api(
      `query {
        me {
          id
        }            
      }`
    ).then(res => {
      setId(res.data.me.id.toString())
      fetch("https://www.car7parts.ae/monday/user-data/find", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',  
        },
        body: JSON.stringify({
            id: res.data.me.id.toString(),
        })
      }).then(res => res.json()).then(data => setPoints(data.data.document.points))
    }) 
  }, [])

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
      <Box
        padding={Box.paddings.MEDIUM} 
        rounded={Box.roundeds.SMALL} 
        border={Box.borders.DEFAULT}
        key={action.id}
      >
        <Flex gap={Flex.gaps.MEDIUM} justify={Flex.justify.SPACE_BETWEEN}>
          <span>{action.task} & save <b>{action.saves} kg CO<sub>2</sub></b></span>
          <Button disabled={dailyRewards.isClaimed[index]} onClick={() => updatePoints(action.saves, index)}>I did this today</Button>
        </Flex>
      </Box>
    )
  })

  return (
    <Box padding={Box.paddings.XL} margin={Box.margins.XL}>
      <Heading type={Heading.types.h1} value="Take action" brandFont />
      <Box marginY={Box.marginYs.MEDIUM}>
        <Flex align={Flex.align.END}><Globe />&nbsp;ECO Points:&nbsp;{points === -1 ? <Loader size={20} /> : points}</Flex>
      </Box>
      <Flex gap={Flex.gaps.LARGE} direction={Flex.directions.COLUMN} align={Flex.align.STRETCH}>
        {displayActions}
      </Flex>
    </Box>
  )
}