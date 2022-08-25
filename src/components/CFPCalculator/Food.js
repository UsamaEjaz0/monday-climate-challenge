import { useState } from "react"

import { 
  Slider, 
  Box,
  Button,
  Label,
} from "monday-ui-react-core";

export default function Food({ setFood }) {
  const FOOD_FACTOR = [1.1, 0.35, 0.42, 0.6, 0.33]
  const [foodMultiplier, setFoodMultiplier] = useState([1, 1, 1, 1, 1])

  function handleChange(index, value) {
    const newFoodMultiplier = [...foodMultiplier]
    newFoodMultiplier[index] = value
    setFoodMultiplier(newFoodMultiplier)

    let food = 0
    for (let i = 0; i < 5; i++) {
      food += newFoodMultiplier[i] * FOOD_FACTOR[i] 
    }
    setFood(food)
  }
  
  return(
    <>
      <h3>HOW MUCH DOES THE AVERAGE PERSON IN YOUR HOUSEHOLD EAT?</h3>
      <Box padding={Box.paddings.MEDIUM} >
        <label>Meat, Fish, Eggs&nbsp;
          <Label 
            kind={Label.kinds.LINE} 
            text={`${(2.6*foodMultiplier[0]).toPrecision(3)} daily servings`}
            isAnimationDisabled={true}
          />
        </label>
        <Box margin={Box.margins.SMALL}></Box>
        <Slider 
          defaultValue={1} 
          size={Slider.sizes.SMALL} 
          min={0} 
          max={3}
          valueFormatter={value => {
            if (value === 1) {
              return "Average"
            }
            return `${value}x`
          }}
          onChange={(value) => handleChange(0, value)}
        />
      </Box>
      <Box padding={Box.paddings.MEDIUM}>
        <label>
          Grains & baked Goods
          <Label 
            kind={Label.kinds.LINE} 
            text={`${(4.5*foodMultiplier[1]).toPrecision(3)} daily servings`}
            isAnimationDisabled={true}
          />
        </label>
        <Box margin={Box.margins.SMALL}></Box>
        <Slider 
          defaultValue={1} 
          size={Slider.sizes.SMALL} 
          min={0} 
          max={3}
          valueFormatter={value => {
            if (value === 1) {
              return "Average"
            }
            return `${value}x`
          }}
          onChange={(value) => handleChange(1, value)}
        />
      </Box>
      <Box padding={Box.paddings.MEDIUM}>
        <label>
          Dairy
          <Label
            isAnimationDisabled={true} 
            kind={Label.kinds.LINE}
            text={`${(2.4*foodMultiplier[2]).toPrecision(3)} daily servings`}
          />
        </label>
        <Box margin={Box.margins.SMALL}></Box>
        <Slider 
          defaultValue={1} 
          size={Slider.sizes.SMALL} 
          min={0} 
          max={3}
          valueFormatter={value => {
            if (value === 1) {
              return "Average"
            }
            return `${value}x`
          }}
          onChange={(value) => handleChange(2, value)}
        />
      </Box>
      <Box padding={Box.paddings.MEDIUM}>
        <label>
          Snacks, drinks, etc...
          <Label 
            kind={Label.kinds.LINE} 
            isAnimationDisabled={true}
            text={`${(3.7*foodMultiplier[3]).toPrecision(3)} daily servings`}
            />
        </label>
        <Box margin={Box.margins.SMALL}></Box>
        <Slider 
          defaultValue={1} 
          size={Slider.sizes.SMALL} 
          min={0} 
          max={3}
          valueFormatter={value => {
            if (value === 1) {
              return "Average"
            }
            return `${value}x`
          }}
          onChange={(value) => handleChange(3, value)}
        />
      </Box>
      <Box padding={Box.paddings.MEDIUM}>
        <label>
          Fruits & Vegetables
          <Label 
            kind={Label.kinds.LINE} 
            text={`${(5.1*foodMultiplier[4]).toPrecision(3)} daily servings`}
            isAnimationDisabled={true}
          />
        </label>
        <Box margin={Box.margins.SMALL}></Box>
        <Slider 
          defaultValue={1} 
          size={Slider.sizes.SMALL} 
          min={0} 
          max={3}
          valueFormatter={value => {
            if (value === 1) {
              return "Average"
            }
            return `${value}x`
          }}
          onChange={(value) => handleChange(4, value)}
        />
      </Box>
      <Box padding={Box.paddings.MEDIUM}>
        <Button>Previous</Button>
        <Button style={{float: "right"}}>Next</Button>
      </Box>
    </>
  )
}
