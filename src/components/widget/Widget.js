import {Tab, TabList, TabPanel, TabPanels, TabsContext} from "monday-ui-react-core"
import './Widget.css'
import CFPMini from "./cfp-mini/CFPMini";
import Quotes from "./quotes/Quotes";
import Points from "./points/Points";




export default function Widget() {

  return (
      <div className="Widget">
          <TabsContext >
              <TabList  className="Tag-list">
                  <Tab>Quotes</Tab>
                  <Tab>Carbon Footprint</Tab>
                  <Tab>Points</Tab>
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
      </div>

  )

}
