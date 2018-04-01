import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import withWidth, { isWidthUp } from 'material-ui/utils/withWidth';
import MenuIcon from 'material-ui-icons/Menu';
import Settings from 'material-ui-icons/Settings';
import ApiMenu from './ApiMenu';
import Avatar from 'material-ui/Avatar';
import Button from 'material-ui/Button'
import { hashHistory } from 'react-router';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import Slide from 'material-ui/transitions/Slide';
import userImage from '../assets/images/default-user-image.png';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Select from 'material-ui/Select';
import CloseIcon from 'material-ui-icons/Close';
import { customStyle } from '../constants.js';

function getTitle(routes) {
  for (let i = routes.length - 1; i >= 0; i -= 1) {
    if (routes[i].hasOwnProperty('title')) {
      return routes[i].title;
    }
  }

  return null;
}

const styleSheet = {
  '@global': {
    html: {
      boxSizing: 'border-box',
    },
    '*, *:before, *:after': {
      boxSizing: 'inherit',
    },
    body: {
      margin: 0,
      background: theme.palette.background.default,
      color: "#000",
      lineHeight: '1.2',
      overflowX: 'hidden',
      WebkitFontSmoothing: 'antialiased', // Antialiasing.
      MozOsxFontSmoothing: 'grayscale', // Antialiasing.
    },
    settings:{
      marginRight: "50px"
    },
    img: {
      maxWidth: '100%',
      height: 'auto',
      width: 'auto',
    },
  },
  appFrame: {
    display: 'flex',
    alignItems: 'stretch',
    minHeight: '100vh',
    width: '100%',
  },
  grow: {
    flex: '1 1 auto',
  },
  title: {
    marginLeft: 24,
    flex: '0 1 auto',
  },
  appBar: {
    transition: theme.transitions.create('width'),
  },
  appBarHome: {
    boxShadow: 'none',
  },
  [theme.breakpoints.up('lg')]: {
    drawer: {
      width: '250px',
    },
    appBarShift: {
      width: 'calc(100% - 250px)',
    },
    navIconHide: {
      display: 'none',
    },
  },
  formControl: {
    marginTop: 80,
    marginLeft: 33,
    maxWidth: 160
  }
};

class AppFrame extends Component {
  state = {
    drawerOpen: false,
    open: false,
    language: global.language
  };

  handleDrawerToggle = () => {
    this.setState({ drawerOpen: !this.state.drawerOpen });
  };

  handleToggleShade = () => {
    this.props.dispatch({ type: 'TOGGLE_THEME_SHADE' });
  };

  componentDidMount(){
    let token = localStorage.getItem("token");
    if(token != null){
      this.setState({
        logged:true
      })
    }
  }

  openDialog = () =>{
    this.setState({
      open: true
    })
  }

  handleRequestAccept = () =>{
    let token = localStorage.setItem("token", null);
    if(token != null){
      hashHistory.push("/Login");
    }
    hashHistory.push("/Login");
  }

  handleRequestClose = () =>{
    this.setState({
      open: false
    })
  }

  handleDrawerClose(){
    this.state.drawerOpen = false;
    this.setState(this.state);
  }

  openCloseSettings(){
    this.state.openSettings = !this.state.openSettings;
    this.setState(this.state);
  }

  handleChangeLanguage(evt){
    global.language = evt.target.value;
    this.state.language = global.language;
    this.setState(this.state);
  }

  render() {
    const { children, routes, width } = this.props;

    const classes = this.props.classes;
    const title = getTitle(routes);

    let drawerDocked = isWidthUp('lg', width);
    let navIconClassName = classes.icon;
    let appBarClassName = classes.appBar;

    if (title === null) {
      // home route, don't shift app bar or dock drawer
      drawerDocked = false;
      appBarClassName += ` ${classes.appBarHome}`;
    } else {
      navIconClassName += ` ${classes.navIconHide}`;
      appBarClassName += ` ${classes.appBarShift}`;
    }

    return (
      <div className={classes.appFrame}>
        <AppBar style={customStyle.secondaryDextraColor}>

          <Toolbar style={customStyle.color.secondaryDextraColor}>
              <Typography style={{fontSize: 22}} type="display1" color="inherit" noWrap>
                {"Dextra Sanduíches"}
              </Typography>
            <div className={classes.grow} />
            <ApiMenu routes={routes} />
          </Toolbar>
        </AppBar>
        {children}
        <Dialog open={this.state.open} transition={Slide} onRequestClose={this.handleRequestClose}>
          <DialogTitle>
            {"Atenção"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Deseja realmente sair da sua conta?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleRequestClose} color="primary">
              Cancelar
            </Button>
            <Button onClick={this.handleRequestAccept} color="primary">
              Sair
            </Button>
          </DialogActions>
        </Dialog>
        <div>
          <Dialog
            fullScreen
            open={this.state.openSettings}
            transition={<Slide direction="up" />}
          >
            <AppBar className={classes.appBar}>
              <Toolbar>
                <IconButton color="contrast" onClick={this.openCloseSettings.bind(this)} aria-label="Close">
                  <CloseIcon />
                </IconButton>
                <Typography type="title" color="inherit" className={classes.flex}>
                  Configurações
                </Typography>
              </Toolbar>
            </AppBar>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="languague-input">Linguagem</InputLabel>
              <Select
                value={this.state.language}
                onChange={this.handleChangeLanguage.bind(this)}
                input={<Input id="languague-input" />}
              >
                <MenuItem value={"pt-br"}>Português</MenuItem>
                <MenuItem value={"en-us"}>Inglês</MenuItem>
              </Select>
            </FormControl>
          </Dialog>
        </div>
      </div>
    );
  }
}

AppFrame.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  routes: PropTypes.array.isRequired,
  width: PropTypes.string.isRequired,
};

export default compose(withStyles(styleSheet, {name: 'AppFrame'}), withWidth(), connect())(AppFrame);
