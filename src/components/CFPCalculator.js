import { useEffect, useState } from "react"
import GetStarted from "./GetStarted";
import Travel from "./Travel"
import Home from "./Home";
import Food from "./Food";
import Shopping from "./Shopping";
import Graph from "./Graph";

import {
  TabsContext, 
  TabList,
  TabPanel,
  TabPanels,
  Tab
} from "monday-ui-react-core"

import "monday-ui-style/dist/index.min.css";
import './CFPCalculator.css'

export default function CFPCalculator() {
  const [travel, setTravel] = useState()
  
  const [result, setResult] = useState()

  useEffect(() => {
    console.log(travel)
  }, [travel])

  
  return(
    <div className="CFPCalculator">
      <TabsContext>
        <TabList className="Tag-list">    
          <Tab>Get Started</Tab>
          <Tab>Travel</Tab>
          <Tab>Home</Tab>
          <Tab>Food</Tab>
          <Tab>Shopping</Tab>
          <Tab>Take Action</Tab>
        </TabList>
        <TabPanels className="Body-left">
          <TabPanel><GetStarted /></TabPanel>
          <TabPanel><Travel setTravel={setTravel} /></TabPanel>
          <TabPanel><Home /></TabPanel>
          <TabPanel><Food /></TabPanel>
          <TabPanel><Shopping /></TabPanel>
        </TabPanels>
        <div className="Body-right">
          <Graph />
        </div>
      </ TabsContext>
      { result }
    </div>   
  )
}