import { useContext, useEffect, useState } from "react";
import { Box, Flex, Tooltip, Icon } from "monday-ui-react-core"
import { compareCFP } from "../../services/userDataService";
import {
  NavigationChevronRight,
  NavigationChevronLeft,
  Help
} from "monday-ui-react-core/dist/allIcons";
import happy from "../../images/happy.png"
import sad from "../../images/sad.png"
import './Widget.css'
import { UserContext } from "../../userContext";

const TIPS = [
  "Eat more vegetables",
  "Ok I will eat more",
  "Eat burger",
  "Kill Cows"
]

export default function Widget() {
  const id = useContext(UserContext)
  const [tipIndex, setTipIndex] = useState(0)

  // useEffect(() => {
  //   compareCFP()
  // }, [])

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
        <div className="monday-storybook-tooltip_box">
        <Tooltip content="Heavy information and facts for big brain people">
          <div className="monday-storybook-tooltip_icon-wrapper">
            <Icon icon={Help} />
          </div>
        </Tooltip>
      </div>
        <Flex gap={Flex.gaps.MEDIUM} direction={Flex.directions.COLUMN}>
          <Flex>
            <img src={happy} alt="emoji"/>
          </Flex>
          <Flex direction={Flex.directions.COLUMN}>
            <span>Your Carbon footprint is  <b>better than 69%</b> people in the Green board</span>
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
