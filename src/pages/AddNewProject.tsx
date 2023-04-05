import React from "react";

function AddNewProject(props: { showModal: boolean; }) {
  return (
    <div className={`modal ${props.showModal ? "showModal" : ""}`}>
      <div className="grid project-container">
        <div className="add-container project-descr-container">
          <label className="label" htmlFor="project-desc">
            Project Description
          </label>
          <input
            type="text"
            className="input"
            name="project-description"
            id="project-desc"
          />
        </div>
        <div className="add-container project-name-container">
          <label className="label" htmlFor="project-name">
            Project name
          </label>
          <input
            type="text"
            className="input"
            name="project-name"
            id="project-name"
          />
        </div>
        <div className="add-container quantity-container">
          <label className="label" htmlFor="quantity">
            Quantity
          </label>
          <input type="text" className="input" name="quantity" id="quantity" />
        </div>
        <div className="add-container price-container">
          <label className="label" htmlFor="price">
            Price
          </label>
          <input type="text" className="input" name="price" id="price" />
        </div>
        <div className="add-container total-container">
          <label className="label" htmlFor="total">
            Total
          </label>
          <input type="text" className="input" name="total" id="total" />
        </div>
        <div className="add-item-control">
          <button className="btn btn-cancel-add">Cancel</button>
          <button className="btn btn-add-project">Add Project</button>
        </div>
      </div>
    </div>
  );
}

export default AddNewProject;
