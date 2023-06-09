import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Table } from "react-bootstrap";

export default function Pratik() {
  // Api Cek

  const apiUrl = "https://api.kapadokyadavet.com/api/orAcilises";

  const [data, setData] = useState([]);

  const apiCek = async () => {
    try {
      const token = localStorage.getItem("token");
      const sonuc = await axios.get(apiUrl + "/getAll");
      setData(sonuc.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    apiCek();
  }, []);

  // Api Ekle

  const [modelEkle, setModelEkle] = useState(false);

  const [yeniData, setYeniData] = useState({
    orAcilisId: 0,
    photo: "",
    detay: "",
  });
  
  const modelEkleAc = () => setModelEkle(true);
  const modelEkleKapat = () => setModelEkle(false);

  const apiEkle = async () => {
    try {
      const token = localStorage.getItem("token");
      const sonuc = await axios.post(apiUrl, yeniData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      modelEkleKapat();
      apiCek();
    } catch (error) {
      console.log(error);
    }
  };

  const degistir = (e) => {
    setYeniData({
      ...yeniData,
      [e.target.name]: e.target.value,
    });
  };

  // Api Sil

  const [modelSil, setModelSil] = useState(false);

  const [veriSec, setVeriSec] = useState([]);

  const modelSilAc = (item) => {
    setVeriSec(item);
    setModelSil(true);
  };

  const modelSilKapat = () => setModelSil(false);

  const apiSil = async () => {
    try {
      const token = localStorage.getItem("token");
      const sonuc = await axios.delete(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          orAcilisId: veriSec.orAcilisId,
        },
      });
      modelSilKapat();
      apiCek();
    } catch (error) {
      console.log(error);
    }
  };

  // Api Guncelle

  const [modelGuncelle, setModelGuncelle] = useState(false);

  const modelGuncelleAc = (item) => {
    setVeriSec(item);
    setYeniData({
      orAcilisId: item.orAcilisId,
      photo: item.photo,
      detay: item.detay,
    });
    setModelGuncelle(true);
  };

  const modelGuncelleKapat = () => setModelGuncelle(false);

  const apiGuncelle = async () => {
    try {
      const token = localStorage.getItem("token");
      const sonuc = await axios.put(apiUrl, yeniData, {
        headers: {
          Authorazition: `Bearer ${token}`,
        },
      });
      modelGuncelleKapat();
      apiCek();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>OrAcilisId</th>
            <th>Photo</th>
            <th>Detay</th>
            <Button style={{ width: 118 }} variant="info" onClick={modelEkleAc}>
              Ürün Ekle
            </Button>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.orAcilisId}>
              <td>{item.orAcilisId}</td>
              <td>{item.photo}</td>
              <td>{item.detay}</td>
              <Button variant="warning" onClick={() => modelSilAc(item)}>
                Deletee
              </Button>

              <Button variant="warning" onClick={() => modelGuncelleAc(item)}>
                Edit
              </Button>
            </tr>
          ))}
        </tbody>
      </Table>
      {/* Api Ekle */}
      <Modal style={{ marginTop: 50 }} show={modelEkle} onHide={modelEkleKapat}>
        <Modal.Header closeButton>
          <Modal.Title>Add Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formPhoto">
              <Form.Label>Photo</Form.Label>
              <Form.Control
                type="text"
                name="photo"
                onChange={degistir}
                placeholder="Enter photo"
              />
            </Form.Group>
            <Form.Group controlId="formDetail">
              <Form.Label>Detail</Form.Label>
              <Form.Control
                type="text"
                name="detay"
                onChange={degistir}
                placeholder="Enter detay"
              />{" "}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={modelEkleKapat}>
            Close
          </Button>
          <Button variant="primary" onClick={apiEkle}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Api Sil */}

      <Modal style={{ marginTop: 50 }} show={modelSil} onHide={modelSilKapat}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete the data with ID: {veriSec.orAcilisId}
          ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={modelSilKapat}>
            Cancel
          </Button>
          <Button variant="danger" onClick={apiSil}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        style={{ marginTop: 50 }}
        show={modelGuncelle}
        onHide={modelGuncelleKapat}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formPhoto">
              <Form.Label>Photo</Form.Label>
              <Form.Control
                type="text"
                name="photo"
                placeholder="Enter photo url"
                value={yeniData.photo}
                onChange={degistir}
              />
            </Form.Group>

            <Form.Group controlId="formDetail">
              <Form.Label>Detail</Form.Label>
              <Form.Control
                type="text"
                name="detay"
                placeholder="Enter detay"
                value={yeniData.detay}
                onChange={degistir}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={modelGuncelleKapat}>
            Close
          </Button>
          <Button variant="primary" onClick={apiGuncelle}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
