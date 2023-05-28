import { BiCloudUpload } from "react-icons/bi";
import "./recipe.scss";
import { Button, Col, Form, Image, Row } from "react-bootstrap";
export default function Recipe() {
  return (
    <div className="recipe">
      <div className="container">
        <h1>Yeni resept</h1>
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
              <Form.Label className="recipe-lang">Az dilində</Form.Label>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Başlıq</Form.Label>
                <Form.Control />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Tərkib</Form.Label>
                <Form.Control as="textarea" style={{ height: "150px" }} />
              </Form.Group>
            </Col>
            <Col xs={12} md={4}>
              <Form.Label className="recipe-lang">Engilsh</Form.Label>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Title</Form.Label>
                <Form.Control />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Content</Form.Label>
                <Form.Control as="textarea" style={{ height: "150px" }} />
              </Form.Group>
            </Col>
            <Col xs={12} md={4}>
              <Form.Label className="recipe-lang">Русский</Form.Label>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Заголовок</Form.Label>
                <Form.Control />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Содержание</Form.Label>
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
    </div>
  );
}
