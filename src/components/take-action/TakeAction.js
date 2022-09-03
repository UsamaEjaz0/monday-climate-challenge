import {memo, useState} from "react"
import {Globe} from "monday-ui-react-core/dist/allIcons";
import {UserContext} from "../../context/userContext";
import {
    Box,
    Flex,
    Button,
    Loader,
    Heading,
} from "monday-ui-react-core"
import {useEffect, useContext} from "react"
import {
    createItemService,
    findUserItemInBoardService,
    updateUserPointsService
} from "../../services/mondayService";
import {findById, updateRecord} from "../../services/userDataService";
import getEmissionStatus from "../../utils/statusMapper";
import './TakeAction.css'
import Earth from '../../images/earth.png';
import Home from '../../images/home.png';
import Green from '../../images/green.png';
import Car from '../../images/car.png';
import Electricity from '../../images/electricity.png';


const STORAGE_KEY = "is-claimed"

function TakeAction() {
    const {id, boardId, name} = useContext(UserContext)
    const [points, setPoints] = useState(0)
    const [loading, setLoading] = useState(true);
    const [dailyRewards, setDailyRewards] = useState({
        isClaimed: localStorage.getItem(STORAGE_KEY) ? JSON.parse(localStorage.getItem(STORAGE_KEY)).isClaimed : [false, false, false, false, false],
        claimDay: localStorage.getItem(STORAGE_KEY) ? JSON.parse(localStorage.getItem(STORAGE_KEY)).claimDay : new Date().getDay()
    })


    useEffect(() => {
        if (localStorage.getItem(STORAGE_KEY)) {
            const currentDay = new Date().getDay()
            if (JSON.parse(localStorage.getItem(STORAGE_KEY)).claimDay !== currentDay) {
                const newDailyRewards = {
                    isClaimed: [false, false, false, false, false],
                    claimDay: currentDay
                }
                setDailyRewards(newDailyRewards)
                localStorage.setItem(STORAGE_KEY, JSON.stringify(newDailyRewards))
            }
        }
        console.log(id);
        findById(id).then(data => {
            if (!data.data.document)
                setPoints(0)
            else if (!data.data.document.points)
                setPoints(0)
            else
                setPoints(data.data.document.points)

            setLoading(false)
        })
    }, [id])

    function updatePoints(saves, index) {
        setLoading(true)
        const updates = {
            id: id.toString(),
            points: points + Math.round(saves)
        }
        updateRecord(updates).then(() => {
            updateBoard(boardId, points + Math.round(saves));
            setPoints(prevPoints => prevPoints + Math.round(saves));
            setLoading(false)
        })

        setDailyRewards(prevDailyRewards => {
            const isClaimed = [...prevDailyRewards.isClaimed]
            isClaimed[index] = true
            localStorage.setItem(STORAGE_KEY, JSON.stringify({isClaimed, claimDay: prevDailyRewards.claimDay}))
            return {...prevDailyRewards, isClaimed}
        })
    }


    const actions = [
        {
            icon: Earth,
            id: 1,
            heading: "Social",
            task: "Take public transportation",
            saves: 1,
        },
        {

            icon: Green,
            id: 2,
            heading: "Dendrophile",
            task: "Print double sided",
            saves: 0.82,
        },
        {
            icon: Electricity,
            id: 3,
            heading: "Saviour",
            task: "Turn off extra lights",
            saves: 0.55,
        },
        {
            icon: Car,
            id: 4,
            heading: "Generous",
            task: "Carpool to work",
            saves: 2.5,
        },

        {
            icon: Home,
            id: 4,
            heading: "Teleworker",
            task: "Telecommute to work",
            saves: 2.74,
        },
    ]

    const displayActions = actions.map((action, index) => {
        return (
            <Box
                border={Box.borders.DEFAULT}
                paddingX={Box.paddingXs.LARGE}
                paddingTop={Box.paddingTops.SMALL}
                paddingBottom={Box.paddingBottoms.LARGE}
                rounded={Box.roundeds.SMALL}
                className="Action-box"
                key={action.id}
                borderColor={Box.borderColors.LAYOUT_BORDER_COLOR}>
                <Flex style={{height: "100%"}} direction={Flex.directions.COLUMN}
                      justify={Flex.justify.SPACE_BETWEEN}
                      align={Flex.align.START}>

                    <Flex gap={Flex.gaps.SMALL}>
                        <img src={action.icon} height={35}/>
                        <p className="Action-text">{action.heading}</p>
                    </Flex>
                    <Box className="Action-text">{action.task} & save <b>{action.saves} kg CO<sub>2</sub></b></Box>
                    <Button
                        className="Action-button"
                        kind={Button.kinds.SECONDARY}
                        disabled={dailyRewards.isClaimed[index]}
                        onClick={() => updatePoints(action.saves, index)}
                    >
                        I did this today
                    </Button>


                </Flex>
            </Box>
        )
    })

    async function updateBoard(boardId, points) {

        if (boardId !== -1) {
            const user = {id, name}
            const userItemId = await findUserItemInBoardService(boardId, user.id);
            if (userItemId == null) {
                console.log("Something went wrong");
            } else if (userItemId === 'ComplexityException') {
                setTimeout(() => {
                    updateBoard(boardId, user, points)
                }, 10000);
            } else if (userItemId === -1) {
                let baseUser = {cfp: 0, ...user,}
                const res = await findById(user.id);
                if (res == null) {
                } else {
                    const userInDb = res.data.document;
                    if (userInDb != null) baseUser = {...userInDb, points: points,}
                }
                baseUser.status = getEmissionStatus(parseFloat(baseUser.cfp));
                return await createUser(baseUser, "ranking", boardId);
            } else {
                return await updateUser(boardId, userItemId, points)
            }
            return false;
        }
    }

    async function createUser(user, groupId, boardId) {

        const res = await createItemService(user, groupId, boardId)
        if (res === null) console.log("Something went wrong")
        else if (res === 'ComplexityException') setTimeout(() => {
            createUser(user, groupId, boardId)
        }, 10000);
        else return true

    }

    async function updateUser(boardId, itemId, points) {

        const res = await updateUserPointsService(boardId, itemId, points);
        if (res === null) console.log("Something went wrong")
        else if (res === 'ComplexityException') setTimeout(() => {
            updateUserPointsService(boardId, itemId, points)
        }, 10000);
        else return true

    }

    console.log("TakeAction rendered..")
    return (
        <Box padding={Box.paddings.MEDIUM} margin={Box.margins.MEDIUM}>
            <Heading type={Heading.types.h1} value="Take action" brandFont/>
            <Box marginY={Box.marginYs.MEDIUM}>
                <Flex align={Flex.align.END}>
                    <Globe/>
                    &nbsp; Eco Points &nbsp;
                    {loading ? <Loader size={15}/> : points}
                </Flex>
            </Box>
            <Flex gap={Flex.gaps.MEDIUM} wrap={true}>
                {displayActions}
            </Flex>
        </Box>
    )
}

export default memo(TakeAction)
