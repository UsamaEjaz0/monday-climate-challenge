import {useMemo} from "react";

import { 
  Button, 
  Box,
  Dropdown,
  Flex,
  TextField,
} from "monday-ui-react-core";

export default function Travel() {

  const CarsDropdown = () => {
    const optionsIcons = useMemo(() => [{
      value: "email",
      label: "Diesel",
    }, {
      value: "attach",
      label: "Gasoline",
    },
    {
      value: "1",
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
            placeholder="600 (miles/year)" 
            size={TextField.sizes.MEDIUM}
            />
          </Flex> 
          <Box marginBottom={Box.marginBottoms.LARGE}></Box>
          <TextField 
            title="Public Transit"
            placeholder="33 (miles/year)" 
            size={TextField.sizes.MEDIUM}
            />
          <Box marginBottom={Box.marginBottoms.LARGE}></Box>
          <TextField 
          title="Air Field"
          placeholder="300 (miles/year)" 
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