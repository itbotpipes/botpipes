import React from "react";

const ContactMaps = () => {
  return (
    <div className="h-[30rem] overflow-hidden rounded-2xl">
      <iframe
        title="Botpipes Tech location"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3719.146058140048!2d72.83758367509878!3d21.226051680473166!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04fd10dcdb045%3A0x9a7b078afa43e03e!2sBotpipes%20Tech%20Pvt%20Ltd.!5e0!3m2!1sen!2sph!4v1760176430875!5m2!1sen!2sph"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen={true}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
};

export default ContactMaps;
