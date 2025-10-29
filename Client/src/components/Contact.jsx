import React from "react";
import contactImg from "../assets/Contact.jpg"; 

const Contact = () => {
  return (
    <section id="contact">
    <div className="min-h-screen flex flex-col md:flex-row overflow-hidden">
      
      <div className="w-full md:w-3/5 bg-[#0D6EFD] p-10 flex flex-col justify-center">
        <h1 className="text-3xl sm:text-4xl text-center font-bold text-white mb-4">
          Have a question in mind?
        </h1>
        <p className="text-white/90 text-center mb-8">
          Send us an email and we will get back to you ASAP. <br />
          Feel free to contact us again.
        </p>

        <form className="flex flex-col gap-6">
          <input
            type="text"
            placeholder="Your Name"
            className="px-4 py-3 rounded-lg bg-white/20 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-white"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="px-4 py-3 rounded-lg bg-white/20 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-white"
          />
          <textarea
            placeholder="Your Message"
            className="px-4 py-3 rounded-lg bg-white/20 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-white resize-none"
            rows={5}
          />
          <button
            type="submit"
            className="px-6 py-3 bg-white text-[#0D6EFD] font-semibold rounded-lg hover:bg-white/90 transition"
          >
            Send Message
          </button>
        </form>
      </div>

      <div className="w-full md:w-2/5 h-96 md:h-auto overflow-hidden">
        <img
          src={contactImg}
          alt="Contact"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
    </section>
  );
};

export default Contact;
