export const SEED_URL = "http://localhost:4000/api/v1/";

export const AUTH_TOKEN = "Basic QW5kcm9pZDo5N2U3NDY3NS03YzNmLTQyMzAtYThjNy05OGM2OWZiM2EyYjQ=";

export const SHOW_DEFAULT_SNACKBAR = 5000;

export const customStyle = {
  marginField: {marginTop: 15},
  color:{
    primaryDextraColor: {
      backgroundColor: "#2196f3"
    },
    secondaryDextraColor: {
      backgroundColor: "#2196f3"
    },
    tertiaryDextraCOlor: {
      backgroundColor: "#fff"
    }
  },
  textColor:{
    primaryDextraColor: {
      color: "#FD863A"
    },
    secondaryDextraColor: {
      color: "#FF9C40"
    },
    tertiaryDextraCOlor: {
      color: "#fff"
    }
  }
}

export const styleSheet = {

    hero: {
      minHeight: '100vh', // Makes the hero full height until we get some more content.
      flex: '0 0 auto',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: global.APPBAR_COLOR + " !important",
      color: theme.palette.getContrastText(theme.palette.primary[500]),
    },
    content: {
      padding: '60px 30px',
      textAlign: 'center',
      [theme.breakpoints.up('sm')]: {
        padding: '120px 30px',
      },
    },
    button: {
      marginTop: 20,
    },
    logo: {
      margin: '20px -40%',
      width: '58%',
      height: '40vw',
      maxHeight: 230,
    },
    imageSize: {
      maxWidth: "80%",
    },
    fabProgress: {
      position: 'absolute',
      top: -6,
      left: -6,
      zIndex: 1,
    },
    buttonProgress: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginTop: -12,
      marginLeft: -12,
    },
    wrapper: {
      position: 'relative',
    },
};
