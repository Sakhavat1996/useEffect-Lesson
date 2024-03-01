import { useEffect, useState } from "react";
import Places from "./Places";
import Error from "./Error";

export default function AvailablePlaces({ handleSelectPlace}) {
  const [availablePlaces , setAvailablePlaces] = useState([]);
  const [loading , setLoading] = useState(false);
  const [error , setError] = useState();

  useEffect(()=>{
    // fetch('http://localhost:3000/places')
    // .then(response=>response.json())
    // .then(data=>{
    //   setAvailablePlaces(data.places)
    // })

    async function getPlaces(){
      try {
        setLoading(true);
        const response = await fetch('http://localhost:3000/places');
        const data = await response.json();
        if(!response.ok){
          throw new Error('Nese xeta bas verdi')
        }
        setAvailablePlaces(data.places);
      } catch (error) {
        setError({message: error.message || 'Nese xeta bas verdi'})
      }
      setLoading(false)
    };
    getPlaces();  
  } 
  , [])

  if(error) {
    return <Error message={error.message}/>
  }
  return (
    <Places
      title="Mümkün Yerlər"
      places={availablePlaces}
      onSelectPlace={handleSelectPlace}
      loading={loading}
      fetching = {"Xahis olunur gozleyin , dataniz yuklenilir..."}
    />
  );
}