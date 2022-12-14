import { createTheme } from '@mui/material/styles';
import ButtonLink from '../components/Elements/ButtonLink';

const { palette } = createTheme();
const { augmentColor } = palette;

const createColor = (mainColor) => augmentColor({ color: { main: mainColor } });

const theme = {
  palette: {
    white: createColor('#FFFFFF'),
  },
  components: {
    MuiLink: {
      defaultProps: {
        component: ButtonLink,
      },
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: ButtonLink,
      },
    },
  },
};

export default theme;
