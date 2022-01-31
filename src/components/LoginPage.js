import React from 'react';
import { connect } from 'react-redux';
import { startLoginGoogle, startLoginFacebook, startLoginGitHub, startLoginTwitter } from '../actions/auth';

export const LoginPage = ({ startLoginGoogle, startLoginFacebook, startLoginGitHub, startLoginTwitter }) => (
  <div className="box-layout">
    <div className="box-layout__box">
      <h1 className="box-layout__title">Expensify</h1>
      <p>It's time to get your expenses under control</p>
      <button onClick={startLoginGoogle} className="button__login button__login--google"><i className="fa fa-google" aria-hidden="true"></i>Login With Google</button>
      <button onClick={startLoginGitHub} className="button__login button__login--github"><i className="fa fa-github" aria-hidden="true"></i>Login With Github</button>
      <button onClick={startLoginFacebook} className="button__login button__login--facebook"><i className="fa fa-facebook" aria-hidden="true"></i>Login With Facebook</button>
      <button onClick={startLoginTwitter} className="button__login button__login--twitter"><i className="fa fa-twitter" aria-hidden="true"></i>Login With Twitter</button>
    </div>
  </div>
);

const mapDispatchToProps = (dispatch) => ({
  startLoginGoogle: () => dispatch(startLoginGoogle()),
  startLoginFacebook: () => dispatch(startLoginFacebook()),
  startLoginGitHub: () => dispatch(startLoginGitHub()),
  startLoginTwitter: () => dispatch(startLoginTwitter())
});

export default connect(undefined, mapDispatchToProps)(LoginPage);
