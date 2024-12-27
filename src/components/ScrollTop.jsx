import React from 'react'
import { Link } from 'react-router-dom';

export default function ScrollTop() {
    const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      };
  return (
    <div>
        <Link
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        backgroundColor: '#B4ABA3',
        color: '#fff',
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textDecoration: 'none',
        transition: 'background-color 0.3s ease',
        cursor: 'pointer' // เพิ่ม cursor: 'pointer' เพื่อแสดงว่าเป็นลิงก์ที่คลิกได้
      }}
      onClick={scrollToTop}
    >
        <i className="fas fa-angle-up"></i>
    </Link>
    </div>
  )
}
