import { extendTheme } from '@chakra-ui/react';
import styles from './styles';
import colors from './colors';
import components from './components';
import textStyles from './textStyles';
import fonts from './fonts';

const theme = extendTheme({
  styles,
  colors,
  components,
  textStyles,
  fonts,
});

export default theme;
