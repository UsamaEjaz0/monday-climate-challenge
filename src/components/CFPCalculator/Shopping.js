import { useState } from "react"

import {
  Slider,
  Label,
  Box,
  Button,
} from "monday-ui-react-core";

export default function Shopping({ shopping, setShopping, goods, services, setActiveTab }) {
  const [shoppingMultiplier, setShoppingMultiplier] = useState([1, 1])

  function handleChange(index, value) {
    const newShoppingMultiplier = [...shoppingMultiplier]
    newShoppingMultiplier[index] = value
    setShoppingMultiplier(newShoppingMultiplier)

    if (index === 0) {
      const newGoods = [...shopping.goods]
      newGoods[0] = goods[0] * newShoppingMultiplier[index]
      newGoods[1] = goods[1] * newShoppingMultiplier[index]
      setShopping(prevShopping => ({...prevShopping, goods: newGoods}))
    } else {
      const newServices = [...shopping.services]
      newServices[0] = services[0] * newShoppingMultiplier[index]
      newServices[1] = services[1] * newShoppingMultiplier[index]
      setShopping(prevShopping => ({...prevShopping, services: newServices}))
    }
  }

  return(
    <>
      <h3>HOW MUCH DO YOU SPEND ON EACH OF THE FOLLOWING?</h3>
      <Box padding={Box.paddings.MEDIUM} >
        <label>Goods&nbsp;
          <Label
            kind={Label.kinds.LINE}
            text={`$${shopping.goods[0]} / month`}
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
          Services
          <Label
            isAnimationDisabled={true}
            kind={Label.kinds.LINE}
            text={`$${shopping.services[0]} / month`}
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
        <Button  onClick={() => {setActiveTab(3)}}>Previous</Button>
      </Box>
    </>
  )
}
