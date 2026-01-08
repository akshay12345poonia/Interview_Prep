import { forwardRef } from "react"

const Section = forwardRef(({ id, label, children, bgColor }, ref) => {
  return (
    <section ref={ref} id={id} className={`min-h-screen pt-24 px-6 py-16 flex items-center justify-center ${bgColor}`}>
      <div className="max-w-4xl w-full">
        <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900">{label}</h2>
        <div className="text-lg text-gray-700 leading-relaxed">{children}</div>
      </div>
    </section>
  )
})

Section.displayName = "Section"

export default Section
