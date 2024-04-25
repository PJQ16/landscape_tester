import React from 'react'

const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <div>
        <footer className="sticky-footer">
                <div className="container my-auto">
                    <div className="copyright text-center  my-auto">
                        <span>Copyright &copy; cmu {currentYear}</span>
                    </div>
                </div>
            </footer>
    </div>
  )
}
