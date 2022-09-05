import {Box, Tab, TabList, TabPanel, TabPanels, TabsContext} from "monday-ui-react-core"
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
      </div>

  )

}
