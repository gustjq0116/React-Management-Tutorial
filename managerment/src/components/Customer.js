import React from 'react';

class Customer extends React.Component
{
    render()
    {
        return (
            <div>
                 <CustomerProfile id={this.props.id} name={this.props.name} img={this.props.image}/>
                 <CustomerInfo id={this.props.id} birthday={this.props.birthday} gender={this.props.gender} job={this.props.job}/>
            </div>
         
        )
    }
}
class CustomerProfile extends React.Component{
    render(){
        return(
            <div>
                <img src={this.props.img} alt="profile"></img>
                 <h2>{this.props.name}</h2>
            </div>
        )
    }
}

class CustomerInfo extends React.Component{
    render(){
        return(
            <div>
                <p>{this.props.birthday}</p>
                <p>{this.props.gender}</p>
                <p>{this.props.job}</p>
            </div>
        )
    }
}
export default Customer;