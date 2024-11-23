import { Button, Text, VStack } from '@chakra-ui/react';

export const NotFound = () => {
  return (
    <VStack gap={'4'}>
      <Text>Not found!</Text>
      <Button>Home</Button>
    </VStack>
  );
};
