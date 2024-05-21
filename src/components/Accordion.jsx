import React from 'react';

const AccordionItem = ({ id, title, content, isOpen }) => {
  return (
    <div className="accordion-item">
      <h2 className="accordion-header">
        <button className={`accordion-button ${isOpen ? '' : 'collapsed'}`} type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${id}`} aria-expanded={isOpen ? 'true' : 'false'} aria-controls={`collapse${id}`}>
          {title}
        </button>
      </h2>
      <div id={`collapse${id}`} className={`accordion-collapse collapse ${isOpen ? 'show' : ''}`} data-bs-parent="#accordionExample">
        <div className="accordion-body">
          {content}
        </div>
      </div>
    </div>
  );
};

const Accordion = ({ items }) => {
  return (
    <div className="accordion" id="accordionExample">
      {items.map((item, index) => (
        <AccordionItem key={index} id={index + 1} title={item.title} content={item.content} isOpen={item.isOpen} />
      ))}
    </div>
  );
};

export default Accordion;
