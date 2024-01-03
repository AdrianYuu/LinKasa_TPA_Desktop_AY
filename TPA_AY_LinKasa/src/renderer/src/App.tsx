import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PrivateRoutes from './util/PrivateRoute'
import IndexPage from './pages/IndexPage'
import LoginPage from './pages/LoginPage'
import ViewEmployeePage from './pages/Human Resources Director/Employee/ViewEmployeePage'
import CreateEmployeePage from './pages/Human Resources Director/Employee/CreateEmployeePage'
import EditEmployeePage from './pages/Human Resources Director/Employee/EditEmployeePage'
import DeleteEmployeePage from './pages/Human Resources Director/Employee/DeleteEmployeePage'
import HRDDashboardPage from './pages/Human Resources Director/HRDDashboardPage'
import NotFoundPage from './pages/NotFoundPage'
import CreateEmployeeTrainingPage from './pages/Human Resources Director/Employee Training/CreateEmployeeTrainingPage'
import EditEmployeeTrainingPage from './pages/Human Resources Director/Employee Training/EditEmployeeTrainingPage'
import ViewEmployeeTrainingPage from './pages/Human Resources Director/Employee Training/ViewEmployeeTrainingPage'
import DeleteEmployeeTrainingPage from './pages/Human Resources Director/Employee Training/DeleteEmployeeTrainingPage'
import ViewEmployeeDevelopmentProgramPage from './pages/Human Resources Director/Employee Development Program/ViewEmployeeDevelopmentProgramPage'
import CreateEmployeeDevelopmentProgramPage from './pages/Human Resources Director/Employee Development Program/CreateEmployeeDevelopmentProgramPage'
import EditEmployeedevelopmentProgramPage from './pages/Human Resources Director/Employee Development Program/EditEmployeeDevelopmentProgramPage'
import DeleteEmployeeDevelopmentProgramPage from './pages/Human Resources Director/Employee Development Program/DeleteEmployeeDevelopmentProgramPage'
import ViewJobVacancyPage from './pages/Human Resources Director/Job Vacancy/ViewJobVacancyPage'
import CreateJobVacancyPage from './pages/Human Resources Director/Job Vacancy/CreateJobVacancy'
import EditJobVacancyPage from './pages/Human Resources Director/Job Vacancy/EditJobVacancy'
import DeleteJobVacancyPage from './pages/Human Resources Director/Job Vacancy/DeleteJobVacancy'
import LAFDashboard from './pages/Lost and Found Staff/LAFDashboard'
import CreateLostAndFoundItemLogPage from './pages/Lost and Found Staff/CreateLostAndFoundItemLogPage'
import EditLostAndFoundItemLogPage from './pages/Lost and Found Staff/EditLostAndFoundItemLogPage'
import ViewLostAndFoundItemLogPage from './pages/Lost and Found Staff/ViewLostAndFoundItemLogPage'
import FOMDashboard from './pages/Flight Operations Manager/FOMDashboard'
import ViewFlightCrewPage from './pages/Flight Operations Manager/Flight Crew/ViewFlightCrewPage'
import CreateFlightCrewPage from './pages/Flight Operations Manager/Flight Crew/CreateFlightCrewPage'
import EditFlightCrewPage from './pages/Flight Operations Manager/Flight Crew/EditFlightCrewPage'
import DeleteFlightCrewPage from './pages/Flight Operations Manager/Flight Crew/DeleteFlightCrewPage'
import ViewFlightSchedulePage from './pages/Flight Operations Manager/Flight Schedules/ViewFlightSchedulePage'
import CreateFlightSchedulePage from './pages/Flight Operations Manager/Flight Schedules/CreateFlightSchedulePage'
import EditFlightSchedulePage from './pages/Flight Operations Manager/Flight Schedules/EditFlightSchedulePage'
import DeleteFlightSchedulePage from './pages/Flight Operations Manager/Flight Schedules/DeleteFlightSchedule'
import CSMDashboard from './pages/Customer Service Manager/CSMDashboard'
import CreateBroadcastPage from './pages/Customer Service Manager/Broadcast/CreateBroadcastPage'
import EditBroadcastPage from './pages/Customer Service Manager/Broadcast/EditBroadcastPage'
import DeleteBroadcastPage from './pages/Customer Service Manager/Broadcast/DeleteBroadcastPage'
import ViewBroadcastPage from './pages/Customer Service Manager/Broadcast/ViewBroadcastPage'
import ViewFeedbackFormPage from './pages/Customer Service Manager/Feedback/ViewFeedbackFormPage'
import CreateFeedbackFormPage from './pages/Customer Service Manager/Feedback/CreateFeedbackFormPage'
import EditFeedbackFormPage from './pages/Customer Service Manager/Feedback/EditFeedbackFormPage'
import IDSDashboard from './pages/Information Desk Staff/IDSDashboard'
import ViewFlightSchedulePageIDS from './pages/Information Desk Staff/ViewFlightSchedulePageIDS'
import CISDashboard from './pages/Check-in Staff/CISDashboard'
import ViewFlightSchedulePageCIS from './pages/Check-in Staff/ViewFlightSchedulePageCIS'
import ViewBoardingPassPage from './pages/Check-in Staff/Boarding Pass/ViewBoardingPassPage'
import CreateBoardingPassPage from './pages/Check-in Staff/Boarding Pass/CreateBoardingPassPage'
import EditBoardingPassPage from './pages/Check-in Staff/Boarding Pass/EditBoardingPassPage'
import DeleteBoardingPassPage from './pages/Check-in Staff/Boarding Pass/DeleteBoardingPassPage'
import PrintBoardingPassPage from './pages/Check-in Staff/Boarding Pass/PrintBoardingPassPage'
import GADashboard from './pages/Gate Agents/GADashboard'
import ViewFlightSchedulePageGA from './pages/Gate Agents/ViewFlightSchedulePageGA'
import AOMDashboard from './pages/Airport Operations Manager/AOMDashboard'
import ViewFlightSchedulePageAOM from './pages/Airport Operations Manager/Flight Schedule/ViewFlightSchedulePageAOM'
import EditFlightSchedulePageAOM from './pages/Airport Operations Manager/Flight Schedule/EditFlightSchedulePageAOM';
import GHMDashboard from './pages/Ground Handling Manager/GHMDashboard'
import ViewFlightBaggageStatusPageGHM from './pages/Ground Handling Manager/Flight Baggage Status/ViewFlightBaggageStatusPageGHM'
import EditFlightBaggageStatusPageGHM from './pages/Ground Handling Manager/Flight Baggage Status/EditFlightBaggageStatusPageGHM'
import ViewRefuelingSchedulePage from './pages/Ground Handling Manager/Refueling Schedule/ViewRefuelingSchedulePage'
import CreateRefuelingSchedulePage from './pages/Ground Handling Manager/Refueling Schedule/CreateRefuelingSchedulePage'
import EditRefuelingSchedulePage from './pages/Ground Handling Manager/Refueling Schedule/EditRefuelingSchedulePage'
import DeleteRefuelingSchedulePage from './pages/Ground Handling Manager/Refueling Schedule/DeleteRefuelingSchedulePage'
import LOMDashboard from './pages/Landside Operations Manager/LOMDashboard'
import ViewTransportationRoutePage from './pages/Landside Operations Manager/Transportation Route/ViewTransportationRoutePage'
import CreateTransportationRoutePage from './pages/Landside Operations Manager/Transportation Route/CreateTransportationRoutePage'
import EditTransportationRoutePage from './pages/Landside Operations Manager/Transportation Route/EditTransportationRoutePage'
import DeleteTransportationRoutePage from './pages/Landside Operations Manager/Transportation Route/DeleteTransportationRoutePage'
import ViewTransportationSchedulePage from './pages/Landside Operations Manager/Transporation Schedule/ViewTransportationSchedulePage';
import CreateTransportationSchedulePage from './pages/Landside Operations Manager/Transporation Schedule/CreateTransportationSchedulePage';
import EditTransporationSchedulePage from './pages/Landside Operations Manager/Transporation Schedule/EditTransporationSchedulePage';
import DeleteTransportationSchedulePage from './pages/Landside Operations Manager/Transporation Schedule/DeleteTransportationSchedulePage';
import MMDashboard from './pages/Maintenance Manager/MMDashboard'
import ViewEquipmentPage from './pages/Maintenance Manager/Equipment/ViewEquipmentPage'
import EditEquipmentPage from './pages/Maintenance Manager/Equipment/EditEquipmentPage'
import ViewMaintenanceSchedulePage from './pages/Maintenance Manager/Maintenance Schedule/ViewMaintenanceSchedulePage'
import CreateMaintenanceSchedulePage from './pages/Maintenance Manager/Maintenance Schedule/CreateMaintenanceSchedulePage'
import EditMaintenanceSchedulePage from './pages/Maintenance Manager/Maintenance Schedule/EditMaintenanceSchedulePage'
import DeleteMaintenanceSchedulePage from './pages/Maintenance Manager/Maintenance Schedule/DeleteMaintenanceSchedulePage';
import CABCODashboard from './pages/Customs and Border Control Officers/CABCODashboard'
import ViewPassportAndVisaPage from './pages/Customs and Border Control Officers/Passport and Visa/ViewPassportAndVisaPage'
import CreatePassportAndVisaPage from './pages/Customs and Border Control Officers/Passport and Visa/CreatePassportAndVisaPage'
import EditPassportAndVisaPage from './pages/Customs and Border Control Officers/Passport and Visa/EditPassportAndVisaPage'
import DeletePassportAndVisaPage from './pages/Customs and Border Control Officers/Passport and Visa/DeletePassportAndVisaPage'
import ViewCustomDeclarationPage from './pages/Customs and Border Control Officers/Custom Declaration/ViewCustomDeclarationPage'
import CreateCustomDeclarationPage from './pages/Customs and Border Control Officers/Custom Declaration/CreateCustomDeclarationPage'
import EditCustomDeclarationPage from './pages/Customs and Border Control Officers/Custom Declaration/EditCustomDeclarationPage';
import DeleteCustomDeclarationPage from './pages/Customs and Border Control Officers/Custom Declaration/DeleteCustomDeclarationPage'
import ViewInspectionRecordPage from './pages/Customs and Border Control Officers/Inspection Record/ViewInspectionRecordPage'
import CreateInspectionRecordPage from './pages/Customs and Border Control Officers/Inspection Record/CreateInspectionRecordPage'
import EditInspectionRecordPage from './pages/Customs and Border Control Officers/Inspection Record/EditInspectionRecordPage';
import DeleteInspectionRecordPage from './pages/Customs and Border Control Officers/Inspection Record/DeleteInspectionRecordPage';
import BSSDashboard from './pages/Baggage Security Supervisor/BSSDashboard'
import ViewFlightBaggageStatusPageBSS from './pages/Baggage Security Supervisor/Flight Baggage Status/ViewFlightBaggageStatusPageBSS';
import EditFlightBaggageStatusPageBSS from './pages/Baggage Security Supervisor/Flight Baggage Status/EditFlightBaggageStatusPageBSS';
import ViewBaggageHandlingTaskPage from './pages/Baggage Security Supervisor/Baggage Handling Task/ViewBaggageHandlingTaskPage'
import CreateBaggageHandlingTaskPage from './pages/Baggage Security Supervisor/Baggage Handling Task/CreateBaggageHandlingTaskPage'
import EditBaggageHandlingTaskPage from './pages/Baggage Security Supervisor/Baggage Handling Task/EditBaggageHandlingTaskPage'
import DeleteBaggageHandlingTaskPage from './pages/Baggage Security Supervisor/Baggage Handling Task/DeleteBaggageHandlingTaskPage'
import ViewBaggageSecurityIncidentPage from './pages/Baggage Security Supervisor/Baggage Security Incident/ViewBaggageSecurityIncidentPage'
import CreateBaggageSecurityIncidentPage from './pages/Baggage Security Supervisor/Baggage Security Incident/CreateBaggageSecurityIncidentPage'
import EditBaggageSecurityIncidentPage from './pages/Baggage Security Supervisor/Baggage Security Incident/EditBaggageSecurityIncidentPage'
import DeleteBaggageSecurityIncidentPage from './pages/Baggage Security Supervisor/Baggage Security Incident/DeleteBaggageSecurityIncidentPage';
import CMDashboard from './pages/Cargo Manager/CMDashboard'
import ViewStorageSpacePage from './pages/Cargo Manager/Storage Space/ViewStorageSpacePage'
import EditStorageSpacePage from './pages/Cargo Manager/Storage Space/EditStorageSpacePage'
import ViewCargoShipmentPage from './pages/Cargo Manager/Cargo Shipment/ViewCargoShipmentPage';
import CreateCargoShipmentPage from './pages/Cargo Manager/Cargo Shipment/CreateCargoShipmentPage'
import EditCargoShipmentPage from './pages/Cargo Manager/Cargo Shipment/EditCargoShipmentPage'
import DeleteCargoShipmentPage from './pages/Cargo Manager/Cargo Shipment/DeleteCargoShipmentPage'
import LMDashboard from './pages/Logistics Manager/LMDashboard'
import FMDashboard from './pages/Fuel Manager/FMDashboard'
import CHDashboard from './pages/Cargo Handlers/CHDashboard'
import CEMDashboard from './pages/Civil Engineering Manager/CEMDashboard'
import CEODashboard from './pages/Airport Director (CEO)/CEODashboard'
import CFODashboard from './pages/Chief Financial Officer (CFO)/CFODashboard'
import COODashboard from './pages/Chief Operations Officer (COO)/COODashboard'
import CSODasboard from './pages/Chief Security Officer (CSO)/CSODashboard'
import ViewCargoShipmentPageLM from './pages/Logistics Manager/Cargo Shipment/ViewCargoShipmentPageLM'
import ViewProjectPlanPage from './pages/Civil Engineering Manager/Project Plan/ViewProjectPlanPage'
import CreateProjectPlanPage from './pages/Civil Engineering Manager/Project Plan/CreateProjectPlanPage'
import EditProjectPlanPage from './pages/Civil Engineering Manager/Project Plan/EditProjectPlanPage'
import DeleteProjectPlanPage from './pages/Civil Engineering Manager/Project Plan/DeleteProjectPlanPage'
import ViewBudgetRequestPage from './pages/Civil Engineering Manager/Budget Request/ViewBudgetRequestPage'
import CreateBudgetRequestPage from './pages/Civil Engineering Manager/Budget Request/CreateBudgetRequestPage'
import EditBudgetRequestPage from './pages/Civil Engineering Manager/Budget Request/EditBudgetRequestPage'
import DeleteBudgetRequestPage from './pages/Civil Engineering Manager/Budget Request/DeleteBudgetRequestPage';
import ViewBudgetRequestPageCFO from './pages/Chief Financial Officer (CFO)/Budget Request/ViewBudgetRequestPageCFO';
import EditBudgetRequestPageCFO from './pages/Chief Financial Officer (CFO)/Budget Request/EditBudgetRequestPageCFO';
import ViewAirportGoalPage from './pages/Airport Director (CEO)/Airport Goal/ViewAirportGoalPage'
import CreateAirportGoalPage from './pages/Airport Director (CEO)/Airport Goal/CreateAirportGoalPage'
import EditAirportGoalPage from './pages/Airport Director (CEO)/Airport Goal/EditAirportGoalPage'
import DeleteAirportGoalPage from './pages/Airport Director (CEO)/Airport Goal/DeleteAirportGoalPage'

function App(): JSX.Element {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<NotFoundPage />}></Route>
        <Route path="/" element={<IndexPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>

        {/* Human Resources Director */}
        <Route element={<PrivateRoutes role="Human Resources Director" />}>
          <Route path="/hrd" element={<HRDDashboardPage />}></Route>
          <Route path="/hrd/view-employee" element={<ViewEmployeePage />}></Route>
          <Route path="/hrd/create-employee" element={<CreateEmployeePage />}></Route>
          <Route path="/hrd/edit-employee/:id" element={<EditEmployeePage />}></Route>
          <Route path="/hrd/delete-employee/:id" element={<DeleteEmployeePage />}></Route>
          <Route path="/hrd/view-employee-training" element={<ViewEmployeeTrainingPage />}></Route>
          <Route path="/hrd/create-employee-training" element={<CreateEmployeeTrainingPage />}></Route>
          <Route path="/hrd/edit-employee-training/:id" element={<EditEmployeeTrainingPage />}></Route>
          <Route path="/hrd/delete-employee-training/:id" element={<DeleteEmployeeTrainingPage />}></Route>
          <Route path="/hrd/view-employee-development-program" element={<ViewEmployeeDevelopmentProgramPage />}></Route>
          <Route path="/hrd/create-employee-development-program" element={<CreateEmployeeDevelopmentProgramPage />}></Route>
          <Route path="/hrd/edit-employee-development-program/:id" element={<EditEmployeedevelopmentProgramPage />}></Route>
          <Route path="/hrd/delete-employee-development-program/:id" element={<DeleteEmployeeDevelopmentProgramPage />}></Route>
          <Route path="/hrd/view-job-vacancy" element={<ViewJobVacancyPage />}></Route>
          <Route path="/hrd/create-job-vacancy" element={<CreateJobVacancyPage />}></Route>
          <Route path="/hrd/edit-job-vacancy/:id" element={<EditJobVacancyPage />}></Route>
          <Route path="/hrd/delete-job-vacancy/:id" element={<DeleteJobVacancyPage />}></Route>
        </Route>

        {/* Lost and Found Staff */}
        <Route element={<PrivateRoutes role="Lost and Found Staff" />}>
          <Route path="/laf" element={<LAFDashboard />}></Route>
          <Route path="/laf/view-laf-item-log" element={<ViewLostAndFoundItemLogPage />}></Route>
          <Route path="/laf/create-laf-item-log" element={<CreateLostAndFoundItemLogPage />}></Route>
          <Route path="/laf/edit-laf-item-log/:id" element={<EditLostAndFoundItemLogPage />}></Route>
        </Route>

        {/* Flight Operations Manager */}
        <Route element={<PrivateRoutes role="Flight Operations Manager" />}>
          <Route path="/fom" element={<FOMDashboard />}></Route>
          <Route path="/fom/view-flight-crew" element={<ViewFlightCrewPage />}></Route>
          <Route path="/fom/create-flight-crew" element={<CreateFlightCrewPage />}></Route>
          <Route path="/fom/edit-flight-crew/:id" element={<EditFlightCrewPage />}></Route>
          <Route path="/fom/delete-flight-crew/:id" element={<DeleteFlightCrewPage />}></Route>
          <Route path="/fom/view-flight-schedule" element={<ViewFlightSchedulePage />}></Route>
          <Route path="/fom/create-flight-schedule" element={<CreateFlightSchedulePage />}></Route>
          <Route path="/fom/edit-flight-schedule/:id" element={<EditFlightSchedulePage />}></Route>
          <Route path="/fom/delete-flight-schedule/:id" element={<DeleteFlightSchedulePage />}
          ></Route>
        </Route>

        {/* Customer Service Manager */}
        <Route element={<PrivateRoutes role="Customer Service Manager" />}>
          <Route path="/csm" element={<CSMDashboard />}></Route>
          <Route path="/csm/view-broadcast" element={<ViewBroadcastPage />}></Route>
          <Route path="/csm/create-broadcast" element={<CreateBroadcastPage />}></Route>
          <Route path="/csm/edit-broadcast/:id" element={<EditBroadcastPage />}></Route>
          <Route path="/csm/delete-broadcast/:id" element={<DeleteBroadcastPage />}></Route>

          <Route path="/csm/view-feedback-form" element={<ViewFeedbackFormPage />}></Route>
          <Route path="/csm/create-feedback-form" element={<CreateFeedbackFormPage />}></Route>
          <Route path="/csm/edit-feedback-form/:id" element={<EditFeedbackFormPage />}></Route>
        </Route>

        {/* Information Desk Staff */}
        <Route element={<PrivateRoutes role="Information Desk Staff" />}>
          <Route path="/ids" element={<IDSDashboard />}></Route>
          <Route path="/ids/view-flight-schedule" element={<ViewFlightSchedulePageIDS />}></Route>
        </Route>

        {/* Check-in Staff */}
        <Route element={<PrivateRoutes role="Check-in Staff" />}>
          <Route path="/cis" element={<CISDashboard />}></Route>
          <Route path="/cis/view-flight-schedule" element={<ViewFlightSchedulePageCIS />}></Route>
          <Route path="/cis/view-boarding-pass" element={<ViewBoardingPassPage />}></Route>
          <Route path="/cis/create-boarding-pass" element={<CreateBoardingPassPage />}></Route>
          <Route path="/cis/edit-boarding-pass/:id" element={<EditBoardingPassPage />}></Route>
          <Route path="/cis/delete-boarding-pass/:id" element={<DeleteBoardingPassPage />}></Route>
          <Route path="/cis/print-boarding-pass/:id" element={<PrintBoardingPassPage />}></Route>
        </Route>

        {/* Gate Agents */}
        <Route element={<PrivateRoutes role="Gate Agents" />}>
          <Route path="/ga" element={<GADashboard />}></Route>
          <Route path="/ga/view-flight-schedule" element={<ViewFlightSchedulePageGA />}></Route>
        </Route>

        {/* Airport Operations Manager */}
        <Route element={<PrivateRoutes role="Airport Operations Manager"/>}>
          <Route path="/aom" element={<AOMDashboard />}></Route>
          <Route path="/aom/view-flight-schedule" element={<ViewFlightSchedulePageAOM />}></Route> 
          <Route path="/aom/edit-flight-schedule/:id" element={<EditFlightSchedulePageAOM />}></Route> 
        </Route>

        {/* Ground Handling Manager */}
        <Route element={<PrivateRoutes role="Ground Handling Manager" />}>
          <Route path="/ghm" element={<GHMDashboard />}></Route>
          <Route path="/ghm/view-flight-baggage-status" element={<ViewFlightBaggageStatusPageGHM />}></Route>
          <Route path="/ghm/edit-flight-baggage-status/:id" element={<EditFlightBaggageStatusPageGHM />}></Route>
          <Route path="/ghm/view-refueling-schedule" element={<ViewRefuelingSchedulePage />}></Route>
          <Route path="/ghm/create-refueling-schedule" element={<CreateRefuelingSchedulePage />}></Route>
          <Route path="/ghm/edit-refueling-schedule/:id" element={<EditRefuelingSchedulePage />}></Route>
          <Route path="/ghm/delete-refueling-schedule/:id" element={<DeleteRefuelingSchedulePage />}></Route>
        </Route>

        {/* Landside Operations Manager */}
        <Route element={<PrivateRoutes role="Landside Operations Manager" />}>
          <Route path="/lom" element={<LOMDashboard />}></Route>
          <Route path="/lom/view-transportation-route" element={<ViewTransportationRoutePage />}></Route>
          <Route path="/lom/create-transportation-route" element={<CreateTransportationRoutePage />}></Route>
          <Route path="/lom/edit-transportation-route/:id" element={<EditTransportationRoutePage />}></Route>
          <Route path="/lom/delete-transportation-route/:id" element={<DeleteTransportationRoutePage />}></Route>
          <Route path="/lom/view-transportation-schedule" element={<ViewTransportationSchedulePage />}></Route>
          <Route path="/lom/create-transportation-schedule" element={<CreateTransportationSchedulePage />}></Route>
          <Route path="/lom/edit-transportation-schedule/:id" element={<EditTransporationSchedulePage />}></Route>
          <Route path="/lom/delete-transportation-schedule/:id" element={<DeleteTransportationSchedulePage />}></Route>
        </Route>

        {/* Maintenance Manager */}
        <Route element={<PrivateRoutes role="Maintenance Manager"/>}>
          <Route path="/mm" element={<MMDashboard />}></Route>
          <Route path="/mm/view-equipment" element={<ViewEquipmentPage />}></Route>
          <Route path="/mm/edit-equipment/:id" element={<EditEquipmentPage />}></Route>
          <Route path="/mm/view-maintenance-schedule" element={<ViewMaintenanceSchedulePage />}></Route>
          <Route path="/mm/create-maintenance-schedule" element={<CreateMaintenanceSchedulePage />}></Route>
          <Route path="/mm/edit-maintenance-schedule/:id" element={<EditMaintenanceSchedulePage />}></Route>
          <Route path="/mm/delete-maintenance-schedule/:id" element={<DeleteMaintenanceSchedulePage />}></Route>
        </Route>

        {/* Customs and Border Control Officers */}
        <Route element={<PrivateRoutes role="Customs and Border Control Officers"/>}>
          <Route path="/cabco" element={<CABCODashboard />}></Route>
          <Route path="/cabco/view-passport-and-visa" element={<ViewPassportAndVisaPage />}></Route>
          <Route path="/cabco/create-passport-and-visa" element={<CreatePassportAndVisaPage />}></Route>
          <Route path="/cabco/edit-passport-and-visa/:id" element={<EditPassportAndVisaPage />}></Route>
          <Route path="/cabco/delete-passport-and-visa/:id" element={<DeletePassportAndVisaPage />}></Route>
          <Route path="/cabco/view-custom-declaration" element={<ViewCustomDeclarationPage />}></Route>
          <Route path="/cabco/create-custom-declaration" element={<CreateCustomDeclarationPage />}></Route>
          <Route path="/cabco/edit-custom-declaration/:id" element={<EditCustomDeclarationPage />}></Route>
          <Route path="/cabco/delete-custom-declaration/:id" element={<DeleteCustomDeclarationPage />}></Route>
          <Route path="/cabco/view-inspection-record" element={<ViewInspectionRecordPage />}></Route>
          <Route path="/cabco/create-inspection-record" element={<CreateInspectionRecordPage />}></Route>
          <Route path="/cabco/edit-inspection-record/:id" element={<EditInspectionRecordPage />}></Route>
          <Route path="/cabco/delete-inspection-record/:id" element={<DeleteInspectionRecordPage />}></Route>
        </Route>

        {/* Baggage Security Supervisor */}
        <Route element={<PrivateRoutes role="Baggage Security Supervisor" />} >
          <Route path="/bss" element={<BSSDashboard />}></Route>
          <Route path="/bss/view-flight-baggage-status" element={<ViewFlightBaggageStatusPageBSS />}></Route>
          <Route path="/bss/edit-flight-baggage-status/:id" element={<EditFlightBaggageStatusPageBSS />}></Route>
          <Route path="/bss/view-baggage-handling-task" element={<ViewBaggageHandlingTaskPage />}></Route>
          <Route path="/bss/create-baggage-handling-task" element={<CreateBaggageHandlingTaskPage />}></Route>
          <Route path="/bss/edit-baggage-handling-task/:id" element={<EditBaggageHandlingTaskPage />}></Route>
          <Route path="/bss/delete-baggage-handling-task/:id" element={<DeleteBaggageHandlingTaskPage />}></Route>
          <Route path="/bss/view-baggage-security-incident" element={<ViewBaggageSecurityIncidentPage />}></Route>
          <Route path="/bss/create-baggage-security-incident" element={<CreateBaggageSecurityIncidentPage />}></Route>
          <Route path="/bss/edit-baggage-security-incident/:id" element={<EditBaggageSecurityIncidentPage />}></Route>
          <Route path="/bss/delete-baggage-security-incident/:id" element={<DeleteBaggageSecurityIncidentPage />}></Route>
        </Route>

        {/* Cargo Manager */}
        <Route element={<PrivateRoutes role="Cargo Manager"/>}>
          <Route path="/cm" element={<CMDashboard />}></Route>
          <Route path="/cm/view-storage-space" element={<ViewStorageSpacePage />}></Route>
          <Route path="/cm/edit-storage-space/:id" element={<EditStorageSpacePage />}></Route>
          <Route path="/cm/view-cargo-shipment" element={<ViewCargoShipmentPage />}></Route>
          <Route path="/cm/create-cargo-shipment" element={<CreateCargoShipmentPage />}></Route>
          <Route path="/cm/edit-cargo-shipment/:id" element={<EditCargoShipmentPage />}></Route>
          <Route path="/cm/delete-cargo-shipment/:id" element={<DeleteCargoShipmentPage />}></Route>
        </Route>

        {/* Logistics Manager */}
        <Route element={<PrivateRoutes role="Logistics Manager"/>}>
          <Route path="/lm" element={<LMDashboard />}></Route>
          <Route path="/lm/view-cargo-shipment" element={<ViewCargoShipmentPageLM />}></Route>
        </Route>

        {/* Fuel Manager */}
        <Route element={<PrivateRoutes role="Fuel Manager" />}>
          <Route path="/fm" element={<FMDashboard />}></Route>
        </Route>

        {/* Cargo Handlers */}
        <Route element={<PrivateRoutes role="Cargo Handlers" />}>
          <Route path="/ch" element={<CHDashboard />}></Route>
        </Route>

        {/* Civil Engineering Manager */}
        <Route element={<PrivateRoutes role="Civil Engineering Manager" />}>
          <Route path="/cem" element={<CEMDashboard />}></Route>
          <Route path="/cem/view-project-plan" element={<ViewProjectPlanPage />}></Route>
          <Route path="/cem/create-project-plan" element={<CreateProjectPlanPage />}></Route>
          <Route path="/cem/edit-project-plan/:id" element={<EditProjectPlanPage />}></Route>
          <Route path="/cem/delete-project-plan/:id" element={<DeleteProjectPlanPage />}></Route>
          <Route path="/cem/view-budget-request" element={<ViewBudgetRequestPage />}></Route>
          <Route path="/cem/create-budget-request" element={<CreateBudgetRequestPage />}></Route>
          <Route path="/cem/edit-budget-request/:id" element={<EditBudgetRequestPage />}></Route>
          <Route path="/cem/delete-budget-request/:id" element={<DeleteBudgetRequestPage />}></Route>
        </Route>

        {/* Airport Director / CEO */}
        <Route element={<PrivateRoutes role="Airport Director/CEO" />}>
          <Route path="/ceo" element={<CEODashboard />}></Route>
          <Route path="/ceo/view-airport-goal" element={<ViewAirportGoalPage />}></Route>
          <Route path="/ceo/create-airport-goal" element={<CreateAirportGoalPage />}></Route>
          <Route path="/ceo/edit-airport-goal/:id" element={<EditAirportGoalPage />}></Route>
          <Route path="/ceo/delete-airport-goal/:id" element={<DeleteAirportGoalPage />}></Route>
        </Route>

        {/* Chief Financial Officer (CFO) */}
        <Route element={<PrivateRoutes role="Chief Financial Officer (CFO)" />}>
          <Route path="/cfo" element={<CFODashboard />}></Route>
          <Route path="/cfo/view-budget-request" element={<ViewBudgetRequestPageCFO />}></Route>
          <Route path="/cfo/edit-budget-request/:id" element={<EditBudgetRequestPageCFO />}></Route>
        </Route>

        {/* Chief Operations Officer (COO) */}
        <Route element={<PrivateRoutes role="Chief Operations Officer (COO)" />}>
          <Route path="/coo" element={<COODashboard />}></Route>
        </Route>

        {/* Chief Security Officer (CSO) */}
        <Route element={<PrivateRoutes role="Chief Security Officer (CSO)" />}>
          <Route path="/cso" element={<CSODasboard />}></Route>
        </Route>

      </Routes>
    </Router>
  )
}

export default App
