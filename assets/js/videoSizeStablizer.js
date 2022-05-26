export default function videoSizeStablizer(video){

    const resizeObserver = new ResizeObserver(elems=>{
        
        console.log(elems);

        let elem = elems[0] ?? false;

        if(!elem) return false;

        elem = elem.target;
        
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

    });



    resizeObserver.observe(video);

    return resizeObserver;
}