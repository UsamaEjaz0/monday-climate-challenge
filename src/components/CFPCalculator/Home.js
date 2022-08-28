import {
  Box,
  TextField,
  Slider,
  Button,
  Label,
  Heading,
  Flex
} from "monday-ui-react-core"

import { ElECTRICITY_MULTIPLIER, HEATING_OIL_MULTIPLIER, LIVING_AREA_MULTIPLIER, NATURAL_GAS_MULTIPLIER } from "./data"

export default function Home({home, setHome}) {

  return(
    <>
      <Flex justify={Flex.justify.CENTER}><Heading type={Heading.types.h2} value="How much do you use in your home?" /></Flex>
      <Box padding={Box.paddings.MEDIUM}>
        <TextField 
          title="Electricity"
          placeholder={`${home.electricity[0]} ($ per year) `}
          size={TextField.sizes.MEDIUM}
          onChange={
            (value) => setHome(prevHome => ({...prevHome, electricity: [value, value*ElECTRICITY_MULTIPLIER]}))
          }
        />
      </Box>
      <Box padding={Box.paddings.MEDIUM} >
        <label>Percent purchased from a clean energy program:
          <Label text="0%"/></label>
        <Box margin={Box.margins.SMALL}></Box>
        <Slider 
          size={Slider.sizes.SMALL} 
          min={0} 
          max={100}
          step={20}
          defaulValue={0}
        />
      </Box>
      <Box padding={Box.paddings.MEDIUM}>
        <TextField 
          title="Natural Gas"
          placeholder={`${home.naturalGas[0]} ($ per year)`} 
          size={TextField.sizes.MEDIUM}
          onChange={
            (value) => { setHome(prevHome => ({...prevHome, naturalGas: [value, value*NATURAL_GAS_MULTIPLIER]}))
          }}
        />
      </Box>
      <Box padding={Box.paddings.MEDIUM}>
        <TextField 
          title="Heating Oil & Other Fuels"
          placeholder={`${home.heatingOil[0]} ($ per year)`} 
          size={TextField.sizes.MEDIUM}
          onChange={
            (value) => { setHome(prevHome => ({...prevHome, heatingOil: [value, value*HEATING_OIL_MULTIPLIER]}))
          }}
        />
      </Box>
      <Box padding={Box.paddings.MEDIUM}>
        <TextField 
          title="Living Space Area"
          placeholder={`${home.livingSpace[0]} m2`} 
          size={TextField.sizes.MEDIUM}
          onChange={
            (value) => { setHome(prevHome => ({...prevHome, livingSpace: [value, value*LIVING_AREA_MULTIPLIER]}))
          }}
        />
      </Box>
      <Box padding={Box.paddings.MEDIUM}>
        <Button>Previous</Button>
        <Button style={{float: "right"}}>Next</Button>
      </Box>
    </>
  )
}