import React from 'react';
import './App.css';
import CustomerAdd from './components/CustomerAdd';
import Customer from './components/Customer';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';

const styles = theme =>({
  root: {
    width: '100%',
    minWidth: 1080
  },
  tablehead: {
    fontSize: '1.0rem',
    color: 'gray'
  },
  paper: {
    marginLeft: 15,
    marginRight: 15
  },
  progress: {
    margin: theme.spacing(2)
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  menu: {
    marginTop: 15,
    marginBottom: 15,
    display: "flex",
    justifyContent: "center"
    
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
})

class App extends React.Component 
{
  constructor(props)
  {
    //console.log("constructor");
    super(props);

    this.state =
    {
      customers: "",
      complated: 0,
      searchKeyword: ''
    }
  }

  stateRefresh = () =>
  {
    //console.log("stateRefresh");
    this.timer = setInterval(this.progress, 20);
    this.setState({
      customers: '',
      complated: 0,
      searchKeyword: ''
    });
    this.callApi()
      .then(res => this.setState({customers:res}))
      .catch(err => console.log(err));
  }

  componentDidMount()
  {
    //{this.state.customers ? this.timer = setInterval(this.progress, 20):clearInterval(this.timer)}
    this.timer = setInterval(this.progress, 20);
   
    //console.log(this.state.customers);
    this.callApi()
      .then(res => {this.setState({customers:res}); })
      .catch(err => console.log(err));
  }
  componentWillUnmount()
  {
    //console.log("componentWillUnmount");
    clearInterval(this.timer);
  }

  callApi = async () =>
  {
    //console.log("callApi");
    const response = await fetch('/api/customers');
    const body = await response.json();

    return body;
  }
  handleValueChange = (e) =>
  {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }
  progress = () =>
  {
    if(this.state.customers) clearInterval(this.timer);
    const { complated } = this.state;
    this.setState({ complated: complated >= 100 ? 0 : complated + 1});
   // console.log(this.state.customer);
  }

  render() {
    // return ( 
    //   <Customer
    //     key={c.id}
    //     id={c.id}
    //     image={c.image}
    //     name={c.name}
    //     birthday={c.birthday}
    //     gender={c.gender}
    //     job={c.job}
    //     stateRefresh={this.stateRefresh}
    //   />
    // )
    const filteredComponents = (data) =>
    {
      data = data.filter((c) => 
      {
        console.log(c.name.indexOf(this.state.searchKeyword));
        return c.name.indexOf(this.state.searchKeyword)  > -1;
      });
      
      return data.map(c =>
        {
          return <Customer
              key={c.id}
              id={c.id}
              image={c.image}
              name={c.name}
              birthday={c.birthday}
              gender={c.gender}
              job={c.job}
              stateRefresh={this.stateRefresh}
            />
        })
    }
    const { classes } = this.props;
    const colName = ["번호", "이미지", "이름", "생일", "성별", "직업", "설정"];
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
            >
              <MenuIcon />
            </IconButton>
            <Typography className={classes.title} variant="h6" noWrap>
              고객 관리 시스템
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="검색하기"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
                name="searchKeyword"
                value={this.state.searchKeyword}
                onChange={this.handleValueChange}
              />
            </div>
          </Toolbar>
        </AppBar>
        <div className={classes.menu}>
          <CustomerAdd stateRefresh={this.stateRefresh}></CustomerAdd>
        </div>
        <Paper className={classes.paper}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                {colName.map(c => {
                  return <TableCell className={classes.tablehead}>{c}</TableCell>
                })}
              </TableRow>
            </TableHead>
            <TableBody>
            {
            this.state.customers ? filteredComponents(this.state.customers) :
          <TableRow>
            <TableCell colSpan="6" align="center">
              <CircularProgress className={classes.progress} variant="determinate" value={this.state.complated}></CircularProgress> 
            </TableCell>
          </TableRow>}
            </TableBody>
          </Table>
        </Paper>
        
      </div>
    );
  }
}

export default withStyles(styles)(App);
