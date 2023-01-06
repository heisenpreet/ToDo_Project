import * as React from "react"
import Svg, { Circle, Path } from "react-native-svg"

const CheckSVG = () => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={25}
    height={25}
    data-name="Flat Line"
    viewBox="0 0 24 24"
  >
    <Circle cx={12} cy={12} r={9} fill="#2CA9BC" />
    <Path fill="none" stroke="#000" d="m8 12 3 3 5-5" />
    <Circle
      cx={12}
      cy={12}
      r={9}
      fill="none"
      stroke="#000"
      data-name="primary"
    />
  </Svg>
)

export default React.memo(CheckSVG)
