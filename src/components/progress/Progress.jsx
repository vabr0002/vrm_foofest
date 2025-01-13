const Progress = ({ currentStep }) => {
  const steps = ["tickets", "camping", "info", "payment", "purchased"];

  const capitalize = (text) => text.charAt(0).toUpperCase() + text.slice(1);

  return (
    <div className="flex flex-col items-center justify-center mt-8 mb-16">
      <div className="flex relative">
        {steps.map((step, index) => (
          <div key={step} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`w-6 h-6 rounded-full border-2 ${
                  steps.indexOf(currentStep) >= index
                    ? "bg-white border-primary"
                    : "bg-primary border-white"
                }`}
              ></div>

              <span
                className={`text-sm absolute top-7 ${
                  currentStep === step ? "text-white" : "text-primary"
                }`}
              >
                {capitalize(step)}
              </span>
            </div>

            {index < steps.length - 1 && (
              <div
                className={`h-[2px] w-16 ${
                  steps.indexOf(currentStep) > index
                    ? "bg-primary"
                    : "bg-gray-300"
                }`}
              ></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Progress;
