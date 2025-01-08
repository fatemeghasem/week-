import { useEffect, useState } from "react";
import Layouts from "../layouts/Layouts";
import { useAuth } from "../context/ProductsContexts";
import styles from "./products.module.css";
import { deleteProduct, ProductList, updateProduct } from "../apiservices";

function ProductPages() {
  const { products, setProducts } = useAuth();
  const [editingProduct, setEditingProduct] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [editedPrice, setEditedPrice] = useState("");
  const [editedNumber, setEditedNumber] = useState("");

  // بارگذاری محصولات از API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const result = await ProductList();
        setProducts(result);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [setProducts]);

  const editeHandler = (product) => {
    setEditingProduct(product);
    setEditedName(product.name);
    setEditedPrice(product.price);
    setEditedNumber(product.number);
  };

  const deleteHandler = async (id) => {
    try {
      await deleteProduct(id);
      const updatedProducts = products.filter((product) => product.id !== id);
      setProducts(updatedProducts);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const saveEditHandler = async () => {
    if (editingProduct) {
      const updatedProduct = {
        ...editingProduct,
        name: editedName,
        price: editedPrice,
        number: editedNumber,
      };
      try {
        await updateProduct(updatedProduct);
        const updatedProducts = products.map((product) =>
          product.id === editingProduct.id ? updatedProduct : product
        );
        setProducts(updatedProducts);
        setEditingProduct(null);
      } catch (error) {
        console.error("Error updating product:", error);
      }
    }
  };

  const cancelHandler = () => {
    if (editingProduct) {
      setEditingProduct(null);
    }
  };



  return (
    <Layouts>
      <table className={styles.container}>
        <thead>
          <tr>
            <th>نام محصول</th>
            <th>قیمت</th>
            <th>تعداد</th>
            <th>عملیات</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(products) && products.length > 0 ? (
            products.data.map((product) => (
              <tr key={product.id}>
                <td>
                  {editingProduct && editingProduct.id === product.id ? (
                    <input
                      type="text"
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                    />
                  ) : (
                    product.name
                  )}
                </td>
                <td>
                  {editingProduct && editingProduct.id === product.id ? (
                    <input
                      type="text"
                      value={editedPrice}
                      onChange={(e) => setEditedPrice(e.target.value)}
                    />
                  ) : (
                    product.price
                  )}
                </td>
                <td>
                  {editingProduct && editingProduct.id === product.id ? (
                    <input
                      type="text"
                      value={editedNumber}
                      onChange={(e) => setEditedNumber(e.target.value)}
                    />
                  ) : (
                    product.number
                  )}
                </td>
                <td>
                  {editingProduct && editingProduct.id === product.id ? (
                    <>
                      <button onClick={saveEditHandler}>ذخیره</button>
                      <button onClick={cancelHandler}>کنسل</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => deleteHandler(product.id)}>
                        حذف
                      </button>
                      <button onClick={() => editeHandler(product)}>
                        ویرایش
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr className={styles.errrr}>
              <td colSpan={"4"}>محصولی یافت نشد</td>
            </tr>
          )}
        </tbody>
      </table>
    </Layouts>
  );
}

export default ProductPages;
