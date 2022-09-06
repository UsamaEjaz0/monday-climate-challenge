import {Tab, TabList, TabPanel, TabPanels, TabsContext, Box} from "monday-ui-react-core"
import './Widget.css'
import CFPMini from "./cfp-mini/CFPMini";
import Quotes from "./quotes/Quotes";
import Points from "./points-mini/PointsMini";

export default function Widget() {
  return (
    <Box className="Widget">
      <TabsContext >
        <TabList className="Tag-list">
          <Tab>Quotes</Tab>
          <Tab>Carbon Footprint</Tab>
          <Tab>Eco Points</Tab>
        </TabList>
        <TabPanels >
          <TabPanel><Quotes/></TabPanel>
          <TabPanel><CFPMini/></TabPanel>
          <TabPanel><Points/></TabPanel>
        </TabPanels>
      </TabsContext>
    </Box>
  )
}
