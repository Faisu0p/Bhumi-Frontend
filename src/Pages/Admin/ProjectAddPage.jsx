import React, { useState } from 'react';
import ProjectForm from './components/ProjectForm';
import PhaseForm from './components/PhaseForm';
import AmenityForm from './components/AmenityForm';
import { createProject } from './apis/projectApi';
import './ProjectAddPage.css';

const ProjectAddPage = () => {
  const [step, setStep] = useState(1);
  const [projectData, setProjectData] = useState({});
  const [phases, setPhases] = useState([]);
  const [amenities, setAmenities] = useState([]);

  const handleNextStep = (data, setter) => {
    setter(data);
    setStep(step + 1);
  };

  const handleSubmit = async () => {
    const projectSubmissionData = {
      projectName: projectData.projectName,
      builderId: projectData.builderId,
      launchDate: projectData.launchDate,
      city: projectData.city,
      locality: projectData.locality,
      sublocality: projectData.sublocality,
      companyName: projectData.companyName,
      shortCode: projectData.shortCode,
      deliveryStatus: projectData.deliveryStatus,
      deliveryDate: projectData.deliveryDate,
      reraNumber: projectData.reraNumber,
      totalTowers: projectData.totalTowers,
      totalResidentialUnits: projectData.totalResidentialUnits,
      totalCommercialUnits: projectData.totalCommercialUnits,
      projectType: projectData.projectType,
      sectorBriefing: projectData.sectorBriefing,
      projectBriefing: projectData.projectBriefing,
      projectIsVerified: projectData.projectIsVerified,
      projectMedia: projectData.projectMedia,
      state: projectData.state,
      completeAddress: projectData.completeAddress,
      landmark: projectData.landmark,
      pinCode: projectData.pinCode,
      amenities: amenities,
      phases: phases.map(phase => ({
        phaseNumber: phase.phaseNumber,
        reraNumber: phase.reraNumber,
        phaseStatus: phase.phaseStatus,
        deliveryDate: phase.deliveryDate,
        totalTowers: phase.totalTowers,
        phaseDescription: phase.phaseDescription,
        startDate: phase.startDate,
        units: phase.units.map(unit => ({
          unitCategory: unit.unitCategory,
          unitType: unit.unitType,
          superArea: unit.superArea,
          unitFurnishedStatus: unit.unitFurnishedStatus,
          unitFriendlyName: unit.unitFriendlyName,
          buildUpArea: unit.buildUpArea,
          carpetArea: unit.carpetArea,
          unitLayout: unit.unitLayout,
          unitDetails: unit.unitDetails.map(detail => ({
            unitSize: detail.unitSize,
            unitFurnishedStatus: detail.unitFurnishedStatus,
            spaceType: detail.spaceType
          }))
        }))
      }))
    };

    try {
      const response = await createProject(projectSubmissionData);
      console.log('Project created successfully:', response);
      alert('Project created successfully!');
    } catch (error) {
      console.error('Error creating project:', error);
      alert('Failed to create project. Please try again.');
    }
  };

  return (
    <div className="project-add-container">
      {step === 1 && <ProjectForm onNext={(data) => handleNextStep(data, setProjectData)} />}
      {step === 2 && <PhaseForm onNext={(data) => handleNextStep(data, setPhases)} />}
      {step === 3 && <AmenityForm onNext={(data) => handleNextStep(data, setAmenities)} amenities={amenities} />}
      {step === 4 && (
        <button onClick={handleSubmit} className="project-add-submit-button">
          Submit Project
        </button>
      )}
    </div>
  );
};

export default ProjectAddPage;
