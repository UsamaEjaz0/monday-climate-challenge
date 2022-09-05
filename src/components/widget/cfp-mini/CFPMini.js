import './CFPMini.css'
import {useEffect, useState} from "react";
import {Box, Flex, Heading} from "monday-ui-react-core";
import Earth from '../../../images/earth.png';
import {useContext} from "react";
import {UserContext} from "../../../context/userContext";
import {findById} from "../../../services/userDataService";

export default function CFPMini() {

    const {id} = useContext(UserContext);
    const [hasCFP, setHasCFP] = useState(false);
    const [cfp, setCFP] = useState(0);

    useEffect(() => {
        findById(id).then((res) => {
            if (res == null){
                console.log("Something went wrong")
            }
            if (!res.data.document)
                console.log("User doesn't exist in database")
            else if (!res.data.document.cfp)
                console.log("User exists but cfp doesn't exist in database")
            else{
                setHasCFP(true)
                setCFP(res.data.document.cfp)
            }

        })
    }, [id])

    return (<div>{
            hasCFP ?
                <span>CFP: {cfp}</span> :
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
