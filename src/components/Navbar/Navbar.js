import React, { Component } from 'react'
import { MenuItems  } from "./MenuItems";
import { AiFillBank,AiOutlineClose } from "react-icons/ai";
import { BiMenu } from "react-icons/bi";
import './Navbar.css';
import {NavLink} from 'react-router-dom';
import { Button } from '../Button';
class Navbar extends Component {

    state={clicked:false}
    handleClick = ()=> {
        this.setState({ 
            clicked:!this.state.clicked
        })
    }


    render() {
        return(
            <nav className="NavbarItems">
            
            <h1 className="navbar-logo">CIBIT<AiFillBank className="fa-react"/></h1>
            <div className="menu-icon" onClick={this.handleClick}>
                 {this.state.clicked ? <AiOutlineClose className="fa-times"/> : <BiMenu className="fa-bars" />}
            </div>
            <ul className={ this.state.clicked ? "nav-menu active" : "nav-menu"}>
                {MenuItems.map((item,index)=> {
                    return (
                        <li key={index}onClick={this.handleClick }>
                            <NavLink className={item.cName} to ={item.url+this.props.uid}>
                                    { item.title}
                            </NavLink>
                        </li>
                    )
                })}
                
            </ul>
            
            </nav>
        )
    }
}

export  default Navbar;