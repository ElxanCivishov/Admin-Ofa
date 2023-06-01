import { useEffect, useReducer, useState } from "react";
import { ProductsReducer, initialState } from "../../reducers/ProductsReducer";
import { GetProduct, UpdateProduct } from "../../config/newReguest";
import { BiCloudUpload } from "react-icons/bi";
import { FaTrash } from "react-icons/fa";
import { Button, Col, Form, Image, Row, ListGroup } from "react-bootstrap";
import noimage from "/img/noImage.png";
import "./product.scss";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Navigate, useNavigate, useParams } from "react-router-dom";

const EditProduct = () => {
  const [state, dispatch] = useReducer(ProductsReducer, initialState);
  const navigate = useNavigate();
  const { id } = useParams();

  const [previewImage, setPreviewImage] = useState(null);
  const [features, setFeatures] = useState({
    azFeatures: "",
    ruFeatures: "",
    enFeatures: "",
  });

  const [focused, setFocused] = useState(false);

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

  const queryClient = useQueryClient();

  console.log(state);

  useEffect(() => {
    const getRecipe = async () => {
      try {
        const res = await GetProduct(id);
        console.log(res);
        setPreviewImage(res.image);
        dispatch({ type: "SET_DATA", payload: res });
      } catch (error) {
        <Navigate
          to="/errorpage"
          state={{ error: error.message }}
          replace={true}
        />;
      }
    };

    getRecipe();
  }, []);

  const mutation = useMutation({
    mutationFn: () => UpdateProduct({ id, state }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dryFruits"] });
      queryClient.invalidateQueries({ queryKey: ["jams"] });
      queryClient.invalidateQueries({ queryKey: ["packageProducts"] });
      toast.success("Məhsul düzənləndi!");
      navigate("/recipes");
    },
    onError: () => {
      toast.error("Məhsul yüklənmədi!");
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!previewImage) {
      toast.warning("Şəkil seçin!");
    } else if (
      category !== "" &&
      price !== "" &&
      azContent !== "" &&
      azTitle !== "" &&
      azComposition !== "" &&
      enTitle !== "" &&
      enContent !== "" &&
      enComposition !== "" &&
      ruTitle !== "" &&
      ruContent !== "" &&
      ruComposition !== ""
    ) {
      mutation.mutate(state);
    } else {
      setFocused(true);
      toast.warning("Lazımlı xanalar doldurulmalıdır!");
    }
  };

  const handleChange = (field, value) => {
    dispatch({ type: "UPDATE_FIELD", field, value });
  };

  const handleFeatures = (e) => {
    setFeatures({ ...features, [e.target.name]: e.target.value });
  };

  const addFeature = (field) => {
    if (features[field]) {
      if (state[field].includes(features[field])) {
        toast.warning("Bu xüsusiyyət artıq mövcuddur!");
        setFeatures({ ...features, [field]: "" });
      } else {
        dispatch({
          type: "ADD_FEATURE",
          field,
          value: features[field],
        });
        setFeatures({ ...features, [field]: "" });
      }
    } else {
      toast.error("Xüsusiyyət daxil edin!");
    }
  };

  const handleBlur = (event) => {
    if (event.target.value == "") {
      event.target.style.borderColor = "red";
    } else {
      event.target.style.borderColor = "#ced4da";
    }
  };

  const handleImagePreview = (e) => {
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      const imgUrlBase64 = reader.result;
      handleChange("image", imgUrlBase64);
    };

    setPreviewImage(URL.createObjectURL(file));
  };

  const handleImageDelete = () => {
    setPreviewImage(null);
    handleChange("image", "");
  };

  return (
    <div className="product">
      <Form onSubmit={(e) => handleSubmit(e)} className="shadow p-4" noValidate>
        <h1 className="title">Məhsulu düzənlə</h1>
        <hr />
        <Row className="mt-5 flex-column">
          <Col xs={12} md={4}>
            <Form.Group
              className="mb-1 d-flex align-items-center justify-content-between"
              controlId="uploadImage"
            >
              <Form.Group controlId="upload-image">
                <Form.Label className="d-flex align-items-center">
                  <span>Şəkil yüklə </span>
                  <BiCloudUpload className="fs-3 me-2 ms-2" />
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
              <FaTrash
                className="text-danger"
                style={{ cursor: "pointer" }}
                onClick={() => handleImageDelete()}
              />
            </Form.Group>
          </Col>
          <Col xs={12} md={4}>
            <Image
              src={previewImage || noimage}
              rounded
              className="w-100"
              style={{ maxHeight: "300px" }}
            />
          </Col>
        </Row>

        <Row className="mt-3 mb-3">
          <Col xs={12} md={4}>
            <Form.Group className="mb-3" controlId="category">
              <Form.Label>Kategoriya seçin</Form.Label>
              <Form.Select
                aria-label="select categories"
                className={focused && "invalid"}
                value={category}
                onChange={(e) => handleChange("category", e.target.value)}
                onBlur={(event) => handleBlur(event)}
                required
              >
                <option value="" disabled>
                  Kateqoriya seçin...
                </option>
                <option value="Dryfruits">Qurudulmuş meyvələr</option>
                <option value="Jams">Mürəbbə və cemlər</option>
                <option value="Packagefruits">Paket məhsullar</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col xs={12} md={4}>
            <Form.Group className="mb-3" controlId="price">
              <Form.Label>Qiymət</Form.Label>
              <Form.Control
                type="number"
                className={focused && "invalid"}
                value={price}
                onChange={(e) => handleChange("price", e.target.value)}
                onBlur={(event) => handleBlur(event)}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mt-3 mb-3">
          <Col xs={12} md={4}>
            <hr className="mt-3 mb-3 w-100" />
            <Form.Label className="product-lang">Az dilində</Form.Label>
            <Form.Group className="mb-3" controlId="az-title">
              <Form.Label>Məhsul adı</Form.Label>
              <Form.Control
                className={focused && "invalid"}
                value={azTitle}
                onChange={(e) => handleChange("azTitle", e.target.value)}
                onBlur={(event) => handleBlur(event)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="az-main-text">
              <Form.Label>Əsas mətn</Form.Label>
              <Form.Control
                as="textarea"
                style={{ height: "150px" }}
                value={azContent}
                onChange={(e) => handleChange("azContent", e.target.value)}
                className={focused && "invalid"}
                onBlur={(event) => handleBlur(event)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="az-content">
              <Form.Label>Tərkib</Form.Label>
              <Form.Control
                value={azComposition}
                onChange={(e) => handleChange("azComposition", e.target.value)}
                className={focused && "invalid"}
                onBlur={(event) => handleBlur(event)}
                required
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
                name="azFeatures"
                value={features.azFeatures}
                onChange={(e) => handleFeatures(e)}
              />
              <Button
                className="me-2 ms-2"
                variant="success"
                onClick={() => addFeature("azFeatures")}
              >
                +
              </Button>
            </Form.Group>

            <ListGroup as="ol">
              {azFeatures?.map((f) => (
                <ListGroup.Item
                  key={f}
                  as="li"
                  className="d-flex justify-content-between align-items-start"
                >
                  <div className="ms-2 me-auto">{f}</div>
                  <FaTrash
                    className="delete-icon"
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
            <hr className="mt-3 mb-3 w-100" />
            <Form.Label className="product-lang">Engilis</Form.Label>
            <Form.Group className="mb-3" controlId="en-title">
              <Form.Label>Product name</Form.Label>
              <Form.Control
                value={enTitle}
                onChange={(e) => handleChange("enTitle", e.target.value)}
                className={focused && "invalid"}
                onBlur={(event) => handleBlur(event)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="en-main-text">
              <Form.Label>Main text</Form.Label>
              <Form.Control
                as="textarea"
                style={{ height: "150px" }}
                value={enContent}
                onChange={(e) => handleChange("enContent", e.target.value)}
                className={focused && "invalid"}
                onBlur={(event) => handleBlur(event)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="en-content">
              <Form.Label>Composition</Form.Label>
              <Form.Control
                value={enComposition}
                onChange={(e) => handleChange("enComposition", e.target.value)}
                className={focused && "invalid"}
                onBlur={(event) => handleBlur(event)}
                required
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
                name="enFeatures"
                value={features.enFeatures}
                onChange={(e) => handleFeatures(e)}
              />
              <Button
                variant="success"
                className="me-2 ms-2"
                onClick={() => addFeature("enFeatures")}
              >
                +
              </Button>
            </Form.Group>

            <ListGroup as="ol">
              {enFeatures?.map((f) => (
                <ListGroup.Item
                  key={f}
                  as="li"
                  className="d-flex justify-content-between align-items-start"
                >
                  <div className="ms-2 me-auto">{f}</div>
                  <FaTrash
                    className="delete-icon"
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
            <hr className="mt-3 mb-3 w-100" />
            <Form.Label className="product-lang">Русский</Form.Label>
            <Form.Group className="mb-3" controlId="ru-title">
              <Form.Label>Название продукта</Form.Label>
              <Form.Control
                value={ruTitle}
                onChange={(e) => handleChange("ruTitle", e.target.value)}
                className={focused && "invalid"}
                onBlur={(event) => handleBlur(event)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="ru-main-text">
              <Form.Label>Основной текст</Form.Label>
              <Form.Control
                as="textarea"
                style={{ height: "150px" }}
                value={ruContent}
                onChange={(e) => handleChange("ruContent", e.target.value)}
                className={focused && "invalid"}
                onBlur={(event) => handleBlur(event)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="ru-content">
              <Form.Label>Содержание</Form.Label>
              <Form.Control
                value={ruComposition}
                onChange={(e) => handleChange("ruComposition", e.target.value)}
                className={focused && "invalid"}
                onBlur={(event) => handleBlur(event)}
                required
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
                name="ruFeatures"
                value={features.ruFeatures}
                onChange={(e) => handleFeatures(e)}
              />
              <Button
                variant="success"
                className="me-2 ms-2"
                onClick={() => addFeature("ruFeatures")}
              >
                +
              </Button>
            </Form.Group>

            <ListGroup as="ol">
              {ruFeatures?.map((f) => (
                <ListGroup.Item
                  key={f}
                  as="li"
                  className="d-flex justify-content-between align-items-start"
                >
                  <div className="ms-2 me-auto">{f}</div>
                  <FaTrash
                    className="delete-icon"
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
            Yenilə
          </Button>
        </Col>
      </Form>
    </div>
  );
};

export default EditProduct;
