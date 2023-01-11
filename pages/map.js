import dynamic from 'next/dynamic'

//this is required as leaflet is not compatible with SSR
const DynamicMap = dynamic(() => import('../components/map/map'), {
  ssr: false,
})

export default function Map(){
    console.log("in dynamic")
    return(
        <DynamicMap /> 
    );
}