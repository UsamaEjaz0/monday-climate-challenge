import './PointsMini.css'
import {useState} from "react";
import {Box, Flex, Heading} from "monday-ui-react-core";
import EarthIllustration from "../../../images/green.png";
import DoughnutChart from "./DoughnutChart"
import {useContext, useEffect} from "react";
import {UserContext} from "../../../context/userContext";
import {findById, average} from "../../../services/userDataService";


export default function PointsMini() {
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
                <Box>
                    <Flex direction={Flex.directions.COLUMN}>
                        <Box className="Doughnut-chart" marginTop={Box.marginTops.SMALL}>
                            <DoughnutChart
                                points={points}
                                averagePoints={averagePoints}
                            />
                        </Box>
                        <Box margin={Box.margins.MEDIUM}/>
                        <span>Eco Points:  <b> <span>{points}</span> </b></span>
                        <Box margin={Box.margins.MEDIUM}/>
                        <em>Your Eco Points compared to the other members of Green board.</em>
                    </Flex>
                </Box> :
                <Box>
                    <Flex align={Flex.align.CENTER} direction={Flex.directions.COLUMN}>
                        <Box margin={Box.margins.XS}/>
                        <img src={EarthIllustration} height={110} alt="climatio"/>
                        <Box margin={Box.margins.MEDIUM}/>
                        <Heading type={Heading.types.h3} size="small" value="Points are gained by performing daily activities"/>
                        <span className="center"> Go fullscreen to find out your points!</span>
                    </Flex>
                </Box>}
        </div>
    )
}
