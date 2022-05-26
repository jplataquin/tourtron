export default function videoSizeStablizer(video){

    const stabilize = (elem)=>{
        let height  = window.innerHeight;
        let width   = window.innerWidth;

        console.log(width,height);

        //Landscape
        if(elem.offsetWidth > elem.offsetHeight){
            console.log('landscape');
            elem.style.width = width+'px';

        }else if(elem.offsetWidth <= elem.offsetHeight){ //Portraint or Box
            console.log('portrait');
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

    window.addEventListener('orientationchange', () => {
        stabilize(video);
    }, false);

    return elemResizeObserver;
}