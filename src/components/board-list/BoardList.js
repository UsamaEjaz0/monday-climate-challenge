import React, {useEffect, useState} from "react";
import "./BoardList.css";
import mondaySdk from "monday-sdk-js";
import {Box, Flex, Heading, Loader} from "monday-ui-react-core";
import Board from "../board/Board";
import {Classifier} from "ml-classify-text";

const monday = mondaySdk();

export default function BoardList(props) {

    const [state, setState] = useState({
        settings: {},
        context: {},
        me: {},
        boards: [],

    })

    const [loading, setLoading] = useState(true);

    const [classifier, setClassifier] = useState();

    useEffect(() => {
        monday.setToken('eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjE3NjMzMzUyMiwidWlkIjozMzM4NjAzOCwiaWFkIjoiMjAyMi0wOC0xOFQyMjozMzowOS4wMDBaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6MTMxNDQ3NTYsInJnbiI6InVzZTEifQ.gai4a2YB1yJhoqJ-mGIX2pBNF91iArRerKqbB6n3u0s');
        monday.listen("context", (res) => {
            setState(prevState => ({...prevState, context: res.data}))
            fetchBoards(res.data)
        });
        fetchBoards()
        const classifier = new Classifier()
        classifier.model = require('../../model-new.json');
        setClassifier(classifier)

    }, [])



    const fetchBoards = (context) => {

        monday.api(
            `query {
                  
                  boards  {
                    id
                    name
                    
                    columns {
                      title
                      id
                      type
                    }
                    
                    groups {
                      title
                      color
                      id
                    }
                    
                    items {
                      id
                      name
                      group {
                        id
                      }
                     
                    }
                  }
                } 
    `
        ).then((res) => {
            console.log(res)
            if ('error_code' in res) {
                if (res.error_code === 'ComplexityException') {
                    console.log("Here")
                    throw 'Complexity Exception'
                }
            }
            setState(prevState => ({ ...prevState, boards: res.data.boards}))
            setLoading(false);
        })
            .catch((err) => {
                setTimeout(() => {
                    fetchBoards()
                }, 20000);
            });
    };

    const renderBoards = () => {
        return state.boards.map((board) => {
             return (
                 <Box key={board.id} style={{minWidth: '50%'}} padding={Box.paddings.LARGE} border={Box.borders.DEFAULT}
                      rounded={Box.roundeds.MEDIUM} marginBottom={Box.marginBottoms.MEDIUM}>
                     {<Board classifier={classifier} board={board} settings={state.settings}/>}
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
