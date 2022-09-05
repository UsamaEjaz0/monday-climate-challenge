import React, {useEffect, useState} from "react";
import "./BoardList.css";
import {Box, Flex, Heading, Loader} from "monday-ui-react-core";
import Board from "../board/Board";
import {findBoardListService} from "../../services/mondayService";


export default function BoardList(props) {


    const [boards, setBoards] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        findBoardList()
    }, [])

    const findBoardList = () => {
        findBoardListService().then((res)=>{
            if (res == null){
                console.log("Something went wrong")
            } else if (res === 'ComplexityException'){
                setTimeout(()=>findBoardList, 10000)
            } else{
                console.log(res)
                setBoards(res);
                setLoading(false);
            }
        });
    }

    const renderBoards = () => {
        return boards.map((board, index) => {
             return (
                 <Box key={index} style={{minWidth: '50%'}} padding={Box.paddings.LARGE} border={Box.borders.DEFAULT}
                      rounded={Box.roundeds.MEDIUM} marginBottom={Box.marginBottoms.MEDIUM}>
                     {<Board boardId={board.id} boardName={board.name}  />}
                 </Box>
             );
         });
    }

    return (
        <div className="monday-app">
            <Box padding={Box.paddings.SMALL} margin={Box.margins.XL}>
                {
                    loading === true? <Flex>
                            <Heading type={Heading.types.h1} value="Loading boards..." brandFont/>
                            <Loader  size={20} />
                        </Flex> :
                        <Heading type={Heading.types.h1} value="Analyze work" brandFont/>
                }
                {renderBoards()}
            </Box>


        </div>
    );
}
