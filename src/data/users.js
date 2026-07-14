// Mock user directory. In production this would be an org directory / Salesforce
// User query. Search matches first name, last name, or designation.

export const USERS = [
  { id: 'u1', firstName: 'Priya', lastName: 'Nair', designation: 'Partner', email: 'priya.nair@scyne.com.au' },
  { id: 'u2', firstName: 'Tom', lastName: 'Fielding', designation: 'Director', email: 'tom.fielding@scyne.com.au' },
  { id: 'u3', firstName: 'Sarah', lastName: 'Cole', designation: 'Senior Manager', email: 'sarah.cole@scyne.com.au' },
  { id: 'u4', firstName: 'James', lastName: 'Whitmore', designation: 'Principal', email: 'james.whitmore@scyne.com.au' },
  { id: 'u5', firstName: 'Aisha', lastName: 'Khan', designation: 'Manager', email: 'aisha.khan@scyne.com.au' },
  { id: 'u6', firstName: 'Daniel', lastName: 'Osei', designation: 'Bid Manager', email: 'daniel.osei@scyne.com.au' },
  { id: 'u7', firstName: 'Mei', lastName: 'Lin', designation: 'Consultant', email: 'mei.lin@scyne.com.au' },
  { id: 'u8', firstName: 'Robert', lastName: 'Hargreaves', designation: 'Partner', email: 'robert.hargreaves@scyne.com.au' },
  { id: 'u9', firstName: 'Elena', lastName: 'Popescu', designation: 'Senior Manager', email: 'elena.popescu@scyne.com.au' },
  { id: 'u10', firstName: 'Marcus', lastName: 'Bell', designation: 'Director', email: 'marcus.bell@scyne.com.au' },
  { id: 'u11', firstName: 'Hannah', lastName: 'Reddy', designation: 'Consultant', email: 'hannah.reddy@scyne.com.au' },
  { id: 'u12', firstName: 'Oliver', lastName: 'Grant', designation: 'Capability Lead', email: 'oliver.grant@scyne.com.au' },
  { id: 'u13', firstName: 'Sophie', lastName: 'Turner', designation: 'Manager', email: 'sophie.turner@scyne.com.au' },
  { id: 'u14', firstName: 'Raj', lastName: 'Menon', designation: 'Practice Lead', email: 'raj.menon@scyne.com.au' },
]

export function fullName(u) {
  return `${u.firstName} ${u.lastName}`
}

export function initials(u) {
  return `${u.firstName[0] || ''}${u.lastName[0] || ''}`.toUpperCase()
}

export function searchUsers(query, excludeIds = []) {
  const q = query.trim().toLowerCase()
  const ex = new Set(excludeIds)
  return USERS.filter((u) => {
    if (ex.has(u.id)) return false
    if (!q) return true
    return [u.firstName, u.lastName, u.designation, `${u.firstName} ${u.lastName}`]
      .join(' ')
      .toLowerCase()
      .includes(q)
  })
}
