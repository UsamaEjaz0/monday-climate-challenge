import { memo, useState } from "react"

import {
  Slider,
  Box,
  Button,
  Label,
  Flex,
  Heading
} from "monday-ui-react-core";

function Food({ setFood, setActiveTab }) {
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

  // console.log("Food rendered..")

  return(
    <>
      <Flex justify={Flex.justify.CENTER}><Heading type={Heading.types.h2} value="How much do you eat?" /></Flex>
      <Box padding={Box.paddings.MEDIUM} >
        <label>Meat, Fish, Eggs&nbsp;
          <Label
              className="ellipsis"
            kind={Label.kinds.LINE}
            text={`${(2.6*foodMultiplier[0]).toPrecision(3)} daily servings`}
            isAnimationDisabled={true}
          />
        </label>
        <Box margin={Box.margins.SMALL}></Box>
        <Slider
          indicateSelection={true}
          defaultValue={1}
          size={Slider.sizes.SMALL}
          min={0}
          max={3}
          valueFormatter={value => {
            if (value === 1) {
              return "Avg"
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
              className="ellipsis"
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
              return "Avg"
            }
            return `${value}x`
          }}
          onChange={(value) => handleChange(1, value)}
          indicateSelection={true}
        />
      </Box>
      <Box padding={Box.paddings.MEDIUM}>
        <label>
          Dairy
          <Label className="ellipsis"
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
              return "Avg"
            }
            return `${value}x`
          }}
          onChange={(value) => handleChange(2, value)}
          indicateSelection={true}
        />
      </Box>
      <Box padding={Box.paddings.MEDIUM}>
        <label>
          Snacks, drinks, etc...
          <Label
              className="ellipsis"
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
              return "Avg"
            }
            return `${value}x`
          }}
          indicateSelection={true}
          onChange={(value) => handleChange(3, value)}
        />
      </Box>
      <Box padding={Box.paddings.MEDIUM}>
        <label>
          Fruits & Vegetables
          <Label
              className="ellipsis"
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
              return "Avg"
            }
            return `${value}x`
          }}
          indicateSelection={true}
          onChange={(value) => handleChange(4, value)}
        />
      </Box>
      <Box padding={Box.paddings.MEDIUM}>
        <Button  onClick={() => {setActiveTab(2)}}>Previous</Button>
        <Button style={{float: "right"}}  onClick={() => {setActiveTab(4)}}>Next</Button>
      </Box>
    </>
  )
}

export default memo(Food)