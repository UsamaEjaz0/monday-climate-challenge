import { useContext, useState } from "react";
import {Box, Button, Flex, Heading, Tab, TabList, TabPanel, TabPanels, TabsContext} from "monday-ui-react-core"
import {
  NavigationChevronRight,
  NavigationChevronLeft,
} from "monday-ui-react-core/dist/allIcons";

import './Widget.css'
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
          <Tab>Eco Points</Tab>
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
        </TabPanels>

      </ TabsContext>
  )

  
}
