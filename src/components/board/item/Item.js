import React, {useEffect, useState} from "react";
import {Button, Clickable} from "monday-ui-react-core";
import {findInference} from "../../../services/inferenceService";
import './Item.css'

function Item(props) {

    const [showSentiment, setShowSentiment] = useState(false);
    const [sentiment, setSentiment] = useState("Loading")
    const [label, setLabel] = useState("")

    useEffect(()=>{
    }, [])

    const predict = (text) => {
        setShowSentiment(true)
        const input = {
            "inputs": text
        }
        findInference(input).then((pred)=>{

            if (pred == null){
                setSentiment("Couldn't calculate");
            }
            else {
                if ('error' in pred){
                    setSentiment("Initializing");
                    setTimeout(()=> {
                        predict(text)
                    }, 21000)
                }
                else{
                    const label = pred[0][0].label;
                    if (label === 'LABEL_0'){
                        setSentiment("Negative");
                        setLabel("red")
                    }
                    else if (label === 'LABEL_1'){
                        setSentiment("Neutral");
                        setLabel("yellow")
                    }
                    else if (label === 'LABEL_2'){
                        setSentiment("Positive");
                        setLabel("green")
                    }
                    else{
                        console.log(pred)
                    }
                }
            }
        });


    }

    return (
        <Clickable className="item" >
            <div className="task" style={{borderLeft: `thick solid ${props.color}`}} >{props.item.name}</div>
            {!showSentiment ?

                <Button className="sentiment" onClick={() => {predict(props.item.name)}}>Calculate</Button>:
                <div className={`sentiment ${label}`}>{sentiment}</div>
            }
        </Clickable>
    );
}

export default Item
