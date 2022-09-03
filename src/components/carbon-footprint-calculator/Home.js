import {
  Box,
  TextField,
  Button,
  Heading,
  Flex
} from "monday-ui-react-core"
import { memo } from "react"

import { ElECTRICITY_MULTIPLIER, HEATING_OIL_MULTIPLIER, LIVING_AREA_MULTIPLIER, NATURAL_GAS_MULTIPLIER } from "./data"

function Home({home, setHome, setActiveTab}) {

  // console.log("Home rendered..")

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
        <Button  onClick={() => {setActiveTab(1)}}>Previous</Button>
        <Button style={{float: "right"}}  onClick={() => {setActiveTab(3)}}>Next</Button>
      </Box>
    </>
  )
}

export default memo(Home)