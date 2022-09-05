import './CFPMini.css'
import {useEffect, useState} from "react";
import {Box, Flex, Heading} from "monday-ui-react-core";
import Earth from '../../../images/earth.png';
import {useContext} from "react";
import {UserContext} from "../../../context/userContext";
import {compareCFP, findById} from "../../../services/userDataService";
import happy from "../../../images/happy.png"
import sad from "../../../images/sad.png"

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
                    <Flex align={Flex.align.CENTER} direction={Flex.directions.COLUMN}>
                        <img src={percentage <= 50 ? sad : happy} alt="emoji" width={140}/>
                        <Box margin={Box.margins.MEDIUM}/>
                        <span> <b> <span>{cfp}</span> CO<sub>2</sub></b> eq/year</span>
                        <p/>
                        <span> {`Your carbon footprint is ${percentage > 50 ? `better than ${percentage}%` : percentage === "-" ? "calculating..." : `worse than ${100 - percentage}%`} ${percentage === "-" ? "" : "people in the green board"}`}</span>
                        <span className="center"> Go fullscreen to recalculate your carbon footprint!</span>
                    </Flex>
                </Box> :
                <Box>
                    <Flex align={Flex.align.CENTER} direction={Flex.directions.COLUMN}>
                        <img src={Earth} height={70}/>
                        <Box margin={Box.margins.MEDIUM}/>
                        <Heading type={Heading.types.h3} size="small"
                                 value="It is the total greenhouse gas (GHG) emissions caused by an individual"/>
                        <span className="center"> Go fullscreen to find out your carbon footprint!</span>
                    </Flex>
                </Box>}
        </div>
    )


}
