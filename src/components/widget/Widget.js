import { useContext, useState } from "react";
import {Box, Button, Flex, Heading, Tab, TabList, TabPanel, TabPanels, TabsContext} from "monday-ui-react-core"
import {
  NavigationChevronRight,
  NavigationChevronLeft,
} from "monday-ui-react-core/dist/allIcons";
import happy from "../../images/happy.png"
import sad from "../../images/sad.png"
import './Widget.css'
import { UserContext } from "../../context/userContext";
import GetStarted from "../carbon-footprint-calculator/GetStarted";
import Travel from "../carbon-footprint-calculator/Travel";
import Home from "../carbon-footprint-calculator/Home";
import Food from "../carbon-footprint-calculator/Food";
import Shopping from "../carbon-footprint-calculator/Shopping";
import {AVERAGES, GOODS, SERVICES} from "../carbon-footprint-calculator/data";
import Graph from "../carbon-footprint-calculator/Graph";
import CFPMini from "./cfp-mini/CFPMini";
import Quotes from "./quotes/Quotes";
import Points from "./points/Points";

const TIPS = [
  "Save energy at home",
  "Eat more vegetables",
  "Speak up",
  "Throw away less food",
  "Switch to an electric vehicle",
  "Change your home's source of energy",
  "Choose eco-friendly products",
  "Reduce, reuse, repair, recycle",
  "Walk, bike or take public transport",
  "Consider your travel"
]


export default function Widget() {

  return (
      <TabsContext >
        <TabList  className="Tag-list">
          <Tab>Quotes</Tab>
          <Tab>Carbon Footprint</Tab>
          <Tab>Points</Tab>
          <Tab>News</Tab>
        </TabList>
        <TabPanels >
          <TabPanel>
            <Quotes/>
          </TabPanel>
          <TabPanel>
            <CFPMini/>
          </TabPanel>
          <TabPanel>
            <Points/>
          </TabPanel>
          <TabPanel>
            <div>
              To be determined later
            </div>

          </TabPanel>

        </TabPanels>

      </ TabsContext>
  )

  // const {percentage} = useContext(UserContext)
  // const [tipIndex, setTipIndex] = useState(0)
  //
  // const nextTip = () => {
  //   setTipIndex(prevTipIndex => (prevTipIndex + 1)% TIPS.length)
  // }
  //
  // const prevTip = () => {
  //   setTipIndex(prevTipIndex => prevTipIndex - 1 < 0 ? (prevTipIndex - 1) % TIPS.length + TIPS.length : (prevTipIndex - 1) % TIPS.length)
  // }
  //
  // return (
  //   <Box className="Widget">
  //     <Box  margin={Box.margins.MEDIUM}
  //       padding={Box.paddings.MEDIUM}
  //     >
  //       <Flex gap={Flex.gaps.MEDIUM} direction={Flex.directions.COLUMN}>
  //         <Flex>
  //           <img src={percentage <= 50 ? sad : happy} alt="emoji"/>
  //         </Flex>
  //         <Flex direction={Flex.directions.COLUMN}>
  //           <span>Your Carbon footprint is  <b>
  //           { percentage > 50 ? `better than ${percentage}%` : percentage=== "-"? "calculating...": `worse than ${100-percentage}%`} </b> {percentage === "-" ? "": "people in the Green board"}</span>
  //         </Flex>
  //       </Flex>
  //       <Box padding={Box.paddings.SMALL} className="box" marginTop={Box.marginTops.XL}>
  //         <Flex>
  //           <NavigationChevronLeft onClick={prevTip} style={{cursor: "pointer"}} />
  //           <div className="Tip">{ TIPS[tipIndex] }</div>
  //           <NavigationChevronRight onClick={nextTip} style={{cursor: "pointer"}} />
  //         </Flex>
  //       </Box>
  //     </Box>
  //   </Box>
  // )
}
