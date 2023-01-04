import React from 'react'
import { connect } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Template } from './components/MainComponents';
import './App.css';
import Router from './Routes'
import Header from './components/partials/Header'
import Footer from './components/partials/Footer'

const Page = (props) => {
  return (
  <BrowserRouter>
    <Template>
      <Header />
      <Router />
      <Footer />
    </Template>
  </BrowserRouter>
);
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps) (Page)