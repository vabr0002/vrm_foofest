import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";

const AccordionComponent = () => {
  return (
    <section className="flex flex-col items-center justify-center p-4 mb-12">
      <Accordion
        type="single"
        collapsible
        className="w-full max-w-lg text-inherit font-inherit"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-inherit text-lg no-underline font-bold">
            When does the festival open?
          </AccordionTrigger>
          <AccordionContent className="text-inherit font-inherit font-normal">
            The festival opens on Friday at 12:00 PM and ends on Sunday at 11:59
            PM. The camping area opens on Thursday at 4:00 PM.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger className="text-inherit text-lg no-underline font-bold">
            How do I get to the festival?
          </AccordionTrigger>
          <AccordionContent className="text-inherit font-inherit font-normal">
            You can take the train to the city's station, where shuttle buses
            run directly to the festival grounds. There are also parking spots
            for those arriving by car.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger className="text-inherit text-lg no-underline font-bold">
            Is food and drink available at the festival?
          </AccordionTrigger>
          <AccordionContent className="text-inherit font-inherit font-normal">
            Yes, we have a wide range of food stalls offering everything from
            vegetarian dishes to street food. There are also several bars where
            you can buy beer, drinks, and sodas.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4">
          <AccordionTrigger className="text-inherit text-lg no-underline font-bold">
            Can I pay with cash at the festival?
          </AccordionTrigger>
          <AccordionContent className="text-inherit font-inherit font-normal">
            The festival is cashless. You can pay with credit cards or MobilePay
            at all stalls and bars.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-5">
          <AccordionTrigger className="text-inherit text-lg no-underline font-bold">
            Are there camping options at the festival?
          </AccordionTrigger>
          <AccordionContent className="text-inherit font-inherit font-normal">
            Yes, we have a dedicated camping area with various options,
            including standard camping, glamping tents, and spaces for caravans.
            Remember to book your spot in advance!
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
};

export default AccordionComponent;
