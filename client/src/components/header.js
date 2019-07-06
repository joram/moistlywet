import React from "react";
import {Menu, Image, Grid} from "semantic-ui-react";
import logo from "../static/moisture.png"
import {GoogleLogin, GoogleLogout} from "react-google-login";
import { Link } from "react-router-dom";



class ProfileMenu extends React.Component {

    render(){
        if(this.props.user === null){
            return <GoogleLogin
                clientId="84319228244-9k7qmqmsu2cvsv58lndtsmcl2nl8ovvj.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={this.props.loginSuccess}
                onFailure={this.props.loginFailure}
                responseType={"token"}
                offline={true}
                isSignedIn={true}
                // autoLoad={true}
            />
        }
        return <>
            {/*<GoogleLogout*/}
            {/*  clientId="84319228244-9k7qmqmsu2cvsv58lndtsmcl2nl8ovvj.apps.googleusercontent.com"*/}
            {/*  buttonText="Logout"*/}
            {/*  onLogoutSuccess={this.props.logoutSuccess}*/}
            {/*/>*/}
            <span style={{paddingRight:"10px"}}>{this.props.user.name}</span>
            <Image src={this.props.user.imageUrl} circular size="mini" />
        </>
    }
}


class Header extends React.Component {

    render(){
        let authed_items = <>
            <Menu.Item>
                <Link to="/plants">My Plants</Link>
            </Menu.Item>
            <Menu.Item position="right">
                <ProfileMenu
                    loginSuccess={this.props.loginSuccess}
                    loginFailure={this.props.loginFailure}
                    logoutSuccess={this.props.logoutSuccess}
                    user={this.props.user}
                />
            </Menu.Item>
        </>;
        if(this.props.user === null){
            authed_items = <></>
        }

        return <>
            <Menu id="header_menu">
                <Menu.Item>
                    <Link to="/">
                        <Grid columns={2} >
                        <Grid.Column><Image src={logo} size="mini"/></Grid.Column>
                            <Grid.Column><span style={{position:"relative", left:"-20px", top:"10px"}}>Moistlywet</span></Grid.Column>
                        </Grid>
                    </Link>
                </Menu.Item>
                {authed_items}
            </Menu>
        </>
    }
}

export default Header;