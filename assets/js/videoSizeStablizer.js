export default function videoSizeStablizer(video){

    const stabilize = (elem)=>{
        let height  = window.innerHeight;
        let width   = window.innerWidth;

        //Landscape
        if(elem.offsetWidth > elem.offsetHeight){
            
            if(elem.style.width != width+'px'){
                elem.style.height = width+'px';
            }

        }else if(elem.offsetWidth <= elem.offsetHeight){ //Portraint or Box
            
            if(elem.style.height != height+'px'){
                elem.style.height = height+'px';
            }
            
        }
    }

    let checker = setInterval(()=>{
        stabilize(video);
    },3000);

    let listener1 = window.addEventListener('orientationchange', () => { 
        stabilize(video);
    }, false);


    let listener2 = window.addEventListener('resize',()=>{
        stabilize(video);
    });

    return {
        unboserve: ()=>{
            clearInterval(checker);
            window.removeEventListener(listener1);
            window.removeEventListener(listener2);
        }
    }
}