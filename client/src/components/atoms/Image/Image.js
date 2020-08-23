import React from "react";

import withStyles from "../../../lib/withStyles";

const Image = ({
  className,
  src,
  placeholderSrc,
  alt,
  inheritedStyles,
  ref,
  ...other
}) => (
  <img
    className={className}
    src={src}
    alt={alt}
    ref={ref}
    {...other}
    onError={(event) => {
      // eslint-disable-next-line no-param-reassign
      event.target.src = placeholderSrc;
    }}
  />
);

export default withStyles(Image);
export { Image as ImageVanilla };
