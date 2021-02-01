import * as React from "react";
import { Component } from "react";
import { Redirect, RouteComponentProps } from "react-router-dom";
import PreQualifyService from "../services/prequalify.service";

interface IProps {}

interface IState {
  price: string;
  make: string;
  model: string;
  income: string;
  creditscore: string;
  submitted: boolean;
  outcome: string;
  userid: string;
  password: string;
  passwordconfirm: string;
  usersubmitted: boolean;
  redirect: string | null;
}

export default class ProcessPreApproval extends Component<
  RouteComponentProps,
  IState
> {
  state: IState;
  constructor(props: RouteComponentProps) {
    super(props);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.onChangeMake = this.onChangeMake.bind(this);
    this.onChangeModel = this.onChangeModel.bind(this);
    this.onChangeIncome = this.onChangeIncome.bind(this);
    this.onChangeCreditScore = this.onChangeCreditScore.bind(this);
    this.onChangeUserID = this.onChangeUserID.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangePasswordConfirm = this.onChangePasswordConfirm.bind(this);
    this.submitApproval = this.submitApproval.bind(this);
    this.createNewUser = this.createNewUser.bind(this);

    this.state = {
      price: "",
      make: "",
      model: "",
      income: "",
      creditscore: "",
      submitted: false,
      outcome: "",
      userid: "",
      password: "",
      passwordconfirm: "",
      usersubmitted: false,
      redirect: null,
    };
  }

  onChangePrice(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      price: e.target.value,
    });
  }
  onChangeMake(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      make: e.target.value,
    });
  }
  onChangeModel(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      model: e.target.value,
    });
  }
  onChangeIncome(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      income: e.target.value,
    });
  }
  onChangeCreditScore(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      creditscore: e.target.value,
    });
  }
  onChangeUserID(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      userid: e.target.value,
    });
  }
  onChangePassword(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      password: e.target.value,
    });
  }
  onChangePasswordConfirm(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      passwordconfirm: e.target.value,
    });
  }

  submitApproval() {
    const data = {
      price: this.state.price,
      make: this.state.make,
      model: this.state.model,
      income: this.state.income,
      creditscore: this.state.creditscore,
    };

    PreQualifyService.prequalifyLoan(data)
      .then((response) => {
        // setCurrentTutorial(response.data);
        // console.log("Get Data");
        // console.log(response.data);
        //alert(response.result);
        if (response.result === "Qualified") {
          this.setState({
            submitted: true,
          });
        } else {
          this.setState({ redirect: "/disqualified" });
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  createNewUser() {
    alert("validatenew user");
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    return (
      <div className="user-form">
        {this.state.submitted ? (
          <div>
            <h4>Your loan was pre-approved!</h4>
            <p>Create an account with us to complete the loan process now!</p>

            <div className="form-group">
              <label htmlFor="userid">User ID</label>
              <input
                type="text"
                className="form-control"
                id="userid"
                required
                value={this.state.userid}
                onChange={this.onChangeUserID}
                name="userid"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                required
                value={this.state.password}
                onChange={this.onChangePassword}
                name="password"
              />
            </div>
            <div className="form-group">
              <label htmlFor="passwordconfirm">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                id="passwordconfirm"
                required
                value={this.state.passwordconfirm}
                onChange={this.onChangePasswordConfirm}
                name="passwordconfirm"
              />
            </div>
            <button className="btn btn-success" onClick={this.createNewUser}>
              Create Your New Account
            </button>
          </div>
        ) : (
          <div>
            <p>Pre-qualify for your dream car today!</p>
            <div className="form-group">
              <label htmlFor="price">Vehicle Price</label>
              <input
                type="text"
                className="form-control"
                id="price"
                required
                value={this.state.price}
                onChange={this.onChangePrice}
                name="price"
              />
            </div>

            <div className="form-group">
              <label htmlFor="make">Make of Vehicle</label>
              <input
                type="text"
                className="form-control"
                id="make"
                required
                value={this.state.make}
                onChange={this.onChangeMake}
                name="make"
              />
            </div>

            <div className="form-group">
              <label htmlFor="model">Model of Vehicle</label>
              <input
                type="text"
                className="form-control"
                id="model"
                required
                value={this.state.model}
                onChange={this.onChangeModel}
                name="model"
              />
            </div>

            <div className="form-group">
              <label htmlFor="income">Your Average Annual Income</label>
              <input
                type="text"
                className="form-control"
                id="income"
                required
                value={this.state.income}
                onChange={this.onChangeIncome}
                name="income"
              />
            </div>

            <div className="form-group">
              <label htmlFor="creditscore">Your Credit Score</label>
              <input
                type="text"
                className="form-control"
                id="creditscore"
                required
                value={this.state.creditscore}
                onChange={this.onChangeCreditScore}
                name="creditscore"
              />
            </div>

            <button onClick={this.submitApproval} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}
