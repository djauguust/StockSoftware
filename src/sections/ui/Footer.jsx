import React from "react";

export const Footer = () => {
  return (
    <div className="container">
      <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
        <div className="col-md d-flex align-items-center">
          <span
            className="mb-3 mb-md-0 text-muted"
            style={{ fontSize: "10pt" }}
          >
            <small>
              © Sistema de Stock desarrollado por Ing. Augusto Brito - Cualquier problema comunicarse con contacto.britoa@gmail.com
            </small>
          </span>
        </div>
      </footer>
    </div>
  );
};
