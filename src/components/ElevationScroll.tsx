import React from 'react';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

const ELEVATION_VALUE = 4;

interface Props {
  children: React.ReactElement;
}

const ElevationScroll = ({ children }: Props) => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? ELEVATION_VALUE : 0,
  });
};

export default ElevationScroll;
