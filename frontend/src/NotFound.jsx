import { Button, Text, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export const NotFound = () => {
  return (
    <VStack gap={'4'}>
      <Text>Not found!</Text>
      <Link to="/">Homeへ戻る</Link>
    </VStack>
  );
};
