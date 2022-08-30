import { useContext, useState } from "react";
import { Box, Flex } from "monday-ui-react-core"
import { 
  NavigationChevronRight,
  NavigationChevronLeft,
} from "monday-ui-react-core/dist/allIcons";
import happy from "../../images/happy.png"
import sad from "../../images/sad.png"
import './Widget.css'
import { UserContext } from "../../context/userContext";

const TIPS = [
  "Eat more vegetables",
  "Ok I will eat more",
  "Eat burger",
  "Kill Cows"
]

export default function Widget() {
  const {percentage} = useContext(UserContext)
  const [tipIndex, setTipIndex] = useState(0)

  const nextTip = () => {
    setTipIndex(prevTipIndex => (prevTipIndex + 1)% TIPS.length)
  }

  const prevTip = () => {
    setTipIndex(prevTipIndex => prevTipIndex - 1 < 0 ? (prevTipIndex - 1) % TIPS.length + TIPS.length : (prevTipIndex - 1) % TIPS.length)
  }

  return (
    <Box className="Widget">
      <Box border={Box.borders.DEFAULT} margin={Box.margins.MEDIUM}
        padding={Box.paddings.MEDIUM}
      >
        <Flex gap={Flex.gaps.MEDIUM} direction={Flex.directions.COLUMN}>
          <Flex>
            <img src={percentage > 50 ? happy : sad} alt="emoji"/>
          </Flex>
          <Flex direction={Flex.directions.COLUMN}>
            <span>Your Carbon footprint is  <b>
            { percentage > 50 ? `better than ${percentage}%` : `worse than ${100-percentage}%`}</b> people in the Green board</span>
          </Flex>
        </Flex>
        <Box marginTop={Box.marginTops.XL}>
          <Flex>
            <NavigationChevronLeft onClick={prevTip} style={{cursor: "pointer"}} />
            <div className="Tip">{ TIPS[tipIndex] }</div>
            <NavigationChevronRight onClick={nextTip} style={{cursor: "pointer"}} />
          </Flex>
        </Box>
      </Box>
    </Box>
  )
}
