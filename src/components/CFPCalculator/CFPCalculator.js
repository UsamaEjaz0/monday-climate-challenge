import { useEffect, useState } from "react"
import {
  GOODS, SERVICES, TRAVEL, HOME, AVERAGES, TOTAL_AVERAGES,
  ElECTRICITY_MULTIPLIER, NATURAL_GAS_MULTIPLIER, HEATING_OIL_MULTIPLIER, LIVING_AREA_MULTIPLIER
} from "./data"
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
  Tab,
  Flex
} from "monday-ui-react-core"

import "monday-ui-style/dist/index.min.css";
import './CFPCalculator.css'

export default function CFPCalculator() {
  const [annualIncome, setAnnualIncome] = useState(0)

  const [travel, setTravel] = useState({
    vehicleType: 'Diesel',
    personalVehicle: [22048, 8.3468],
    publicTransit: [392, 0.05488],
    airTravel: [3541, 0.49574]
  })

  const [home, setHome] = useState({
    electricity: [680, 3.3728],
    naturalGas: 330,
    heatingOil: 200,
    livingSpace: 148,
  })

  const [activeTab, setActiveTab] = useState(0)

  const [food, setFood] = useState(2.8)

  const [shopping, setShopping] = useState({
    goods: [755, 4.5],
    services: [1567 , 4.57]
  })

  useEffect(() => {
    setShopping({goods: GOODS[annualIncome], services: SERVICES[annualIncome]})
    setTravel({
      vehicleType: 'Diesel',
      personalVehicle: [TRAVEL[annualIncome][0], TRAVEL[annualIncome][0] * 0.0003527],
      publicTransit: [TRAVEL[annualIncome][1],TRAVEL[annualIncome][1] * 0.00014],
      airTravel: [TRAVEL[annualIncome][2], TRAVEL[annualIncome][2] * 0.00028]
    })
    setHome({
      electricity: [HOME[annualIncome][0], HOME[annualIncome][0] * ElECTRICITY_MULTIPLIER],
      naturalGas: [HOME[annualIncome][1], HOME[annualIncome][1] * NATURAL_GAS_MULTIPLIER],
      heatingOil: [HOME[annualIncome][2], HOME[annualIncome][2] * HEATING_OIL_MULTIPLIER],
      livingSpace: [HOME[annualIncome][3], HOME[annualIncome][3] * LIVING_AREA_MULTIPLIER],
    })
  }, [annualIncome])

  function totalCFP() {
    return (
      (travel.personalVehicle[1]+travel.airTravel[1]+travel.publicTransit[1]+
      home.electricity[1] + home.heatingOil[1] + home.naturalGas[1] + home.livingSpace[1]+
      food+shopping.goods[1]+shopping.services[1]).toPrecision(3)
    )
  }

  function compareWithAverage() {
    let average = TOTAL_AVERAGES[annualIncome]
    let current = totalCFP()

    if (average < current) {
      return(
        <>
          <b>{(current-average).toPrecision(2)} %</b>
          <span style={{fontSize: "14px"}}>Worse than Average</span>
        </>
      )
    }

    return(
      <>
        <b>{(average-current).toPrecision(2)} %</b>
        <span style={{fontSize: "14px"}}>Better than Average</span>
      </>
    )
  }

  return(
    <div className="CFPCalculator">
      <TabsContext activeTabId={activeTab}>
        <TabList activeTabId={activeTab} className="Tag-list">
          <Tab>Get Started</Tab>
          <Tab>Travel</Tab>
          <Tab>Home</Tab>
          <Tab>Food</Tab>
          <Tab>Shopping</Tab>
        </TabList>
        <TabPanels activeTabId={activeTab} className="Body-left" >
          <TabPanel><GetStarted setActiveTab={setActiveTab} setAnnualIncome={setAnnualIncome}/></TabPanel>
          <TabPanel>
            <Travel
                setActiveTab={setActiveTab}
              travel={travel}
              setTravel={setTravel}
            />
          </TabPanel>
          <TabPanel ><Home setActiveTab={setActiveTab} home={home} setHome={setHome} /></TabPanel>
          <TabPanel><Food setActiveTab={setActiveTab} setFood={setFood} /></TabPanel>
          <TabPanel>
            <Shopping
                setActiveTab={setActiveTab}
              shopping={shopping}
              setShopping={setShopping}
              goods={GOODS[annualIncome]}
              services={SERVICES[annualIncome]}
            />
          </TabPanel>
        </TabPanels>
        <div className="Body-right">
          <h3>YOUR CARBON FOOTPRINT</h3>
          <Flex justify={Flex.justify.CENTER} gap={Flex.gaps.MEDIUM}>
            <Flex
              direction={Flex.directions.COLUMN}
              >
              <b>{totalCFP()}</b>
              <span style={{fontSize: "14px"}}>tons CO2eq/year</span>
            </Flex>
            <Flex
              direction={Flex.directions.COLUMN}
             >
              {compareWithAverage()}
            </Flex>
          </Flex>
          <div className="Graph">
            <Graph
              travel={
                travel.personalVehicle[1]+travel.airTravel[1]+travel.publicTransit[1]
              }
              home={home.electricity[1] + home.heatingOil[1] + home.naturalGas[1] + home.livingSpace[1]}
              food={food}
              goods={shopping.goods}
              services={shopping.services}
              averages={AVERAGES[annualIncome]}
            />
          </div>
        </div>
      </ TabsContext>
    </div>
  )
}
