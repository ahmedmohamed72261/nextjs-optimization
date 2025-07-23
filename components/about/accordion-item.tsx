"use client"

import { useState } from "react"

interface AccordionItemProps {
  title: string
  description: string
  animation?: string
}

export const AccordionItem = ({ title, description, animation }: AccordionItemProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleAccordion = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div
      className={`accordion-item py-1 rounded-2xl transition-shadow text-white bg-[--main-color] ${
        isOpen ? "open opacity-100" : "opacity-80"
      }`}
    >
      <div className="accordion-item-header" onClick={toggleAccordion}>
        <span className="accordion-item-header-titl font-bold">{title}</span>
        <i className="fa-solid fa-circle-chevron-down fa-xl lucide lucide-chevron-down accordion-item-header-icon"></i>
      </div>
      <div className="accordion-item-description-wrapper">
        <div className="accordion-item-description">
          <hr />
          <p>{description}</p>
        </div>
      </div>
    </div>
  )
}
