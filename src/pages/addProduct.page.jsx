import { useState } from "react";
import productService from "../services/productService";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";

const AddProduct = () => {
  const [inputs, setInputs] = useState({});
  const token = useSelector((state) => state.auth.user.token);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", inputs.name);
    formData.append("description", inputs.description);
    formData.append("price", inputs.price);
    formData.append("image", inputs.image);
    formData.append("name_ar", inputs.name_ar);
    formData.append("description_ar", inputs.description_ar);

    try {
      await productService.addProduct(formData, token);
      toast.success("Product added successfully");
    } catch (error) {
      toast.error("Product could not added");
    }
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleImage = (e) => {
    setInputs((values) => ({ ...values, image: e.target.files[0] }));
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <h2>Add a product</h2>
        <br />
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              <b>Name</b>
            </label>
            <input
              type="text"
              name="name"
              value={inputs.name || ""}
              id="name"
              onChange={handleChange}
              className="textInput"
            />
          </div>
          <div>
            <label>
              <b>Name arabic</b>
            </label>
            <input
              type="text"
              name="name_ar"
              value={inputs.name_ar || ""}
              id="name_ar"
              onChange={handleChange}
              className="textInput"
            />
          </div>
          <div>
            <label>
              <b>Desciption</b>
            </label>
            <input
              type="text"
              name="description"
              value={inputs.description || ""}
              id="description"
              onChange={handleChange}
              className="textInput"
            />
          </div>
          <div>
            <label>
              <b>Desciption arabic</b>
            </label>
            <input
              type="text"
              name="description_ar"
              value={inputs.description_ar || ""}
              id="description_ar"
              onChange={handleChange}
              className="textInput"
            />
          </div>
          <div>
            <label>
              <b>Price</b>
            </label>
            <input
              type="number"
              name="price"
              value={inputs.price || ""}
              id="price"
              onChange={handleChange}
              className="textInput"
            />
          </div>
          <input
            type="file"
            accept=".png, .jpg ,.jpeg"
            name="image"
            onChange={handleImage}
          />

          <button type="submit" className="submitBtn">
            Add
          </button>
        </form>
        <br />
      </div>
    </div>
  );
};

export default AddProduct;
