import React from "react";

const ExpertisePage: React.FC = () => {

  return (
    <div className="min-h-screen bg-sky-100">
      {/* Header */}
      <header className="sticky top-0 z-50  backdrop-blur-md flex justify-between items-center p-6 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <a href="/" className="flex items-center">
              <img
                src="https://i.ibb.co/tPzj54M/logo.png"
                alt="Logo"
                className="h-12 w-12"
              />
              <span className="font-bold text-2xl">MentG</span>
            </a>
          </div>
        </div>
      </header>

      {/* PAGE BODY from here.. */}
    </div>
  );
};

export default ExpertisePage;
