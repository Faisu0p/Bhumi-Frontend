import React, { useState } from 'react';
import './Stepper.css';

const Stepper = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const steps = [
    {
      number: 1,
      title: 'Step 1',
    },
    {
      number: 2,
      title: 'Step 2',
    },
    {
      number: 3,
      title: 'Step 3',
    },
    {
      number: 4,
      title: 'Step 4',
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const [selectedOption, setSelectedOption] = useState('');
  const [selectedFileOption, setSelectedFileOption] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedPropertyType, setSelectedPropertyType] = useState('Residential');

  // Handle button selection (Single selection)
  const selectOption = (event) => {
    setSelectedOption(event.target.innerText);
  };

  // Toggle selection (Multiple selection)
  const toggleSelection = (event) => {
    const value = event.target.innerText;
    setSelectedFileOption((prevState) =>
      prevState.includes(value) ? prevState.filter(item => item !== value) : [...prevState, value]
    );
  };

  // Handle category selection (Single selection)
  const selectCategory = (event) => {
    setSelectedCategory(event.target.innerText);
  };

  // Handle property type radio button selection
  const toggleCategoryOptions = () => {
    setSelectedPropertyType(prevState => (prevState === 'Residential' ? 'Commercial' : 'Residential'));
  };

  return (
    <div className="stepper-container">
      <div className="stepper">
        {steps.map((step, index) => (
          <React.Fragment key={step.number}>
            <div 
              className={`step-item ${
                currentStep === step.number ? 'active' : ''
              } ${currentStep > step.number ? 'completed' : ''}`}
              onClick={() => setCurrentStep(step.number)}
            >
              <div className="step-circle">
                {currentStep > step.number ? (
                  <svg className="checkmark" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                  </svg>
                ) : (
                  step.number
                )}
              </div>
              <span className="step-title">{step.title}</span>
            </div>
            {index < steps.length - 1 && <div className="step-line" />}
          </React.Fragment>
        ))}
      </div>
      
      <div className="step-content">
        

      {currentStep === 1 && (
        <div>
          <h2>Welcome User!</h2>
          <p>Let's start with the basics</p>

          {/* Sell, Rent, Lease PG/Sharing buttons */}
          <div className="options-group">
            <p>You want to *</p>
            <button className={`option-btn ${selectedOption === 'Sell' ? 'selected' : ''}`} onClick={selectOption}>Sell</button>
            <button className={`option-btn ${selectedOption === 'Rent/Lease' ? 'selected' : ''}`} onClick={selectOption}>Rent/Lease</button>
            <button className={`option-btn ${selectedOption === 'PG/Sharing' ? 'selected' : ''}`} onClick={selectOption}>PG/Sharing</button>
          </div>

          {/* Is it an investor file/ mandate deal? */}
          <div className="options-group">
            <p>Is it an investor file/ mandate deal? (Optional)</p>
            <button className={`option-btn ${selectedFileOption.includes('File in hand') ? 'selected' : ''}`} onClick={toggleSelection}>File in hand</button>
            <button className={`option-btn ${selectedFileOption.includes('Exchange') ? 'selected' : ''}`} onClick={toggleSelection}>Exchange</button>
          </div>

          {/* Property Type Radio Buttons */}
          <div className="options-group">
            <p>Property Type</p>
            <label>
              <input type="radio" name="property-type" value="Residential" checked={selectedPropertyType === 'Residential'} onClick={toggleCategoryOptions} />
              Residential
            </label>
            <label>
              <input type="radio" name="property-type" value="Commercial" checked={selectedPropertyType === 'Commercial'} onClick={toggleCategoryOptions} />
              Commercial
            </label>
          </div>

          {/* Category Options */}
          <div className={`category-options residential ${selectedPropertyType === 'Residential' ? 'show' : ''}`}>
            <p>Category</p>
            <button className={`category-btn ${selectedCategory === 'Apartment Flat' ? 'selected' : ''}`} onClick={selectCategory}>Apartment Flat</button>
            <button className={`category-btn ${selectedCategory === 'Pent House' ? 'selected' : ''}`} onClick={selectCategory}>Pent House</button>
            <button className={`category-btn ${selectedCategory === 'House/Kothi' ? 'selected' : ''}`} onClick={selectCategory}>House/Kothi</button>
            <button className={`category-btn ${selectedCategory === 'Independent Villa' ? 'selected' : ''}`} onClick={selectCategory}>Independent Villa</button>
            <button className={`category-btn ${selectedCategory === 'Plot' ? 'selected' : ''}`} onClick={selectCategory}>Plot</button>
            <button className={`category-btn ${selectedCategory === 'Builder Independent Floor' ? 'selected' : ''}`} onClick={selectCategory}>Builder Independent Floor</button>
            <button className={`category-btn ${selectedCategory === 'Farmhouse' ? 'selected' : ''}`} onClick={selectCategory}>Farmhouse</button>
            <button className={`category-btn ${selectedCategory === 'Studio/1RK' ? 'selected' : ''}`} onClick={selectCategory}>Studio/1RK</button>
            <button className={`category-btn ${selectedCategory === 'Laal Doora' ? 'selected' : ''}`} onClick={selectCategory}>Laal Doora</button>
            <button className={`category-btn ${selectedCategory === 'Service Apartment' ? 'selected' : ''}`} onClick={selectCategory}>Service Apartment</button>
            <button className={`category-btn ${selectedCategory === 'others' ? 'selected' : ''}`} onClick={selectCategory}>Others</button>
          </div>

          <div className={`category-options commercial ${selectedPropertyType === 'Commercial' ? 'show' : ''}`}>
            <p>Category</p>
            <button className={`category-btn ${selectedCategory === 'Apartment/Flat' ? 'selected' : ''}`} onClick={selectCategory}>Apartment/Flat</button>
            <button className={`category-btn ${selectedCategory === 'Retail' ? 'selected' : ''}`} onClick={selectCategory}>Retail</button>
            <button className={`category-btn ${selectedCategory === 'Storage' ? 'selected' : ''}`} onClick={selectCategory}>Storage</button>
            <button className={`category-btn ${selectedCategory === 'Industry' ? 'selected' : ''}`} onClick={selectCategory}>Industry</button>
            <button className={`category-btn ${selectedCategory === 'Warehouse' ? 'selected' : ''}`} onClick={selectCategory}>Warehouse</button>
            <button className={`category-btn ${selectedCategory === 'Hospitality' ? 'selected' : ''}`} onClick={selectCategory}>Hospitality</button>
            <button className={`category-btn ${selectedCategory === 'Others' ? 'selected' : ''}`} onClick={selectCategory}>Others</button>
          </div>

          {/* Property Location Inputs */}
          <div className={`property-location ${selectedPropertyType === 'Residential' ? 'residential show' : 'commercial show'}`}>
            <p>Where is your Property Located?</p>
            <input type="text" placeholder="City" />
            <input type="text" placeholder="Society/Locality" />
            <input type="text" placeholder="Sector (optional)" />
          </div>

          <div className={`property-location ${selectedPropertyType === 'Commercial' ? 'commercial show' : 'residential show'}`}>
            <p>Where is your Property Located?</p>
            <input type="text" placeholder="City" />
            <input type="text" placeholder="Society/Fat" />
            <input type="text" placeholder="Sector" />
            <input type="text" placeholder="Locality Inside" />
            <input type="text" placeholder="Address" />
          </div>


          
        </div>
      )}

        {currentStep === 2 && (
                  <div>
                    {/* Custom Content for Step 1 */}
                    <h2>Step 2: Property Specifications</h2>
                    <p>Custom content goes here for Step 2.</p>
                    {/* Add your step-specific code here */}

                    
                  </div>
                )}

        {currentStep === 3 && (
                  <div>
                    {/* Custom Content for Step 1 */}
                    <h2>Step 3: Features & Amenities</h2>
                    <p>Custom content goes here for Step 3.</p>
                    {/* Add your step-specific code here */}

                    
                  </div>
                )}

        {currentStep === 4 && (
                  <div>
                    {/* Custom Content for Step 1 */}
                    <h2>Step 4: Documentation & Summary</h2>
                    <p>Custom content goes here for Step 4.</p>
                    {/* Add your step-specific code here */}

                    
                  </div>
                )}



      </div>
      
      <div className="stepper-buttons">
        <button 
          className={`btn ${currentStep === 1 ? 'disabled' : ''}`}
          onClick={handlePrevious}
          disabled={currentStep === 1}
        >
          Previous
        </button>
        <button 
          className={`btn btn-primary ${currentStep === steps.length ? 'disabled' : ''}`}
          onClick={handleNext}
          disabled={currentStep === steps.length}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Stepper;

