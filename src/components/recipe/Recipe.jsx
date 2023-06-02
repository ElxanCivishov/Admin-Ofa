import { useReducer, useState } from "react";
import { RecipesReducer, initialState } from "../../reducers/RecipesReducer";
import { AddRecipe } from "../../config/newReguest";

import { BiCloudUpload } from "react-icons/bi";
import { FaTrash } from "react-icons/fa";
import { Col, Form, Image, Row } from "react-bootstrap";

import { toast } from "react-toastify";

import noimage from "/img/noImage.png";
import "./recipe.scss";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function Recipe() {
  const [state, dispatch] = useReducer(RecipesReducer, initialState);
  const [previewImage, setPreviewImage] = useState(null);
  const [focused, setFocused] = useState(false);

  const { azTitle, azContent, enTitle, enContent, ruTitle, ruContent } = state;

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => AddRecipe(state),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recipes"] });
      toast.success("Resept yükləndi!");
      dispatch({ type: "RESET_STATE" });
      setFocused(false);
      setPreviewImage(null);
    },
    onError: () => {
      toast.error("Resept yüklənmədi!");
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!previewImage) {
      toast.error("Şəkil seçin!");
    } else if (
      azContent !== "" &&
      azTitle !== "" &&
      enTitle !== "" &&
      enContent !== "" &&
      ruTitle !== "" &&
      ruContent !== ""
    ) {
      mutation.mutate(state);
    } else {
      setFocused(true);
      toast.warning("Bütün xanalar doldurulmalıdır!");
    }
  };

  const handleChange = (field, value) => {
    dispatch({ type: "UPDATE_FIELD", field, value });
  };

  const handleBlur = (event) => {
    if (event.target.value == "") {
      event.target.style.borderColor = "red";
    } else {
      event.target.style.borderColor = "#ced4da";
    }
  };

  const handleImagePreview = (e) => {
    const file = e.target.files[0];
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleImageDelete = () => {
    setPreviewImage(null);
  };

  return (
    <div className="recipe">
      <div className="container">
        <Form
          onSubmit={(e) => handleSubmit(e)}
          className="shadow p-4"
          noValidate
        >
          <h1>Yeni resept</h1>
          <Row className="mt-5 flex-column">
            <Col xs={12} md={4}>
              <Form.Group
                className="mb-1 d-flex align-items-center justify-content-between"
                controlId="uploadImage"
              >
                <Form.Group controlId="upload-image">
                  <Form.Label className="upload-image">
                    <span className="text-muted">Şəkil yüklə </span>
                    <BiCloudUpload className="upload-icon fs-3 text-muted" />
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
            <hr className="mt-3 mb-3" />
          </Row>

          <Row className="mt-3 mb-3">
            <Col xs={12} md={4}>
              <Form.Label className="recipe-lang">Az dilində</Form.Label>
              <Form.Group className="mb-3" controlId="azTitle">
                <Form.Label>Başlıq</Form.Label>
                <Form.Control
                  className={focused && "invalid"}
                  value={azTitle}
                  onChange={(e) => handleChange("azTitle", e.target.value)}
                  onBlur={(event) => handleBlur(event)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="azContent">
                <Form.Label>Tərkib</Form.Label>
                <Form.Control
                  as="textarea"
                  style={{ height: "150px" }}
                  value={azContent}
                  className={focused && "invalid"}
                  onChange={(e) => handleChange("azContent", e.target.value)}
                  onBlur={(event) => handleBlur(event)}
                  required
                />
              </Form.Group>
            </Col>
            <Col xs={12} md={4}>
              <Form.Label className="recipe-lang">Engilsh</Form.Label>
              <Form.Group className="mb-3" controlId="enTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  value={enTitle}
                  onChange={(e) => handleChange("enTitle", e.target.value)}
                  onBlur={(event) => handleBlur(event)}
                  className={focused && "invalid"}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="enContent">
                <Form.Label>Content</Form.Label>
                <Form.Control
                  as="textarea"
                  style={{ height: "150px" }}
                  value={enContent}
                  onChange={(e) => handleChange("enContent", e.target.value)}
                  onBlur={(event) => handleBlur(event)}
                  className={focused && "invalid"}
                  required
                />
              </Form.Group>
            </Col>
            <Col xs={12} md={4}>
              <Form.Label className="recipe-lang">Русский</Form.Label>
              <Form.Group className="mb-3" controlId="ruTitle">
                <Form.Label>Заголовок</Form.Label>
                <Form.Control
                  value={ruTitle}
                  onChange={(e) => handleChange("ruTitle", e.target.value)}
                  onBlur={(event) => handleBlur(event)}
                  className={focused && "invalid"}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="ruContent">
                <Form.Label>Содержание</Form.Label>
                <Form.Control
                  as="textarea"
                  style={{ height: "150px" }}
                  value={ruContent}
                  onChange={(e) => handleChange("ruContent", e.target.value)}
                  onBlur={(event) => handleBlur(event)}
                  className={focused && "invalid"}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Col className="text-center mt-3 mb-3">
            <button
              className="btn btn-outline-success btn-not-allowed"
              type="submit"
            >
              Əlavə et
            </button>
          </Col>
        </Form>
      </div>
    </div>
  );
}
