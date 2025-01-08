import { CiSearch } from "react-icons/ci";
import { SiGoogletagmanager } from "react-icons/si";
import styles from "./layouts.module.css";
import { useAuth } from "../context/ProductsContexts";

import { useContext, useState } from "react";
import AddProducts from "../components/AddProducts";

function Layouts({ children }) {
  const [addPart, setAddPart] = useState(false);
  const { username } = useAuth();

  const [isInputFocused, setIsInputFocused] = useState(false);

  const searchHandler = () => {};

  return (
    <div className={styles.container}>
      <div>
        {!isInputFocused && (
          <div className={styles.searchtext}>
            <CiSearch className={styles.searchsvg} />
            <p>جستجوی کالا</p>
          </div>
        )}
        <div className={styles.toplayout}>
          <input
            type="text"
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
            onChange={searchHandler}
          />
          <div></div>
          <p>{username}</p>
        </div>
      </div>
      <div className={styles.manegment}>
        <div className={styles.manegmentsvg}>
          <SiGoogletagmanager className={styles.svg} />
          <h1>مدیریت کالا</h1>
        </div>
        <button onClick={() => setAddPart(true)}>افزودن محصول</button>
      </div>
      {addPart && <AddProducts setAddPart={setAddPart} />}

      {children}
      <div className={styles.end}>
        <p>developed by meeeee</p>
      </div>
    </div>
  );
}

export default Layouts;
