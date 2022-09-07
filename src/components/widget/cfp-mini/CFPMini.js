import GaugeChart from 'react-gauge-chart'
import {useEffect, useState} from "react";
import {Box, Flex, Heading} from "monday-ui-react-core";
import EarthIllustration from '../../../images/earth_illustration.png';
import {useContext} from "react";
import {UserContext} from "../../../context/userContext";
import {compareCFP, findById} from "../../../services/userDataService";
import './CFPMini.css'

export default function CFPMini() {
    const [percentage, setPercentage] = useState("-")
    const {id} = useContext(UserContext);
    const [hasCFP, setHasCFP] = useState(false);
    const [cfp, setCFP] = useState(0);

    useEffect(() => {
        findById(id).then((res) => {
            if (res == null) {
                console.log("Something went wrong")
            } else if (!res.data.document)
                console.log("User doesn't exist in database")
            else if (!res.data.document.cfp)
                console.log("User exists but cfp doesn't exist in database")
            else {
                setHasCFP(true)
                setCFP(res.data.document.cfp)
                compareCFP(res.data.document.cfp).then(res => {

                    if (res){
                        console.log(res)
                        if (res.data.total === 0) {
                            setPercentage(0)
                        } else if (res.data.total === 1) {
                            setPercentage(100)
                        } else {
                            setPercentage(Math.round((res.data.countGreater/--res.data.total)*100))
                        }
                    }
                })
            }
        })
    }, [id])

    return (<div>{
            hasCFP ?
                <Box>
                    <Flex direction={Flex.directions.COLUMN}>
                        <Box className="Gauge-chart" marginTop={Box.marginTops.LARGE}>
                            <GaugeChart
                                colors={["#ffca00", "#ff3d57","#00d748"]}
                                animate={true}
                                needleColor="#434343"
                                hideText={true}
                                needleBaseColor="#434343"
                                percent={percentage === "-" ? 0 : percentage/100}
                            />
                        </Box>
                        <Box margin={Box.margins.MEDIUM}/>
                        <span> <b> <span>{cfp}</span> CO<sub>2</sub></b> eq/year</span>
                        <p/>
                        <span>
                            <em>
                            Your carbon footprint is {
                            percentage > 50 ?
                                <><b>better than </b>{percentage}% </>
                                : percentage === "-"
                                    ? "calculating..."
                                    : <><b>worse than </b>{100 - percentage}% </>
                            }
                            people in the Green board.</em>
                        </span>
                    </Flex>
                </Box> :
                <Box>
                    <Flex align={Flex.align.CENTER} direction={Flex.directions.COLUMN}>
                        <img src={EarthIllustration} height={150} alt="climatio" />
                        <Heading type={Heading.types.h3} size="small" value="It is the total greenhouse gas (GHG) emissions caused by an individual "/>
                        <span className="center"> Go fullscreen to find out your carbon footprint!</span>
                    </Flex>
                </Box>}
        </div>
    )
}
