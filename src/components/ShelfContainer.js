import React from "react";
import Container from "react-bootstrap/Container";
import NavMenu from "../components/NavMenu";
import Image from "react-bootstrap/Image";
// import bookLogo from "./books.jpg";

export default function ShelfContainer({ children }) {
  const data =
    "data:image/png;base64,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";
  return (
    <Container>
      <div style={{ display: "flex" }}>
        <Image
          src={data}
          // className="book-pic"
          style={{ marginTop: "30px", height: "100px" }}
        />
        <div
          style={{
            textAlign: "center",
            fontSize: "40px",
            margin: "30px",
            border: "none",
            padding: "20px",
            color: "burlywood",
            textShadow: "2px 2px black"
          }}
          className="logo-title"
        >
          Book Shelf
        </div>
      </div>
      <NavMenu />
      {children}
    </Container>
  );
}
