var PlayThisRecitation = "/audio/bismillah.m4a";
var audioPlayer = Ti.Media.createSound({url: PlayThisRecitation, allowBackground: false, preload: true});

//set max value of slider to sound duration in miliseconds
var soundMaxValue;


var i = setInterval(function()
    {
        if (audioPlayer.playing == true)
        {     
            
   
            $.slider.value = audioPlayer.time * 0.001;
            

        }
    },500);
    

var isAudioPlaying = 0;

var GetAudioStartedPlaying = function(){

     if(isAudioPlaying == 0){
            
        audioPlayer.play();
         
         soundMaxValue = audioPlayer.duration * 0.001; 
         $.slider.max = soundMaxValue;
        //start the audio 
         audioPlayer.time = $.slider.value / 0.001;
        //start the audio 
        isAudioPlaying = 1;
        $.startStopButtonRev.backgroundImage = "/images/playbuttonpressed.png";
        
    } else if(isAudioPlaying == 1) {
        audioPlayer.pause();
        
        isAudioPlaying = 0;
        $.startStopButtonRev.backgroundImage = "/images/pausebutton.png";
    } else if(audioPlayer.paused == true){
       isAudioPlaying = 1;
       
        audioPlayer.play();
       
        $.startStopButtonRev.backgroundImage = "/images/playbuttonpressed.png";
    } else {
       
    }     
};

function updateLabel(e){
    var totalseconds = e.value;
    var soundMinTime = Math.floor(totalseconds / 60);
    var soundSecTime = totalseconds - (soundMinTime * 60) - 0.499;
     
    
    if (soundMinTime < 10 && soundSecTime < 9) {
        $.sliderTxt.text = " 0" + soundMinTime + ":" + "0" + Math.round(soundSecTime) +"";
    }
    if (soundMinTime < 10 && soundSecTime > 9) {
         $.sliderTxt.text = " 0" + soundMinTime + ":" + Math.round(soundSecTime) +"";
    }
    if (soundSecTime < 9) {
        $.sliderTxt.text = " 0"+ soundMinTime + ":" + "0" + Math.round(soundSecTime) +"";
    }
  
}

$.slider.addEventListener('start', function(e) {

    audioPlayer.time = e.value / 0.001;

});

$.slider.addEventListener('touchend', function(e) {
 
   audioPlayer.time =  e.value / 0.001;
    
});

$.startStopButtonRev.addEventListener('click',GetAudioStartedPlaying);


audioPlayer.addEventListener('complete',function(){
    isAudioPlaying = 0;
     $.slider.value = 0;
    $.startStopButtonRev.backgroundImage = "/images/playbutton.png";
});


$.index.open();
//setTimeout(function(){$.startStopButtonRev.fireEvent("click", GetAudioStartedPlaying);}, 10000);


