import React from 'react'

export default function Modal(props) {
    const modalSizeClass = props.size ? `modal-${props.size}` : 'modal-md';
  return (
        <div className="modal" id={props.id}  role="dialog" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
       <div className={`modal-dialog ${modalSizeClass}`} role="document">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">{props.title}</h5>
                    <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div className="modal-body">
                    {props.children}
                </div>
            </div>
        </div>
    </div>
  )
}
