import {Component,Template} from '/js/adarna.js';
       
class MainLayoutComponent extends Component {

    model(){
        return {
            content: document.createElement('div')
        }
    }
    view(){

        const t = new Template();

        return t.div(()=>{

            t.nav({class:'navbar navbar-dark bg-dark'},()=>{
                t.div({class:'container-fluid'},()=>{
                    t.a({class:'navbar-brand',href:'/'},()=>{
                        t.img({
                            src:'https://via.placeholder.com/150',
                            width:30,
                            height:24,
                            class:'d-inline-block align-text-top'
                        });
                        t.txt(' Tourtron');
                    });
                });
            });


            t.div({class:'container'},()=>{
                t.el(this.model.content);
            });
        });
    }
}

export {
    MainLayoutComponent
}