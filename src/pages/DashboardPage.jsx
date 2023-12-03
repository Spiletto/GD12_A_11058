import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {Container, Row, Col, Card, Button, Modal, Form } from "react-bootstrap";
import { toast } from "sonner";

import { FaPlusSquare } from "react-icons/fa";
import { FaSave } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";

import imgProfile from "../assets/images/profile.jpg"
import imgAppetizer from "../assets/images/appetizer.jpg";
import imgMaincourses from "../assets/images/MainCourses.jpg";
import imgDessert from "../assets/images/desserts.jpg";

import { BsPencilSquare } from "react-icons/bs";

const DashboardPage = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/login");
    }
  }, [navigate]);

  const formatDate = (date) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
    return new Date(date).toLocaleDateString("id-ID", options);
  };

  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => {
    setShowModal(false);
    updateIndexx(null);
    setMenu({
      nama: "",
      kategori: "",
      harga: "",
      deskripsi: "",
    });
  };
const handleShow = () => setShowModal(true);

const [menuData, setMenuData] = useState([]);

const [menu, setMenu] = useState({
  nama: "",
  kategori: "",
  harga: "",
  deskripsi: "",
});

const changeData = (event) => {
  const { name, value } = event.target;
  setMenu({ ...menu, [name]: value });
};

const SubmitData = (event) => {
  event.preventDefault();

  if (isMenuDataInvalid(menu)) {
    toast.error("Semua Form harus diisi!");
    return;
  }

  const updatedMenuData = [...menuData, menu];
  setMenuData(updatedMenuData);
  toast.success(`Berhasil Tambah Data Makanan ${menu.kategori}!`);

  resetForm();
};

const [updateIndex, updateIndexx] = useState(null);

const handleUpdate = (index) => {
  updateIndexx(index);
  setMenu({ ...menuData[index] });
  setShowModal(true);
};

const updateData = (event) => {
  event.preventDefault();

  if (isMenuDataInvalid(menu)) {
    toast.error("Semua Form harus diisi!");
    return;
  }

  const updatedMenuData = [...menuData];
  updatedMenuData[updateIndex] = menu;

  setMenuData(updatedMenuData);
  toast.success("Menu berhasil diperbarui!");

  resetForm();
  setShow(false);
  updateIndexx(null);
};

const deleteData = (index) => {
  const updatedMenuData = [...menuData];
  updatedMenuData.splice(index, 1);
  setMenuData(updatedMenuData);
};

const isMenuDataInvalid = ({ nama, kategori, harga, deskripsi }) => {
  return !nama || !kategori || !harga || !deskripsi;
};

const resetForm = () => {
  setMenu({
    nama: "",
    kategori: "",
    harga: "",
    deskripsi: "",
  });
};

return (
    <>
      <Container className="mt-5">
        <h1 className="mb-3 border-bottom fw-bold">Dashboard</h1>
        <Row className="mb-4">
          <Col md={10}>
            <Card className="h-100 justify-content-center">
              <Card.Body>
                <h4>Selamat datang,</h4>
                <h1 className="fw-bold display-6 mb-3">{user?.username}</h1>
                <p className="mb-0">Kamu sudah login sejak:</p>
                <p className="fw-bold lead mb-0">{formatDate(user?.loginAt)}</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={2}>
            <Card>
              <Card.Body>
                <p>Bukti sedang ngantor:</p>
                <img
                  src={imgProfile}
                  className="img-fluid rounded"
                  alt="Tidak Ada Gambar"
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>
  
        <h1 className="mb-3 border-bottom fw-bold">Daftar Menu Makanan</h1>
        <p className="mb-3">
          Grand Atma memiliki <strong>{menuData.length}</strong> daftar menu makanan
          yang bisa dipesan.
        </p>
        <Button className="mb-3" variant="success" onClick={handleShow}>
          <FaPlusSquare /> Tambah Menu
        </Button>
  
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>
              {updateIndex !== null ? "Edit Menu" : "Tambah Menu"}
            </Modal.Title>
          </Modal.Header>
  
          <Modal.Body>
            <Form style={{ margin: "auto", maxWidth: "500px" }}>
              <h6>Nama Makanan</h6>
              <Form.Control
                type="text"
                placeholder="Masukkan nama makanan"
                name="nama"
                value={menu.nama}
                onChange={changeData}
              />
  
              <br />
  
              <h6>Kategori</h6>
              <Form.Select
                value={menu.kategori}
                name="kategori"
                onChange={changeData}
              >
                <option value={"Kategori"}>Pilih Kategori</option>
                <option value="Main Courses">Main Courses</option>
                <option value="Appetizers">Appetizers</option>
                <option value="Desserts">Desserts</option>
              </Form.Select>
  
              <br />
  
              <h6>Harga</h6>
              <Form.Control
                type="number"
                placeholder={""}
                name="harga"
                value={menu.harga}
                onChange={changeData}
              />
  
              <br />
  
              <h6>Deskripsi</h6>
              <Form.Control
                as="textarea"
                placeholder={""}
                name="deskripsi"
                value={menu.deskripsi}
                onChange={changeData}
              />
            </Form>
          </Modal.Body>
  
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Batal
            </Button>
            <Button
              variant="primary" type="submit"
              onClick={updateIndex !== null ? updateData : SubmitData}
            >
              <FaSave /> Simpan
            </Button>
          </Modal.Footer>
        </Modal>
  
        <div>
          {menuData.map((item, index) => (
            <Card key={index} className="mb-3">
              <Row>
                <Col md={2}>
                  <Card.Body>
                    {item.kategori === "Appetizers" ? (
                      <img
                        src={imgAppetizer}
                        className="img-fluid rounded"
                        alt="Tidak Ada Gambar"
                        width={200}
                        height={200}
                      />
                    ) : item.kategori === "Main Courses" ? (
                      <img
                        src={imgMaincourses}
                        className="img-fluid rounded"
                        alt="Tidak Ada Gambar"
                        width={200}
                        height={200}
                      />
                    ) : (
                      <img
                        src={imgDessert}
                        className="img-fluid rounded"
                        alt="Tidak Ada Gambar"
                        width={200}
                        height={200}
                      />
                    )}
                  </Card.Body>
                </Col>
  
                <Col>
                  <Card.Body className="mb-3 border-bottom">
                    <Card.Title>{item.nama}</Card.Title>
                    <p>{item.deskripsi}</p>
                  </Card.Body>
  
                  <Card.Body>
                    <Row>
                      <p>
                        Kategori: <strong>{item.kategori}</strong> | Harga:{" "}
                        <strong>Rp {item.harga}</strong>{" "}
                      </p>
                      <Col md={2}>
                        <Button
                          variant="danger"
                          onClick={() => deleteData(index)}
                        >
                          <FaTrashAlt /> Hapus Menu
                        </Button>
                      </Col>
                      <Col>
                        <Button
                          variant="primary"
                          onClick={() => handleUpdate(index)}
                        >
                          <BsPencilSquare /> Edit Menu
                        </Button>
                      </Col>
                    </Row>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          ))}
        </div>
      </Container>
    </>
  );  
};

export default DashboardPage;
