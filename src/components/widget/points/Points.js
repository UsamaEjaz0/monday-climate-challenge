import './Points.css'
import {useState} from "react";
import {Box, Flex, Heading} from "monday-ui-react-core";
import Electricity from "../../../images/electricity.png";
import DoughnutChart from "./DoughnutChart"
import {useContext, useEffect} from "react";
import {UserContext} from "../../../context/userContext";
import {findById, average} from "../../../services/userDataService";


export default function Points() {
    const {id} = useContext(UserContext);
    const [hasPoints, setHasPoints] = useState(false);
    const [points, setPoints] = useState(0);
    const [averagePoints, setAveragePoints] = useState(0);

    useEffect(() => {
        findById(id).then((res) => {
            if (res == null){
                console.log("Something went wrong")
            } else if (!res.data.document)
                console.log("User doesn't exist in database")
            else if (!res.data.document.points)
                console.log("User exists but points doesn't exist in database")
            else{
                setHasPoints(true)
                setPoints(res.data.document.points)
            }
        })

        average("points").then(res => {
            if (res === null) {
                console.log("Something went wrong")
            } else if (res.data.documents.length === 0) {
                console.log("User doesn't exist in database")
            } else {
                setAveragePoints(res.data.documents[0].average);
            }
        })
    }, [id])

    return (<div>{
            hasPoints ?
                <Box >
                    <Flex align={Flex.align.CENTER} direction={Flex.directions.COLUMN} justify={Flex.justify.START}>
                        <Flex>
                            
                            <Box className="Doughnut-chart">
                                <DoughnutChart
                                    points={points} 
                                    averagePoints={averagePoints}
                                />
                            </Box>
                        </Flex>
                       
                        <Box margin={Box.margins.MEDIUM}/>
                        <Heading type={Heading.types.h2} size="small" value="Your Points Compared With Others"/>
                    </Flex>
                </Box> :
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
