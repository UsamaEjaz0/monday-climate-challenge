import {
    Slider,
    Box,
    Button, Heading, Flex,
} from "monday-ui-react-core";

export default function GetStarted({ setAnnualIncome }) {
  function handleChange(value) {
    setAnnualIncome(value)
  }

  return(
    <>
        <Flex justify={Flex.justify.CENTER}><Heading type={Heading.types.h2} value="Start with a quick estimate?" /></Flex>

        <Box padding={Box.paddings.MEDIUM}>
        <label>2. What is your gross annual household income?</label>
        <Box margin={Box.margins.SMALL}></Box>
        <Slider
          defaultValue={0}
          size={Slider.sizes.SMALL}
          min={0}
          max={10}
          valueFormatter = { value => {
              if (value === 0) {
                return "Avg"
              }
              if (value === 1) {
                return "< 10K"
              }
              if (value === 8) {
                return `${value*10}K`
              }
              if (value === 9) {
                return `${(value+1)*10}K`
              }
              if (value === 10) {
                return `${value*10 + 20}K+`
              }
              return `${value*10-10}K`
            }
          }
          onChange={ handleChange }
        />
      </Box>
      <Box padding={Box.paddings.MEDIUM}>
        <Button style={{float: "right"}}>Refine Your Estimate</Button>
      </Box>
    </>
  )
}
