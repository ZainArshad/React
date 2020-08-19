import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody,
            CardTitle, Breadcrumb, BreadcrumbItem,Button, CardFooter } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors} from 'react-redux-form';
import { Modal,Row, Col,Label,ModalBody,ModalHeader,FormGroup,Form,Input} from 'reactstrap';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';
import  {baseUrl} from '../shared/baseUrl';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);



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
             this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
             
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
  
 
 
 

function RenderDish({dish}){
    console.log(dish);
    return(
        <div className="col-12 col-sm-6 m-1">
            <FadeTransform
                in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
            <Card>
                <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
            </FadeTransform>
        </div>
    )
}

function RenderComments({comments, postComment, dishId}) {
    if(comments!=null)
    return(
        <div className="col-12 col-md-12 m-1">
            <h4>Comments</h4>
            <ul className="list-unstyled">
            <Stagger in>
                        {comments.map((comment) => {
                            return (
                                <Fade in>
                                <li key={comment.id}>
                                <p>{comment.comment}</p>
                                <p>-- {comment.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                                </li>
                                </Fade>
                            );
                        })}
                        </Stagger>
            </ul>
            <CommentForm dishId={dishId} postComment={postComment} />
        </div>
    )
}

class DishDetail extends Component {
    constructor(props) {
        super(props);
    this.state = {selectedComments:null  }
    }

    renderAgain(coms){
        const com = this.comments.map((comment) => {
            return (
              <div  >
                <ul className = "list-unstyled">Zain</ul>
                <li>{this.comment.comment}</li>
              </div>
            );
        });
    }

    
    
    RenderComments(comments){
       debugger;
    
       if(comments!=null )
       {
           debugger;
          console.log(this.comments);
          const com = comments.map((comment) => {
            return (
              <div  >
                
                <li>{comment.comment}</li>
                <li><br></br></li>
                <li>-- {comment.author}, {new Intl.DateTimeFormat('en-US', {year: 'numeric',month: 'long',day: '2-digit'}).format(new Date(comment.date))}</li>
                <li><br></br></li>
                
              </div>
            );
        });
               
          return (
             com
              );  
          
       }
       else
       {
           console.log(comments);
           return(
            <div>
                <p>No show</p>
                <p>{this.comments}</p>
            </div>
           )
       }
    }

    render() { 
        let dishs=this.props.dish;
        
        if (dishs != null)
    {
        return (  
            <div className="container">
            <div className="row">
                <Breadcrumb>

                    <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{this.props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{this.props.dish.name}</h3>
                    <hr />
                </div>                
            </div>
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    <RenderDish dish={this.props.dish} />
                </div>
                <div className="col-12 col-md-5 m-1">
                <RenderComments comments={this.props.comments} postComment={this.props.postComment} dishId={this.props.dish.id}/>
                </div>
            </div>
            </div>
        );
    }
        else
        return(
            <div></div>
        )
    }
}
 
export default DishDetail;