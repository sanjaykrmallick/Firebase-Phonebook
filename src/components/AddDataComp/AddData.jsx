import React, { Component, Fragment } from "react";
import {
  Col,
  Container,
  Row,
  Button,
  Card,
  CardBody,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import DataService from "../../services/crud.service";

class AddData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: {
        name: "",
        address: "",
        phone: "",
      },
      isDirty: {
        name: false,
        address: false,
        phone: false,
      },
      errors: {},
      submitted: false,
    };
  }

  _handleOnChange = (field, value) => {
    // debugger
    const { userData, isDirty } = this.state;
    if (!value && typeof value === "number") {
      userData[field] = "";
      isDirty[field] = true;
      this.setState({ userData, isDirty }, () => {
        this._validateForm();
        console.log(this.state);
      });
      return;
    } else {
      userData[field] = value;
    }
    isDirty[field] = true;
    this.setState({ userData, isDirty }, () => {
      this._validateForm();
      console.log(this.state);
    });
  };

  _validateForm() {
    // debugger;
    const { userData, isDirty, errors } = this.state;
    Object.keys(userData).forEach((each) => {
      switch (each) {
        case "name": {
          if (isDirty.name) {
            if (!userData.name.trim().length) {
              errors[each] = "* Required";
            } else {
              delete errors[each];
              isDirty.name = false;
            }
          }
          break;
        }
        case "address": {
          if (isDirty.address) {
            if (!userData.address.trim().length) {
              errors.address = "* Required";
            } else {
              delete errors[each];
              isDirty.address = false;
            }
          }
          break;
        }
        case "phone": {
          if (isDirty.phone) {
            if (
              userData.phone.toString().length < 10 ||
              userData.phone.toString().length > 10
            ) {
              errors[each] = "* Invalid Input:- 10 digits only";
            } else {
              if (!userData.phone) {
                errors[each] = "* Please fill above field";
              }
              delete errors[each];
              isDirty.phone = false;
            }
          }
          break;
        }
        default: {
          console.log("Error in validation_switch_case ");
          break;
        }
      }
    });
    this.setState({ errors });
    return Object.keys(errors).length ? errors : null;
  }
  _handleOnSubmit = (e) => {
    e.preventDefault();
    let isDirty = {
      name: true,
      address: true,
      phone: true,
    };
    this.setState({ isDirty }, () => {
      let errors = this._validateForm();
      console.log(errors);
      if (!errors) {
        const { userData } = this.state;
        console.log("Final API call: ", userData);
        this.saveData();
      }
    });
  };

  saveData() {
    const { userData } = this.state;
    let data = {
      name: userData.name,
      address: userData.address,
      phone: userData.phone,
    };

    DataService.create(data)
      .then(() => {
        console.log("Created new item successfully!");
        this.setState({
          submitted: true,
          userData: {
            name: "",
            address: "",
            phone: "",
          },
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { userData, errors } = this.state;
    return (
      <Fragment>
        <div className='app flex-row  animated fadeIn innerPagesBg'>
          <Container>
            <Row className='justify-content-center'>
              <Col md='6'>
                <div className=''>
                  <div className='d-flex justify-content-between align-items-center my-3'>
                    <h4 className=''>Add Details :</h4>
                  </div>
                  <Card className='userDetails mb-4'>
                    <CardBody>
                      <FormGroup onSubmit={this._handleOnSubmit}>
                        <Label>Name</Label>
                        <Input
                          type='text'
                          placeholder='Enter Name'
                          value={userData.name}
                          onChange={(e) =>
                            this._handleOnChange("name", e.target.value.trim())
                          }
                        />
                        {errors && (
                          <Fragment>
                            <small className='d-flex' style={{ color: "red" }}>
                              {errors.name}
                            </small>
                          </Fragment>
                        )}
                        <br />
                        <Label>Address</Label>
                        <Input
                          type='text'
                          placeholder='Enter Address'
                          value={userData.address}
                          onChange={(e) =>
                            this._handleOnChange(
                              "address",
                              e.target.value.trim()
                            )
                          }
                        />
                        {errors && (
                          <Fragment>
                            <small className='d-flex' style={{ color: "red" }}>
                              {errors.address}
                            </small>
                          </Fragment>
                        )}
                        <br />
                        <Label>Phone No.</Label>
                        <Input
                          type='text'
                          placeholder='Enter Phone No.'
                          value={userData.phone}
                          onChange={(e) =>
                            this._handleOnChange("phone", e.target.value.trim())
                          }
                        />
                        {errors && (
                          <Fragment>
                            <small className='d-flex' style={{ color: "red" }}>
                              {errors.phone}
                            </small>
                          </Fragment>
                        )}
                        <br />
                        <Button
                          className='btn btn-success'
                          onClick={this._handleOnSubmit}>
                          Submit
                        </Button>
                      </FormGroup>
                    </CardBody>
                  </Card>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </Fragment>
    );
  }
}

export default AddData;
