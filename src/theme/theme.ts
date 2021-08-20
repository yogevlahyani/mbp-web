import { extendTheme } from "@chakra-ui/react";
import styles from "./styles";
import colors from "./colors";
import components from './components';
import textStyles from './textStyles';

const theme = extendTheme({
  styles,
  colors,
  components,
  textStyles,
});

export default theme;
