function createEmployeeRecord(employeeInfo) {
  return {
    firstName: employeeInfo[0],
    familyName: employeeInfo[1],
    title: employeeInfo[2],
    payPerHour: employeeInfo[3],
    timeInEvents: [],
    timeOutEvents: [],
  }
}

function createEmployeeRecords(employeeList) {
  let list = employeeList.map(createEmployeeRecord)
  return list
}

function createTimeInEvent(employeeRecord, dateStamp) { //YYYY-MM-DD HHMM
  const splitDate = dateStamp.split(' ')
  employeeRecord['timeInEvents'].push({
    type: 'TimeIn',
    hour: parseInt(splitDate[1], 10),
    date: splitDate[0],
  })
  return employeeRecord
}

function createTimeOutEvent(employeeRecord, dateStamp) {
  const splitDate = dateStamp.split(' ')
  employeeRecord['timeOutEvents'].push({
    type: 'TimeOut',
    hour: parseInt(splitDate[1], 10),
    date: splitDate[0],
  })
  return employeeRecord
}

function hoursWorkedOnDate(employeeRecord, dateStamp) {
  const clockedIn = employeeRecord.timeInEvents.find(({ date }) => date === dateStamp)
  const clockedOut = employeeRecord.timeOutEvents.find(({ date }) => date === dateStamp)
  const hoursWorked = (clockedOut.hour - clockedIn.hour) / 100
  return hoursWorked
}

function wagesEarnedOnDate(employeeRecord, dateStamp) {
  const hoursWorked = hoursWorkedOnDate(employeeRecord, dateStamp)
  return hoursWorked * employeeRecord.payPerHour
}

function allWagesFor(employeeRecord) {
  const datesWorked = employeeRecord.timeInEvents.map(e => e.date)
  const totalWage = datesWorked.reduce(function (accumulator, date) {
    return accumulator + wagesEarnedOnDate(employeeRecord, date)
  }, 0)
  return totalWage
}

function calculatePayroll(employeeList) {
  const payrollTotal = employeeList.reduce(function (accumulator, employeeRecord) {
    return accumulator + allWagesFor(employeeRecord)
  }, 0)
  return payrollTotal
}
