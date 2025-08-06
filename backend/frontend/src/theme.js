// Custom Chakra UI theme for modern look
import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: 'gray.50',
        color: 'gray.800',
      },
    },
  },
  fonts: {
    heading: 'Inter, sans-serif',
    body: 'Inter, sans-serif',
  },
  components: {
    Button: {
      baseStyle: {
        rounded: 'md',
        fontWeight: 'bold',
      },
    },
    Input: {
      baseStyle: {
        rounded: 'md',
      },
    },
  },
});

export default theme;
