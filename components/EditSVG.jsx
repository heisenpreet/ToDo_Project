import * as React from "react"
import Svg, { Path } from "react-native-svg"

const EditSVG = () => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={25}
    height={25}
    data-name="Flat Line"
    viewBox="0 0 24 24"
  >
    <Path fill="#2CA9BC" d="m10.47 9.29 4.24 4.24L7.24 21H3v-4.24l7.47-7.47z" />
    <Path
      fill="none"
      stroke="#000"
      d="m20.41 7.83-2.88 2.88-4.24-4.24 2.88-2.88a1 1 0 0 1 1.42 0l2.82 2.82a1 1 0 0 1 0 1.42zM3 16.76V21h4.24l7.47-7.47-4.24-4.24z"
    />
  </Svg>
)

export default React.memo(EditSVG)
