(this["webpackJsonpworkout-interval-timer"]=this["webpackJsonpworkout-interval-timer"]||[]).push([[0],{15:function(e,t,s){},16:function(e,t,s){},9:function(e,t,s){"use strict";s.r(t);var n=s(1),a=s(4),i=s(5),r=s(7),c=s(6),l=s(0),u=s(2),d=s.n(u),o=s(8),h=s.n(o),b=(s(15),s(16),function(e){Object(r.a)(s,e);var t=Object(c.a)(s);function s(){return Object(a.a)(this,s),t.apply(this,arguments)}return Object(i.a)(s,[{key:"render",value:function(){return Object(l.jsxs)("div",{children:[Object(l.jsx)(m,{title:"Workout Interval Timer"}),Object(l.jsx)(j,{})]})}}]),s}(d.a.Component));function m(e){return Object(l.jsxs)("h1",{class:"centerText",children:[Object(l.jsx)("span",{className:"oi","data-glyph":"pulse","aria-hidden":"true"}),e.title,Object(l.jsx)("span",{className:"oi","data-glyph":"pulse","aria-hidden":"true"})]})}var j=function(e){Object(r.a)(s,e);var t=Object(c.a)(s);function s(e){var i;return Object(a.a)(this,s),(i=t.call(this,e)).state={minutes:25,seconds:0,breakTime:!1,breakLength:5,sessionLength:25,runtime:!1,pause:!0},i.setDefault=i.setDefault.bind(Object(n.a)(i)),i.incHandle=i.incHandle.bind(Object(n.a)(i)),i.decHandle=i.decHandle.bind(Object(n.a)(i)),i.toggleBreak=i.toggleBreak.bind(Object(n.a)(i)),i.togglePause=i.togglePause.bind(Object(n.a)(i)),i.countDown=i.countDown.bind(Object(n.a)(i)),i}return Object(i.a)(s,[{key:"componentDidMount",value:function(){this.counting=setInterval(this.countDown,1e3)}},{key:"componentWillUnmount",value:function(){clearInterval(this.state.seconds),clearInterval(this.state.minutes)}},{key:"setDefault",value:function(){this.setState({minutes:25,seconds:0,breakTime:!1,breakLength:5,sessionLength:25,runtime:!1,pause:!0});var e=document.getElementById("beep");e.pause(),e.currentTime=0}},{key:"incHandle",value:function(e){var t;switch(e.target.id){case"session-increment":if(!((t=this.state.sessionLength+1)<=60))return;!1===this.state.runtime?this.setState({sessionLength:t,minutes:t}):this.setState({sessionLength:t});break;case"break-increment":if(!((t=this.state.breakLength+1)<=60))return;this.setState({breakLength:t})}}},{key:"decHandle",value:function(e){var t;switch(e.target.id){case"session-decrement":if(t=this.state.sessionLength-1,!(this.state.sessionLength-1>0))return;!1===this.state.runtime?this.setState({sessionLength:t,minutes:t}):this.setState({sessionLength:t});break;case"break-decrement":if(!((t=this.state.breakLength-1)>0))return;this.setState({breakLength:t})}}},{key:"toggleBreak",value:function(){if(!1===this.state.breakTime)var e=this.state.breakLength;else e=this.state.sessionLength;this.setState((function(t){return{breakTime:!t.breakTime,runtime:!1,minutes:e}})),document.getElementById("beep").play()}},{key:"togglePause",value:function(){this.setState((function(e){return{pause:!e.pause}}))}},{key:"countDown",value:function(){if(this.state.runtime||this.state.pause||this.setState({runtime:!0}),!this.state.pause){var e=[this.state.minutes,this.state.seconds];if(0===this.state.seconds){if(0===this.state.minutes)return void this.toggleBreak();this.state.minutes>0&&(e[0]=this.state.minutes-1,e[1]=59)}else this.state.seconds>0&&(e[1]=this.state.seconds-1);this.setState({minutes:e[0],seconds:e[1]})}}},{key:"render",value:function(){var e=[this.state.minutes,this.state.seconds].map((function(e){return e<10?"0"+e.toString():e.toString()}));return Object(l.jsxs)("div",{className:"timerBody",children:[Object(l.jsx)("div",{className:"centerText",id:"timer-label",children:this.state.breakTime?"Break length remaining:":"Session length remaining:"}),Object(l.jsx)("div",{className:"centerText",id:"time-left",children:e[0]+":"+e[1]}),Object(l.jsx)(g,{type:"session",length:this.state.sessionLength,incHandle:this.incHandle,decHandle:this.decHandle,disableBtnsBreak:!1,breakTime:this.state.breakTime,runtime:this.state.runtime}),Object(l.jsx)(g,{type:"break",length:this.state.breakLength,incHandle:this.incHandle,decHandle:this.decHandle,disableBtnsBreak:!0,breakTime:this.state.breakTime,runtime:this.state.runtime}),Object(l.jsx)(p,{paused:this.state.pause,pause:this.togglePause,reset:this.setDefault}),Object(l.jsx)("audio",{className:"clip",type:"audio/mp3",id:"beep",src:"https://sampleswap.org/samples-ghost/SOUND%20EFFECTS%20and%20NOISES/VIDEO%20GAMES/zelda/294[kb]zelda-get.aif.mp3"})]})}}]),s}(d.a.Component);function p(e){return Object(l.jsxs)("div",{className:"centerObjects",children:[Object(l.jsx)("button",{id:"start_stop",onClick:e.pause,children:e.paused?Object(l.jsx)("span",{className:"oi","data-glyph":"media-play",title:"resume","aria-hidden":"true"}):Object(l.jsx)("span",{className:"oi","data-glyph":"media-pause",title:"pause","aria-hidden":"true"})}),Object(l.jsx)("button",{id:"reset",onClick:e.reset,children:Object(l.jsx)("span",{className:"oi","data-glyph":"loop-circular",title:"Reset","aria-hidden":"true"})})]})}function g(e){return Object(l.jsxs)("div",{className:"",id:e.type+"-label",children:[Object(l.jsxs)("h2",{children:[e.type.toUpperCase()," LENGTH:"]}),Object(l.jsx)("p",{className:"centerText",id:e.type+"-length",children:e.length}),Object(l.jsx)(k,{incHandle:e.incHandle,decHandle:e.decHandle,type:e.type,disableBtnsBreak:e.disableBtnsBreak,breakTime:e.breakTime,runtime:e.runtime})]})}function k(e){return Object(l.jsxs)("div",{className:"incrementControl",children:[Object(l.jsx)("button",{id:e.type+"-increment",onClick:e.incHandle,disabled:!(!e.runtime||e.breakTime!==e.disableBtnsBreak),children:Object(l.jsx)("span",{className:"oi","data-glyph":"caret-top",title:e.type+" increment","aria-hidden":"true"})}),Object(l.jsx)("button",{id:e.type+"-decrement",onClick:e.decHandle,disabled:!(!e.runtime||e.breakTime!==e.disableBtnsBreak),children:Object(l.jsx)("span",{className:"oi","data-glyph":"caret-bottom",title:e.type+" decrement","aria-hidden":"true"})})]})}h.a.render(Object(l.jsx)(b,{}),document.getElementById("root"))}},[[9,1,2]]]);
//# sourceMappingURL=main.a32c2b58.chunk.js.map