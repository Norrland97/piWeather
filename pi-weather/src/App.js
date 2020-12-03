import logo from './logo.svg';
import './App.css';
import React from "react";

function App() {
    return (
        <Contents />
        );
}

function Contents(){
    return( 
    <div Style = "width: 80%; padding-left: 10%">
        <Head />
        <Body />
        <h>hallojsan</h>
    </div>
    );
}

function Head (){
    return(
        <div>
            <h1>Hallojsan!</h1>
            <h2>Klockan är <Clock />.</h2>
        </div>
    );
}

function Body (){
    return(
        <div Style = "padding-top:4em;">
            Bodyyyy
        </div>
    );
}


class Clock extends React.Component {
    constructor (props){
        super(props);
        this.state = {date: new Date()};
    }

    componentDidMount() {
        if(!this.timerId){     
            this.timerId = setInterval(()=>{
              this.tick();
            }, 1000);
          }
      }

    componentWillUnmount (){
        clearInterval (this.timerID);
    }

    tick (){
        this.setState ({date: new Date()});
    }

    render() {
      return (
        <div Style ="display: inline-block;">
          {this.state.date.toLocaleTimeString()}
        </div>
      );
    }
  }

export default App;
