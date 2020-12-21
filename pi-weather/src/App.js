import './App.css';
import React from "react";
import data from "./Backend/Logs/data.json"

import CanvasJSReact from './canvasjs.react';
// var CanvasJS = CanvasJSReact.CanvasJS;
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
            <h2>Klockan är <Clock /> och ute är det <Curr /></h2>
        </div> 
    );
}

function Body (){
    return(
        <div Style = "padding-top:4em;">
            Bodyyyy
            <TempGraph />
            <HumidGraph />
        </div>
    );
}

function Curr(){
    let temp = data.weather_logs[data.weather_logs.length - 1].Temp
    let humi = data.weather_logs[data.weather_logs.length - 1].Humi

    return (
        <div Style ="display: inline-block;">
          {temp+"*C " + humi+"%"}
        </div>
    );
}

function HumidGraph (){
	
    let options = {
        theme: "light2", // "light1", "dark1", "dark2"
        animationEnabled: true,
        zoomEnabled: true,
        title: {
            text: "Luftfuktighet det senaste dygnet"
        },
        data: [{
            type: "line",
            xValueFormatString: "HH MM",
            yValueFormatString: "##.##%",
            dataPoints: humidData()
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

function humidData(){
    var hs = [];
    for (const elem of data.weather_logs){
        hs.push({x: new Date(elem.Date), y: parseFloat(elem.Humi)})
    } 
    console.log(hs); 
    return hs;
}


function TempGraph (){
	
		let options = {
			theme: "light2", // "light1", "dark1", "dark2"
			animationEnabled: true,
			zoomEnabled: true,
			title: {
				text: "Temperatur det senaste dygnet"
			},
			data: [{
				type: "line",
				xValueFormatString: "HH MM",
				yValueFormatString: "##.##C",
				dataPoints: tempData()
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

/* add function of getting the list of temp and list of humidity from a Json object*/
function tempData(){
    var ts = [];
    for (const elem of data.weather_logs){
        ts.push({x: new Date(elem.Date), y: parseFloat(elem.Temp)})
    } 
    console.log(ts); 
    return ts;
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
