import React from "react";
import "./App.css";
import "monday-ui-react-core/dist/main.css"
import CFPCalculator from "./components/CFPCalculator"

class App extends React.Component {
  constructor(props) {
    super(props);

    // Default state
    this.state = {
      settings: {},
      name: "",
    };
  }

  componentDidMount() {
    // TODO: set up event listeners
  }

  render() {
    return <div className="App">
      <CFPCalculator />
    </div>;
  }
}

export default App;
