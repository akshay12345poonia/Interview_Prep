

import { useRef, useEffect, useState, useCallback } from "react"
import Navigation from "./components/Navigation"
import Section from "./components/Section"

export default function App() {
  const [activeSection, setActiveSection] = useState("about")

  // Use refs to store section elements - these don't trigger re-renders
  const sectionRefs = useRef({
    about: null,
    services: null,
    portfolio: null,
    contact: null,
  })

  // Store all section data - ref to prevent dependency changes
  const sectionsData = useRef([
    {
      id: "about",
      label: "About",
      bgColor: "bg-gray-50",
      content: `Welcome to our portfolio. I'm a passionate developer crafting accessible, pixel-perfect digital experiences. With expertise in React, JavaScript, and modern web technologies, I create interfaces that seamlessly blend thoughtful design with robust engineering. My focus is on building performant, user-centric solutions that make a real impact.`,
    },
    {
      id: "services",
      label: "Services",
      bgColor: "bg-white",
      content: `We offer comprehensive web development services including custom React applications, full-stack solutions, UI/UX design implementation, performance optimization, and responsive design. Each project is tailored to your specific needs with a focus on clean code, scalability, and exceptional user experience. Our team specializes in turning complex requirements into elegant, maintainable solutions.`,
    },
    {
      id: "portfolio",
      label: "Portfolio",
      bgColor: "bg-gray-50",
      content: `Our portfolio showcases a diverse range of projects from startups to enterprise solutions. We've successfully delivered e-commerce platforms, content management systems, real-time collaboration tools, and data visualization dashboards. Each project demonstrates our commitment to quality, innovation, and client satisfaction. Our work speaks to our ability to deliver results that exceed expectations.`,
    },
    {
      id: "contact",
      label: "Contact",
      bgColor: "bg-white",
      content: `Ready to start your next project? Get in touch with us today. We're based in multiple cities and available for remote collaborations. Whether you have a specific project in mind or need consultation on your web presence, our team is ready to help. Contact us via email, phone, or schedule a meeting to discuss your vision and how we can bring it to life.`,
    },
  ])

  // Scroll detection using refs - no state updates, just checking DOM
  useEffect(() => {
    const handleScroll = () => {
      const sections = sectionsData.current
      let currentSection = "about"

      // Check each section's position without causing re-renders
      for (const section of sections) {
        const element = sectionRefs.current[section.id]
        if (element) {
          const rect = element.getBoundingClientRect()
          // If section is in viewport (top is above viewport center)
          if (rect.top <= window.innerHeight / 2) {
            currentSection = section.id
          }
        }
      }

      // Only update state if section changed - prevents unnecessary renders
      setActiveSection((prev) => (prev !== currentSection ? currentSection : prev))
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Smooth scroll handler using refs - no re-render needed
  const handleNavigate = useCallback((sectionId) => {
    const element = sectionRefs.current[sectionId]
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }, [])

  return (
    <div className="min-h-screen">
      <Navigation sections={sectionsData.current} activeSection={activeSection} onNavigate={handleNavigate} />

      {sectionsData.current.map((section) => (
        <Section
          key={section.id}
          ref={(el) => {
            if (el) sectionRefs.current[section.id] = el
          }}
          id={section.id}
          label={section.label}
          bgColor={section.bgColor}
        >
          {section.content}
        </Section>
      ))}
    </div>
  )
}
