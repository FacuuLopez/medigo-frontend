import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export const CarIcon = props => {
  return (
    <Svg
      width={13}
      height={12}
      viewBox="0 0 16 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M14.151.898A1.328 1.328 0 0012.89 0H3.11C2.524 0 2.036.373 1.85.898L0 6.222v7.111c0 .49.4.89.889.89h.889c.489 0 .889-.4.889-.89v-.889h10.666v.89c0 .488.4.888.89.888h.888c.489 0 .889-.4.889-.889v-7.11L14.151.897zm-11.04 8.88a1.332 1.332 0 01-1.333-1.334c0-.737.595-1.333 1.333-1.333s1.333.596 1.333 1.333c0 .738-.595 1.334-1.333 1.334zm9.778 0a1.332 1.332 0 01-1.333-1.334c0-.737.595-1.333 1.333-1.333s1.333.596 1.333 1.333c0 .738-.595 1.334-1.333 1.334zM1.778 5.333l1.333-4h9.778l1.333 4H1.778z"
        fill="#8696BB"
      />
    </Svg>
  );
};
