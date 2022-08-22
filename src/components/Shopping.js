import { 
  Slider, 
  Label,
  Box,
  Button,
} from "monday-ui-react-core";

export default function Shopping() {
  return(
    <>
      <h3>HOW MUCH DO YOU SPEND ON EACH OF THE FOLLOWING?</h3>
      <Box padding={Box.paddings.MEDIUM} >
        <label>Goods&nbsp;
          <Label kind={Label.kinds.LINE} text="$116 / month"/>
        </label>
        <Box margin={Box.margins.SMALL}></Box>
        <Slider 
          defaultValue={[0, 1]} 
          size={Slider.sizes.SMALL} 
          min={0} 
          max={3}
          valueFormatter={value => {
            if (value === 1) {
              return "Average"
            }
            return `${value}x`
          }}
          ranged={true}
        />
      </Box>
      <Box padding={Box.paddings.MEDIUM}>
        <label>
          Services
          <Label kind={Label.kinds.LINE} text="$216 / month"/>
        </label>
        <Box margin={Box.margins.SMALL}></Box>
        <Slider 
          defaultValue={[0, 1]} 
          size={Slider.sizes.SMALL} 
          min={0} 
          max={3}
          valueFormatter={value => {
            if (value === 1) {
              return "Average"
            }
            return `${value}x`
          }}
          ranged={true}
        />
      </Box>
      <Box padding={Box.paddings.MEDIUM}>
        <Button>Previous</Button>
      </Box>
    </>
  )
}