import { 
  Slider, 
  TextField,
  Box,
  Button,
} from "monday-ui-react-core";

export default function GetStarted() {
  return(
    <>
      <h3>START WITH A QUICK CARBON FOOTPRINT ESTIMATE</h3>
      <Box padding={Box.paddings.MEDIUM}>
        <TextField 
          title="1. Where do you live?"
          placeholder="Please enter city or zip code" 
          size={TextField.sizes.MEDIUM}
        />
      </Box>
      <Box padding={Box.paddings.MEDIUM} >
        <label>2. How many people live in your household?</label>
        <Box margin={Box.margins.SMALL}></Box>
        <Slider 
          defaultValue={[2.5, 6]} 
          size={Slider.sizes.SMALL} 
          min={1} 
          max={6}
          valueFormatter={value => {
            if (value === 2.5) {
              return `2.5 (avg)`
            }
            if (value > 5) {
              return `5+ People`
            } 
            return `${value} People`
          }}
          ranged={true}
        />
      </Box>
      <Box padding={Box.paddings.MEDIUM}>
        <label>3. What is your gross annual household income?</label>
        <Box margin={Box.margins.SMALL}></Box>
        <Slider 
          defaultValue={[0, 12]} 
          size={Slider.sizes.SMALL} 
          min={0} 
          max={12}
          valueFormatter={value => {
            if (value === 0) {
              return `< 10K`
            } 
            if (value === 12) {
              return `${value*10}K+`
            }
            return `${value*10}K`
          }}
          ranged={true}
        />
      </Box>
      <Box padding={Box.paddings.MEDIUM}>
        <Button style={{float: "right"}}>Refine Your Estimate</Button>
      </Box>
    </>
  )
}