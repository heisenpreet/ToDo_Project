import * as React from "react"
import Svg, { Path } from "react-native-svg"

const DeleteSVG = () => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={25}
    height={25}
    data-name="Flat Line"
    viewBox="0 0 24 24"
  >
    <Path fill="#2CA9BC" d="M18 7v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7h12z" />
    <Path
      fill="none"
      stroke="#000"
      d="M16 7V4a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3"
    />
    <Path
      fill="none"
      stroke="#000"
      d="M10 11v6m4-6v6M4 7h16m-2 13V7H6v13a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1z"
      data-name="primary"
    />
  </Svg>
)

export default React.memo(DeleteSVG)
