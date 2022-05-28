import {Template, Component} from '/js/adarna.js';

class CompassComponent extends Component{

    init() {
        this.allDeg = []; // array of all degrees

        //inputs into allDeg array
        for (let i = 0; i <= 359; i++) {
            
            let degree = i;

            switch (degree) {
                case 0:
                    degree = "N";
                    break;
                case 90:
                    degree = "E";
                    break;
                case 180:
                    degree = "S";
                    break;
                case 270:
                    degree = "W";
                    break;
            }
            this.allDeg[i] = degree;
        }

        //Convert array to Proxy object so we can use negative values as index
        this.allDeg = new Proxy(this.allDeg,{

            get(target, index) {
                    index = parseInt(index);

                    //If index is negative add 360
                    if (index < 0) {
                        index = index + target.length;

                    }else if(index > target.length -1){ 
                        //If index is greater than 360 substract 360
                        index = index - target.length;
                    }
                
                //Return correct index
                return target[index];
            }
        });
    }

    model() {

        //Set model
        return {
            degrees:0
        }
    }

    view() {
        const t = new Template();
        let displayed = this.displayArray();
        
        return t.div(()=>{
            t.div({class: "main"}, ()=>{
                t.div({class: "container"}, ()=>{            
                    for (let i = 0; i <= displayed.length-1; i++) {
                        // adds quadrants
                        if (displayed[i] > 0 && displayed[i] < 90) {
                            t.div({class: "item"},()=>{
                                t.txt(displayed[i]); 
                                t.span({class: "mini"},"NE");
                            });
                        } else if (displayed[i] > 90 && displayed[i] < 180) {
                            t.div({class: "item"},()=>{
                                t.txt(displayed[i]); 
                                t.span({class: "mini"},"SE");
                            });
                        } else if (displayed[i] > 180 && displayed[i] < 270) {
                            t.div({class: "item"},()=>{
                                t.txt(displayed[i]); 
                                t.span({class: "mini"},"SW");
                            });
                        } else if (displayed[i] > 270 && displayed[i] < 360) {
                            t.div({class: "item"},()=>{
                                t.txt(displayed[i]); 
                                t.span({class: "mini"},"NW");
                            });
                        } else {
                            t.div({class: "item", id: "cardinal_point"},()=>{
                                t.txt(displayed[i]);
                            });
                        } // if-else
                    } //for
                }); // container div
            }); // main div
            t.div({class: "pointer"});
        }); // parent div
    }

    //Calculate array to be displayed
    displayArray() {
        this.model.degrees = parseInt(this.model.degrees);

        //If 360 or greater then convert to 0
        if(this.model.degrees >= 360 ){
            this.model.degrees = 0;
        }

        return [
            this.allDeg[ this.model.degrees - 2], 
            this.allDeg[ this.model.degrees - 1], 
            this.allDeg[ this.model.degrees], 
            this.allDeg[ this.model.degrees + 1], 
            this.allDeg[ this.model.degrees + 2 ]
        ];
    }

    style() {

        return {
            '*': {
                margin: '0',
                padding: '0',
                fontFamily: 'Arial, Helvetica, sans-serif',
                fontSize: '16px',
                boxSizing: 'border-box'
            },

            '.main': {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            },
            
            '.container': {
                width: '50vw',
                height: '3vw',
                borderTop: '5px solid rgba(53,233,118, 0.8)',
                borderRight:'5px solid rgba(53,233,118, 0.8',
                borderLeft: '5px solid rgba(53,233,118, 0.8)',
                borderRadius: '10px 10px 0 0',
                boxShadow: '0 7px 10px -5px #35e976 inset',
                display: 'flex',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                marginTop: '0.5em'
            },

            '.item': {
                width: '50%',
                textAlign: 'center',
                color: 'rgba(53,233,118, 0.8)',
                fontWeight: 'bolder',
                marginTop: '1em'
            },

            '.mini': {
                display: 'block',
                fontSize: '12px'
            },

            '#cardinal_point': {
                marginTop: '0.5em',
                fontSize: '24px'
            },

            '.pointer': {
                width: '0', 
                height: '0', 
                margin: '0.85em auto 0 auto',
                borderBottom: '10px solid rgba(53,233,118, 0.8)',
                borderLeft: '10px solid transparent',
                borderRight: '10px solid transparent'
            }
        }
    }
}

export {CompassComponent};