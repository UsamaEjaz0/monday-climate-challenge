import React from "react";
import "./App.css";
import mondaySdk from "monday-sdk-js";
import {List, ListItem} from "monday-ui-react-core";
const monday = mondaySdk();

class AppSolution extends React.Component {
  constructor(props) {
    super(props);

    // Default state
    this.state = {
      settings: {

      },
      context: {},
      name: "",
    };
  }

  componentDidMount() {
    // TODO: set up event listeners
    monday.setToken('eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjE3NjMzMzUyMiwidWlkIjozMzM4NjAzOCwiaWFkIjoiMjAyMi0wOC0xOFQyMjozMzowOS4wMDBaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6MTMxNDQ3NTYsInJnbiI6InVzZTEifQ.gai4a2YB1yJhoqJ-mGIX2pBNF91iArRerKqbB6n3u0s');

    monday.listen("settings", (res) => {
      console.log(this.state.settings);
      this.setState({ settings: res.data });
    });

    monday.api(`query { me { name } }`).then((res) => {
      this.setState({ name: res.data.me.name });
    });


    // let query = "mutation { create_notification (user_id: 33386038, target_id: 3111627922, text: \"Oye kya update hai\", target_type: Project) { text } }";
    //
    // monday.api(query).then((res) => {
    //   console.log(res)
    // });

  }

  render() {
    return (
      <div>
      <List>
        <ListItem disabled={true} onClick={function noRefCheck(){}}>
          Board Power up
        </ListItem>
        <ListItem oonClick={function noRefCheck(){}}>
          Team Power up
        </ListItem>
        <ListItem onClick={function noRefCheck(){}}>
          Essentials
        </ListItem>
      </List>

      </div>

    );
  }
}

export default AppSolution;
