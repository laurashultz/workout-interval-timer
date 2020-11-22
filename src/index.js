import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './open-iconic.css';

const projTitle = 'Workout Interval Timer';
const audioURL = 'https://sampleswap.org/samples-ghost/SOUND%20EFFECTS%20and%20NOISES/VIDEO%20GAMES/zelda/294[kb]zelda-get.aif.mp3';

  /*App holds all the child function and class components*/
  class App extends React.Component {
    render (){
      return (
        <div>
        <TitleBlock title={projTitle} />
        <Timer />
        </div>
    );
    }
  }

/*Simple- TitleBlock is just the title block that takes a string for props and returns a cool title w/ some icons */
 function TitleBlock(props){
    return(
    <h1 class="centerText"><span className="oi" data-glyph="pulse" aria-hidden="true"></span> 
    {props.title}
    <span className="oi" data-glyph="pulse" aria-hidden="true"></span></h1>
    );
 }

class Timer extends React.Component{ 
  constructor(props){
    super(props);
    this.state = ({
      minutes: 25,
      seconds: 0,
      breakTime: false,
      breakLength: 5,
      sessionLength: 25,
      runtime: false,
      pause: true
    });
    this.setDefault = this.setDefault.bind(this);
    this.incHandle = this.incHandle.bind(this);
    this.decHandle = this.decHandle.bind(this);
    this.toggleBreak = this.toggleBreak.bind(this);
    this.togglePause = this.togglePause.bind(this);
    this.countDown = this.countDown.bind(this);
  }
  /*when component is mounted, the countDown method starts and cycles every 1000ms (1 sec)*/
  componentDidMount(){
    this.counting = setInterval(this.countDown, 1000);
  }
  /*when component dismounts, the intervals are cleared */
  componentWillUnmount() {
    clearInterval(this.state.seconds);
    clearInterval(this.state.minutes);
  }
  setDefault(){
    this.setState({
      minutes: 25,
      seconds: 0,
      breakTime: false,
      breakLength: 5,
      sessionLength: 25,
      runtime: false,
      pause: true
    });
    var audioBeep = document.getElementById('beep');
    audioBeep.pause();
    audioBeep.currentTime = 0;
  }
  /*incHandle handles incrementing the session and break lengths when the inc buttons are clicked*/
  incHandle(event){
    let length;
    switch(event.target.id){
      case 'session-increment':
        length = this.state.sessionLength+1;
        if(length<=60){
          if(this.state.runtime===false){this.setState({sessionLength: length, minutes: length});
          }else{this.setState({sessionLength: length})}
        } else{
        return;
        }
        break;
      case 'break-increment':
        length = this.state.breakLength+1;
        if(length<=60){this.setState({breakLength: length})
        }else{return}
        break;
      default:
        break;
    }

  }
  /*decHandle handles decrementing the session and break lengths when the inc buttons are clicked*/
  decHandle(event){
    let length;
    switch(event.target.id){
      case 'session-decrement':
        length = this.state.sessionLength-1;
        if(this.state.sessionLength-1>0){
          if(this.state.runtime===false){
            this.setState({sessionLength: length, minutes: length});
            }else{this.setState({sessionLength: length})}
        }else{return}
        break;
      case 'break-decrement':
        length = this.state.breakLength-1;
        if(length>0){
          this.setState({breakLength: length});
        }else{return}
        break;
      default:
        break;
    }
  }
  /*toggleBreak is called after the timer completes a countdown and switches between this.state.breakTime = true/false*/
  toggleBreak(){
    if(this.state.breakTime===false){
      var mins = this.state.breakLength;
    } else {
      mins = this.state.sessionLength;
    }
    this.setState(({breakTime}) => ({breakTime: !breakTime, runtime: false, minutes: mins}));
    var audioBeep = document.getElementById('beep');
    audioBeep.play();
  }
  togglePause(){
    this.setState(({pause})=>({pause: !pause}));
  }
/*The countDown method is the primary logic for this project */
  countDown(){
    if(!this.state.runtime){
      if(!this.state.pause){
        this.setState({runtime: true});
      } 
      }

    if(!this.state.pause){
      var time = [this.state.minutes, this.state.seconds]; 
      if(this.state.seconds===0){
        if(this.state.minutes===0){
          this.toggleBreak(); //toggle break after the 00:00 time has been set
          return;
        } 
        if(this.state.minutes>0){
          time[0]= this.state.minutes-1;
          time[1]= 59;
        } 
      }else if(this.state.seconds>0){
        time[1] = this.state.seconds-1;
      }
        this.setState({
          minutes: time[0],
          seconds: time[1]
        });
      
    }


  }
  render(){
    var timeKeep = [this.state.minutes, this.state.seconds];
    var mappedTime = timeKeep.map((x)=> {if(x<10){return '0'+x.toString()}else{return x.toString()}}); //formats the time to be displayed
    return (
      <div className="timerBody">
        <div className="centerText" id="timer-label">{this.state.breakTime ? 'Break length remaining:':'Session length remaining:'}</div> 
        <div className="centerText" id="time-left">{mappedTime[0]+':'+mappedTime[1]}</div>
        <ControlModule type={"session"} length={this.state.sessionLength} incHandle={this.incHandle} decHandle={this.decHandle} disableBtnsBreak={false} breakTime={this.state.breakTime} runtime={this.state.runtime}/>
        <ControlModule type={"break"} length={this.state.breakLength} incHandle={this.incHandle} decHandle={this.decHandle} disableBtnsBreak={true} breakTime={this.state.breakTime} runtime={this.state.runtime} />
        <TimerControl paused={this.state.pause} pause={this.togglePause} reset={this.setDefault}/>
        <audio className="clip" type="audio/mp3" id='beep' src={audioURL}></audio>
      </div>

    );
  }
}

/*the only function for TimerControl is to hold buttons that call togglePause and setDefault when they are clicked. */
function TimerControl(props){
  return(
    <div className="centerObjects">
      <button id="start_stop" onClick={props.pause}> 
        {props.paused 
          ?<span className="oi" data-glyph="media-play" title="resume" aria-hidden="true"></span>
          :<span className="oi" data-glyph="media-pause" title="pause" aria-hidden="true"></span>}
      </button> 
      <button id="reset" onClick={props.reset}><span className="oi" data-glyph="loop-circular" title="Reset" aria-hidden="true"></span></button>
    </div>

  );
}

/*ControlModule is used to generate each section-- BREAK LENGTH and SESSION LENGTH 
with the incrementors that control how long the session vs. break is*/
function ControlModule(props){
  return (
    <div className="" id={props.type + '-label'}>
    <h2>{props.type.toUpperCase()} LENGTH:</h2>
    <p className="centerText" id={props.type + '-length'}>{props.length}</p>
    <IncrementControl incHandle={props.incHandle} decHandle={props.decHandle} type={props.type} disableBtnsBreak={props.disableBtnsBreak} breakTime={props.breakTime} runtime={props.runtime} />
    </div>
  );
}
/*IncrementControl is used in the ControlModule to generate the buttons to control the break/session times*/
function IncrementControl(props){
  return (
    <div className="incrementControl">
      <button id={props.type + "-increment"} onClick={props.incHandle} disabled={props.runtime && (props.breakTime === props.disableBtnsBreak)?true:false } ><span className="oi" data-glyph="caret-top" title={props.type + " increment"}  aria-hidden="true"></span></button>
      <button id={props.type + "-decrement"} onClick={props.decHandle}  disabled={props.runtime && (props.breakTime === props.disableBtnsBreak)?true:false } ><span className="oi" data-glyph="caret-bottom" title={props.type + " decrement"}  aria-hidden="true"></span></button>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));




