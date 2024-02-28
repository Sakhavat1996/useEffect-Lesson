import { useEffect, useRef, useState } from 'react';

import Places from './components/Places.jsx';
import { AVAILABLE_PLACES } from './data.js';
import Modal from './components/Modal.jsx';
import logoImg from './assets/logo.png';
import { sortPlacesByDistance } from './loc.js';

function App() {
  const modal = useRef();
  const selectedRef = useRef();
  const [modalIsOpen , setModalIsOpen] = useState(false)
  const [selectedPlaces , setSelectedPlaces] = useState([]);
  const [availablePlaces , setAvailablePlaces] = useState([]);

  useEffect(()=>{
    navigator.geolocation.getCurrentPosition((position)=>{
      const sortedPlaces = sortPlacesByDistance(
        AVAILABLE_PLACES,
        position.coords.latitude,
        position.coords.longitude
      )
      setAvailablePlaces(sortedPlaces);
    })
  } , [])

  // klik ederken secdiyimiz seherin istek listine qalxmasi
  function handleSelectPlace(id){
      setSelectedPlaces(prevPlaces=>{
        if(prevPlaces.some(item=>item.id === id)){
          return prevPlaces;
        }
        const place = AVAILABLE_PLACES.find(item=>item.id === id);
        return [place , ...prevPlaces]
      })
  }

  // Modali open etmek
  function openModal(id){
    selectedRef.current = id;
    // modal.current.showModal();
    setModalIsOpen(true)
  }

  // Modali baglamaq
  function closeModal(){
    // modal.current.close();
    setModalIsOpen(false)

  }

  // Elementi silmek ve modali baglamaq

  function deleteModal(){
    setSelectedPlaces(prevPlaces=>(
      prevPlaces.filter(item=>item.id !== selectedRef.current)
    ))
    // modal.current.close();
    setModalIsOpen(false)
  }

  return (
    <>
      {modalIsOpen && <Modal 
        open={modalIsOpen}
        onConfirm = {deleteModal}
        onCancel={closeModal}
      />}
      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>Səyahət</h1>
        <p>
          Getmək istədiyiniz yerlərdən və ya getdiyiniz yerlərdən kolleksiya düzəldin.
        </p>
      </header>
      <main>
        <Places
          title="Arzu etdiyim yerlər"
          fallbackText={'Aşağıdakı yerlərdən birini seçin'}
          places={selectedPlaces}
          onSelectPlace={openModal}
        />
        <Places
          title="Mümkün Yerlər"
          places={availablePlaces}
          onSelectPlace={handleSelectPlace}
        />
      </main>
    </>
  );
}

export default App;
