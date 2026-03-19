import { useState } from "react";
import { Box, Button, Stepper, Step, StepLabel, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import CompanyForm from "../CompanyForm";
import BranchesForm from "../BranchesForm";
import EmployeesForm from "../EmployeesForm";

const steps = ["Company Profile", "Branches", "Employees"];

interface SetupWizardProps {
  onComplete: () => void; // коллбек после завершения
}

const SetupWizard = ({ onComplete }: SetupWizardProps) => {
  const { t } = useTranslation("setup");
  const [activeStep, setActiveStep] = useState(0);

  // Можно хранить все данные форм централизованно
  const [companyData, setCompanyData] = useState<any>({});
  const [branchesData, setBranchesData] = useState<any[]>([]);
  const [employeesData, setEmployeesData] = useState<any[]>([]);

  const handleNext = () => setActiveStep(prev => prev + 1);
  const handleBack = () => setActiveStep(prev => prev - 1);

  const handleStepSubmit = (data: any) => {
    // Сохраняем данные текущего шага
    if (activeStep === 0) setCompanyData(data);
    if (activeStep === 1) setBranchesData(data);
    if (activeStep === 2) setEmployeesData(data);
    handleNext();
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return <CompanyForm company={companyData} onSave={handleStepSubmit} userEmail={companyData.email || ""} />;
      case 1:
        return <BranchesForm branches={branchesData} onSave={handleStepSubmit} />;
      case 2:
        return <EmployeesForm employees={employeesData} onSave={handleStepSubmit} />;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", p: 2 }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map(label => (
          <Step key={label}>
            <StepLabel>{t(label)}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box sx={{ mt: 4 }}>
        {activeStep === steps.length ? (
          <Box>
            <Typography variant="h6">{t("setup_complete", "Setup Complete!")}</Typography>
            <Button variant="contained" onClick={onComplete} sx={{ mt: 2 }}>
              {t("go_to_dashboard", "Go to Dashboard")}
            </Button>
          </Box>
        ) : (
          <Box>
            {renderStepContent()}

            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
              <Button disabled={activeStep === 0} onClick={handleBack}>
                {t("back", "Back")}
              </Button>
              <Button variant="contained" onClick={() => handleStepSubmit({})}>
                {activeStep === steps.length - 1 ? t("finish", "Finish") : t("next", "Next")}
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default SetupWizard;