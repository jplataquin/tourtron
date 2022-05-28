import {Template, Component} from '/js/adarna.js';

class ProximityDisplayComponent extends Component{

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
                    t.div('8s');
                    t.div('CTRL DLY');
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

        dom.handler.setBall = (num,flag) => {
            let ball = this.el['b'+num] ?? false;

            if(!ball) return false;

            if(flag){
                ball.style.backgroundColor = 'rgba(255,0,0)';
            }else{
                ball.style.backgroundColor = 'rgba(0,0,0)';
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
            '.row2':{
                marginTop:'30px'
            },
            '.row3':{
                marginTop:'130px'
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