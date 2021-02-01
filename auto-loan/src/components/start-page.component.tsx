import * as React from "react";
import { Component } from "react";
import { Redirect, RouteComponentProps } from "react-router-dom";
import PreQualifyService from "../services/prequalify.service";

interface IState {
  price: string;
  pricevalid: boolean;
  make: string;
  makevalid: boolean;
  model: string;
  modelvalid: boolean;
  income: string;
  incomevalid: boolean;
  creditscore: string;
  creditscorevalid: boolean;
  validatemsg: string | null;
  submitted: boolean;
  outcome: string;
  userid: string;
  useridvalid: boolean;
  password: string;
  passwordvalid: boolean;
  passwordconfirm: string;
  passwordconfirmvalid: boolean;
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
      pricevalid: true,
      make: "",
      makevalid: true,
      model: "",
      modelvalid: true,
      income: "",
      incomevalid: true,
      creditscore: "",
      creditscorevalid: true,
      validatemsg: "",
      submitted: false,
      outcome: "",
      userid: "",
      useridvalid: true,
      password: "",
      passwordvalid: true,
      passwordconfirm: "",
      passwordconfirmvalid: true,
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

  priceValidate(price: string): { msg: string; value: number } {
    let validationResults = { msg: "", value: 0 };
    let newprice = parseInt(price.replace(/\D/g, ""));

    if (newprice > 0) {
      validationResults.value = newprice;
      this.setState({
        price: newprice.toString(),
      });
    } else {
      validationResults.msg = "Invalid";
    }
    return validationResults;
  }

  makeValidate(make: string): { msg: string; value: string } {
    let validationResults = { msg: "", value: "" };
    if (make.trim() !== "") {
      validationResults.value = make.trim();
    } else {
      validationResults.msg = "Invalid";
    }
    return validationResults;
  }

  modelValidate(model: string): { msg: string; value: string } {
    let validationResults = { msg: "", value: "" };
    if (model.trim() !== "") {
      validationResults.value = model.trim();
    } else {
      validationResults.msg = "Invalid";
    }
    return validationResults;
  }

  incomeValidate(income: string): { msg: string; value: number } {
    let validationResults = { msg: "", value: 0 };
    let newincome = parseInt(income.replace(/\D/g, ""));
    if (newincome > 0) {
      validationResults.value = newincome;
      this.setState({
        income: newincome.toString(),
      });
    } else {
      validationResults.msg = "Invalid";
    }
    return validationResults;
  }

  creditscoreValidate(creditscore: string): { msg: string; value: number } {
    let validationResults = { msg: "", value: 0 };
    let newcreditscore = parseInt(creditscore.replace(/\D/g, ""));
    if (newcreditscore >= 300 && newcreditscore <= 850) {
      validationResults.value = newcreditscore;
      this.setState({
        creditscore: newcreditscore.toString(),
      });
    } else {
      validationResults.msg = "Invalid";
    }
    return validationResults;
  }

  submitApproval() {
    // validate and prepare data for prequalification
    let overallValidForm = true;
    let validatedprice = 0;
    const priceValResult = this.priceValidate(this.state.price);
    if (priceValResult.msg.trim() === "Invalid") {
      overallValidForm = false;
      this.setState({
        price: "",
        pricevalid: false,
      });
    } else {
      this.setState({
        pricevalid: true,
      });
      validatedprice = priceValResult.value;
    }
    let validatedmake = "";
    const makeValResult = this.makeValidate(this.state.make);
    if (makeValResult.msg.trim() === "Invalid") {
      overallValidForm = false;
      this.setState({
        make: "",
        makevalid: false,
      });
    } else {
      this.setState({
        makevalid: true,
      });
      validatedmake = makeValResult.value;
    }
    let validatedmodel = "";
    const modelValResult = this.modelValidate(this.state.model);
    if (modelValResult.msg.trim() === "Invalid") {
      overallValidForm = false;
      this.setState({
        model: "",
        modelvalid: false,
      });
    } else {
      this.setState({
        modelvalid: true,
      });
      validatedmodel = modelValResult.value;
    }
    let validatedincome = 0;
    const incomeValResult = this.incomeValidate(this.state.income);
    if (incomeValResult.msg.trim() === "Invalid") {
      overallValidForm = false;
      this.setState({
        income: "",
        incomevalid: false,
      });
    } else {
      this.setState({
        incomevalid: true,
      });
      validatedincome = incomeValResult.value;
    }
    let validatedcreditscore = 0;
    const creditscoreValResult = this.creditscoreValidate(
      this.state.creditscore
    );
    if (creditscoreValResult.msg.trim() === "Invalid") {
      overallValidForm = false;
      this.setState({
        creditscore: "",
        creditscorevalid: false,
      });
    } else {
      this.setState({
        creditscorevalid: true,
      });
      validatedcreditscore = creditscoreValResult.value;
    }

    if (overallValidForm === true) {
      const data = {
        price: validatedprice,
        make: validatedmake,
        model: validatedmodel,
        income: validatedincome,
        creditscore: validatedcreditscore,
      };

      PreQualifyService.prequalifyLoan(data)
        .then((response) => {
          if (response.result === "BAD REQUEST") {
            alert(
              "BAD REQUEST! \n Please try again with something more reasonably priced."
            );
          } else if (response.result === "Qualified") {
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
    } // end overallValidForm check
  }

  useridValidate(userid: string): { msg: string; value: string } {
    let validationResults = { msg: "", value: "" };
    if (
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        userid
      )
    ) {
      validationResults.value = userid;
    } else {
      validationResults.msg = "Invalid";
    }
    return validationResults;
  }

  passwordValidate(password: string): { msg: string; value: string } {
    let validationResults = { msg: "", value: "" };
    let validated = true;

    const passwordRegex = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_-])(?=.{8,})"
    );

    validated = passwordRegex.test(password);

    if (validated === true) {
      validationResults.value = password;
    } else {
      validationResults.msg = "Invalid";
    }
    return validationResults;
  }

  passwordconfirmValidate(
    passwordconfirm: string
  ): { msg: string; value: string } {
    let validationResults = { msg: "", value: "" };

    const validated = passwordconfirm === this.state.password ? true : false;

    if (validated === true) {
      validationResults.value = passwordconfirm;
    } else {
      validationResults.msg = "Invalid";
    }
    return validationResults;
  }

  createNewUser() {
    // validate user login
    let overallValidForm = true;
    let validateduserid = "";
    const useridValResult = this.useridValidate(this.state.userid);
    if (useridValResult.msg.trim() === "Invalid") {
      overallValidForm = false;
      this.setState({
        useridvalid: false,
      });
    } else {
      this.setState({
        useridvalid: true,
      });
      // eslint-disable-next-line
      validateduserid = useridValResult.value;
    }

    let validatedpassword = "";
    const passwordValResult = this.passwordValidate(this.state.password);
    if (passwordValResult.msg.trim() === "Invalid") {
      overallValidForm = false;
      this.setState({
        passwordvalid: false,
      });
    } else {
      this.setState({
        passwordvalid: true,
      });
      // eslint-disable-next-line
      validatedpassword = passwordValResult.value;
    }

    let validatedpasswordconfirm = "";
    const passwordconfirmValResult = this.passwordconfirmValidate(
      this.state.passwordconfirm
    );
    if (passwordconfirmValResult.msg.trim() === "Invalid") {
      overallValidForm = false;
      this.setState({
        passwordconfirmvalid: false,
      });
    } else {
      this.setState({
        passwordconfirmvalid: true,
      });
      // eslint-disable-next-line
      validatedpasswordconfirm = passwordconfirmValResult.value;
    }

    if (overallValidForm === true) {
      this.setState({
        usersubmitted: true,
      });
      alert(
        "Complete user registration and open pre-populated loan application"
      );
    } // end overallValidForm check
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
                className={
                  "form-control " +
                  (this.state.useridvalid ? " " : "is-invalid")
                }
                id="userid"
                value={this.state.userid}
                onChange={this.onChangeUserID}
                name="userid"
              />
              <div className="invalid-feedback">
                Please provide a valid email address for your user id.
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className={
                  "form-control " +
                  (this.state.passwordvalid ? " " : "is-invalid")
                }
                id="password"
                value={this.state.password}
                onChange={this.onChangePassword}
                name="password"
              />
              <div className="invalid-feedback">
                Please provide a password at least 8 characters in length with
                at least one capital, number and special character.
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="passwordconfirm">Confirm Password</label>
              <input
                type="password"
                className={
                  "form-control " +
                  (this.state.passwordconfirmvalid ? " " : "is-invalid")
                }
                id="passwordconfirm"
                value={this.state.passwordconfirm}
                onChange={this.onChangePasswordConfirm}
                name="passwordconfirm"
              />
              <div className="invalid-feedback">
                The two passwords must match to continue.
              </div>
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
                className={
                  "form-control " + (this.state.pricevalid ? " " : "is-invalid")
                }
                id="price"
                value={this.state.price}
                onChange={this.onChangePrice}
                name="price"
              />
              <div className="invalid-feedback">
                Please provide a valid price for the desired vehicle.
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="make">Make of Vehicle</label>
              <input
                type="text"
                className={
                  "form-control " + (this.state.makevalid ? " " : "is-invalid")
                }
                id="make"
                value={this.state.make}
                onChange={this.onChangeMake}
                name="make"
              />
              <div className="invalid-feedback">
                Please provide the make of the desired vehicle.
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="model">Model of Vehicle</label>
              <input
                type="text"
                className={
                  "form-control " + (this.state.modelvalid ? " " : "is-invalid")
                }
                id="model"
                value={this.state.model}
                onChange={this.onChangeModel}
                name="model"
              />
              <div className="invalid-feedback">
                Please provide the model of the desired vehicle.
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="income">Your Average Annual Income</label>
              <input
                type="text"
                className={
                  "form-control " +
                  (this.state.incomevalid ? " " : "is-invalid")
                }
                id="income"
                value={this.state.income}
                onChange={this.onChangeIncome}
                name="income"
              />
              <div className="invalid-feedback">
                Please provide a valid annual income.
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="creditscore">Your Credit Score</label>
              <input
                type="text"
                className={
                  "form-control " +
                  (this.state.creditscorevalid ? " " : "is-invalid")
                }
                id="creditscore"
                value={this.state.creditscore}
                onChange={this.onChangeCreditScore}
                name="creditscore"
              />
              <div className="invalid-feedback">
                Please provide a valid credit score between 300-850.
              </div>
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
