import React, { Component, Fragment } from "react";
import DataService from "../../services/crud.service";
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

class UpdateDataList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currData: {
        key: null,
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
    };
    this.updateDataBase=this.updateDataBase.bind(this);
    this.deleteDataBase=this.deleteDataBase.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { data } = nextProps;
    if (prevState.currData.key !== data.key) {
      return {
        currData: data,
      };
    }

    return prevState.currData;
  }

  componentDidMount() {
    this.setState({
      currData: this.props.data,
    });
  }

  updateDataBase() {
    const { currData } = this.state;
    const data = {
      name: currData.name,
      address: currData.address,
      phone: currData.phone,
    };

    DataService.update(currData.key, data)
      .then(() => {
        this.setState({
          message: "The tutorial was updated successfully!",
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  deleteDataBase() {
    const { currData } = this.state;
    debugger
    DataService.delete(currData.key)
      .then(() => {
        this.props.refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  _handleOnChange = (field, value) => {
    // debugger
    const { currData, isDirty } = this.state;
    if (!value && typeof value === "number") {
      currData[field] = "";
      isDirty[field] = true;
      this.setState({ currData, isDirty }, () => {
        this._validateForm();
        console.log(this.state);
      });
      return;
    } else {
      currData[field] = value;
    }
    isDirty[field] = true;
    this.setState({ currData, isDirty }, () => {
      this._validateForm();
      console.log(this.state);
    });
  };

  _validateForm() {
    // debugger;
    const { currData, isDirty, errors } = this.state;
    Object.keys(currData).forEach((each) => {
      switch (each) {
        case "name": {
          if (isDirty.name) {
            if (!currData.name.trim().length) {
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
            if (!currData.address.trim().length) {
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
              currData.phone.toString().length < 10 ||
              currData.phone.toString().length > 10
            ) {
              errors[each] = "* Invalid Input:- 10 digits only";
            } else {
              if (!currData.phone) {
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
        const { currData } = this.state;
        console.log("Final API call: ", currData);
        this.setState(function (prevState) {
          return {
            currData: {
              ...prevState.currData,
              name: currData.name,
              address: currData.address,
              phone: currData.phone,
            },
          };
        });
        this.updateDataBase();
      }
    });
  };

  render() {
    const { currData, errors } = this.state;
    return (
      <Fragment>
        <div>
          {currData ? (
            <div>
              <Card className='userDetails mb-4'>
                <CardBody>
                  <FormGroup>
                    <Label>Name</Label>
                    <Input
                      type='text'
                      placeholder='Enter Name'
                      value={currData.name}
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
                      value={currData.address}
                      onChange={(e) =>
                        this._handleOnChange("address", e.target.value.trim())
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
                      value={currData.phone}
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
                    <Button className='btn btn-danger mr-2' onClick={this.deleteDataBase}>Delete</Button>
                    <Button
                      className='btn btn-success'
                      onClick={this._handleOnSubmit}>
                      Update
                    </Button>
                  </FormGroup>
                </CardBody>
              </Card>
            </div>
          ) : (
            <Fragment>
              <div>
                <br />
                <p>Please click on a any DataBase...</p>
              </div>
            </Fragment>
          )}
        </div>
      </Fragment>
    );
  }
}

export default UpdateDataList;
