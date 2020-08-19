import React, { Component } from 'react';
import { Media } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dishes from './DishdetailComponent';
import { Card, CardImg, CardImgOverlay,
    CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';


function RenderMenuItem ({dish, onClick}) {
    return (
        <Card>
            <Link to={`/menu/${dish.id}`} >
            <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name} />
                <CardImgOverlay>
                    <CardTitle>{dish.name}</CardTitle>
                </CardImgOverlay>
            </Link>
        </Card>
    );
}

    class Menu extends Component {

        
    
        onDishSelect(dish) {
            this.setState({ selectedDish: dish});
        }
    
        renderDish(dish) {
            
                return(
                
                    <Dishes dishes={dish} />
                    
                
                );
            
        }

        
    
        render() {
            const menu = this.props.dishes.dishes.map((dish) => {
                console.log("menu ke andar");
                console.log(dish);
                return (
                 <div key={dish.id} className="col-12 col-md-5 m-1">
                     <RenderMenuItem dish={dish}/>
                 </div>
                );
            });
           
            if (this.props.dishes.isLoading) {
                return(
                    <div className="container">
                        <div className="row">            
                            <Loading />
                        </div>
                    </div>
                );
            }
            else if (this.props.dishes.errMess) {
                return(
                    <div className="container">
                        <div className="row"> 
                            <div className="col-12">
                                <h4>{this.props.dishes.errMess}</h4>
                            </div>
                        </div>
                    </div>
                );
            }
            else
            return (
<div className="container">
                <div className="row">
                <Breadcrumb>
                        <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Menu</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>Menu</h3>
                        <hr />
                    </div>                
                </div>
                <div className="row">
                    {menu}
                </div>
            </div>
            );
        }
    }
    export default Menu;