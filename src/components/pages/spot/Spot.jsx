import React, { useState, useEffect } from "react";
import Navbar from "../../layouts/Navbar";
import { Table, Button, Modal, Form } from "react-bootstrap";
import { Box } from "@mui/material";
import Sidenav from "../../layouts/Sidenav";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import AddSpot from "./AddSpot";
import DeleteSpot from "./DeleteSpot";
import SpotService from "./services/spotService";
import axios from "axios";

export default function Spot() {
  const apiUrl = "https://api.kapadokyadavet.com/api/spots";

  const [dataCategory, setDataCategory] = useState([]);
  const [data, setData] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPhotoEditModal, setShowPhotoEditModal] = useState(false); // State for photo edit modal
  const [selectedData, setSelectedData] = useState({});
  const [selectedCategoryId, setSelectedCategoryId] = useState("");

  const handleEditModalClose = () => setShowEditModal(false);


  const [newData, setNewData] = useState({
    spotId: 0,
    categoryId: 0,
    photo: "",
    title: "",
    tag: "",
    price: "",
    discountPrice: "",
  });

  const fetchData = async () => {
    try {
      const response = await SpotService.getAllSpots();
      setData(response);
    } catch (error) {
      console.error(error);
      toast.error("Unable to fetch spots");
    }
  };

  const fetchDataCategory = async () => {
    try {
      const categories = await SpotService.fetchAllCategories();
      setDataCategory(categories);
    } catch (error) {
      console.error(error);
      toast.error("Unable to fetch categories");
    }
  };

  const handleEditData = async () => {
    try {
      const token = localStorage.getItem("token");
      const result = await axios.put(apiUrl, newData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchData();
      toast.success("ürün başarıyla güncellendi!");
      handleEditModalClose();
    } catch (error) {
      console.error(error);
      toast.warn("ürün güncelleme başarısız!");
    }
  };



  useEffect(() => {
    fetchData();
    fetchDataCategory();
  }, []);

  const handleChange = (e) => {
    setNewData({
      ...newData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSpotAdded = (addedSpot) => {
    setData([...data, addedSpot]);
    fetchData();
  };

  const onSpotDeleted = () => {
    fetchData();
  };

  const handleEditModalOpen = (item) => {
    setSelectedData(item);
    setNewData({
      spotId: item.spotId,
      categoryId: item.categoryId,
      photo: item.photo,
      title: item.title,
      tag: item.tag,
      price: item.price,
      discountPrice: item.discountPrice,
    });
    setShowEditModal(true);
  };

  const handlePhotoEditModalOpen = () => {
    setShowPhotoEditModal(true);
  };

  const handlePhotoEditModalClose = () => {
    setShowPhotoEditModal(false);
  };

  const handlePhotoUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("id", newData.spotId);
      formData.append("file", newData.photo);

      const result = await axios.post(
        "https://api.kapadokyadavet.com/api/spots/addPhoto",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchData();
      toast.success("Resim başarıyla güncellendi!");
      handlePhotoEditModalClose();
    } catch (error) {
      console.error(error);
      toast.error("Resim güncelleme işlemi başarısız oldu!");
    }
  };

  const handleFileChange = (event) => {
    setNewData({
      ...newData,
      photo: event.target.files[0],
    });
  };
  

  return (
    <div>
      <Navbar />
      <Box height={70} />
      <Box sx={{ display: "flex" }}>
        <Sidenav />
        <ToastContainer position="bottom-right" />
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>SpotId</th>
              <th>CategoryId</th>
              <th>Photo</th>
              <th>Title</th>
              <th>Tag</th>
              <th>Price</th>
              <th>DiscountPrice</th>
              <div style={{ marginRight: "10px" }}>
                <th>
                  <AddSpot onSpotAdded={handleSpotAdded} />
                </th>
              </div>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.spotId}>
                <td>{item.spotId}</td>
                <td>{item.categoryId}</td>
                <td>{item.photo}</td>
                <td>{item.title}</td>
                <td>{item.tag}</td>
                <td>{item.price}</td>
                <td>{item.discountPrice}</td>
                <td>
                  <div style={{ display: "flex" }}>
                    <Button
                      variant="warning"
                      onClick={() => handleEditModalOpen(item)}
                      style={{ marginRight: "10px" }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="info"
                      onClick={() => handlePhotoEditModalOpen()}
                      style={{ marginRight: "10px" }}
                    >
                      PhotoEdit
                    </Button>
                    <DeleteSpot spotId={item.spotId} onDeleteSpot={onSpotDeleted} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Modal style={{ marginTop: 50 }} show={showEditModal} onHide={handleEditModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Data</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ToastContainer position="bottom-right" />

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
                <Form.Control type="text" name="photo" value={newData.photo} onChange={handleChange}/></Form.Group>
              <Form.Group className="mb-3" controlId="formTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" name="title" value={newData.title} onChange={handleChange}/></Form.Group>
              <Form.Group className="mb-3" controlId="formTag">
                <Form.Label>Tag</Form.Label>
                <Form.Control type="text" name="tag" value={newData.tag} onChange={handleChange}/></Form.Group>
              <Form.Group className="mb-3" controlId="formPrice">
                <Form.Label>Price</Form.Label>
                <Form.Control type="text" name="price" value={newData.price} onChange={handleChange}/></Form.Group>
              <Form.Group className="mb-3" controlId="formDiscountPrice">
                <Form.Label>Discount Price</Form.Label>
                <Form.Control type="text" name="discountPrice" value={newData.discountPrice} onChange={handleChange}/></Form.Group>
        </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleEditModalClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleEditData}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal style={{ marginTop: 50 }} show={showPhotoEditModal} onHide={handlePhotoEditModalClose}>
          <Modal.Header closeButton>

            <Modal.Title>Edit Photo</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ToastContainer position="bottom-right" />




            <Form.Group className="mb-3" controlId="formPhoto">
  <Form.Label>Photo</Form.Label>
  <Form.Control type="file" name="photo" onChange={handleFileChange} />
</Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handlePhotoEditModalClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handlePhotoUpdate}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </Box>
    </div>
  );
}
