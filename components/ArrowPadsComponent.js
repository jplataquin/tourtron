import {Component,Template} from '/js/adarna.js';
       
class ArrowPadsComponent extends Component {

    init(){
        this.currentActive  = '';
        this.callback       = ()=>{};
        this.touched        = null;
    }

    view(){
        const t = new Template();

        return t.div(()=>{

    
            t.div({dataEl:'area',class:'area'},()=>{

                
                t.div(()=>{
                    t.div({dataEl:'up', class:'button center up'},()=>{});
                });
            

                t.div(()=>{
                    t.div({dataEl:'left', class:'button float-left left'},()=>{});

                    t.div({dataEl:'neutral', class:'middle float-left'},()=>{});

                    t.div({dataEl:'right', class:'button float-left right'},()=>{});
                    
                    t.div({class:'clearfix'});
                });
                
                t.div(()=>{
                    t.div({dataEl:'down', class:'button center down'},()=>{});
                });
               
            });

        });
    }

    controller(dom){
        //Mousedown
        this.el.neutral.onmousedown = (e)=>{this.neutralActive(e,0)};
        this.el.up.onmousedown      = (e)=>{this.upActive(e,1)};
        this.el.down.onmousedown    = (e)=>{this.downActive(e,2)};
        this.el.left.onmousedown    = (e)=>{this.leftActive(e,3)};
        this.el.right.onmousedown   = (e)=>{this.rightActive(e,4)};
        

        //Mouseup
        this.el.neutral.onmouseup   = (e)=>{this.neutralInactive(e,-1)};
        this.el.up.onmouseup        = (e)=>{this.upInactive(e,5)};
        this.el.down.onmouseup      = (e)=>{this.downInactive(e,6)};
        this.el.left.onmouseup      = (e)=>{this.leftInactive(e,7)};
        this.el.right.onmouseup     = (e)=>{this.rightInactive(e,8)};

        //Mouseout
        this.el.neutral.onmouseout   = (e)=>{this.neutralInactive(e,-1)};
        this.el.up.onmouseout        = (e)=>{this.upInactive(e,9)};
        this.el.down.onmouseout      = (e)=>{this.downInactive(e,10)};
        this.el.left.onmouseout      = (e)=>{this.leftInactive(e,11)};
        this.el.right.onmouseout     = (e)=>{this.rightInactive(e,12)};
       
        //Touchstart
        this.el.neutral.ontouchstart = (e)=>{this.neutralActive(e,0)}
        this.el.up.ontouchstart      = (e)=>{this.upActive(e,13);};
        this.el.down.ontouchstart    = (e)=>{this.downActive(e,14)};
        this.el.left.ontouchstart    = (e)=>{this.leftActive(e,15)};
        this.el.right.ontouchstart   = (e)=>{this.rightActive(e,16)};

        //Touchend
        this.el.neutral.ontouchend   = (e)=>{this.neutralInactive(e,-1)};
        this.el.up.ontouchend        = (e)=>{this.upInactive(e,17);};
        this.el.down.ontouchend      = (e)=>{this.downInactive(e,18)};
        this.el.left.ontouchend      = (e)=>{this.leftInactive(e,19)};
        this.el.right.ontouchend     = (e)=>{this.rightInactive(e,20)};

        //Touchcancel
        this.el.neutral.ontouchcancel   = (e)=>{this.neutralInactive(e,-1)};
        this.el.up.ontouchcancel        = (e)=>{this.upInactive(e,21)};
        this.el.down.ontouchcancel      = (e)=>{this.downInactive(e,22)};
        this.el.left.ontouchcancel      = (e)=>{this.leftInactive(e,23)};
        this.el.right.ontouchcancel     = (e)=>{this.rightInactive(e,24)};

        //ondragstart
        this.el.neutral.ondragsleave   = (e)=>{this.neutralInactive(e,-1)};
        this.el.up.ondragsleave       = (e)=>{this.upInactive(e,25)};
        this.el.down.ondragsleave      = (e)=>{this.downInactive(e,26)};
        this.el.left.ondragsleave      = (e)=>{this.leftInactive(e,27)};
        this.el.right.ondragsleave     = (e)=>{this.rightInactive(e,28)};


        dom.ontouchend = (e)=>{
           
           this.el.neutral.classList.remove('active');
           this.el.up.classList.remove('active');
           this.el.down.classList.remove('active');
           this.el.left.classList.remove('active');
           this.el.right.classList.remove('active');
           this.currentActive = ''; 
           this.callback(this.currentActive,(new Date).getTime(),29);   
       }

       dom.ontouchcancel = (e)=>{
           this.el.neutral.classList.remove('active');
           this.el.up.classList.remove('active');
           this.el.down.classList.remove('active');
           this.el.left.classList.remove('active');
           this.el.right.classList.remove('active');
           this.currentActive = ''; 
           this.callback(this.currentActive,(new Date).getTime(),30); 
       }

  

       dom.ontouchmove = (e)=>{
                               
           let x = e.touches[0].pageX;
           let y = e.touches[0].pageY;


           //NEUTRALACTIVE
           if( x <= this.neutralRect.right && x >= this.neutralRect.left && y >= this.neutralRect.top && y <= this.neutralRect.bottom){
            this.el.neutral.classList.add('active');
            this.touched = this.el.neutral;
            this.currentActive = 'NEUTRAL';
            this.callback(this.currentActive,(new Date()).getTime(),31);
          }
          
          //NEUTRALINACTIVE
          if( this.touched == this.el.up && 
              (x > this.neutralRect.right || 
              x < this.neutralRect.left || 
              y > this.neutralRect.bottom || 
              y < this.neutralRect.top)
          ){
              
              this.el.neutral.classList.remove('active');
              this.touched = null;
              this.currentActive = '';
              this.callback(this.currentActive,(new Date()).getTime(),32);
              
          }


           //UPACTIVE
           if( x <= this.upRect.right && x >= this.upRect.left && y >= this.upRect.top && y <= this.upRect.bottom){
             this.el.up.classList.add('active');
             this.touched = this.el.up;
             this.currentActive = 'UP';
             this.callback(this.currentActive,(new Date()).getTime(),31);
           }
           
           //UPINACTIVE
           if( this.touched == this.el.up && 
               (x > this.upRect.right || 
               x < this.upRect.left || 
               y > this.upRect.bottom || 
               y < this.upRect.top)
           ){
               
               this.el.up.classList.remove('active');
               this.touched = null;
               this.currentActive = '';
               this.callback(this.currentActive,(new Date()).getTime(),32);
               
           }

           
           //DOWNACTIVE
           if(x <= this.downRect.right && x >= this.downRect.left && y >= this.downRect.top && y <= this.downRect.bottom){
               this.el.down.classList.add('active');
               this.touched = this.el.down;
               this.currentActive = 'DOWN';
               this.callback(this.currentActive,(new Date()).getTime(),33);
           }
           
           //DOWNINACTIVE
           if( this.touched == this.el.down && 
               (x > this.downRect.right || 
               x < this.downRect.left || 
               y > this.downRect.bottom || 
               y < this.downRect.top)
           ){
               
               this.el.down.classList.remove('active');
               this.touched = null;
               this.currentActive = '';
               this.callback(this.currentActive,(new Date()).getTime(),34);
               
           }

           //LEFTACTIVE
           if(x <= this.leftRect.right && x >= this.leftRect.left && y >= this.leftRect.top && y <= this.leftRect.bottom){
               this.el.left.classList.add('active');
               this.touched = this.el.left;
               this.currentActive = 'LEFT';
               this.callback(this.currentActive,(new Date()).getTime(),35);
           }
           
           //LEFTINACTIVE
           if( this.touched == this.el.left && 
               (x > this.leftRect.right || 
               x < this.leftRect.left || 
               y > this.leftRect.bottom || 
               y < this.leftRect.top)
           ){
               
               this.el.left.classList.remove('active');
               this.touched = null;
               this.currentActive = 'LEFT';
               this.callback(this.currentActive,(new Date()).getTime(),36);
           }

           //RIGHTACTIVE
           if(x <= this.rightRect.right && x >= this.rightRect.left && y >= this.rightRect.top && y <= this.rightRect.bottom){
               this.el.right.classList.add('active');
               this.touched = this.el.right;
               this.currentActive = 'RIGHT';
               this.callback(this.currentActive,(new Date()).getTime(),37);
           }
           
           //RIGHTINACTIVE
           if( this.touched == this.el.right && 
               (x > this.rightRect.right || 
               x < this.rightRect.left || 
               y > this.rightRect.bottom || 
               y < this.rightRect.top)
           ){
               
               this.el.right.classList.remove('active');
               this.touched = null;
               this.currentActive = '';
               this.callback(this.currentActive,(new Date()).getTime(),38);
               
           }
       }

        dom.handler.onchange = (callback)=>{

            this.callback = callback;
        }
    }

    onPage(){

        this.neutralRect    = this.el.neutral.getBoundingClientRect();
        this.upRect         = this.el.up.getBoundingClientRect();
        this.downRect       = this.el.down.getBoundingClientRect();
        this.leftRect       = this.el.left.getBoundingClientRect();
        this.rightRect      = this.el.right.getBoundingClientRect();
    }

    neutralActive(e,id){
        e.preventDefault();
        e.target.classList.add('active');
        this.currentActive = 'NEUTRAL';
        
        this.callback(this.currentActive,(new Date()).getTime(),id);
    }

    upActive(e,id){
        e.preventDefault();
        e.target.classList.add('active');
        this.currentActive = 'UP';
        
        this.callback(this.currentActive,(new Date()).getTime(),id);
    }

    downActive(e,id){
        e.preventDefault();
        e.target.classList.add('active');
        this.currentActive = 'DOWN'; 
        this.callback(this.currentActive,(new Date()).getTime(),id);       
    }

    leftActive(e,id){
        e.preventDefault();
        e.target.classList.add('active');  
        this.currentActive = 'LEFT';
        this.callback(this.currentActive,(new Date()).getTime(),id);        
    }

    rightActive(e,id){
        e.preventDefault();
        e.target.classList.add('active');
        this.currentActive = 'RIGHT';
        this.callback(this.currentActive,(new Date()).getTime(),id);         
    }


    neutralInactive(e,id){

        if(this.currentActive == '') return false;

        e.preventDefault();
        e.target.classList.remove('active');
        this.currentActive = ''; 
        this.callback(this.currentActive,(new Date).getTime(),id);   
    
    }

    upInactive(e,id){

        if(this.currentActive == '') return false;

        e.preventDefault();
        e.target.classList.remove('active');
        this.currentActive = ''; 
        this.callback(this.currentActive,(new Date).getTime(),id);   
    
    }

    downInactive(e,id){

        if(this.currentActive == '') return false;

        e.preventDefault();
        e.target.classList.remove('active');
        this.currentActive = '';
        this.callback(this.currentActive,(new Date()).getTime(),id);
                
    }

    leftInactive(e,id){
        
        if(this.currentActive == '') return false;

        e.preventDefault();
        e.target.classList.remove('active');
        this.currentActive = ''; 
        this.callback(this.currentActive,(new Date()).getTime(),id);         
    }

    rightInactive(e,id){

        if(this.currentActive == '') return false;

        e.preventDefault();
        e.target.classList.remove('active'); 
        this.currentActive = ''; 
        this.callback(this.currentActive,(new Date()).getTime(),id);           
    }



    style(){

        return {
            '.button':{
                backgroundColor:'rgba(0,0,0,0.3)',
                height:'50px',
                width:'50px'
            },
            '.active':{
                backgroundColor:'pink !important'
            },
            '.area':{
                backgroundColor:'rgba(0,0,0,0.3)',
                height:'150px',
                width:'150px',
                borderRadius:'50%'
            },
            '.float-left':{
                float:'left'
            },
            '.clearfix': {
                content: "",
                clear: 'both',
                display: 'table'
            },
            '.middle':{
                height:'50px',
                width:'50px',
                backgroundColor:'rgba(0,0,0,0.3)',
                borderRadius:'50%'
            },
            '.center':{
                margin: 'auto'
            },
            '.up':{
                backgroundImage:'url("data:image/svg+xml;utf8,<?xml version=\'1.0\' encoding=\'iso-8859-1\'?><svg version=\'1.1\' id=\'Layer_1\' xmlns=\'http://www.w3.org/2000/svg\' xmlns:xlink=\'http://www.w3.org/1999/xlink\' x=\'0px\' y=\'0px\' viewBox=\'0 0 330 330\' style=\'enable-background:new 0 0 330 330;\' xml:space=\'preserve\'><path id=\'XMLID_224_\' d=\'M325.606,229.393l-150.004-150C172.79,76.58,168.974,75,164.996,75c-3.979,0-7.794,1.581-10.607,4.394 l-149.996,150c-5.858,5.858-5.858,15.355,0,21.213c5.857,5.857,15.355,5.858,21.213,0l139.39-139.393l139.397,139.393	C307.322,253.536,311.161,255,315,255c3.839,0,7.678-1.464,10.607-4.394C331.464,244.748,331.464,235.251,325.606,229.393z\'/></svg>")'
            },
            '.down':{
                backgroundImage:'url("data:image/svg+xml;utf8,<?xml version=\'1.0\' encoding=\'iso-8859-1\'?><svg version=\'1.1\' id=\'Layer_1\' xmlns=\'http://www.w3.org/2000/svg\' xmlns:xlink=\'http://www.w3.org/1999/xlink\' x=\'0px\' y=\'0px\' viewBox=\'0 0 330 330\' style=\'enable-background:new 0 0 330 330;\' xml:space=\'preserve\'><path id=\'XMLID_225_\' d=\'M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393	c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393	s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z\'/></svg>")'
            },
            '.right':{
                backgroundImage:'url("data:image/svg+xml;utf8,<?xml version=\'1.0\' encoding=\'iso-8859-1\'?><svg version=\'1.1\' id=\'Layer_1\' xmlns=\'http://www.w3.org/2000/svg\' xmlns:xlink=\'http://www.w3.org/1999/xlink\' x=\'0px\' y=\'0px\' viewBox=\'0 0 330 330\' style=\'enable-background:new 0 0 330 330;\' xml:space=\'preserve\'><path id=\'XMLID_222_\' d=\'M250.606,154.389l-150-149.996c-5.857-5.858-15.355-5.858-21.213,0.001	c-5.857,5.858-5.857,15.355,0.001,21.213l139.393,139.39L79.393,304.394c-5.857,5.858-5.857,15.355,0.001,21.213 C82.322,328.536,86.161,330,90,330s7.678-1.464,10.607-4.394l149.999-150.004c2.814-2.813,4.394-6.628,4.394-10.606 C255,161.018,253.42,157.202,250.606,154.389z\'/></svg>")'
            },
            '.left':{
                backgroundImage:'url("data:image/svg+xml;utf8,<?xml version=\'1.0\' encoding=\'iso-8859-1\'?><svg version=\'1.1\' id=\'Layer_1\' xmlns=\'http://www.w3.org/2000/svg\' xmlns:xlink=\'http://www.w3.org/1999/xlink\' x=\'0px\' y=\'0px\' viewBox=\'0 0 330 330\' style=\'enable-background:new 0 0 330 330;\' xml:space=\'preserve\'><path id=\'XMLID_222_\' d=\'M250.606,154.389l-150-149.996c-5.857-5.858-15.355-5.858-21.213,0.001	c-5.857,5.858-5.857,15.355,0.001,21.213l139.393,139.39L79.393,304.394c-5.857,5.858-5.857,15.355,0.001,21.213 C82.322,328.536,86.161,330,90,330s7.678-1.464,10.607-4.394l149.999-150.004c2.814-2.813,4.394-6.628,4.394-10.606 C255,161.018,253.42,157.202,250.606,154.389z\'/></svg>")',
                transform:'scaleX(-1)'
            }
        }
    }
}

export {ArrowPadsComponent};