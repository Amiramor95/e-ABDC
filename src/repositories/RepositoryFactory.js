/* -------------------------------------------------------------------------- */
/*                                   module0                                  */
/* -------------------------------------------------------------------------- */
import ApprovalLevelRepository from './module0/ApprovalLevelRepository';
import ConsultantExamSessionRepository from './module0/ConsultantExamSessionRepository';
import ConsultantTerminationRepository from './module0/ConsultantTerminationRepository';
import SettingPostcodeRepository from './module0/SettingPostcodeRepository';
import SettingGeneralRepository from './module0/SettingGeneralRepository';
import DistributorTypeRepository from './module0/DistributorTypeRepository';
import ConsultantExamTypeRepository from './module0/ConsultantExamTypeRepository';
import RequiredDocumentRepository from './module0/RequiredDocumentRepository';

/* -------------------------------------------------------------------------- */
/*                                   module1                                  */
/* -------------------------------------------------------------------------- */

import DistributorCandidateAcceptanceRepository from './module1/DistributorCandidateAcceptanceRepository';
/* -------------------------------------------------------------------------- */
/*                                   module2                                  */
/* -------------------------------------------------------------------------- */
import DistributorRecordsRepository from './module2/DistributorRecordsRepository';
import TerminationRepository from './module2/TerminationRepository';
import ConsultantRecordRepository from './module2/ConsultantRecordRepository';
import ResignationRepository from './module2/ResignationRepository';

const repositories = {
  /* -------------------------------------------------------------------------- */
  /*                                   module0                                  */
  /* -------------------------------------------------------------------------- */
  approvallevel: ApprovalLevelRepository,
  consultantexamsession: ConsultantExamSessionRepository,
  consultanttermination: ConsultantTerminationRepository,
  settingpostcode: SettingPostcodeRepository,
  settinggeneral: SettingGeneralRepository,
  distributortype: DistributorTypeRepository,
  consultantexamtype: ConsultantExamTypeRepository,
  requireddocument: RequiredDocumentRepository,

  /* -------------------------------------------------------------------------- */
  /*                                   module1                                  */
  /* -------------------------------------------------------------------------- */
  distributorcandidateacceptance: DistributorCandidateAcceptanceRepository,

  /* -------------------------------------------------------------------------- */
  /*                                   module2                                  */
  /* -------------------------------------------------------------------------- */
  distributorrecords: DistributorRecordsRepository,
  termination: TerminationRepository,
  consultantrecord: ConsultantRecordRepository,
  resignation: ResignationRepository,
  consultantappeal: ConsultantRecordRepository,
};

export default {
  get: name => repositories[name],
};
