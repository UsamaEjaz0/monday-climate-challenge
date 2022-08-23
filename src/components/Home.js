import {
  Box,
  TextField,
  Slider,
  Button,
} from "monday-ui-react-core"


export default function Home() {
  return(
    <>
      <h3>HOW MUCH DO YOU USE IN YOUR HOME?</h3>
      <Box padding={Box.paddings.MEDIUM}>
        <TextField 
          title="Electricity"
          placeholder="60 ($ per year)" 
          size={TextField.sizes.MEDIUM}
        />
      </Box>
      <Box padding={Box.paddings.MEDIUM} >
        <label>Percent purchased from a clean energy program:</label>
        <Box margin={Box.margins.SMALL}></Box>
        <Slider 
          size={Slider.sizes.SMALL} 
          min={0} 
          max={100}
          step={20}
          ranged={true}
        />
      </Box>
      <Box padding={Box.paddings.MEDIUM}>
        <TextField 
          title="Natural Gas"
          placeholder="20 ($ per year)" 
          size={TextField.sizes.MEDIUM}
        />
      </Box>
      <Box padding={Box.paddings.MEDIUM}>
        <TextField 
          title="Heating Oil & Other Fuels"
          placeholder="10 ($ per year)" 
          size={TextField.sizes.MEDIUM}
        />
      </Box>
      <Box padding={Box.paddings.MEDIUM}>
        <TextField 
          title="Living Space Area"
          placeholder="1850 (ft2)" 
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