import {Template, Component} from '/js/adarna.js';

class ProximityDisplayComponent extends Component{

    init(){
        this.text = {
            arrow: '➤',
            stop: '🛑'
        }
    }

    view(){

        const t = new Template();

        return t.div(()=>{

            t.div({class:'main'},()=>{

                t.div({class:'row1'},()=>{
                    t.div({class:'ball-row-1 b1',dataEl:'b1'});
                    t.div({class:'ball-row-1 b2',dataEl:'b2'});
                    t.div({class:'ball-row-1 b3',dataEl:'b3'});
                });
                
                t.div({class:'row2'},()=>{
                    t.div({class:'direction',dataEl:'direction'},this.text.stop);
                    t.div({class:'text',dataEl:'time'},'DLY: 0s');
                })
                t.div({class:'row3'},()=>{
                    t.div({class:'ball-row-2 b4',dataEl:'b4'});
                    t.div({class:'ball-row-2 b5',dataEl:'b5'});
                    t.div({class:'ball-row-2 b6',dataEl:'b6'});
                });
            });
        });
    }

    controller(dom){

        dom.handler.setTime = (num)=>{

            if(num < 0){
                num = 0;
            }

            if(num > 100){
                num = 99;
            }

            this.el.time.innerText = 'DLY: '+num+'s';
        }

        dom.handler.setBall = (num,flag) => {
            
            let ball = this.el['b'+num] ?? false;

            if(!ball) return false;

            if(flag){
                ball.style.backgroundColor = 'rgba(255,0,0)';
            }else{
                ball.style.backgroundColor = 'rgba(0,0,0,0.2)';
            }
        }

        dom.handler.setDirection = (d)=>{

            switch(d){
                case 0:
                    this.el.direction.innerText = this.text.stop;
                    this.el.direction.style.transform = 'rotate(0deg)';
                    break;
                case 1: //Forward
                    this.el.direction.innerText = this.text.arrow;
                    this.el.direction.style.transform = 'rotate(-90deg)';
                    break;
                case 2: //Backward
                    this.el.direction.innerText = this.text.arrow;
                    this.el.direction.style.transform = 'rotate(90deg)';
                    break;
                case 5: //ROT_LEFT
                    this.el.direction.innerText = this.text.arrow;
                    this.el.direction.style.transform = 'rotate(-180deg)';
                    break;
                case 6: //ROT_LEFT
                    this.el.direction.innerText = this.text.arrow;
                    this.el.direction.style.transform = 'rotate(0deg)';
                    break;
                default:
                    this.el.direction.innerText = this.text.stop;
                    this.el.direction.style.transform = 'rotate(0deg)';
                    break;
            }
        }
    }

    style(){
        return {
            '.main':{
                backgroundColor:'rgba(0,0,0,0.2)',
                height:'150px',
                width:'150px',
                borderRadius:'50%',
                position:'absolute'
            },
            '.direction':{
                color:'#FFFFFF',
                fontSize:'30px'
            },
            '.text':{
                color:'#FFFFFF',
                fontSize:'15px',
                fontWeight:'bold'
            },
            '.row2':{
                marginTop:'45px'
            },
            '.row3':{
                marginTop:'16px'
            },
            '.ball-row-1':{
                backgroundColor:'rgba(0,0,0,0.2)',
                height:'20px',
                width:'20px',
                borderRadius:'50%',
                float:'left',
                marginLeft:'23px'
            },

            '.ball-row-2':{
                backgroundColor:'rgba(0,0,0,0.5)',
                height:'20px',
                width:'20px',
                borderRadius:'50%',
                float:'left',
                marginLeft:'23px'
            },

            '.b1':{
                marginTop:'20px'
            },
            '.b2':{

            },
            '.b3':{
                marginTop:'20px'
            },
            '.b4':{
                marginTop:'-19px'
            },
            '.b5':{

            },
            '.b6':{
                marginTop:'-20px'
            },
        }
    }
}

export {ProximityDisplayComponent};