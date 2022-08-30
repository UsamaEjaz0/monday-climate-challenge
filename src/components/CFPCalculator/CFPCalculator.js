import {useEffect, useState} from "react"
import {updateRecord} from "../../services/userDataService";
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
import mondaySdk from "monday-sdk-js";

import {
    TabsContext,
    TabList,
    TabPanel,
    TabPanels,
    Tab,
    Flex,
    Button,
    Heading,
} from "monday-ui-react-core"

import "monday-ui-style/dist/index.min.css";
import './CFPCalculator.css'
import {useContext} from "react";
import {UserContext} from "../../context/userContext";

const monday = mondaySdk();


export default function CFPCalculator() {
    const {id, boardId, name} = useContext(UserContext);
    const [annualIncome, setAnnualIncome] = useState(0)
    const [activeTab, setActiveTab] = useState(0)
    const [loading, setLoading] = useState(false);

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

    const [food, setFood] = useState(2.8)

    const [shopping, setShopping] = useState({
        goods: [755, 4.5],
        services: [1567, 4.57]
    })

    useEffect(() => {
        monday.setToken('eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjE3Nzg1NTE2MywidWlkIjozMzM4NzkzMywiaWFkIjoiMjAyMi0wOC0yOFQyMzo0NDo0MC42OTlaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6MTMxNDQ3NTYsInJnbiI6InVzZTEifQ.u7GMxmr8IbGIG-XIb4McmLKfSZ6cPTLQGL6uHtxnbCc');
    }, [])

    useEffect(() => {

        setShopping({goods: GOODS[annualIncome], services: SERVICES[annualIncome]})
        setTravel({
            vehicleType: 'Diesel',
            personalVehicle: [TRAVEL[annualIncome][0], TRAVEL[annualIncome][0] * 0.0003527],
            publicTransit: [TRAVEL[annualIncome][1], TRAVEL[annualIncome][1] * 0.00014],
            airTravel: [TRAVEL[annualIncome][2], TRAVEL[annualIncome][2] * 0.00028]
        })
        setHome({
            electricity: [HOME[annualIncome][0], HOME[annualIncome][0] * ElECTRICITY_MULTIPLIER],
            naturalGas: [HOME[annualIncome][1], HOME[annualIncome][1] * NATURAL_GAS_MULTIPLIER],
            heatingOil: [HOME[annualIncome][2], HOME[annualIncome][2] * HEATING_OIL_MULTIPLIER],
            livingSpace: [HOME[annualIncome][3], HOME[annualIncome][3] * LIVING_AREA_MULTIPLIER],
        })
    }, [annualIncome])

    function calculateTotalCFP() {
        return ((travel.personalVehicle[1] + travel.airTravel[1] + travel.publicTransit[1] +
            home.electricity[1] + home.heatingOil[1] + home.naturalGas[1] + home.livingSpace[1] +
            food + shopping.goods[1] + shopping.services[1]).toPrecision(3))
    }

    function compareWithAverage() {
        const averageCFP = TOTAL_AVERAGES[annualIncome]
        const currentCFP = calculateTotalCFP()
        if (averageCFP < currentCFP) {
            return (
                <>
                    <b>{(currentCFP - averageCFP).toPrecision(2)} %</b>
                    <span style={{fontSize: "14px"}}>Worse than Average</span>
                </>
            )
        }

        return (
            <>
                <b>{(averageCFP - currentCFP).toPrecision(2)} %</b>
                <span style={{fontSize: "14px"}}>Better than Average</span>
            </>
        )
    }

    function updateBoard(cfp) {
        console.log(boardId)
        if (boardId !== -1) {
            monday.api(
                `query {
              boards(ids: ${boardId}) {
                items{
                id
                  column_values(ids: person){
                    value
                  }
                 }
                }  
           }
    `
            ).then((res) => {
                const users = res.data.boards[0].items.filter((item) => {
                    const data = JSON.parse(item.column_values[0].value)
                    if (data.personsAndTeams[0].id.toString() === id) {
                        return id
                    }
                })

                if (users.length === 0) {
                    createUser(cfp);
                } else {
                    const user = users[0];
                    updateUser(user.id, cfp)
                }
            })

        }
    }

    function createUser(cfp) {
        const query = `mutation {
                create_item (board_id: ${boardId}, group_id: "ranking", item_name: "${name}", 
                        column_values: "{ \\"person\\" : {\\"personsAndTeams\\":[{\\"id\\":${id},\\"kind\\":\\"person\\"}]}, \\"eco_points\\" : \\"0\\", \\"carbon_emissions\\" : \\"${cfp}\\" }" ) {
                            id
                }
        }`

        monday.api(query).then((res) => {
            console.log(res)
            if ('error_code' in res) {
                if (res.error_code === 'ComplexityException') {
                    console.log("Here")
                    throw 'Complexity Exception'
                }
            }
        }).catch((err) => {
            setTimeout(() => {
                this.createItem(cfp)
            }, 10000);
        });
    }

    function updateUser(itemId, cfp) {
        const query = `
                    mutation {
                      change_multiple_column_values(item_id:${parseInt(itemId)}, board_id:${boardId}, column_values: "{\\"carbon_emissions\\" : \\"${cfp}\\"}") {
                        id
                      }
                    }`
        monday.api(query)
            .then((res) => {
                console.log(res)
                if ('error_code' in res) {
                    if (res.error_code === 'ComplexityException') {
                        console.log("Here")
                        throw 'Complexity Exception'
                    }
                }

            }).catch((res) => {
            console.log("Retrying");
            setTimeout(() => {
                this.updateItem(itemId, cfp)
            }, 5000);
        });
    }

    function saveToDatabase() {
        setLoading(true)
        const cfp = calculateTotalCFP();
        const user = {
            id,
            cfp: cfp
        }
        updateRecord(user).then(() => {
            setLoading(false)
        })
        updateBoard(cfp);
    }

    return (
        <div className="CFPCalculator">
            <TabsContext activeTabId={activeTab}>
                <TabList activeTabId={activeTab} className="Tag-list">
                    <Tab>Get Started</Tab>
                    <Tab>Travel</Tab>
                    <Tab>Home</Tab>
                    <Tab>Food</Tab>
                    <Tab>Shopping</Tab>
                </TabList>
                <TabPanels activeTabId={activeTab} className="Body-left">
                    <TabPanel><GetStarted setActiveTab={setActiveTab} setAnnualIncome={setAnnualIncome}/></TabPanel>
                    <TabPanel>
                        <Travel
                            setActiveTab={setActiveTab}
                            travel={travel}
                            setTravel={setTravel}
                        />
                    </TabPanel>
                    <TabPanel><Home setActiveTab={setActiveTab} home={home} setHome={setHome}/></TabPanel>
                    <TabPanel><Food setActiveTab={setActiveTab} setFood={setFood}/></TabPanel>
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
                    <Flex justify={Flex.justify.SPACE_BETWEEN}>
                        <Heading type={Heading.types.h2} value="Your carbon footprint"/>
                        <Button loading={loading} onClick={saveToDatabase}>
                            Save
                        </Button>
                    </Flex>
                    <Flex justify={Flex.justify.CENTER} gap={Flex.gaps.MEDIUM}>
                        <Flex
                            direction={Flex.directions.COLUMN}
                        >
                            <b>{calculateTotalCFP()}</b>
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
                            travel={travel.personalVehicle[1] + travel.airTravel[1] + travel.publicTransit[1]}
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

