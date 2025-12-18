import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "How does the meal delivery work?",
    answer:
      "You select your meals from our weekly menu, choose your delivery schedule, and we deliver fresh meals to your door in insulated packaging. Meals arrive ready to heat and eat in just minutes.",
  },
  {
    question: "Can I customize my meal plan?",
    answer:
      "You can choose any combination of meals that fit your dietary preferences, whether you're vegan, vegetarian, low-carb, or have specific allergies. You can also skip weeks or pause your subscription anytime.",
  },
  {
    question: "How long do the meals stay fresh?",
    answer:
      "Our meals are delivered fresh and stay good in your refrigerator for up to 7 days. We use premium ingredients and proper packaging to ensure maximum freshness and quality.",
  },
  {
    question: "What's included in the nutritional information?",
    answer:
      "Every meal comes with complete nutritional information including calories, macros (protein, carbs, fats), fiber, sodium, and a full ingredient list. We're transparent about everything that goes into your food.",
  },
  {
    question: "Can I cancel or skip a week?",
    answer:
      "Yes! You have complete flexibility. You can skip any week, pause your subscription, or cancel anytime with no penalties. We want to fit into your lifestyle, not complicate it.",
  },
  {
    question: "Do you offer family-size portions?",
    answer:
      "Yes! We offer single servings and family portions (serves 2-4). You can mix and match portion sizes based on your household needs.",
  },
]

export function FAQ() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-muted-foreground text-lg">Everything you need to know about HealthyMeal.</p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-lg font-semibold">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
