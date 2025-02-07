import Footer from "../components/Footer";
import contactImage from "../assets/pricing-image.jpg";
import Header from "../components/Header";

const Pricing = () => {
  return (
    <div className="min-h-screen bg-sky-200">
      {/* Sticky Header */}
      <Header/>

      {/* Main Content */}
      <div className="flex-grow px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-12">
        <div className="max-w-7xl mx-auto relative bg-white shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 p-4 sm:p-6 md:p-8">
            <div className="text-center flex flex-col items-center justify-center">
              <img src={contactImage} />
            </div>
            <div className="flex items-center justify-center">
              <h2 className="text-3xl sm:text-5xl text-center text-gray-900 font-bold">
                Currently all the features of website are free of cost... <br />{" "}
                <br />
                Grab the Opportunity!
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Pricing;
