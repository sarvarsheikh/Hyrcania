import React, { useEffect, useState } from "react";
import { MapPin, Mail, Phone, Instagram, Twitter, Facebook, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import website from "/images/website.png";
import brainstrom from "/images/brainstrom.png";
import sarvar from "/images/sarvar.png";
import amir from "/images/amir.jpeg";
import hemant from "/images/hemant.jpeg";

function AboutPage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="bg-white text-black min-h-screen font-sans">
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        {/* Header - Modernist asymmetrical layout with animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-24 relative"
        >
          <div className="absolute top-0 left-0 w-16 h-16 bg-black" />
          <motion.h1
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-7xl font-bold uppercase tracking-tighter mb-0 ml-24"
          >
            ABOUT
          </motion.h1>
          <motion.h2
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-6xl font-bold tracking-tighter ml-24"
          >
            HYRCANIA
          </motion.h2>
          <div className="w-full h-px bg-black mt-8" />
        </motion.div>

        {/* Mission - Modernist grid with brutalist elements */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-32"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                animate={isLoaded ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-2xl font-bold uppercase mb-8 inline-block relative"
              >
                MISSION
                <div className="absolute -bottom-2 left-0 w-12 h-1 bg-black" />
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={isLoaded ? { opacity: 1 } : {}}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-xl mb-6 leading-relaxed"
              >
                HYRCANIA CREATES MARATHON EXPERIENCES THAT CHALLENGE RUNNERS AND UNITE COMMUNITIES.
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={isLoaded ? { opacity: 1 } : {}}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="text-xl leading-relaxed"
              >
                WE BELIEVE IN THE RAW POWER OF RUNNING. NO FRILLS. NO GIMMICKS.
              </motion.p>
            </div>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={isLoaded ? { scale: 1, opacity: 1 } : {}}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="bg-black aspect-square relative overflow-hidden"
              whileHover={{ scale: 1.02 }}
            >
              <img
                src={brainstrom}
                alt="Marathon"
                className="mix-blend-luminosity opacity-80 object-cover w-full h-full"
              />
            </motion.div>
          </div>
        </motion.section>

        {/* Team - Modernist asymmetrical layout */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-32"
        >
          <div className="flex flex-col md:flex-row justify-between items-baseline mb-12">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-2xl font-bold uppercase inline-block relative"
            >
              TEAM
              <div className="absolute -bottom-2 left-0 w-12 h-1 bg-black" />
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-lg mt-4 md:mt-0"
            >
              DEVELOPED BY 3 PROGRAMMERS — 1 IRANIAN + 2 INDIAN DEVELOPERS
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "AMIR SAFARNORALAH", role: "BACKEND DEVELOPER — IRAN", delay: 0.2,src:amir },
              { name: "SARVAR SHEIKH", role: "FRONTEND — INDIA", delay: 0.4 ,src:sarvar},
              { name: "HEMANT THAWANI", role: "FRONTEND — INDIA", delay: 0.6 ,src:hemant},
            ].map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: member.delay, duration: 0.6 }}
                whileHover={{ y: -10 }}
                className="border-2 border-black p-6"
              >
                <motion.div
                  className="bg-black mb-6 aspect-square relative overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={member.src}
                    alt={member.name}
                    className=" object-cover transition-all duration-500 hover:scale-110 w-full h-full"
                  />
                </motion.div>
                <h3 className="text-xl font-bold">{member.name}</h3>
                <p className="uppercase text-sm">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* What We Do - Modernist grid with brutalist elements */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-32"
        >
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-2xl font-bold uppercase mb-12 inline-block relative"
          >
            WHAT WE DO
            <div className="absolute -bottom-2 left-0 w-12 h-1 bg-black" />
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
            {[
              {
                title: "MARATHON ORGANIZATION",
                desc: "Tools for race directors. Raw. Efficient. Functional.",
                delay: 0.2,
              },
              { title: "RUNNER REGISTRATION", desc: "Direct registration. No unnecessary steps.", delay: 0.3 },
              { title: "COMMUNITY", desc: "Connect runners. Build groups. Support each other.", delay: 0.4 },
              { title: "ANALYTICS", desc: "Performance tracking. Unfiltered data. Real insights.", delay: 0.5 },
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: service.delay, duration: 0.6 }}
                whileHover={{ x: 10 }}
                className="group"
              >
                <h3 className="text-xl font-bold mb-3 uppercase flex items-center">
                  <motion.span
                    initial={{ width: 0 }}
                    whileInView={{ width: 24 }}
                    viewport={{ once: true }}
                    transition={{ delay: service.delay + 0.2, duration: 0.4 }}
                    className="h-px bg-black inline-block mr-3"
                  />
                  {service.title}
                </h3>
                <p className="ml-8">{service.desc}</p>
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ delay: service.delay + 0.3, duration: 0.8 }}
                  className="h-px bg-black mt-4 ml-8"
                />
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Contact - Modernist asymmetrical layout */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-2xl font-bold uppercase mb-12 inline-block relative"
          >
            CONTACT
            <div className="absolute -bottom-2 left-0 w-12 h-1 bg-black" />
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              {[
                { icon: <Mail className="h-6 w-6" />, text: "amirsafarnoralah64@gmail.com", delay: 0.3 },
                { icon: <Phone className="h-6 w-6" />, text: "+98 991 951 0956", delay: 0.4 },
                { icon: <MapPin className="h-6 w-6" />, text: "Isgah, Shaft, Gilan Province, Iran", delay: 0.5 },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: item.delay, duration: 0.6 }}
                  className="flex items-start gap-4"
                >
                  {item.icon}
                  <span className="text-lg">{item.text}</span>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="flex gap-6 pt-4"
              >
                
              </motion.div>
            </div>

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
              whileHover={{ scale: 1.02 }}
              className="bg-black aspect-video relative overflow-hidden"
            >
              <img
                src={website}
                alt="Contact"
                className=" opacity-70 object-cover transition-transform duration-700 hover:scale-110 w-full h-full"
              />
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <span className="text-white text-3xl font-bold flex items-center gap-3">
                  RUN WITH US
                  <motion.div
                    animate={{ x: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                  >
                    <ArrowRight className="h-8 w-8" />
                  </motion.div>
                </span>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* Footer - Minimalist footer with animation */}
        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="pt-8 mt-12 border-t-2 border-black"
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm">© {new Date().getFullYear()} HYRCANIA</p>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-sm mt-2 md:mt-0"
            >
              MINIMAL. BRUTAL. MODERN.
            </motion.p>
          </div>
        </motion.footer>
      </div>
    </div>
  );
}

export default AboutPage;