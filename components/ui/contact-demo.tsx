import { Contact2 } from "@/components/ui/contact-2";

const DemoOne = () => {
  return (
    <Contact2 
      title="Contact Us"
      description="We are available for questions, feedback, or collaboration opportunities. Let us know how we can help!"
      phone="(33) 7 67 56 39 26"
      email="contact@agencehyperweb.com"
      web={{ label: "agencehyperweb.com", url: "https://agencehyperweb.com" }}
    />
  );
};

export { DemoOne };