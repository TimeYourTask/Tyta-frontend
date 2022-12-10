import ButtonLink from '../components/Elements/ButtonLink';

const theme = {
  palette: {},
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
