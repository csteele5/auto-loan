import React, { Component } from "react";

export default class Disqualified extends Component {
  render() {
    return (
      <div className="disqualified-msg">
        <div>
          <h4>This loan is not approved.</h4>
          <p>
            Unfortunately, this application does not meet our requirements for
            consideration.
          </p>
        </div>
      </div>
    );
  }
}
