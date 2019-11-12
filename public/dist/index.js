
 
 //desktop
 var isMobile=navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i) !=null;

 var isiPad = navigator.userAgent.match(/iPad/i) != null; 
 
 var isiPhone = navigator.userAgent.match(/iPhone|iPod/i) != null;  
 
 //baidu
 var isBaidu = navigator.userAgent.match('baidu') != null;
 
 //QQ browser
 var isQQ = navigator.userAgent.match('MQQBrowser') != null;
 
 //Saferi Browser
 var isFirefox = navigator.userAgent.match('FxiOS') != null;
 
 // UC Browser
 var  isUC = navigator.userAgent.indexOf("UCBrowser") != -1;
 
 // Chrome 1+
 var isChrome = navigator.userAgent.match('CriOS') != null;
 
 //xiaomi
 var isXiaomi = navigator.userAgent.match('XiaoMi') != null;
 
 
 //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~!!!!!!!!!!!!!!!!!
 
 //isSafari 变量在CocosCreator源码中用到不能随便删除！！！！！！！！！！
 
 //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~!!!!!!!!!!!!!!!!!
 // Safari 3.0+ "[object HTMLElementConstructor]"
 var isSafari = navigator.userAgent.match('Safari') && !isBaidu && !isFirefox && !isQQ && !isChrome && !isUC && !isXiaomi;
 
 var isAndroid = /android/i.test(navigator.userAgent || navigator.vendor || window.opera);
 
 var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
 
 
 var maxPorHet = 0;
 var maxLanHet = 0;
 
 // window.test = function(){
 
 //     this.console.log("window.test ");    
 // }
 
 window.isBuild = function( value ){
     
     build = value;
 }
 
 /**
  * [requestFullScreen 进入全屏]
  */
 function requestFullScreen() {
     var de = document.documentElement;
     if (de.requestFullscreen) {
         de.requestFullscreen();
     } else if (de.mozRequestFullScreen) {
         de.mozRequestFullScreen();
     }
 }
 
 /**
  * [isFullscreenEnabled 判断全屏模式是否是可用]
  * @return [支持则返回true,不支持返回false]
  */
 function isFullscreenEnabled(){
     return document.fullscreenEnabled       ||
            document.mozFullScreenEnabled    || false;
 }
 
 
 
 var bodyTag = document.getElementsByTagName('body')[0];
 
 var mask = null
 function displaySwipe() {
     mask.style.display = "flex";
     var isFullScreen =  window.navigator.standalone | false;
     if(!isFullScreen){
         bodyTag.style.height = '150%';
     }
 }
 
 function hideSwipe(){
     mask.style.display = "none";
 }
  
 
 var isFull = false;
 function setOrientationSize(maxHet) {
 
 
     if (false) {
         var bodyHeight = document.body.offsetHeight;
         var scrollHeight = document.body.scrollHeight;
         var styleHeight = document.body.styleHeight;
         var windowHeight = Math.round(window.innerHeight*1.01);
         var isFullScreen  = (windowHeight >= bodyHeight);
         console.log("window.orientation：",window.orientation,isFullScreen,windowHeight,bodyHeight,scrollHeight,styleHeight);
         if(isFullScreen || window.isFocusOnEditBox == true || isFull){
             hideSwipe();
         
         }
         else{
 
             if(isSafari) {
                 setTimeout(function(){
                     if(window.scrollY > 0) {
                         window.scrollTo(0,0);
                         isFull = true;
                     }
                 },200);
             } else {
                 bodyTag.style.height = '100%';
                 if(window.scrollY > 0) {
                     setTimeout(function(){window.scrollBy(0,-10);},1000);
                 }
             }
             displaySwipe();
             
         }
         
     }else{
 
         if(window.innerHeight >= maxHet){
             hideSwipe();    
             if(window.innerHeight > maxHet*1.01) {
                 maxHet = window.innerHeight;
             }
             if(isSafari) {
                 setTimeout(function(){
                     if(window.scrollY > 0) {
                         window.scrollTo(0,0);
                     }
                 },200);
             } else {
                 bodyTag.style.height = '100%';
                 if(window.scrollY > 0) {
                     setTimeout(function(){window.scrollBy(0,-10);},1000);
                 }
             }
             // cmkj.EventCtrl.sendDataEvent("test", window.innerHeight + " v2 " + maxHet + " " + maxPorHet + " " + maxLanHet);
             
         }else {
             displaySwipe();
         }
     }
 
     return maxHet;
 }
 
 
 function setOnOriention() {
     // if(isSafari) {
     //     setTimeout(function(){
     //         if(window.scrollY > 0) 
     //         {
     //             window.scrollTo(0,0);
     //         }
     //     },50);
     // }
 
     // setTimeout(function(){
     //     setOri();
     // }, 500)
 
 
     setInterval(function () 
     {
         if(window.orientation == 90 || window.orientation == -90 ){        
 
             if(window != top){        
                 if (window.innerHeight !== document.documentElement.clientHeight) 
                 {
                     displaySwipe();
                 }
             }
             else{
 
                 if (window.innerHeight !== document.documentElement.clientHeight) 
                 {
                     displaySwipe();
                 }
             }
         }
         else{
             hideSwipe();
         }
 
     },1000);
 }
 
 
 
 //safari第一次会自动滑动一下。
 var isFirstScroll = true;
 function setOnScroll() {
     if(isFirstScroll) {
         isFirstScroll = null;
         return;
     }
     setOri();
 }
 
 function setOri(){
 
     // if(window.orientation == 0 || window.orientation == 180){
     //     maxPorHet = setOrientationSize(maxPorHet);
     // }
     if(window.orientation == 90 || window.orientation == -90){
         maxLanHet = setOrientationSize(maxLanHet);
     }
 }
 
 
 function setOnResize() {
     setTimeout(function(){
         setOri();
     }, 500)
 }
 
 
 window.addEventListener('load', function() {
     mask = document.getElementById("mask");
     // if(window.orientation == 0 || window.orientation == 180){
     //     displaySwipe();
     //     maxPorHet = window.innerHeight;
     // }
 
     if (!isSafari || !iOS) {
        hideSwipe();
        return;
     }
 
     if(window.orientation == 0 || window.orientation == 180)
     {
         hideSwipe();
     }
 
     else if(window.orientation == 90 || window.orientation == -90){
         displaySwipe();
         maxLanHet = window.innerHeight;
     }
 
     window.addEventListener('orientationchange', function () {
         setOnOriention();
     });
     if(window.addEventListener){
         window.addEventListener('scroll', setOnScroll, false);
         //window.addEventListener("resize", setOnResize, false);
     } else {
         window.attachEvent('onscroll', setOnScroll);
         //window.attachEvent('onresize', setOnResize);
     }
     
 
 }, false);