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

const styles = theme =>({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: "auto"
  },
  table: {
    minWidth: 1440
  },
  progress: {
    margin: theme.spacing(2)
  }
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
      complated: 0
    }
  }

  stateRefresh = () =>
  {
    //console.log("stateRefresh");
    this.timer = setInterval(this.progress, 20);
    this.setState({
      customers: '',
      complated: 0
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

  progress = () =>
  {
    if(this.state.customers) clearInterval(this.timer);
    const { complated } = this.state;
    this.setState({ complated: complated >= 100 ? 0 : complated + 1});
   // console.log(this.state.customer);
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>번호</TableCell>
                <TableCell>이미지</TableCell>
                <TableCell>이름</TableCell>
                <TableCell>생일</TableCell>
                <TableCell>성별</TableCell>
                <TableCell>직업</TableCell>
                <TableCell>설정</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {
            this.state.customers ? this.state.customers.map(c => 
            {
            return ( 
              <Customer
                key={c.id}
                id={c.id}
                image={c.image}
                name={c.name}
                birthday={c.birthday}
                gender={c.gender}
                job={c.job}
                stateRefresh={this.stateRefresh}
              />
            )
          }) :
          <TableRow>
            <TableCell colSpan="6" align="center">
              <CircularProgress className={classes.progress} variant="determinate" value={this.state.complated}></CircularProgress> 
            </TableCell>
          </TableRow>}
            </TableBody>
          </Table>
        </Paper>
        <CustomerAdd stateRefresh={this.stateRefresh}></CustomerAdd>
      </div>
    );
  }
}

export default withStyles(styles)(App);
