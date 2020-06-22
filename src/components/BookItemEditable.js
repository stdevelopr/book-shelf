import React, { useState, useRef } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import "./BookItemEditable.scss";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router";
import logo from "./logo.png";
import { sagaBookTypes } from "../store/sagas/books";

function BookItemEditable({ book, history }) {
  const dispatch = useDispatch();
  const categories = useSelector(state => state.categories);
  const [edit, setEdit] = useState(false);
  // const [editTitle, setEditTitle] = useState(book.title);
  // const [editDescription, setEditDescription] = useState(book.description);
  const [editCategory, setEditCategory] = useState(categories[book.category]);
  const titleRef = useRef();
  const authorRef = useRef();
  const descriptionRef = useRef();
  const edit_border = edit ? "edit-border" : "";

  const cancelEditing = () => {
    setEdit(false);
    titleRef.current.innerHTML = book.title;
    authorRef.current.innerHTML = book.author;
    descriptionRef.current.innerHTML = book.description;
  };

  const getCategoryKey = value => {
    return (
      Object.keys(categories).find(
        category => categories[category] === value
      ) || null
    );
  };

  const strip_html_tags = str => {
    if (str === null || str === "") return false;
    else str = str.toString();
    return str.replace(/<[^>]*(>|$)|&nbsp;|&zwnj;|&raquo;|&laquo;|&gt;/g, " ");
  };

  const editBook = () => {
    dispatch({
      type: sagaBookTypes.EDIT_BOOK,
      payload: {
        id: book.id,
        title: strip_html_tags(titleRef.current.innerHTML),
        author: strip_html_tags(authorRef.current.innerHTML),
        description: strip_html_tags(descriptionRef.current.innerHTML),
        category: getCategoryKey(editCategory),
        deleted: false
      }
    });
    setEdit(false);
  };
  return (
    <div>
      <Row className="row shelf">
        {/* <Col md={2} className="text-center">
          {edit ? (
            <div className="category-small-screen category d-md-none">
              {categories[book.category]}
            </div>
          ) : (
            <Link to={`/category/${book.category}`}>
              <div className="category-small-screen category d-md-none">
                {categories[book.category]}
              </div>
            </Link>
          )}
          <Image
            src={logo}
            thumbnail
            className="book-pic"
            style={{ marginTop: "30px" }}
          />
        </Col> */}
        <Col className="text-center text-md-left">
          <Row style={{ marginTop: "30px" }}>
            <Col className="text-center text-md-left">
              <Row>
                <Col
                  md={2}
                  style={{
                    fontSize: "20px",
                    color: "blue",
                    textAlign: "center",
                    margin: "auto"
                  }}
                >
                  <div>Title</div>
                </Col>
                <Col md={10} style={{ fontSize: "20px" }}>
                  <div
                    ref={titleRef}
                    contentEditable={edit}
                    suppressContentEditableWarning={true}
                    className={`word-break ${edit_border}`}
                    style={{ whiteSpace: "nowrap" }}
                  >
                    {book.title}
                  </div>
                </Col>
              </Row>
              <Row>
                <Col
                  md={2}
                  style={{
                    fontSize: "18px",
                    color: "blue",
                    textAlign: "center",
                    margin: "auto"
                  }}
                >
                  <div>Author</div>
                </Col>
                <Col md={10} style={{ fontSize: "18px" }}>
                  <div
                    ref={authorRef}
                    contentEditable={edit}
                    suppressContentEditableWarning={true}
                    className={`word-break ${edit_border}`}
                  >
                    {book.author}
                  </div>
                </Col>
              </Row>
            </Col>
            {edit ? (
              <div className="category-small-screen category d-md-inline-block">
                {/* {categories[book.category]} */}

                <Form.Control
                  as="select"
                  className="edit-select-category"
                  value={editCategory}
                  onChange={e => {
                    setEditCategory(e.target.value);
                  }}
                >
                  <option>Choose a category...</option>
                  {Object.keys(categories).map(key => {
                    return <option key={key}>{categories[key]}</option>;
                  })}
                </Form.Control>
              </div>
            ) : (
              <div className="category-small-screen category d-md-inline-block">
                <Link to={`/category/${book.category}`}>
                  {categories[book.category]}
                </Link>
              </div>
            )}
          </Row>
          <div
            style={{
              marginTop: "30px",
              fontSize: "20px",
              color: "blue",
              textAlign: "center"
            }}
          >
            Description
          </div>
          <Row
            style={{ margin: "30px", marginTop: "10px", textAlign: "center" }}
          >
            <div
              ref={descriptionRef}
              contentEditable={edit}
              suppressContentEditableWarning={true}
              className={`word-break description ${edit_border}`}
            >
              {book.description}
            </div>
          </Row>
          <div className="edit-item-button">
            <button
              onClick={() => {
                edit ? editBook() : setEdit(true);
              }}
            >
              {edit ? "Save" : "Edit"}
            </button>
            <button onClick={() => cancelEditing()}>Cancel</button>
            <button
              onClick={() => {
                dispatch({
                  type: sagaBookTypes.DELETE_BOOK,
                  payload: book.id
                });
                history.push("/");
              }}
            >
              delete
            </button>
          </div>
          <div>
            created at: {new Date(book.timestamp).toLocaleDateString("en-GB")}
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default withRouter(BookItemEditable);