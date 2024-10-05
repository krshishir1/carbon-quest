import { Accordion, AccordionItem } from "@nextui-org/react";

export default function FAQs() {
  const faqData = [
      {
        question: "What is this app about?",
        answer:
          "This app helps you track your carbon footprint by logging your daily activities and providing insights to help reduce your environmental impact.",
      },
      {
        question: "How do I track my carbon emissions?",
        answer:
          "Simply log activities such as transportation, food consumption, and energy usage. The app will calculate your carbon emissions based on your inputs.",
      },
      {
        question: "Is this app free to use?",
        answer:
          "Yes, the app is completely free to use. We aim to make carbon tracking accessible to everyone.",
      },
      {
        question: "Can I set personal goals in the app?",
        answer:
          "Absolutely! You can set personalized carbon reduction goals and track your progress over time to see how small changes add up to a big impact.",
      },
      {
        question: "How accurate is the carbon footprint data?",
        answer:
          "The app uses industry-standard calculations based on your inputs. While estimates may vary slightly, we strive to provide the most accurate data possible.",
      },
      {
        question: "How does this app help me in daily life?",
        answer:
          "It makes sustainability a part of your routine by showing you the impact of your daily choices and suggesting ways to reduce your carbon emissions.",
      },
      {
        question: "What platforms is the app available on?",
        answer:
          "The app is available on both iOS and Android, as well as a web version that can be accessed on any browser.",
      },
      {
        question: "Is my data secure?",
        answer:
          "Yes, we take your privacy seriously. All data is encrypted and handled securely, ensuring your personal information remains safe.",
      },
    ],
  };

  return (
    <section className="h-screen bg-blue-900 flex items-center justify-center">
      <div>
        <div>
          <h1>Have more questions? We've got you!</h1>
        </div>
        <div>
          <Accordion>
            <AccordionItem key="1" aria-label="Accordion 1" title="Accordion 1">
              {defaultContent}
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
}
