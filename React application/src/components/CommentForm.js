import React,{Component} from 'react';
import {Button, Modal,Row, Col,Label,ModalBody,ModalHeader,FormGroup,Form,Input} from 'reactstrap';
import { Control, LocalForm, Errors} from 'react-redux-form';


const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
const isNumber = (val) => !isNaN(Number(val));
const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

class CommentForm extends Component {
   constructor(props){
       super(props);
    this.state = {
            isNavOpen: false,
            isModalOpen: false
          };
          this.toggleModal = this.toggleModal.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        }
          handleLogin(event) {
            this.toggleModal();
            alert("Username: " + this.ratings.value + " Password: " + this.yourname.value
            );
            event.preventDefault();
    
        }

        handleSubmit(values) {
            console.log('Current State is: ' + JSON.stringify(values));
            alert('Current State is: ' + JSON.stringify(values));
            
        }
        
          toggleModal() {
            this.setState({
              isModalOpen: !this.state.isModalOpen
            });
          }

    render() { 
        return (  
            <div className="container">
            <div className="row">
                <div className="col-12 col-md-12">
                
                    <Button outline color="secondary" onClick={this.toggleModal}>
                    <i className="fa fa-pencil m-1"> </i>
                     Submit Content
                    </Button>
                </div>
            </div>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Content</ModalHeader>
                    <ModalBody>
                    <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                        <Row className="form-group">
                        <Label htmlFor="ratings" md={12}>Ratings</Label>
                        <br></br>
                            <Col md={12}>
                           
                                    <Control.select model=".ratings" name="ratings"
                                        className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                               
                            </Col>
                        </Row>
                    <Row className="form-group">

                              <Label htmlFor="yourname" md={12} >Your Name</Label>
                                <Col md={12}>
                                    <Control.text model=".yourname" id="yourname" name="yourname"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                         />
                                    <Errors
                                        className="text-danger"
                                        model=".yourname"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                     />
                                </Col>
                            </Row>
                            
                            
                            
                            
                            <Row className="form-group">
                                <Label htmlFor="message" md={12}>Your Feedback</Label>
                                <Col md={12}>
                                    <Control.textarea model=".message" id="message" name="message"
                                        rows="12"
                                        className="form-control" />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size:11}}>
                                    <Button type="submit" color="primary">
                                    Submit
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
        </div>
        );
    }
}
 
export default CommentForm;


