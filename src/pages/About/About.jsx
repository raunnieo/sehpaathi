import React from "react";

const About = () => {
  return (
    <div className="w-full bg-boxbg flex justify-center">
      <div className="flex flex-col md:flex-row max-w-7xl p-8">
        <section className="flex-1 p-8">
          <h1 className="text-5xl font-bold mb-6">Our Story</h1>
          <p className="text-xl leading-relaxed max-w-md">
            We are a company dedicated to providing excellent service to our
            customers. Founded in 2024 we strive to innovate and exceed
            expectations in everything we do.
          </p>
        </section>

        <section className="flex-1 p-8">
          <h1 className="text-5xl font-bold mb-6">Our Mission</h1>
          <p className="text-xl leading-relaxed max-w-md">
            Our mission is to create value for our customers through innovative
            solutions and exceptional service.
          </p>
        </section>

        <section className="flex-1 p-8">
          <h1 className="text-5xl font-bold mb-6">Contact Us</h1>
          <div className="text-xl leading-relaxed">
            <p>Email: info@example.com</p>
            <p>Phone: (123) 456-7890</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
