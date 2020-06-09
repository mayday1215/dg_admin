import React, {Component} from 'react';
import {fromDate} from "../../../../../utils/formDateUtils";





class AdminHeaderDate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date:fromDate(Date.now()),
      city:"",
      weat:'',
      interId:""
    }
  }

  componentDidMount() {
    // reqWeather().then(data => {
    //   if (data.status === 0){
    //     console.log(data.result.location.city)
    //     console.log(data.result.now.text)
    //   }
    // })

    let interId = setInterval(() => {
      this.setState({
        date:fromDate(Date.now())
      })
    },1000)
    this.setState({
      interId
    })
  }
  componentWillUnmount(){

    clearInterval(this.state.interId)
  }
  render() {
    return (
      <span>
        {this.state.date}
      </span>
    );
  }
}

export default AdminHeaderDate;
