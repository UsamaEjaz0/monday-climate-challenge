import {useState} from "react";

import { 
  Button, 
  Box,
  Dropdown,
  Flex,
  TextField,
} from "monday-ui-react-core";
import { DIESEL_MULTIPLIER, GASOLINE_MULTIPLIER } from "./data";

export default function Travel({ travel, setTravel}) {
  const [distanceCovered, setDistanceCovered] = useState(travel.personalVehicle[0])

  let averageDiesel = travel.personalVehicle[0] * DIESEL_MULTIPLIER + 0.63;
  let averageElectric = 0.63;
  let averageGasoline = travel.personalVehicle[0] * GASOLINE_MULTIPLIER + 0.63;

  function handleVehicleTypeChange(option) {
    let vehicleType = option.value
    let personalVehicle = [distanceCovered, averageElectric]
    if (vehicleType === "Diesel") {
      if (distanceCovered === travel.personalVehicle[0]) {
        personalVehicle[1] = averageDiesel;
      } else {
        personalVehicle[1] = distanceCovered * DIESEL_MULTIPLIER
      }
    } else if (vehicleType === "Gasoline") {
      if (distanceCovered === travel.personalVehicle[0]) {
        personalVehicle[1] = averageGasoline;
      } else {
        personalVehicle[1] = distanceCovered * GASOLINE_MULTIPLIER
      }
    }
    console.log(personalVehicle)
    setTravel(prevTravel => ({...prevTravel, personalVehicle, vehicleType}))
  }

  function handleChange(value) {
    let personalVehicle = [value, averageElectric]
    if (travel.vehicleType === "Diesel") {
      personalVehicle[1] += DIESEL_MULTIPLIER * value
    } else if (travel.vehicleType === "Gasoline") {
      personalVehicle[1] += GASOLINE_MULTIPLIER * value
    }

    setDistanceCovered(value)
    setTravel(prevTravel => ({...prevTravel, personalVehicle}))
  }

  const CarsDropdown = () => {
    const options = [{
      value: "Diesel",
      label: "Diesel",
    }, {
      value: "Gasoline",
      label: "Gasoline",
    },
    {
      value: "Electric",
      label: "Electric"
    }]
    return (<div style={{width: "200px"}}>
      <Dropdown 
        defaultValue={[options[0]]} 
        options={options} 
        onChange={ handleVehicleTypeChange }
      />
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
              placeholder={`${travel.personalVehicle[0]} (km/year)`} 
              size={TextField.sizes.MEDIUM}
              onChange={handleChange}
              id="distanceCovered"
            />
          </Flex> 
          <Box marginBottom={Box.marginBottoms.LARGE}></Box>
          <TextField 
            title="Public Transit"
            placeholder={`${travel.publicTransit[0]} (km/year)`}  
            size={TextField.sizes.MEDIUM}
            onChange={
              (value) => {setTravel(prevTravel => ({...prevTravel, publicTransit: [value, value*0.00014]}))}
            }
          />
          <Box marginBottom={Box.marginBottoms.LARGE}></Box>
          <TextField 
            title="Air Travel"
            placeholder={`${travel.airTravel[0]} (km/year)`}
            size={TextField.sizes.MEDIUM}
            onChange={
              (value) => {setTravel(prevTravel => ({...prevTravel, airTravel: [value , (value*0.00028)]}))}
            }
          />
      </Box>
      <Box padding={Box.paddings.MEDIUM}>
        <Button>Previous</Button>
        <Button style={{float: "right"}}>Next</Button>
      </Box>
    </>
  )
}