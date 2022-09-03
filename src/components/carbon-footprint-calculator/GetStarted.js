import {
    Slider,
    Box,
    Button, Heading, Flex, Label,
} from "monday-ui-react-core";

export default function GetStarted({ setAnnualIncome, setActiveTab }) {
  function handleChange(value) {
    setAnnualIncome(value)
  }

  // console.log("GetStarted rendered..")

  return(
    <>
        <Flex justify={Flex.justify.CENTER}><Heading type={Heading.types.h2} value="Start with a quick estimate?" /></Flex>
        <Box padding={Box.paddings.MEDIUM}>
        <label >What is your gross annual household income?</label>
        <Box margin={Box.margins.SMALL}></Box>
        <Slider
          defaultValue={0}
          size={Slider.sizes.SMALL}
          min={0}
          max={10}
          indicateSelection={true}
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
            <div style={{textAlign: "center"}}>

                <Heading  type={Heading.types.h2} bold value="Assumption values" />
            </div>

            <Flex direction={Flex.directions.COLUMN} align={Flex.align.STRETCH} gap={Flex.gaps.SMALL}>
                <Flex  justify={Flex.justify.SPACE_BETWEEN}>
                    Price of gasoline
                    <Label className="ellipsis" kind={Label.kinds.LINE} text="$ 0.92 per L" />
                </Flex>
                <Flex justify={Flex.justify.SPACE_BETWEEN}>
                    Electricity price
                    <Label  className="ellipsis" kind={Label.kinds.LINE}  text="10.0 cents/ kWh" />
                </Flex>
                <Flex justify={Flex.justify.SPACE_BETWEEN}>
                    Electricity emission factor
                    <Label className="ellipsis" kind={Label.kinds.LINE}  text="590 gCO2/ kWh" />
                </Flex>
            </Flex>

        </Box>
        <Box padding={Box.paddings.MEDIUM}>
            <Button style={{float: "right"}} onClick={() => {setActiveTab(1)}}>Refine Your Estimate</Button>
        </Box>
    </>
  )
}
