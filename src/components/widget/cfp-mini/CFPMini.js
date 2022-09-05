import './CFPMini.css'
import {useEffect, useState} from "react";
import {Box, Flex, Heading} from "monday-ui-react-core";
import Earth from '../../../images/earth.png';
import {useContext} from "react";
import {UserContext} from "../../../context/userContext";
import {findById} from "../../../services/userDataService";
import happy from "../../../images/happy.png"
import sad from "../../../images/sad.png"

export default function CFPMini() {
    const {percentage} = useContext(UserContext)
    const {id} = useContext(UserContext);
    const [hasCFP, setHasCFP] = useState(false);
    const [cfp, setCFP] = useState(0);

    useEffect(() => {
        findById(id).then((res) => {
            if (res == null){
                console.log("Something went wrong")
            } else if (!res.data.document)
                console.log("User doesn't exist in database")
            else if (!res.data.document.cfp)
                console.log("User exists but cfp doesn't exist in database")
            else {
                setHasCFP(true)
                setCFP(res.data.document.cfp)
            }
        })
    }, [id])

    return (<div>{
            hasCFP ?
                <Box >
                    <Flex align={Flex.align.CENTER} direction={Flex.directions.COLUMN}>
                        <img src={percentage <= 50 ? sad : happy} alt="emoji" width={100}/>
                        <Box margin={Box.margins.MEDIUM}/>
                        <span><span style={{fontSize: "80px", color: "green"}}>{cfp}</span> CO<sub>2</sub> eq/year</span>
                        <Heading type={Heading.types.h3} size="small" value={`Your Carbon footprint is ${ percentage > 50 ? `better than ${percentage}%` : percentage === "-" ? "calculating...": `worse than ${100-percentage}%`} ${percentage === "-" ? "": "people in the Green board"}`}/>
                        <span className="center"> Go fullscreen to recalcluate your carbon footprint!</span>
                    </Flex>
                </Box> :
                <Box >
                    <Flex align={Flex.align.CENTER} direction={Flex.directions.COLUMN}>
                        <img src={Earth} height={70}/>
                        <Box margin={Box.margins.MEDIUM}/>
                        <Heading type={Heading.types.h3} size="small" value="It is the total greenhouse gas (GHG) emissions caused by an individual"/>
                        <span className="center"> Go fullscreen to find out your carbon footprint!</span>
                    </Flex>
                </Box>}
        </div>
    )


}
