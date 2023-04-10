import { UserConstants } from '../app/constants/UserConstants'

export const ifPDSUser = () => {
  const USER = JSON.parse(localStorage.getItem('user'))
  const USER_GROUP = USER ? USER.USER_GROUP_NAME : null
  const USER_DEPARTMENT = USER ? USER.MANAGE_DEPARTMENT_NAME : null
  const USER_DIVSION = USER ? USER.MANAGE_DIVISION_NAME : null
  if (USER_GROUP === UserConstants.FIMM_PDS_USER.GROUP_NAME &&
        USER_DEPARTMENT === UserConstants.FIMM_PDS_USER.DEPARTMENT &&
        USER_DIVSION === UserConstants.FIMM_PDS_USER.DIVSION) {
    console.log('Auth' + true)
    return true
  }
  console.log('Auth' + false)
  return false
}
export const ifAuthenticatedPDSUser = (to, from, next) => {
  if (ifPDSUser()) {
    next()
  } else {
    return false
  }
}

export const ifAuthenticatedPDSOrCompanyAdmin = (to, from, next) => {
  if (ifPDSUser() || ifCompanyAdmin()) {
    next()
  } else {
    return false
  }
}

export const ifPDSReviewer = () => {
  const USER = JSON.parse(localStorage.getItem('user'))
  const USER_GROUP = USER ? USER.USER_GROUP_NAME : null
  const USER_DEPARTMENT = USER ? USER.MANAGE_DEPARTMENT_NAME : null
  const USER_DIVSION = USER ? USER.MANAGE_DIVISION_NAME : null
  if (USER_GROUP === UserConstants.FIMM_PDS_REVIEWER.GROUP_NAME &&
        USER_DEPARTMENT === UserConstants.FIMM_PDS_REVIEWER.DEPARTMENT &&
        USER_DIVSION === UserConstants.FIMM_PDS_REVIEWER.DIVSION) {
    console.log('Auth' + true)
    return true
  }
  console.log('Auth' + false)
  return false
}

export const ifAuthenticatedPDSReviewer = (to, from, next) => {
  if (ifPDSReviewer()) {
    next()
  } else {
    return false
  }
}

export const ifPDSApprover = () => {
  const USER = JSON.parse(localStorage.getItem('user'))
  const USER_GROUP = USER ? USER.USER_GROUP_NAME : null
  const USER_DEPARTMENT = USER ? USER.MANAGE_DEPARTMENT_NAME : null
  const USER_DIVSION = USER ? USER.MANAGE_DIVISION_NAME : null
  if (USER_GROUP === UserConstants.FIMM_PDS_APPROVER.GROUP_NAME &&
        USER_DEPARTMENT === UserConstants.FIMM_PDS_APPROVER.DEPARTMENT &&
        USER_DIVSION === UserConstants.FIMM_PDS_APPROVER.DIVSION) {
    console.log('Auth' + true)
    return true
  }
  console.log('Auth' + false)
  return false
}

export const ifAuthenticatedPDSApprover = (to, from, next) => {
  if (ifPDSApprover()) {
    next()
  } else {
    return false
  }
}

export const ifAuthenticatedAnyPDSUser = (to, from, next) => {
  if (ifPDSUser() || ifPDSApprover() || ifPDSReviewer()) {
    next()
  } else {
    return false
  }
}

export const ifEscProvider = () => {
  const USER = JSON.parse(localStorage.getItem('user'))
  const USER_IS_ADMIN = USER ? USER.USER_ISADMIN : null
  if (USER_IS_ADMIN === 0) {
    console.log('Auth' + true)
    return true
  }
  console.log('Auth' + false)
  return false
}

export const ifRegisteredEscProvider = () => {
  const USER = JSON.parse(localStorage.getItem('user'))
  const USER_GROUP_NAME = USER ? USER.USER_GROUP_NAME : null
  if (USER_GROUP_NAME && USER_GROUP_NAME.includes('esc')) {
    console.log('Auth' + true)
    return true
  }
  console.log('Auth' + false)
  return false
}

export const ifAuthenticatedEscProvider = (to, from, next) => {
  if (ifEscProvider()) {
    next()
  } else {
    return false
  }
}

export const ifAuthenticatedRegisteredEscProvider = (to, from, next) => {
  if (ifRegisteredEscProvider()) {
    next()
  } else {
    return false
  }
}

export const ifCompanyAdmin = () => {
  const USER = JSON.parse(localStorage.getItem('user'))
  const USER_IS_ADMIN = USER ? USER.USER_ISADMIN : null
  if (USER_IS_ADMIN === 1) {
    console.log('Auth' + true)
    return true
  }
  console.log('Auth' + false)
  return false
}

export const ifExamCentreAdmin = () => {
  const USER = JSON.parse(localStorage.getItem('user'))
  const USER_IS_ADMIN = USER ? USER.USER_ISADMIN : null
  const IS_EXAM_CENTRE_ADMIN = USER ? USER.USER_GROUP_NAME.includes('exam_centre_admin') : null
  console.log('isexamcentreadmin', IS_EXAM_CENTRE_ADMIN)
  if (IS_EXAM_CENTRE_ADMIN) {
    console.log('Auth' + true)
    return true
  }
  console.log('Auth' + false)
  return false
}

export const ifAuthenticatedCompanyAdmin = (to, from, next) => {
  if (ifCompanyAdmin()) {
    next()
  } else {
    return false
  }
}

export const ifAuthenticatedCompanyAdminOrExamCentreAdmin = (to, from, next) => {
  if (ifCompanyAdmin() || ifExamCentreAdmin()) {
    next()
  } else {
    return false
  }
}

export const ifAuthenticatedAnyEscUser = (to, from, next) => {
  if (ifCompanyAdmin() || ifEscProvider()) {
    next()
  } else {
    return false
  }
}
