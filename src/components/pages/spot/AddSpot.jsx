import React, { useEffect, useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import SpotService from "./services/spotService";
import { toast } from 'react-toastify';

export default function AddSpot({ onSpotAdded }) {

  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [data, setData] = useState([]);
  const [dataCategory, setDataCategory] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newSpotData, setNewSpotData] = useState({
    spotId: 0,
    categoryId: 0,
    photo: "",
    title: "",
    tag: "",
    price: "",
    discountPrice: "",
  });

  const fetchDataCategory = async () => {
    try {
      const categories = await SpotService.fetchAllCategories();
      setDataCategory(categories);
    } catch (error) {
      console.error(error);
      toast.error("Unable to fetch categories");
    }
  };
  const fetchData = async () => {
    try {
      const response = await SpotService.getAllSpots();
      setData(response);
    } catch (error) {
      console.error(error);
      toast.error("Unable to fetch spots");
    }
  };

  useEffect(() => {
    fetchData()
    fetchDataCategory();
  }, []);


  const handleAddSpot = async () => {
    try {
      await SpotService.addSpot(newSpotData, selectedCategoryId);
      setShowModal(false);
      toast.success('Ürün başarıyla eklendi!');

      if (onSpotAdded) {
        onSpotAdded(newSpotData);
      }
      
      fetchData();
    } catch (error) {
      console.error(error);
    }
  } 

  const handleChange = (e) => {
    setNewSpotData({
      ...newSpotData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelection = (event) => {
    setSelectedCategoryId(event.target.value);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <Button style={{width: 238 }} variant="success" onClick={() => setShowModal(true)}>
        Add Spot
      </Button>
        <Modal  style={{ marginTop: 50 }} show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
          <Modal.Title>Ürün Ekle</Modal.Title>
          </Modal.Header>
        <Modal.Body>
      <Form >
        <Form.Label>Category</Form.Label>
        <Form.Control as="select" name="categoryId" value={selectedCategoryId} onChange={handleSelection}>
        {dataCategory.map((item) => (
        <option key={item.categoryId} value={item.categoryId}>
        {item.categoryName}
        </option>
        ))}
        </Form.Control>
        <Form.Group controlId="formPhoto">
        <Form.Label>Photo</Form.Label>
        <Form.Control type="text"name="photo"   onChange={handleChange} placeholder="Enter photo"/></Form.Group>
        <Form.Group controlId="formTitle">
        <Form.Label>Title</Form.Label>
        <Form.Control type="text"name="title"   onChange={handleChange} placeholder="Enter title"/></Form.Group>
        <Form.Group controlId="formTag">
        <Form.Label>Tag</Form.Label>
        <Form.Control type="text"name="tag"   onChange={handleChange} placeholder="Enter tag"/></Form.Group>
        <Form.Group controlId="formPrice">
        <Form.Label>Price</Form.Label>
        <Form.Control type="text"name="price"   onChange={handleChange} placeholder="Enter price"/></Form.Group>
        <Form.Group controlId="formDiscountPrice">
        <Form.Label>DiscountPrice</Form.Label>
        <Form.Control type="text" name="discountPrice"  onChange={handleChange} placeholder="Enter discountPrice"/> </Form.Group>
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
