import {Template, Component} from '/js/adarna.js';

class ProximityDisplayComponent extends Component{

    view(){

        const t = new Template();

        return t.div(()=>{

            t.div({class:'main'},()=>{

                t.div({class:'row1'},()=>{
                    t.div({class:'ball-row-1 b1'});
                    t.div({class:'ball-row-1 b2'});
                    t.div({class:'ball-row-1 b3'});
                });
                
                t.div({class:'row2'},()=>{
                    t.div({class:'ball-row-2 b4'});
                    t.div({class:'ball-row-2 b5'});
                    t.div({class:'ball-row-2 b6'});
                });
            });
        });
    }

    controller(){

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
                marginTop:'130px'
            },
            '.ball-row-1':{
                backgroundColor:'red',
                height:'20px',
                width:'20px',
                borderRadius:'50%',
                float:'left',
                marginLeft:'23px'
            },

            '.ball-row-2':{
                backgroundColor:'red',
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