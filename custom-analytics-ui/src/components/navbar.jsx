import React from 'react';
import './navbar.css';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

const customContentStyle = {
  width: '25%'
};

class TopNavbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = { dialogIsOpen: false };

    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSignin = this.handleSignin.bind(this);
    this.handleSignout = this.handleSignout.bind(this);
  }

  handleOpen() {
    this.setState({ dialogIsOpen: true });
  }

  handleClose() {
    this.setState({ dialogIsOpen: false });
  }

  handleSignin() {
    this.props.fakeAuth.authenticate(() => {
      this.handleClose();
      this.setState({ redirectToReferrer: true })
    })
  }

  handleSignout() {
    this.props.fakeAuth.signout(() => {
      this.setState({ redirectToReferrer: false });
    })
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
        key={1}
      />,
      <FlatButton
        label="Sign in"
        primary={true}
        onTouchTap={this.handleSignin}
        key={2}
      />,
    ];
    // add className="active" to <li> to highlight current page:
    return (<nav className="topnav">
      <div className="nav-wrapper">
        <a href="#/" className="brand-logo left">Qliktive - Assisted Prescription</a>
        <ul className="right">
          <li><a href="#/app">App</a></li>
         { (this.props.fakeAuth.isAuthenticated) ? 
            (<li> <a href="#" onClick={this.handleSignout}>Sign out</a></li>)
           : (<li> <a href="#" onClick={this.handleOpen}>Sign in</a></li>)
          }
            <Dialog
              title="Sign in"
              modal={false}
              open={this.state.dialogIsOpen}
              onRequestClose={this.handleClose}
              contentStyle={customContentStyle}
            >
              <form action="/" method="POST" onSubmit={(e) => { e.preventDefault(); alert('Submitted form!'); this.handleClose(); }}>
                <TextField name="userid" hintText="User ID" />
                <br />
                <TextField name="pwd" type="password" hintText="Password" />
                <div style={{ textAlign: 'right', padding: 8, margin: '24px -24px -24px -24px' }}>
                  {actions}
                </div>
              </form>
            </Dialog>
        </ul>
      </div>
    </nav>
    );
  }
}
export default TopNavbar;
