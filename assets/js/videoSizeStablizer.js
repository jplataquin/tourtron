export default function videoSizeStablizer(video){

    const stabilize = (elem)=>{
        let height  = window.innerHeight;
        let width   = window.innerWidth;

        //Landscape
        if(elem.offsetWidth > elem.offsetHeight){
            
            elem.style.height = width+'px';
            
            

        }else if(elem.offsetWidth <= elem.offsetHeight){ //Portraint or Box
     
            elem.style.height = height+'px';
            
        }
    }

    const elemResizeObserver = new ResizeObserver(elems=>{
        
        console.log(elems);

        let elem = elems[0] ?? false;

        if(!elem) return false;

        elem = elem.target;

        stabilize(elem);

    });

    elemResizeObserver.observe(video);

    let listener1 = window.addEventListener('orientationchange', () => { 
        stabilize(video);
    }, false);

    let listener2 = window.addEventListener('resize',()=>{
        stabilize(video);
    });

    return {
        unboserve: ()=>{
            elemResizeObserver.unobserve();
            window.removeEventListener(listener1);
            window.removeEventListener(listener2);
        }
    }
}