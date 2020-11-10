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
  ListGroup,
  ListGroupItem,
} from "reactstrap";
import UpdateDataList from "./UpdateDataList";
import DataService from "../../services/crud.service";

class DisplayList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataList: [],
      currData: null,
      currIndex: -1,
    };
    this.refreshList = this.refreshList.bind(this);
    this.removeAllData = this.removeAllData.bind(this);
    this.setActiveData = this.setActiveData.bind(this);
    this.onDataChange = this.onDataChange.bind(this);
  }

  componentDidMount() {
    DataService.getAll().on("value", this.onDataChange);
  }

  componentWillUnmount() {
    DataService.getAll().off("value", this.onDataChange);
  }

  onDataChange(items) {
    const dataList = [];
    items.forEach((item) => {
      let key = item.key;
    //   key = key.substring(1);
    //   console.log(key)
      let data = item.val();
      dataList.push({
        key: key,
        name: data.name,
        address: data.address,
        phone: data.phone,
      });
    });
    this.setState({
      dataList: dataList,
    });
  }

  refreshList() {
    this.setState({
      currData: null,
      currIndex: -1,
    });
  }

  setActiveData(data, index) {
    this.setState({
      currData: data,
      currIndex: index,
    });
  }

  removeAllData() {
    DataService.deleteAll()
      .then(() => {
        this.refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { dataList, currData, currIndex } = this.state;

    return (
      <Fragment>
        <div className='app flex-row  animated fadeIn innerPagesBg'>
          <Container>
            <Row className='justify-content-center'>
              <Col md='6'>
                <div className=''>
                  <div className='d-flex justify-content-between align-items-center my-3'>
                    <h4 className=''>Phonebook DataBase :</h4>
                  </div>
                  <ListGroup>
                    {dataList.map((data, index) => (
                      <ListGroupItem
                        className={index === currIndex ? "active" : ""}
                        onClick={() => this.setActiveData(data, index)}
                        key={index}>
                        {data.name}
                      </ListGroupItem>
                    ))}
                  </ListGroup>
                  <Button
                    className='m-3 btn btn-sm btn-danger'
                    onClick={this.removeAllData}>
                    Remove All
                  </Button>
                </div>
              </Col>
              <Col md='6'>
                <div className=''>
                  <div className='d-flex justify-content-between align-items-center my-3'>
                    <h4 className=''>Update DataBase :</h4>
                  </div>
                  {currData ? (
            <UpdateDataList
              data={currData}
              refreshList={this.refreshList}
            />
          ) : (
            <div>
              <br />
              <p>Please click on any DataBase...</p>
            </div>
          )}
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </Fragment>
    );
  }
}

export default DisplayList;
