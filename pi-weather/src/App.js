import './App.css';
import React from "react";
import data from "./Backend/Logs/data.json"

import CanvasJSReact from './canvasjs.react';
// var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var hs = [];
var ts = [];

var temp = data.weather_logs[data.weather_logs.length - 1].Temp;
var humi = data.weather_logs[data.weather_logs.length - 1].Humi;

update();

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
    </div>
    );
}

function Head (){
    return(
        <div>
            <h1 Style = "font-size:7em; margin-left:3em; padding-left: 0.1em; width: 2.65em;" Class = "shadow-6"> <Clock /> </h1>
            <h1> </h1>
            <h2 Style = "margin-top:-3em;">Nuvarande temperatur: <CurrT /></h2> 
            <h2 Style="padding-top:1em;">Nuvarande Luftfuktighet: <CurrH /></h2> 
        </div> 
    );
}

function Body (){
    return(
        <div Style = "padding-top:4em;">
            
            <TempGraph /> 
        
            <HumidGraph /> 
        </div>
    );
}

function CurrT(){
    return (
        <div>    
            <h1>
            {temp + "\u00B0 C "}
            </h1>
        </div>
    );
}

function CurrH(){
    return (
        <div>    
            <h1>
            {humi+"%"}
            </h1>
        </div>
    );
}

function update(){
    humidData();
    tempData();
    let temp = data.weather_logs[data.weather_logs.length - 1].Temp;
    let humi = data.weather_logs[data.weather_logs.length - 1].Humi;
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
            dataPoints: hs
        }]}
    
    return (
    <div Style = "padding-top:6em">
        <CanvasJSChart options = {options} 
            /* onRef={ref => this.chart = ref} */
        />
        {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
    </div>
    );
  
}

function humidData(){
    hs.length = 0;
    var from = new Date();
    from.setDate(from.getDate() -1);
    for (const elem of data.weather_logs){
	if (new Date(elem.Date) >= from){
		hs.push({x: new Date(elem.Date), y: parseFloat(elem.Humi)})
	}
    } 
}

/* TODO implement different line colors for different temperatures, see http://jsfiddle.net/canvasjs/tshg7tLg/
function lineColor(elm){
    if elem.y <= - function dataGenerator(limit) {
        var y = 100;
        var points = [];
        var color;
        for (var i = 0; i < limit; i += 1) {
          y += (Math.random() * 100 - 50);
          if (y > 50)
            color = "red";
          else
            color = "blue";
          points.push({
            x: i - limit / 2,
            y: y,
            lineColor: color,
            color:color
          });
        }
        return points;
      }
}*/

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
				dataPoints: ts
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
    ts.length = 0;
    var from = new Date();
    from.setDate(from.getDate() - 1);
    for (const elem of data.weather_logs){
	if (new Date(elem.Date) >= from){
        	ts.push({x: new Date(elem.Date), y: parseFloat(elem.Temp)})
	}
    } 
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
        update();
    }

    render() {
      return (
        <div Style ="display: inline-block;">
          {this.state.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' , hour12: false})}
        </div>
      );
    }
}


export default App;
