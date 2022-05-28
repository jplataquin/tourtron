import {Template, Component} from '/js/adarna.js';

class ProximityDisplayComponent extends Component{

    view(){

        const t = new Template();

        return t.div(()=>{

            t.div({class:'main'},()=>{
                t.div({class:'ball'});
                t.div({class:'ball'});
                t.div({class:'ball'});
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
                borderRadius:'50%'
            },
            '.ball':{
                backgroundColor:'red',
                height:'50px',
                width:'50px',
                borderRadius:'50%'
            }
        }
    }
}

export {ProximityDisplayComponent};