import React, {useState, useEffect} from "react";
import "./BoardList.css";
import mondaySdk from "monday-sdk-js";
import {Box} from "monday-ui-react-core";
import Board from "../board/Board";
import {Classifier} from "ml-classify-text";

const monday = mondaySdk();

export default function BoardList(props) {

    const [state, setState] = useState({
        settings: {},
        context: {},
        me: {},
        boards: []
    })

    const [classifier, setClassifier] = useState();

    useEffect(() => {
        monday.setToken('eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjE3NjMzMzUyMiwidWlkIjozMzM4NjAzOCwiaWFkIjoiMjAyMi0wOC0xOFQyMjozMzowOS4wMDBaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6MTMxNDQ3NTYsInJnbiI6InVzZTEifQ.gai4a2YB1yJhoqJ-mGIX2pBNF91iArRerKqbB6n3u0s');
        monday.listen("settings", (res) => {
            setState(prevState => ({...prevState, settings: res.data}))
        });
        monday.listen("context", (res) => {
            setState(prevState => ({...prevState, context: res.data}))
            fetchBoards(res.data)
        });
        const classifier = new Classifier()
        classifier.model = require('../../model-new.json');
        setClassifier(classifier)

    }, [])



    const fetchBoards = (context) => {

        monday.api(
            `query {
                  
                  boards (ids: [${context.boardIds}]) {
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
            setState(prevState => ({ ...prevState, boards: res.data.boards}))
        })
            .catch((err) => {
                fetchBoards(context);
            });
    };

    return (
        <div className="monday-app">
            {state.boards.map((board) => {
                return (
                    <Box  key={board.id} style={{minWidth: '50%'}} padding={Box.paddings.LARGE} border={Box.borders.DEFAULT} rounded={Box.roundeds.MEDIUM} margin={Box.margins.LARGE}>
                        {<Board classifier={classifier} board={board} settings={state.settings}/>}
                    </Box>
                );
            })}
        </div>
    );
}
