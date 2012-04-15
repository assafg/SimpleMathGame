var MathGame = function(){
	var timer = Number(0);
	var maxTime;
	var timerCB;
	var operations = [];
	var timerInterval;
	
	var handleGameOver;
	
	this.getQuestion = function(){
		var op = operations[Math.floor(Math.random()*operations.length)];
		var ok = false;
		do{
			var x = Math.floor(Math.random()*100);
			var y = Math.floor(Math.random()*100);
			if(op == subtract && x<y){
				ok = false;	
			}else if(op == add && x+y>100){
				ok = false;	
			}else{
				ok = true;	
			}
		}while(!ok);
		var sign = getSign(op);
		var question = ''+x+sign+y+'=';
		return question;
	}
	
	this.init = function(timerCallback,onGameOver, setMaxTime){
		operations.push(add);
		operations.push(subtract);
		timerCB = timerCallback;
		handleGameOver = onGameOver;
		maxTime = setMaxTime || 60;
	}
	
	this.start = function(){
		timer = maxTime;
		if(timerInterval) window.clearInterval(timerInterval);
		timerInterval = window.setInterval(timerUpdate, 1000);
	}
	
	function timerUpdate(){
		timer--;
		if(timer<0){
			window.clearInterval(timerInterval);
			handleGameOver();	
		}else{
			timerCB();	
		}
	}
	
	this.getTimer = function(){
		return timer;	 
	}
	
	function getSign(operation){
		if(operation == add){
			return '+';
		}
		if(operation == subtract){
			return '-';	
		}
	}
	function add(a,b){
		return a+b;	
	}
	function subtract(a,b){
		return a-b;	
	}
	
}