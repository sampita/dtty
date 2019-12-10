import React, { Component } from "react";

class Homex extends Component {
render() {
    console.log("home this.props", this.props)
    return (
        <div className="col-md-6">
            <h1>Welcome to dtty!</h1>
                <h3>It's going to be a bumpy ride...</h3>
                <button onClick={this.props.clearUser}>Log Out</button>
        </div>
    )
  }
}

export default Homex;