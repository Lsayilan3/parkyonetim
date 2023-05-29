import React, { useEffect, useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import SpotService from "./services/spotService";
import axios from "axios";
import { toast } from 'react-toastify';

export default function AddSpot({ onSpotAdded }) {

  const apiUrlCategory = "https://api.kapadokyadavet.com/api/spotCategoryies";

  const [dataCategory, setDataCategory] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [selectedData, setSelectedData] = useState({});
  const [newData, setNewData] = useState({
    spotId: 0,
    categoryId: 0,
    photo: "",
    title: "",
    tag: "",
    price: "",
    discountPrice: "",
  });

  const fetchDataCategory = async () => {
    const sonuc = await axios(apiUrlCategory + "/getall");
    setDataCategory(sonuc.data);
  };

  useEffect(() => {
    fetchDataCategory();
  }, []);

  const handleAddSpot = async () => {
    try {
      await SpotService.updateSpot(newData);
      toast.success('Spot successfully added!');
  
      if (onSpotAdded) {
        onSpotAdded(newData);
      }
  
      handleCloseModal();
    } catch (error) {
      console.error(error);
      toast.error('Failed to add spot!');
    }
  };
  
  

  const handleChange = (e) => {
    setNewData({
      ...newData,
      [e.target.name]: e.target.value,
    });
  
    setSelectedCategoryId(e.target.value);
  };
  
  const handleCloseModal = (item) => {
    setSelectedData(item);
    if (item) {
      setNewData({
        ...newData,
        spotId: item.spotId,
        categoryId: item.categoryId,
        photo: item.photo,
        title: item.title,
        tag: item.tag,
        price: item.price,
        discountPrice: item.discountPrice,
      });
    }
    setShowModal(false);
  };
  
  return (
    <div>
      <Button variant="primary" onClick={() => setShowModal(true)}>Editt</Button>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Spot</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>           
        <Form.Label>Category</Form.Label>
        <Form.Control as="select" name="categoryId" value={selectedCategoryId} onChange={handleChange}>
        {dataCategory.map((item) => (
        <option key={item.categoryId} value={item.categoryId}>
        {item.categoryName}
        </option>
        ))}
        </Form.Control>
            <Form.Group className="mb-3" controlId="formPhoto">
              <Form.Label>Photo</Form.Label>
              <Form.Control type="text" name="photo" value={newData.photo} onChange={handleChange} /></Form.Group>
            <Form.Group className="mb-3" controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" name="title" value={newData.title} onChange={handleChange}/></Form.Group>
            <Form.Group className="mb-3" controlId="formTag">
              <Form.Label>Tag</Form.Label>
              <Form.Control type="text" name="tag" value={newData.tag} onChange={handleChange}/></Form.Group>
            <Form.Group className="mb-3" controlId="formPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control type="text" name="price" value={newData.price} onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDiscountPrice">
              <Form.Label>Discount Price</Form.Label>
              <Form.Control type="text" name="discountPrice" value={newData.discountPrice} onChange={handleChange}/></Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
          <Button variant="primary" onClick={handleAddSpot}>Add Spot</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
