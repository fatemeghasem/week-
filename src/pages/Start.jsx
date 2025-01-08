import React from 'react'
import styles from "./start.module.css"

function Start() {
  return (
    <div className={styles.container}>
        <h1>ورود کاربران</h1>
        <a href='login'>ورود به حساب کاربری</a>
        <a href="/registeration">ایجاد حساب کاربری</a>
    </div>
  )
}

export default Start