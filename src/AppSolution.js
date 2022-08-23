import React, { useState, useEffect } from "react";
import "./App.css";
import mondaySdk from "monday-sdk-js";
const monday = mondaySdk();


function AppSolution() {
  const [mondayData, setMondayData] = useState({
    settings: {},
    context: {},
    name: "",
    boards: []
  }) 

  useEffect(() => {
    monday.setToken('eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjE3NjMzMzUyMiwidWlkIjozMzM4NjAzOCwiaWFkIjoiMjAyMi0wOC0xOFQyMjozMzowOS4wMDBaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6MTMxNDQ3NTYsInJnbiI6InVzZTEifQ.gai4a2YB1yJhoqJ-mGIX2pBNF91iArRerKqbB6n3u0s');

    // TODO: set up event listeners
    monday.listen("settings", (res) => {
      setMondayData(prevMondayData => ({...prevMondayData, settings: res.data}))
    });

    monday.listen("context", (res) => {
      const context = res.data;
      const boardIds = context.boardIds || [context.boardId];
      monday.api(`query { boards(ids:[${boardIds}]) { id, items { id, name, column_values { id, text } } }}`)
      .then((res) => {
        setMondayData(prevMondayData => ({...prevMondayData, context, boards: res.data.boards}))
      });
    });

    monday.api(`query { me { name } }`).then((res) => {
      setMondayData(prevMondayData => ({...prevMondayData, name: res.data.me.name}))
    });
  }, [])

  return (
    <div
      className="App"
      style={{ background: mondayData.settings.background }}
    >
      Hello, {mondayData.name}!
    </div>
  );
}
export default AppSolution;
