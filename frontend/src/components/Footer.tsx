import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="mt-auto  p-2 text-center text-muted-foreground ">
      <p>&copy; {new Date().getFullYear()} PUNotes. All rights reserved.</p>
      <section className="flex items-center gap-2 justify-center">
        <h4 className="text-primary hover:underline" >
          Privacy Policy
        </h4>
        |
        <h4 className="text-primary hover:underline">
          Terms of Service
        </h4>
      </section>
    </footer>
  );
};

export default Footer;