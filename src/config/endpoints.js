import config from './config'

export default {
  REGISTERED_DOCTOR_LOGIN: config.API_ROOT + '/registeredDoctor/login',
  PREMIUM_CASE_DETAILS: config.API_ROOT + '/premiumCaseDetails',
  DOCTOR_REPORT: config.API_ROOT + '/doctorReport',
  DISEASE_LIST: config.API_ROOT + '/diseaseList',
  DISEASE_DESCRIPTION: config.API_ROOT + '/diseaseDescription',
  DISEASE_MEDICINE: config.API_ROOT + '/diseaseMedicine',
  OPEN_CASES: config.API_ROOT + '/openCases',
  PENDING_CASES: config.API_ROOT + '/pendingCases',
  CLAIM_CASE: config.API_ROOT + '/claimCase',
  DOCTOR_HISTORY_REPORT: config.API_ROOT + '/doctorHistoryReport',
  REMOVE_CASE_CLAIM: config.API_ROOT + '/removeCaseClaim',
  GET_IMAGE: config.API_ROOT + '/image',
  DOCTOR_PROFILE: config.API_ROOT + '/doctorProfile',
  GET_CHAT: config.API_ROOT + '/doctorChat',
  POST_CHAT: config.API_ROOT + '/doctorChat',
  UPLOAD_IMAGE: config.API_ROOT + '/image',
  COMPLETE_CASES: config.API_ROOT + '/completeCases'
}
