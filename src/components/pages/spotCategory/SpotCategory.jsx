import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../layouts/Navbar";
import { Table, Button, Modal, Form } from "react-bootstrap";
import { Box } from "@mui/material";
import Sidenav from "../../layouts/Sidenav";
import { toast } from 'react-toastify';
import { ToastContainer } from "react-toastify";

export default function OrAcilises() {
  const apiUrl = "https://api.kapadokyadavet.com/api/spotCategoryies";

  const [data, setData] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedData, setSelectedData] = useState({});


  const [newData, setNewData] = useState({
    spotCategoryyId: 0,
    categoryId: "",
    categoryName: "",
  });

  const fetchData = async () => {
    const sonuc = await axios(apiUrl + "/getall");
    setData(sonuc.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddModalOpen = () => setShowAddModal(true);
  const handleAddModalClose = () => setShowAddModal(false);

  const handleDeleteModalOpen = (item) => {
    setSelectedData(item);
    setShowDeleteModal(true);
  };
  const handleDeleteModalClose = () => setShowDeleteModal(false);
  const handleEditModalOpen = (item) => {
    setSelectedData(item);
    setNewData({
    spotCategoryyId: item.spotCategoryyId,
    categoryId: item.categoryId,
    categoryName: item.categoryName,
    });
    setShowEditModal(true);
  };
  const handleEditModalClose = () => setShowEditModal(false);



  const handleAddData = async () => {
    try {
      const token = localStorage.getItem("token");
      const result = await axios.post(apiUrl, newData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData([...data, result.data]);
      handleAddModalClose();
      fetchData();
      toast.success('ürün başarıyla eklendi!');
    } catch (error) {
      console.error(error);
      toast.warn('ürün ekleme başarısız!');
    }
  };

  const handleDeleteData = async () => {
    try {
      const token = localStorage.getItem("token");
      axios
        .delete(apiUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: {
            spotCategoryyId: selectedData.spotCategoryyId,
          },
        })
        .then((response) => {
          fetchData();
          toast.success('ürün başarıyla silindi!');
        })
        .catch((error) => {
          console.log(error);
        });
      handleDeleteModalClose();
    } catch (error) {
      console.error(error);
      toast.warn('ürün silme başarısız!');

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
      toast.success('ürün başarıyla güncellendi!');
      handleEditModalClose();
    } catch (error) {
      console.error(error);
      toast.warn('ürün güncelleme başarısız!');
    }
  };

  //Forum güncelleştirmede formun içini dolu bi şekilde getirir 
  //value={newData.photo} onChange={handleChange}
  const handleChange = (e) => { 
    setNewData({
      ...newData,
      [e.target.name]: e.target.value,
    });
  };
  

  return (
    <div>
  
      <Navbar />
      <Box height={70} />
      <Box sx={{ display: "flex" }}>
        <Sidenav />
        
        <ToastContainer position="bottom-right"/>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>SpotCategoryyId</th>
              <th>CategoryId</th>
              <th>CategoryName</th>
              <th><Button style={{width: 128}} variant="info" onClick={handleAddModalOpen}>
        Ürün Ekle
        </Button></th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.spotCategoryyId}>
                <td>{item.spotCategoryyId}</td>
                <td>{item.categoryId}</td>
                <td>{item.categoryName}</td>
                <td>
                  <Button variant="danger"onClick={() => handleDeleteModalOpen(item)}>
                    Delete
                  </Button>{" "}
                  <Button variant="warning" onClick={() => handleEditModalOpen(item)}>
                    Edit
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        
        {/* Add Modal */}
        <Modal style={{ marginTop: 50 }} show={showAddModal} onHide={handleAddModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Data</Modal.Title>
          </Modal.Header>
          <Modal.Body>
        <ToastContainer position="bottom-right"/>
            <Form >
              <Form.Group controlId="formPhoto">
                <Form.Label>Category Id</Form.Label>
                <Form.Control type="text"name="categoryId"   onChange={handleChange} placeholder="Enter category ıd"/></Form.Group>
              <Form.Group controlId="formDetail">
                <Form.Label>Category Name</Form.Label>
                <Form.Control type="text" name="categoryName"  onChange={handleChange} placeholder="Enter category name"/> </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleAddModalClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleAddData}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>


        {/* Delete Modal */}
        <Modal style={{ marginTop: 50 }} show={showDeleteModal} onHide={handleDeleteModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Delete Data</Modal.Title>
          </Modal.Header>
          <Modal.Body>
        <ToastContainer position="bottom-right"/>
            Are you sure you want to delete the data with ID:{" "}
            {selectedData.orAcilisId}?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleDeleteModalClose}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDeleteData}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Edit Data Modal */}
        <Modal style={{ marginTop: 50 }} show={showEditModal} onHide={handleEditModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Data</Modal.Title>
          </Modal.Header>
          <Modal.Body>
        <ToastContainer position="bottom-right"/>
            <Form>
              <Form.Group controlId="formPhoto">
                <Form.Label>CategorId</Form.Label>
                <Form.Control type="text" name="photo" placeholder="Enter photo url" value={newData.photo} onChange={handleChange} /></Form.Group>
             
              <Form.Group controlId="formDetail">
                <Form.Label>CategoryName</Form.Label>
                <Form.Control type="text" name="detay" placeholder="Enter detay"value={newData.detay} onChange={handleChange}/></Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleEditModalClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleEditData}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </Box>
    </div>
  );
}
