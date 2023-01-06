import * as React from "react"
import Svg, { Circle, Path } from "react-native-svg"

const CrossSVG = ({size=25,color="#2CA9BC"}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    data-name="Flat Line"
    viewBox="0 0 24 24"
  >
    <Circle cx={12} cy={12} r={9} fill={color} />
    <Path fill="none" stroke="#000" d="M15 15 9 9" />
    <Path fill="none" stroke="#000" d="m9 15 6-6" data-name="primary" />
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

export default React.memo(CrossSVG)
