import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import SpotService from "./services/spotService";
import { toast } from 'react-toastify';

export default function DeleteSpot({ spotId, onDeleteSpot, onSpotDeleted, spotName }) {
  const [showModal, setShowModal] = useState(false);

  const handleDeleteSpot = async () => {
    try {
      await SpotService.deleteSpot(spotId);
      onDeleteSpot(spotId); // Spotun listeden kaldırılması veya başka bir işlem yapılabilir
      handleCloseModal(); 
      toast.success('Ürün başarıyla silindi!');
  
      if (onSpotDeleted) {
        onSpotDeleted(spotId);
      }
  
    } catch (error) {
      console.error(error);
    }
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <Button variant="danger" onClick={handleShowModal}>Delete</Button>
      <Modal  style={{ marginTop: 50 }} show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bu noktayı silmek istediğinizden emin misiniz {spotName} ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Cancel</Button>
          <Button variant="danger" onClick={handleDeleteSpot}>Delete</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
