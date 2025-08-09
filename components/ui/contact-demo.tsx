import { Contact2 } from "@/components/ui/contact-2";

const DemoOne = () => {
  return (
    <Contact2 
      title="Nous contacter"
      description="Nous sommes disponibles pour vos questions, commentaires ou opportunités de collaboration. Dites-nous comment nous pouvons vous aider !"
      phone="(33) 7 67 56 39 26"
      email="contact@agencehyperweb.com"
      web={{ label: "agencehyperweb.com", url: "https://agencehyperweb.com" }}
    />
  );
};

export { DemoOne };