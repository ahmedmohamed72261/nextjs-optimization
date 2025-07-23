"use client"

import { useEffect, useState } from "react"
import AOS from "aos"
import "aos/dist/aos.css"

import { AccordionItem } from "./accordion-item"
import "@/styles/accordion-item.css"

interface AccordionProps {
  animation: string[]
}

const Accordion = ({ animation }: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleAccordion = () => {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    AOS.init({ duration: 800 })
  }, [])

  const items = [
    {
      title: "ما هو برنامج إدارة حسابات التواصل الاجتماعي؟",
      description:
        "في ويز برنامج إدارة حسابات التواصل الاجتماعي هو أداة شاملة تساعدك في جدولة المنشورات، متابعة التفاعل، تحليل الأداء، والتواصل مع جمهورك عبر مختلف المنصات بسهولة وكفاءة. كما نقدم لك برنامجًا مصممًا خصيصًا لتلبية احتياجاتك، مما يتيح لك التركيز على تطوير محتوى مميز بينما نتولى نحن الإدارة.",
    },
    {
      title: "ما هو دور التسويق بالمحتوى بالنسبة لجذب عميل؟",
      description:
        "التسويق بالمحتوى هو العلم والفن، فـمـن خلال تقديم محتوى قيم وجذاب، يمكنك بناء الثقة مع جمهورك المستهدف، وتحفيزهم على التفاعل مع علامتك التجارية بشكل أعمق. في ويز فريلانس، نبدع في إنتاج محتوى يروي قصتك، ويعكس رؤيتك، مما يجذب العملاء ويبني علاقة طويلة الأمد معهم.",
    },
    {
      title: "ما هي أهمية التسويق عبر شبكات التواصل الاجتماعي؟",
      description:
        "التسويق عبر شبكات التواصل الاجتماعي ليس مجرد خيار إضافي، ولكنه عنصر قوي لنجاح أي علامة تجارية في العصر الرقمي؛ لأنه يعزز وجودك على هذه الشبكات من الوعي بالعلامة التجارية، يبني علاقات قوية مع العملاء، ويزيد من فرص البيع بطرق مبتكرة وجذابة. مع ويز فريلانس، نساعدك على الاستفادة القصوى من هذا العالم المتغير بسرعة.",
    },
    {
      title: "ما الذي نقدمه لك في خدمات إدارة حسابات مواقع التواصل الاجتماعي؟",
      description:
        "في ويز فريلانس، نقدم حزمة متكاملة من خدمات إدارة حسابات مواقع التواصل الاجتماعي تشمل: استراتيجية مخصصة لكل منصة تصميم وتنفيذ محتوى إبداعي إدارة الحملات الإعلانية تحليل الأداء المستمر لضمان تحقيق أفضل النتائج، لأننا نحرص على تقديم تجربة استثنائية لعملائك، مما ينعكس إيجابًا على نمو علامتك التجارية.",
    },
  ]

  return (
    <div className="accordion-section container">
      <div className="head">
        <h3>الاسئله الشائعه</h3>
      </div>

      <div className="accordion">
        {items.map((item, index) => (
          <div key={index} data-aos="fade-up">
            <AccordionItem title={item.title} description={item.description} />
          </div>
        ))}

        <div data-aos="fade-up">
          <div
            className={`accordion-item py-1 rounded-2xl transition-shadow text-white bg-[--main-color] ${
              isOpen ? "open opacity-100" : "opacity-80"
            }`}
          >
            <div className="accordion-item-header" onClick={toggleAccordion}>
              <span className="accordion-item-header-titl font-bold">
                ما هي مراحل العمل على منصات التواصل الاجتماعي؟
              </span>
              <i className="fa-solid fa-circle-chevron-down fa-xl lucide lucide-chevron-down accordion-item-header-icon"></i>
            </div>
            <div className="accordion-item-description-wrapper">
              <div className="accordion-item-description">
                <hr />
                <p>
                  عملنا على منصات التواصل الاجتماعي يتبع نهجًا استراتيجيًا منظمًا يشمل خمس مراحل أساسية:<br></br>
                  1. التخطيط: تحليل السوق والجمهور المستهدف، ووضع الأهداف والاستراتيجيات.<br></br>
                  2. إنشاء المحتوى: تصميم محتوى مميز وجذاب يعبر عن هوية علامتك التجارية.<br></br>
                  3. النشر: جدولة ونشر المحتوى في الأوقات المثلى لتحقيق أقصى تفاعل.<br></br>
                  4. التفاعل: متابعة التفاعل مع الجمهور، والرد على استفساراتهم وتعليقاتهم.<br></br>
                  5. التحليل والتقييم: مراقبة الأداء وتقديم تقارير دورية لتعديل الاستراتيجيات وفقًا للنتائج المحققة.
                  <br></br>
                  نحن في ويزفريلانس، نلتزم بجعل حضورك الرقمي قويًا ومؤثرًا، ونضمن لك نتائج ملموسة ترتقي بعلامتك التجارية
                  إلى آفاق جديدة.<br></br>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Accordion
