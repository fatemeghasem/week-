import styles from "./Addpro.module.css";
import { useAuth } from "../context/ProductsContexts";
import { useState } from "react";
import { v4 } from "uuid";
import { createProduct } from "../apiservices";
import { useNavigate } from "react-router-dom";

function AddProducts({ setAddPart }) {
  const [alert, setAlert] = useState("");
  const { products, setProducts, inputValues, setInputValues } = useAuth();
  const navigate = useNavigate();

  const handleCreate = async () => {
    if (!inputValues.name || !inputValues.number || !inputValues.price) {
      setAlert("لطفا همه فیلدها را پر کنید!");
      return;
    }

    if (isNaN(inputValues.number) || isNaN(inputValues.price)) {
      setAlert("تعداد و قیمت باید عددی باشند!");
      return;
    }

    setAlert("");

    try {
      const newProducts = {
        ...inputValues,
        id: v4(),
        number: parseInt(inputValues.number),
        price: parseFloat(inputValues.price),
      };
      await createProduct(newProducts);
      setProducts( newProducts);
      navigate("/Products");
      console.log(newProducts);
      
    } catch {
      setAlert("خطا در ایجاد محصول! لطفا دوباره تلاش کنید.");
    }

    setAddPart(false)
  };

  const changeHandle = (event) => {
    const name = event.target.name;
    const value = event.target.value || "";
    setInputValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const cancelHandler = () => {
    setInputValues({
      name: "",
      number: "",
      price: "",
    });
    setAddPart(false);
  };

  return (
    <div className={styles.container}>
      <h1>ایجاد محصول جدید</h1>
      <div className={styles.addlist}>
        <label htmlFor="name">نام کالا</label>
        <input
          onChange={changeHandle}
          name="name"
          value={inputValues.name}
          type="text"
          placeholder="نام کالا"
        />
        <label htmlFor="number">تعداد موجودی</label>
        <input
          onChange={changeHandle}
          name="number"
          value={inputValues.number}
          type="text"
          placeholder="تعداد"
        />
        <label htmlFor="price">قیمت</label>
        <input
          onChange={changeHandle}
          name="price"
          value={inputValues.price}
          type="text"
          placeholder="قیمت"
        />
      </div>
      {alert && <p>{alert}</p>}
      <div className={styles.btn}>
        <button type="button" onClick={handleCreate} className={styles.create}>
          ایجاد
        </button>
        <button type="button" onClick={cancelHandler} className={styles.cancel}>
          انصراف
        </button>
      </div>
    </div>
  );
}

export default AddProducts;
