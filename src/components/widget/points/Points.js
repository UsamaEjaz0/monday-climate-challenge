import './Points.css'
import {useState} from "react";
import {Box, Flex, Heading} from "monday-ui-react-core";
import Electricity from "../../../images/electricity.png";
import {useContext, useEffect} from "react";
import {UserContext} from "../../../context/userContext";
import {findById} from "../../../services/userDataService";


export default function Points() {
    const {id} = useContext(UserContext);
    const [hasPoints, setHasPoints] = useState(false);
    const [points, setPoints] = useState(0);

    useEffect(() => {
        findById(id).then((res) => {
            if (res == null){
                console.log("Something went wrong")
            }
            if (!res.data.document)
                console.log("User doesn't exist in database")
            else if (!res.data.document.points)
                console.log("User exists but points doesn't exist in database")
            else{
                setHasPoints(true)
                setPoints(res.data.document.points)
            }
        }
        )
    }, [id])

    return (<div>{
            hasPoints ?
                <span>Points: {points}</span> :
                <Box >
                    <Flex align={Flex.align.CENTER} direction={Flex.directions.COLUMN}>
                        <img src={Electricity} height={70}/>
                        <Box margin={Box.margins.MEDIUM}/>
                        <Heading type={Heading.types.h3} size="small" value="Points are gained by performing daily activities"/>
                        <span className="center"> Go fullscreen to find out your points!</span>
                    </Flex>
                </Box>}
        </div>
    )


}
