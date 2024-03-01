import { useEffect, useRef, useState } from "react";

import Places from "./components/Places.jsx";
import { AVAILABLE_PLACES } from "./data.js";
import Modal from "./components/Modal.jsx";
import logoImg from "./assets/logo.png";
import { sortPlacesByDistance } from "./loc.js";
import AvailablePlaces from "./components/AvailablePlaces.jsx";
import { updateUsers } from "./requestFn.js";
import Error from "./components/Error.jsx";

function App() {
  const modal = useRef();
  const selectedRef = useRef();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedPlaces, setSelectedPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  // sehife refresh olanda ve ya yeniden acilanda select olunmus itemleri sehifede gostermek
  useEffect(() => {
    async function getSelectedItems() {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:3000/user-places");
        const data = await response.json();
        if (!response.ok) {
          throw new Error("Xeta bas verdi");
        }
        setSelectedPlaces(data.places);
      } catch (error) {
        setError({ message: error.message || "Xeta bas verdi" });
      }
    }
    getSelectedItems();
    setLoading(false);
  }, []);
  
  // get location for items
  /*
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const sortedPlaces = sortPlacesByDistance(
        AVAILABLE_PLACES,
        position.coords.latitude,
        position.coords.longitude
      );
      setAvailablePlaces(sortedPlaces);
    });
  }, []);
  */

  // select edende arzu listine dusmesi ve backende gonderilmesi
  async function handleSelectPlace(place) {
    setSelectedPlaces((prevPlaces) => {
      if (prevPlaces.some((item) => item.id === place.id)) {
        return prevPlaces;
      }
      return [place, ...prevPlaces];
    });

    await updateUsers([place, ...selectedPlaces]);
  }

  // Modali open etmek
  function openModal(place) {
    selectedRef.current = place;
    setModalIsOpen(true);
  }

  // Modali baglamaq
  function closeModal() {
    setModalIsOpen(false);
  }

  // Elementi silmek ve modali baglamaq
  async function deleteModal() {
    setSelectedPlaces((prevPlaces) =>
      prevPlaces.filter((item) => item.id !== selectedRef.current.id)
    );
    // modal.current.close();
    await updateUsers(
      selectedPlaces.filter((item) => item.id !== selectedRef.current.id)
    );
    setModalIsOpen(false);
  }

  return (
    <>
      {modalIsOpen && (
        <Modal
          open={modalIsOpen}
          onConfirm={deleteModal}
          onCancel={closeModal}
        />
      )}
      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>Səyahət</h1>
        <p>
          Getmək istədiyiniz yerlərdən və ya getdiyiniz yerlərdən kolleksiya
          düzəldin.
        </p>
      </header>
      <main>
        {error ? (
          <Error message={error.message} />
        ) : (
          <Places
            title="Arzu etdiyim yerlər"
            fallbackText={"Aşağıdakı yerlərdən birini seçin"}
            places={selectedPlaces}
            loading={loading}
            fetching={"Secdiyiniz seherler yuklenilir....."}
            onSelectPlace={openModal}
          />
        )}

        <AvailablePlaces handleSelectPlace={handleSelectPlace} />
      </main>
    </>
  );
}

export default App;
