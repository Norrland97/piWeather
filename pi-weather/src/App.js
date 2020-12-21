import logo from './logo.svg';
import './App.css';
import React from "react";
//import graphView from "./Graph"

import CanvasJSReact from './canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

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
            <Graph />
        </div>
    );
}

function Graph (){
	
		let options = {
			theme: "light2", // "light1", "dark1", "dark2"
			animationEnabled: true,
			zoomEnabled: true,
			title: {
				text: "Temperatur det senaste dygnet"
			},
			data: [{
				type: "line",
				dataPoints: generateDataPoints(192)
			}]}
		
		
		return (
		<div>
			<CanvasJSChart options = {options} 
				/* onRef={ref => this.chart = ref} */
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
      
}

function showFile(e) {
    const reader = new FileReader()
    reader.onload = async (e) => { 
        const text = (e.target.result)
        console.log(text)
        alert(text)
    };
    reader.readAsText(e.target)
}

function generateDataPoints(noOfDps) {
    showFile("./Backend/Logs/log.txt")
    var xVal = 1, yVal = 0;
    var dps = [];
    for(var i = 0; i < noOfDps; i++) {
        yVal = yVal +  Math.round(1 + Math.random() *(-1-1));
        dps.push({x: xVal,y: yVal});	
        xVal++;
    }
    return dps;
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
            }, 30000);
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
