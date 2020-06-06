import React, {Component} from 'react';
import {fromDate} from "../../../../../utils/formDateUtils";

class AdminHeaderDate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date:fromDate(Date.now())
    }
  }

  componentDidMount() {
    console.log("componentDidMount")
    setInterval(() => {
      this.setState({
        date:fromDate(Date.now())
      })
    },1000)
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
