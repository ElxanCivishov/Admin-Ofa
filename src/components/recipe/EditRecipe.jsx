import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useEffect, useReducer, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { GetRecipe, UpdateRecipe } from "../../config/newReguest";
import { RecipesReducer, initialState } from "../../reducers/RecipesReducer";
import { BiCloudUpload } from "react-icons/bi";
import { FaTrash } from "react-icons/fa";
import { Button, Col, Form, Image, Row } from "react-bootstrap";
import { toast } from "react-toastify";

import noimage from "/img/noImage.png";
import "./recipe.scss";

export default function EditRecipe() {
  const navigate = useNavigate();

  const [state, dispatch] = useReducer(RecipesReducer, initialState);
  const { azTitle, azContent, enTitle, enContent, ruTitle, ruContent } = state;
  const { id } = useParams();
  const [focused, setFocused] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  const queryClient = useQueryClient();

  useEffect(() => {
    const getRecipe = async () => {
      try {
        const res = await GetRecipe(id);
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
    mutationFn: () => UpdateRecipe({ state, id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recipes"] });
      toast.success("Resept Düzənləndi!");
      setFocused(false);
      navigate("/recipes");
    },
    onError: () => {
      toast.error("Resept Düzənlənmədi!");
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
      mutation.mutate();
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
    <div className="recipe">
      <div className="container">
        <Form
          onSubmit={(e) => handleSubmit(e)}
          className="shadow p-4"
          encType="multipart/form-data"
          noValidate
        >
          <h1>Resepti düzənlə</h1>
          <Row className="mt-5 flex-column">
            <Col xs={12} md={4}>
              <Form.Group
                className="mb-1 d-flex align-items-center justify-content-between"
                controlId="uploadImage"
              >
                <Form.Group controlId="upload-image">
                  <Form.Label className="upload-image">
                    <span>Şəkil yüklə </span>
                    <BiCloudUpload className="upload-icon fs-1" />
                  </Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    className="d-none"
                    onChange={(e) => {
                      handleImagePreview(e);
                    }}
                  />
                </Form.Group>
                <FaTrash
                  className="text-danger"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    handleImageDelete();
                  }}
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
                  value={azTitle}
                  onChange={(e) => handleChange("azTitle", e.target.value)}
                  onBlur={(event) => handleBlur(event)}
                  className={focused && "invalid"}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="azContent">
                <Form.Label>Tərkib</Form.Label>
                <Form.Control
                  as="textarea"
                  style={{ height: "150px" }}
                  value={azContent}
                  onChange={(e) => handleChange("azContent", e.target.value)}
                  onBlur={(event) => handleBlur(event)}
                  className={focused && "invalid"}
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
            <Button variant="outline-success" type="submit">
              Yenilə
            </Button>
          </Col>
        </Form>
      </div>
    </div>
  );
}
