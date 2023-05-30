import { BiCloudUpload } from "react-icons/bi";
import { FaTrash } from "react-icons/fa";
import "./products.scss";
import { Button, Col, Form, Image, Row, ListGroup } from "react-bootstrap";
import { useReducer, useState } from "react";
import { ProductsReducer, initialState } from "../../reducers/ProductsReducer";
import { useMutation } from "@tanstack/react-query";

import noimage from "/img/noImage.png";

const Product = () => {
  const [state, dispatch] = useReducer(ProductsReducer, initialState);
  const [previewImage, setPreviewImage] = useState(null);
  const [azFeature, setAzFeature] = useState("");
  const [enFeature, setEnFeature] = useState("");
  const [ruFeature, setRuFeature] = useState("");

  const {
    category,
    price,
    azTitle,
    azContent,
    azComposition,
    azFeatureTitle,
    azFeatures,
    azAddition,
    enTitle,
    enContent,
    enComposition,
    enFeatureTitle,
    enFeatures,
    enAddition,
    ruTitle,
    ruContent,
    ruComposition,
    ruFeatureTitle,
    ruFeatures,
    ruAddition,
  } = state;

  const { mutate } = useMutation((formData) => console.log(formData));

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(state);
  };

  const handleChange = (field, value) => {
    dispatch({ type: "UPDATE_FIELD", field, value });
  };

  const handleAzFeature = () => {
    dispatch({
      type: "AZ_ADD_FEATURE",
      payload: azFeature,
    });
    setAzFeature("");
  };

  const handleRuFeature = () => {
    dispatch({
      type: "RU_ADD_FEATURE",
      payload: ruFeature,
    });
    setRuFeature("");
  };

  const handleEnFeature = () => {
    dispatch({
      type: "EN_ADD_FEATURE",
      payload: enFeature,
    });
    setEnFeature("");
  };

  const handleImagePreview = (e) => {
    const file = e.target.files[0];
    setPreviewImage(URL.createObjectURL(file));
  };

  console.log(state);

  return (
    <div className="products">
      <h1 className="title">Yeni məhsul</h1>
      <hr />
      <Form onSubmit={(e) => handleSubmit(e)}>
        <Row className="mt-5">
          <Col xs={12} md={6}>
            <Form.Group className="mb-3" controlId="upload-image">
              <Form.Label className="upload-image">
                <span>Şəkil yüklə </span>
                <BiCloudUpload className="upload-icon" />
              </Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                className="d-none"
                onChange={(e) => {
                  handleChange("image", e.target.files[0]);
                  handleImagePreview(e);
                }}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mt-3 mb-3">
          <Col xs={12} md={6}>
            <Image
              style={{ maxWidth: "300px" }}
              src={previewImage || noimage}
              rounded
            />
          </Col>
        </Row>
        <Row className="mt-3 mb-3">
          <Col xs={12} md={4}>
            <Form.Group className="mb-3" controlId="category">
              <Form.Label>Kategoriya seçin</Form.Label>
              <Form.Select
                aria-label="select categories"
                value={category}
                onChange={(e) => handleChange("category", e.target.value)}
              >
                <option value="" disabled>
                  Kateqoriya seçin...
                </option>
                <option value="dryFruits">Qurudulmuş meyvələr</option>
                <option value="jams">Mürəbbə və cemlər</option>
                <option value="packageProducts">Paket məhsullar</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col xs={12} md={4}>
            <Form.Group className="mb-3" controlId="price">
              <Form.Label>Qiymət</Form.Label>
              <Form.Control
                type="number"
                value={price}
                onChange={(e) => handleChange("price", e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mt-3 mb-3">
          <Col xs={12} md={4}>
            <Form.Label className="product-lang">Az dilində</Form.Label>
            <Form.Group className="mb-3" controlId="az-title">
              <Form.Label>Məhsul adı</Form.Label>
              <Form.Control
                value={azTitle}
                onChange={(e) => handleChange("azTitle", e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="az-main-text">
              <Form.Label>Əsas mətn</Form.Label>
              <Form.Control
                as="textarea"
                style={{ height: "150px" }}
                value={azContent}
                onChange={(e) => handleChange("azContent", e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="az-content">
              <Form.Label>Tərkib</Form.Label>
              <Form.Control
                value={azComposition}
                onChange={(e) => handleChange("azComposition", e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="az-feature-title">
              <Form.Label>Xüsusiyyət başlığı</Form.Label>
              <Form.Control
                value={azFeatureTitle}
                onChange={(e) => handleChange("azFeatureTitle", e.target.value)}
              />
            </Form.Group>
            <Form.Group
              className="mb-3 d-flex align-items-center"
              controlId="az-features"
            >
              <Form.Control
                value={azFeature}
                onChange={(e) => setAzFeature(e.target.value)}
              />
              <Button className="me-2 ms-2" onClick={() => handleAzFeature()}>
                +
              </Button>
            </Form.Group>

            <ListGroup as="ol">
              {state?.azFeatures?.map((f) => (
                <ListGroup.Item
                  key={f}
                  as="li"
                  className="d-flex justify-content-between align-items-start"
                >
                  <div className="ms-2 me-auto">{f}</div>
                  <FaTrash
                    bg="primary"
                    onClick={() =>
                      dispatch({ type: "AZ_REMOVE_FEATURE", payload: f })
                    }
                  />
                </ListGroup.Item>
              ))}
            </ListGroup>
            <Form.Group className="mb-3 mt-3" controlId="az-addition-text">
              <Form.Label>Əlavə mətn</Form.Label>
              <Form.Control
                as="textarea"
                style={{ height: "150px" }}
                value={azAddition}
                onChange={(e) => handleChange("azAddition", e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col xs={12} md={4}>
            <Form.Label className="product-lang">Engilis</Form.Label>
            <Form.Group className="mb-3" controlId="en-title">
              <Form.Label>Product name</Form.Label>
              <Form.Control
                value={enTitle}
                onChange={(e) => handleChange("enTitle", e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="en-main-text">
              <Form.Label>Main text</Form.Label>
              <Form.Control
                as="textarea"
                style={{ height: "150px" }}
                value={enContent}
                onChange={(e) => handleChange("enContent", e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="en-content">
              <Form.Label>Composition</Form.Label>
              <Form.Control
                value={enComposition}
                onChange={(e) => handleChange("enComposition", e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="en-feature-title">
              <Form.Label>Feature title</Form.Label>
              <Form.Control
                value={enFeatureTitle}
                onChange={(e) => handleChange("enFeatureTitle", e.target.value)}
              />
            </Form.Group>
            <Form.Group
              className="mb-3 d-flex align-items-center"
              controlId="az-features"
            >
              <Form.Control
                value={enFeature}
                onChange={(e) => setEnFeature(e.target.value)}
              />
              <Button className="me-2 ms-2" onClick={() => handleEnFeature()}>
                +
              </Button>
            </Form.Group>

            <ListGroup as="ol">
              {state?.enFeatures?.map((f) => (
                <ListGroup.Item
                  key={f}
                  as="li"
                  className="d-flex justify-content-between align-items-start"
                >
                  <div className="ms-2 me-auto">{f}</div>
                  <FaTrash
                    bg="primary"
                    onClick={() =>
                      dispatch({ type: "EN_REMOVE_FEATURE", payload: f })
                    }
                  />
                </ListGroup.Item>
              ))}
            </ListGroup>
            <Form.Group className="mb-3 mt-3" controlId="en-addition-text">
              <Form.Label>Addition text</Form.Label>
              <Form.Control
                as="textarea"
                style={{ height: "150px" }}
                value={enAddition}
                onChange={(e) => handleChange("enAddition", e.target.value)}
              />
            </Form.Group>
          </Col>{" "}
          <Col xs={12} md={4}>
            <Form.Label className="product-lang">Русский</Form.Label>
            <Form.Group className="mb-3" controlId="ru-title">
              <Form.Label>Название продукта</Form.Label>
              <Form.Control
                value={ruTitle}
                onChange={(e) => handleChange("ruTitle", e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="ru-main-text">
              <Form.Label>Основной текст</Form.Label>
              <Form.Control
                as="textarea"
                style={{ height: "150px" }}
                value={ruContent}
                onChange={(e) => handleChange("ruContent", e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="ru-content">
              <Form.Label>Содержание</Form.Label>
              <Form.Control
                value={ruComposition}
                onChange={(e) => handleChange("ruComposition", e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="ru-feature-title">
              <Form.Label>Название функции</Form.Label>
              <Form.Control
                value={ruFeatureTitle}
                onChange={(e) => handleChange("ruFeatureTitle", e.target.value)}
              />
            </Form.Group>
            <Form.Group
              className="mb-3 d-flex align-items-center"
              controlId="az-features"
            >
              <Form.Control
                value={ruFeature}
                onChange={(e) => setRuFeature(e.target.value)}
              />
              <Button className="me-2 ms-2" onClick={() => handleRuFeature()}>
                +
              </Button>
            </Form.Group>

            <ListGroup as="ol">
              {state?.ruFeatures?.map((f) => (
                <ListGroup.Item
                  key={f}
                  as="li"
                  className="d-flex justify-content-between align-items-start"
                >
                  <div className="ms-2 me-auto">{f}</div>
                  <FaTrash
                    bg="primary"
                    onClick={() =>
                      dispatch({ type: "RU_REMOVE_FEATURE", payload: f })
                    }
                  />
                </ListGroup.Item>
              ))}
            </ListGroup>
            <Form.Group className="mb-3 mt-3" controlId="ru-addition-text">
              <Form.Label>Дополнительный текст</Form.Label>
              <Form.Control
                as="textarea"
                style={{ height: "150px" }}
                value={ruAddition}
                onChange={(e) => handleChange("ruAddition", e.target.value)}
              />
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
