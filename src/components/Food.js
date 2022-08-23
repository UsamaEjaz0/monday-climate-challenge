import { 
  Slider, 
  Box,
  Button,
  Label,
} from "monday-ui-react-core";

export default function Food() {
  return(
    <>
      <h3>HOW MUCH DOES THE AVERAGE PERSON IN YOUR HOUSEHOLD EAT?</h3>
      <Box padding={Box.paddings.MEDIUM} >
        <label>Meat, Fish, Eggs&nbsp;
          <Label kind={Label.kinds.LINE} text="2.6 daily servings per person"/>
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
          Grains & baked Goods
          <Label kind={Label.kinds.LINE} text="4.5 daily servings per person"/>
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
          Dairy
          <Label kind={Label.kinds.LINE} text="2.4 daily servings per person"/>
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
          Snacks, drinks, etc...
          <Label kind={Label.kinds.LINE} text="3.7 daily servings per person"/>
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
          Fruits & Vegetables
          <Label kind={Label.kinds.LINE} text="5.1 daily servings per person"/>
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
        <Button style={{float: "right"}}>Next</Button>
      </Box>
    </>
  )
}