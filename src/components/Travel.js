import {useMemo} from "react";

import { 
  Button, 
  Box,
  Dropdown,
  Flex,
  TextField,
} from "monday-ui-react-core";

export default function Travel({ setTravel }) {
  function handleChange(event) {

    let x
    let travel = 0.63
    if (x === "Diesel") {
      travel 
    } else if (x === "Gasoline") {

    }
    setTravel(travel)
  }


  const CarsDropdown = () => {
    const optionsIcons = useMemo(() => [{
      value: "Diesel",
      label: "Diesel",
    }, {
      value: "Gasoline",
      label: "Gasoline",
    },
    {
      value: "Electric",
      label: "Electric"
    }], []);
    return (<div style={{width: "200px"}}>
      <Dropdown defaultValue={[optionsIcons[0]]} options={optionsIcons} />
    </div>)
  }

  return(
    <>
      <Box padding={Box.paddings.MEDIUM}>
        <h3>HOW DO YOU GET AROUND?</h3>
          <Box marginBottom={Box.marginBottoms.SMALL}>Your Vehicle</Box>
          <Flex>
            {CarsDropdown()}
            <TextField 
            placeholder="966 (km/year)" 
            size={TextField.sizes.MEDIUM}
            />
          </Flex> 
          <Box marginBottom={Box.marginBottoms.LARGE}></Box>
          <TextField 
            title="Public Transit"
            placeholder="53 (km/year)" 
            size={TextField.sizes.MEDIUM}
            onChange={handleChange}
            />
          <Box marginBottom={Box.marginBottoms.LARGE}></Box>
          <TextField 
          title="Air Field"
          placeholder="483 (km/year)" 
          size={TextField.sizes.MEDIUM}
          />
      </Box>
      <Box padding={Box.paddings.MEDIUM}>
        <Button>Previous</Button>
        <Button style={{float: "right"}}>Next</Button>
      </Box>
    </>
  )
}