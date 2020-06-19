import React from "react";
import { Box, Avatar, Carousel } from "grommet";

const CarouselTokens = (props) => {
  return (
    <Box height="small" width="medium" overflow="hidden" {...props}>
      <Carousel fill>
        <Box direction="row" gap="small">
          <Avatar src="//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80" />
        </Box>
        <Box direction="row" gap="small">
          <Avatar src="//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80" />
        </Box>
        <Box direction="row" gap="small">
          <Avatar src="//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80" />
        </Box>
      </Carousel>
    </Box>
  );
};

export default CarouselTokens;