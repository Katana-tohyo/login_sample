import React from 'react';
import { Box, Button, Flex, Heading, HStack } from '@chakra-ui/react';

const Header = () => {
  return (
    <Flex gap="20" align="center" justify="center">
      <Heading fontSize="4xl">Tohyo</Heading>
      <Button ml="20">logout</Button>
    </Flex>
  );
};

export default Header;
