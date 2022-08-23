import GetStarted from "./GetStarted";
import Travel from "./Travel"
import Home from "./Home";
import Food from "./Food";
import Shopping from "./Shopping";

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
  return(
    <div className="CFPCalculator">
      <TabsContext>
        <TabList className="Navbar" size="lg">    
          <Tab>Get Started</Tab>
          <Tab>Travel</Tab>
          <Tab>Home</Tab>
          <Tab>Food</Tab>
          <Tab>Shopping</Tab>
          <Tab>Take Action</Tab>
        </TabList>
        <TabPanels className="body">
          <TabPanel className="left"><GetStarted /></TabPanel>
          <TabPanel className="left"><Travel /></TabPanel>
          <TabPanel className="left"><Home /></TabPanel>
          <TabPanel className="left"><Food /></TabPanel>
          <TabPanel className="left"><Shopping /></TabPanel>
        </TabPanels>
      </ TabsContext>
    </div>   
  )
}
