import { BiCloudUpload } from "react-icons/bi";
import { FaTrash } from "react-icons/fa";
import "./products.scss";
import { Button, Col, Form, Image, Row, ListGroup } from "react-bootstrap";

const Product = () => {
  return (
    <div className="products">
      <h1 className="title">Yeni məhsul</h1>
      <hr />
      <Form>
        <Row className="mt-5">
          <Col xs={12} md={6}>
            <Form.Group className="mb-3" controlId="upload-image">
              <Form.Label className="upload-image">
                <span>Şəkil yüklə </span>
                <BiCloudUpload className="upload-icon" />
              </Form.Label>
              <Form.Control type="file" accept="image/*" className="d-none" />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mt-3 mb-3">
          <Col xs={12} md={6}>
            <Image src="/img/error.png" rounded />
          </Col>
        </Row>
        <Row className="mt-3 mb-3">
          <Col xs={12} md={4}>
            <Form.Select aria-label="select categories" className="mt-3 mb-3">
              <option disabled selected>
                Kateqoriya seçin...
              </option>
              <option value="dryFruits">Qurudulmuş meyvələr</option>
              <option value="jams">Mürəbbə və cemlər</option>
              <option value="packageProducts">Paket məhsullar</option>
            </Form.Select>
          </Col>
        </Row>
        <Row className="mt-3 mb-3">
          <Col xs={12} md={4}>
            <Form.Label className="product-lang">Az dilində</Form.Label>
            <Form.Group className="mb-3" controlId="az-title">
              <Form.Label>Məhsul adı</Form.Label>
              <Form.Control />
            </Form.Group>

            <Form.Group className="mb-3" controlId="az-main-text">
              <Form.Label>Əsas mətn</Form.Label>
              <Form.Control as="textarea" style={{ height: "150px" }} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="az-content">
              <Form.Label>Tərkib</Form.Label>
              <Form.Control />
            </Form.Group>
            <Form.Group className="mb-3" controlId="az-feature-title">
              <Form.Label>Xüsusiyyət başlığı</Form.Label>
              <Form.Control />
            </Form.Group>
            <ListGroup as="ol">
              <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start"
              >
                <div className="ms-2 me-auto">Cras justo odio</div>
                <FaTrash bg="primary" />
              </ListGroup.Item>
            </ListGroup>
            <Form.Group className="mb-3 mt-3" controlId="az-addition-text">
              <Form.Label>Əlavə mətn</Form.Label>
              <Form.Control as="textarea" style={{ height: "150px" }} />
            </Form.Group>
          </Col>
          <Col xs={12} md={4}>
            <Form.Label className="product-lang">Engilis</Form.Label>
            <Form.Group className="mb-3" controlId="en-title">
              <Form.Label>Product name</Form.Label>
              <Form.Control />
            </Form.Group>

            <Form.Group className="mb-3" controlId="en-main-text">
              <Form.Label>Main text</Form.Label>
              <Form.Control as="textarea" style={{ height: "150px" }} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="en-content">
              <Form.Label>Composition</Form.Label>
              <Form.Control />
            </Form.Group>
            <Form.Group className="mb-3" controlId="en-feature-title">
              <Form.Label>Feature title</Form.Label>
              <Form.Control />
            </Form.Group>
            <ListGroup as="ol">
              <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start"
              >
                <div className="ms-2 me-auto">Cras justo odio</div>
                <FaTrash bg="primary" />
              </ListGroup.Item>
            </ListGroup>
            <Form.Group className="mb-3 mt-3" controlId="en-addition-text">
              <Form.Label>Addition text</Form.Label>
              <Form.Control as="textarea" style={{ height: "150px" }} />
            </Form.Group>
          </Col>{" "}
          <Col xs={12} md={4}>
            <Form.Label className="product-lang">Русский</Form.Label>
            <Form.Group className="mb-3" controlId="ru-title">
              <Form.Label>Название продукта</Form.Label>
              <Form.Control />
            </Form.Group>

            <Form.Group className="mb-3" controlId="ru-main-text">
              <Form.Label>Основной текст</Form.Label>
              <Form.Control as="textarea" style={{ height: "150px" }} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="ru-content">
              <Form.Label>Содержание</Form.Label>
              <Form.Control />
            </Form.Group>
            <Form.Group className="mb-3" controlId="ru-feature-title">
              <Form.Label>Название функции</Form.Label>
              <Form.Control />
            </Form.Group>
            <ListGroup as="ol">
              <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start"
              >
                <div className="ms-2 me-auto">Cras justo odio</div>
                <FaTrash bg="primary" />
              </ListGroup.Item>
            </ListGroup>
            <Form.Group className="mb-3 mt-3" controlId="ru-addition-text">
              <Form.Label>Дополнительный текст</Form.Label>
              <Form.Control as="textarea" style={{ height: "150px" }} />
            </Form.Group>
          </Col>
        </Row>
        <Col className="text-center mt-3 mb-3">
          <Button variant="outline-success" type="submit">
            Əlavə et
          </Button>
        </Col>
      </Form>
    </div>
  );
};

export default Product;
