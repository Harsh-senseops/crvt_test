const AUTH = `query Authenticate($name:String!,$password:String!) {
    authenticate(name: $name, password: $password)
  }`;

const ADD_USER = `mutation addUser($eCode:String!,$name:String!,$pass:String!,$role:Int!) {
  createEmployeeDetail(
    input: {employeeDetail: {employeeCode: $eCode, name: $name, password: $pass, role: $role}}
  ) {
    employeeDetail {
      employeeCode
    }
  }
}
`;

const GET_ALL_USER = `query MyQuery {
  allEmployeeDetails {
    nodes {
      employeeCode
      name
      password
      role
    }
  }
}`;

const UPDATE_USER = `mutation updateEmployeeDetailByEmployeeCode($name: String!, $empCode: String!, $role: Int!, $password: String!) {
  updateEmployeeDetailByEmployeeCode(
    input: {employeeDetailPatch: {name: $name, employeeCode: $empCode, password: $password, role: $role}, employeeCode: $empCode}
  ) {
    clientMutationId
    employeeDetail {
      name
    }
  }
}
`;
const DELETE_USER = `mutation MyMutation($empCode:String!) {
  deleteEmployeeDetailByEmployeeCode(input: {employeeCode: $empCode}) {
    deletedEmployeeDetailId
  }
}
`;

const SUB = `subscription allEmployeeDetails {
  allEmployeeDetails {
    nodes {
      employeeCode
      name
      password
      role
    }
  }
}`;

const CREATE_VENDORS = `mutation AddVendors($vendorCode: String!, $vendorName: String!) {
  createVendor(
    input: {vendor: {vendorCode: $vendorCode, vendorName: $vendorName}}
  ) {
    clientMutationId
    vendor {
      vendorCode
      vendorName
    }
  }
}`;

const REPEATED_OPS_DETAILS = `query equipment_running_days {
  allEquipmentRunningDetails {
    nodes {
      dustErt
      ovenErt
      partName
      repeatedOperationErt
      showerErt
      thermalShockErt
      vibrationErt
      componentDetailByPartName {
        partName
      }
    }
  }
}
`;
const CREATE_RO_YEARLY_PLANNER = `mutation createRoPlanner($componentName:String!,$samples:Int,$testDetails:JSON,$totalSamplesTested:Int) {
  createRoYearlyPlanner(
    input: {roYearlyPlanner: {componentName: $componentName, samples:$samples, testDetails: $testDetails, totalSamplesTested: $totalSamplesTested}}
  ) {
    clientMutationId
  }
}
`;
const MAKE_YEARLY_PLANNER = `query makeYearlyPlanner($makePlanner:Boolean!) {
  makeYearlyPlanner(makePlanner: $makePlanner)
}
`;

const RO_YEARLY_PLANNER = `query roYearlyPlanner {
  allRoYearlyPlanners {
    nodes {
      componentDetailByComponentId {
        partName
        equipmentRunningDetailByPartId{
          repeatedOperationErt
        }
      }
      componentId
      samples
      testDetails
      totalSamplesTested
    }
  }
}
`;
const THERMAL_SHOCK_YEARLY_PLANNER = `
query thermalShockYearlyPlanner {
  allThermalShockYearlyPalnners {
    nodes {
      componentDetailByComponentId {
        partName
        equipmentRunningDetailByPartId {
          thermalShockErt
        }
      }
      componentId
      samples
      testDetails
      totalSamplesTested
    }
  }
}
`;
const SHOWER_YEARLY_PLANNER = `
query showerYearlyPlanner {
  allShowerYearlyPlanners {
    nodes {
      componentDetailByComponentId {
        partName
        equipmentRunningDetailByPartId{
          showerErt
        }
      }
      componentId
      samples
      testDetails
      totalSamplesTested
    }
  }
}
`;
const DUST_YEARLY_PLANNER = `
query dustYearlyPlanner {
  allDustYearlyPlanners {
    nodes {
      componentDetailByComponentId {
        partName
        equipmentRunningDetailByPartId{
          dustErt
        }
      }
      componentId
      samples
      testDetails
      totalSamplesTested
    }
  }
}
`;

const VIBRATION_YEARLY_PLANNER = `
query vibrationYearlyPlanner {
  allVibrationYearlyPlanners {
    nodes {
      componentDetailByComponentId {
        partName
        equipmentRunningDetailByPartId{
          vibrationErt
        }
      }
      componentId
      samples
      testDetails
      totalSamplesTested
    }
  }
}
`;
const OVEN_YEARLY_PLANNER = `query ovenYearlyPlanner {
  allOvenYearlyPlanners {
    nodes {
      componentDetailByComponentId {
        partName
        equipmentRunningDetailByPartId{
          ovenErt
        }
      }
      componentId
      samples
      testDetails
      totalSamplesTested
    }
  }
}
`;
const THERMAL_CYCLE_YEARLY_PLANNER = `query thermalCycleYearlyPlanner {
  allThermalCycleYearlyPlanners {
    nodes {
      componentDetailByComponentId {
        partName
        equipmentRunningDetailByPartId{
          thermalCycleErt
        }
      }
      componentId
      samples
      testDetails
      totalSamplesTested
    }
  }
}
`;

const EQUIPMENT_DETAILS = `subscription equipments_details {
  allComponentDetails {
    nodes {
      partName
      dustTestDetailsByPartName {
        nodes {
          status
          testDetails
          partName
        }
      }
      ovenTestDetailsByPartName {
        nodes {
          status
          testDetails
          partName
        }
      }
      repeatedOperationTestDetailsByPartName {
        nodes {
          status
          testDetails
          partName
        }
      }
      thermalCycleTestDetailsByPartName {
        nodes {
          status
          testDetails
          partName
        }
      }
      thermalShockChamberTestDetailsByPartName {
        nodes {
          status
          testDetails
          partName
        }
      }
      vibrationTestDetailsByPartName {
        nodes {
          status
          testDetails
          partName
        }
      }
      showerTestDetailsByPartName {
        nodes {
          status
          testDetails
          partName
        }
      }
    }
  }
}
`;

const DUST_TEST_DETAILS = `subscription dustTestDetailByPartName($partName:Int!) {
  dustTestDetailByPartName(partName: $partName) {
    testDetails
  }
}`;

const SAVE_DUST_DETAILS = `mutation MyMutation($partName: Int!,$testDetails:JSON!) {
  updateDustTestDetailByPartName(
    input: {dustTestDetailPatch: {testDetails: $testDetails}, partName: $partName}
  ) {
    clientMutationId
  }
}
`;
const OVEN_TEST_DETAILS = `subscription ovenTestDetailByPartName($partName:Int!) {
  ovenTestDetailByPartName(partName:$partName) {
    testDetails
  }
}`;

const SAVE_OVEN_DETAILS = `mutation updateOvenTestDetailByPartName($partName: Int!, $testDetails: JSON!) {
  updateOvenTestDetailByPartName(
    input: {ovenTestDetailPatch: {testDetails: $testDetails}, partName: $partName}
  ) {
    clientMutationId
  }
}
`;
const REPEATED_OPERATION_TEST_DETAILS = `subscription repeatedOperationTestDetailByPartName($partName:Int!) {
  repeatedOperationTestDetailByPartName(partName: $partName) {
    testDetails
  }
}
`;
const SAVE_REPEATED_OPERATION_DETAILS = `mutation updateRepeatedOperationTestDetailByPartName($testDetails:JSON!,$partName:Int!) {updateRepeatedOperationTestDetailByPartName(
    input: {repeatedOperationTestDetailPatch: {testDetails: $testDetails}, partName: $partName}
  ) {
    clientMutationId
  }
}`;
const SHOWER_TEST_DETAILS = `subscription showerTestDetailByPartName($partName:Int!) {
  showerTestDetailByPartName(partName: $partName) {
    testDetails
  }
}`;

const SAVE_SHOWER_DETAILS = `mutation updateShowerTestDetailByPartName($testDetails:JSON!,$partName:Int!) {
  updateShowerTestDetailByPartName(
    input: {showerTestDetailPatch: {testDetails: $testDetails}, partName: $partName}
  ) {
    clientMutationId
  }
}`;

const THERMAL_CYCLE_TEST_DETAILS = `subscription thermalCycleTestDetailByPartName($partName:Int!) {
  thermalCycleTestDetailByPartName(partName: $partName) {
    testDetails
  }
}`;
const SAVE_THERMAL_CYCLE_DETAILS = `mutation updateThermalCycleTestDetailByPartName($testDetails:JSON!,$partName:Int!) {updateThermalCycleTestDetailByPartName(
    input: {thermalCycleTestDetailPatch: {testDetails: $testDetails}, partName: $partName}
  ) {
    clientMutationId
  }
}`;
const THERMAL_SHOCK_TEST_DETAILS = `subscription thermalShockChamberTestDetailByPartName($partName:Int!) {
  thermalShockChamberTestDetailByPartName(partName: $partName) {
    testDetails
  }
}`;

const SAVE_THERMAL_SHOCK_DETAILS = `mutation updateThermalShockChamberTestDetailByPartName($testDetails:JSON!,$partName:Int!) {
  updateThermalShockChamberTestDetailByPartName(
    input: {thermalShockChamberTestDetailPatch: {testDetails:$testDetails}, partName: $partName}
  ) {
    clientMutationId
  }
}`;
const VIBRATION_TEST_DETAILS = `subscription vibrationTestDetailByPartName($partname:Int!){
  vibrationTestDetailByPartName(partName: $partname) {
    testDetails
  }
}`;

const SAVE_VIBRATION_DETAILS = `mutation updateVibrationTestDetailByPartName($testDetails:JSON!,$partName:Int!) {
  updateVibrationTestDetailByPartName(
    input: {vibrationTestDetailPatch: {testDetails: $testDetails}, partName: $partName}
  ) {
    clientMutationId
  }
}`;

const PART_CODE_DETAILS = `
mutation createPartCodeDetails($he6t: Int!, $hhhd: Int!, $hhhg: Int!, $hhhu: Int!, $hm4n: Int!, $hm5v: Int!, $hm6c: Int!, $partCode: String!, $partName: String!, $vendorDetails: JSON,$count:Int!) {
  createPartCodeDetail(
    input: {partCodeDetail: {he6T: $he6t, hhhd: $hhhd, hhhg: $hhhg, hhhu: $hhhu, hm4N: $hm4n, hm5V: $hm5v, hm6C: $hm6c, partCode: $partCode, partName: $partName, vendorDetails: $vendorDetails, count: $count}}
  ) {
    clientMutationId
  }
}

`;
const PARTDEAILS_BY_PART_CODE = `
query MyQuery($partCode:String!) {
  partCodeDetailByPartCode(partCode: $partCode) {
    he6T
    hhhd
    hhhg
    hhhu
    hm4N
    hm5V
    hm6C
    nodeId
    partCode
    partName
    vendorDetails
  }
}
`;

const deleteTable = `query deleteTable($tableName:String!) {
  trancuateTable(tableName: $tableName)
}`;

const ADD_DUST_MONTHLY_PLANNER = `
mutation add_dust_montly_planner($partCode:String!,$partName:String!,$status:Int!,$vendorDetails:JSON,$month:String!) {
  createDustMonthlyPlanner(input: {dustMonthlyPlanner: {partCode: $partCode, partName: $partName, status: $status, vendorDetails: $vendorDetails,month:$month}}) {
    clientMutationId
  }
}
`;
const ADD_OVEN_MONTHLY_PLANNER = `
mutation add_oven_montly_planner($partCode:String!,$partName:String!,$status:Int!,$vendorDetails:JSON,$month:String!) {
  createOvenMonthlyPlanner(input: {ovenMonthlyPlanner: {partCode: $partCode, partName: $partName, status: $status, vendorDetails: $vendorDetails,month:$month}}) {
    clientMutationId
  }
}
`;
const ADD_RO_MONTHLY_PLANNER = `
mutation add_ro_montly_planner($partCode:String!,$partName:String!,$status:Int!,$vendorDetails:JSON,$month:String!) {
  createRoMonthlyPlanner(input: {roMonthlyPlanner: {partCode: $partCode, partName: $partName, status: $status, vendorDetails: $vendorDetails,month:$month}}) {
    clientMutationId
  }
}
`;
const ADD_SHOWER_MONTHLY_PLANNER = `
mutation add_shower_montly_planner($partCode:String!,$partName:String!,$status:Int!,$vendorDetails:JSON,$month:String!) {
  createShowerMonthlyPlanner(input: {showerMonthlyPlanner: {partCode: $partCode, partName: $partName, status: $status, vendorDetails: $vendorDetails,month:$month}}) {
    clientMutationId
  }
}
`;
const ADD_THERMAL_CYCLE_MONTHLY_PLANNER = `
mutation add_thermal_cylce_montly_planner($partCode:String!,$partName:String!,$status:Int!,$vendorDetails:JSON,$month:String!) {
  createThermalCycleMonthlyPlanner(input: {thermalCycleMonthlyPlanner: {partCode: $partCode, partName: $partName, status: $status, vendorDetails: $vendorDetails,month:$month}}) {
    clientMutationId
  }
}
`;
const ADD_THERMAL_SHOCK_MONTHLY_PLANNER = `
mutation add_thermal_shock_montly_planner($partCode:String!,$partName:String!,$status:Int!,$vendorDetails:JSON,$month:String!) {
  createThermalShockMonthlyPlanner(input: {thermalShockMonthlyPlanner: {partCode: $partCode, partName: $partName, status: $status, vendorDetails: $vendorDetails,month:$month}}) {
    clientMutationId
  }
}
`;
const ADD_VIBRATION_MONTHLY_PLANNER = `
mutation add_vibration_shock_montly_planner($partCode:String!,$partName:String!,$status:Int!,$vendorDetails:JSON,$month:String!) {
  createVibrationMonthlyPlanner(input: {vibrationMonthlyPlanner: {partCode: $partCode, partName: $partName, status: $status, vendorDetails: $vendorDetails,month:$month}}) {
    clientMutationId
  }
}
`;

const DUST_MONTHLY_PLANNER_BY_DATE = `
subscription allDustMonthlyPlanners($month:String!) {
  allDustMonthlyPlanners(condition: {month: $month}) {
    nodes {
      month
      partCode
      partName
      status
      vendorDetails
    }
  }
}
`;
const OVEN_MONTHLY_PLANNER_BY_DATE = `
subscription allOvenMonthlyPlanners($month:String!) {
  allOvenMonthlyPlanners(condition: {month: $month}) {
    nodes {
      month
      partCode
      partName
      status
      vendorDetails
    }
  }
}
`;
const RO_MONTHLY_PLANNER_BY_DATE = `
subscription allRoMonthlyPlanners($month:String!) {
  allRoMonthlyPlanners(condition: {month: $month}) {
    nodes {
      month
      partCode
      partName
      status
      vendorDetails
    }
  }
}
`;

const SHOWER_MONTHLY_PLANNER_BY_DATE = `
subscription allShowerMonthlyPlanners($month:String!) {
  allShowerMonthlyPlanners(condition: {month: $month}) {
    nodes {
      month
      partCode
      partName
      status
      vendorDetails
    }
  }
}
`;

const THERMAL_CYCLE_MONTHLY_PLANNER_BY_DATE = `
subscription allThermalCycleMonthlyPlanners($month:String!) {
  allThermalCycleMonthlyPlanners(condition: {month: $month}) {
    nodes {
      month
      partCode
      partName
      status
      vendorDetails
    }
  }
}
`;

const THERMAL_SHOCK_MONTHLY_PLANNER_BY_DATE = `
subscription allThermalShockMonthlyPlanners($month:String!) {
  allThermalShockMonthlyPlanners(condition: {month: $month}) {
    nodes {
      month
      partCode
      partName
      status
      vendorDetails
    }
  }
}
`;

const VIBRATION_MONTHLY_PLANNER_BY_DATE = `
subscription allVibrationMonthlyPlanners($month:String!) {
  allVibrationMonthlyPlanners(condition: {month: $month}) {
    nodes {
      month
      partCode
      partName
      status
      vendorDetails
    }
  }
}
`;

const ADD_MONTHLY_UPLOAD_HISTORY = `
mutation MyMutation($partCode: String!, $description: String!, $status: String!, $empCode: String!) {
  createMonthlyUploadHistory(
    input: {monthlyUploadHistory: {partCode: $partCode, description: $description, status: $status, empCode: $empCode}}
  ) {
    monthlyUploadHistory {
      partCode
    }
  }
}
`;
const ALL_MONTHLY_HISTORY = `query allMonthlyUploadHistories {
  allMonthlyUploadHistories {
    nodes {
      date
      description
      empCode
      partCode
      status
    }
  }
}
`;
const ADD_YEARLY_HISTORY = `mutation MyMutation($empCode:String!,$fileName:String!) {
  createYearlyPlannerHistory(
    input: {yearlyPlannerHistory: {empcode: $empCode, fileName: $fileName}}
  ) {
    clientMutationId
  }
}
`;
const ALL_YEARLY_PLANNER_HISTORY = `
query yearlyPlannerHistory {
  allYearlyPlannerHistories {
    nodes {
      date
      empcode
      fileName
    }
  }
}
`;

const ADD_DUST_STATUS = `mutation updateDustTestDetailByPartName($status:Int,$partName:Int!) {
updateDustTestDetailByPartName(
  input: {dustTestDetailPatch: {status: $status}, partName: $partName}
) {
  clientMutationId
}
}`;
const ADD_THERMAL_CYCLE_STATUS = `mutation updateThermalCycleTestDetailByPartName($status:Int!,$partName:Int!) {
updateThermalCycleTestDetailByPartName(
  input: {thermalCycleTestDetailPatch: {status: $status}, partName: $partName}
) {
  clientMutationId
}
}`;
const ADD_THERMAL_SHOCK_STATUS = `mutation updateThermalShockChamberTestDetailByPartName($status:Int!,$partName:Int!) {
updateThermalShockChamberTestDetailByPartName(
  input: {thermalShockChamberTestDetailPatch: {status: $status}, partName: $partName}
) {
  clientMutationId
}
}`;
const ADD_VIBRATION_STATUS = `mutation updateVibrationTestDetailByPartName($status:Int!,$partName:Int!) {
updateVibrationTestDetailByPartName(
  input: {vibrationTestDetailPatch: {status: $status}, partName: $partName}
) {
  clientMutationId
}
}`;
const ADD_OVEN_STATUS = `mutation updateOvenTestDetailByPartName($status:Int!,$partName:Int!) 
{updateOvenTestDetailByPartName(
  input: {ovenTestDetailPatch: {status:$status}, partName: $partName}
){
  clientMutationId
}
}`;
const ADD_REPEATED_OPERATION_STATUS = `mutation updateRepeatedOperationTestDetailByPartName($status:Int!,$partName:Int!) {
updateRepeatedOperationTestDetailByPartName(
  input: {repeatedOperationTestDetailPatch: {status: $status}, partName: $partName}
) {
  clientMutationId
}
}`;
const ADD_SHOWER_STATUS = `mutation updateShowerTestDetailByPartName($status:Int!,$partName:Int!) {
updateShowerTestDetailByPartName(
  input: {showerTestDetailPatch: {status: $status}, partName: $partName}
) {
  clientMutationId
}
}`;
const ADD_EQUIPMENT_UPDATE_HISTORY = `mutation createEquipmentUpdateHistory($componentId: Int!, $employeeCode: String!, $testType: String!,$updateValues:JSON!) {
createEquipmentUpdateHistory(
  input: {equipmentUpdateHistory: {componentId: $componentId, employeeCode: $employeeCode, testType: $testType, updateValues: $updateValues}}
) {
  clientMutationId
}
}
`;
const EQUIPMENT_HISTORY = `
query allEquipmentUpdateHistories {
allEquipmentUpdateHistories {
  nodes {
    updateValues
    testType
    componentId
    date
    employeeCode
    componentDetailByComponentId {
      partName
    }
  }
}
}
`;
const ADD_NOTIFICATION = `
mutation MyMutation($empCode:String!,$message:String!,$notificationFrom:String!,$description:String!) {
  createNotification(input: {notification: {empCode: $empCode, message: $message, notificationFrom: $notificationFrom, description: $description}}
  ) {
    clientMutationId
  }
}
`;
const NOTIFICATION_MESSAGE_BY_DATE = `
query MyQuery($dateTime: Datetime!) {
  allNotifications(filter: {datetime: {greaterThan: $dateTime}}) {
    nodes {
      message
    }
  }
}
`;
const ALL_NOTIFICATIONS = `
query allNotifications {
  allNotifications {
    nodes {
      datetime
      description
      empCode
      notificationFrom
    }
  }
}
`;
const ALL_ALERTS = `
subscription allAlerts {
  allAlerts {
    nodes {
      machineStatus
      dateTime
      counter
      testingEquipmentByEquipmentName {
        equipmentName
      }
      timer
      alertStatus
      userName
      remarks
      id
      actionTaken
      equipmentName
    }
  }
}
`
const CREATE_PRE_TEST = `mutation createPreTestTable($componentId: Int!, $prCurrent: JSON!, $prFrequency: JSON!, $prDifferance: JSON!, $prInsulationRs: JSON!, $prSoundLvl: JSON!) {
  createPreTestTable(
    input: {preTestTable: {componentId: $componentId, prCurrent: $prCurrent, prFrequency: $prFrequency, prDifferance: $prDifferance, prInsulationRs: $prInsulationRs, prSoundLvl: $prSoundLvl}}
  ) {
    clientMutationId
  }
}`
const CREATE_POST_TEST = `mutation createPostTestTable($componentId:Int!,$ptCurrent:JSON!,$ptDifferance:JSON!,$ptFrequency:JSON!,$ptInsulationRs:JSON!,$ptSoundLvl:JSON!) {
  createPostTestTable(
    input: {postTestTable: {componentId: $componentId, ptCurrent: $ptCurrent, ptDifferance: $ptDifferance, ptFrequency: $ptFrequency, ptInsulationRs: $ptInsulationRs, ptSoundLvl: $ptSoundLvl}}
  ) {
    clientMutationId
  }
}`
const FATCH_POST_DATA = `subscription postTestTableByComponentId($componentId:Int!) {
  postTestTableByComponentId(componentId: $componentId) {
    ptCurrent
    ptDifferance
    ptFrequency
    ptInsulationRs
    ptSoundLvl
  }
}`
const FATCH_PRE_DATA = `subscription preTestTableByComponentId($componentId:Int!) {
  preTestTableByComponentId(componentId: $componentId) {
    prCurrent
    prFrequency
    prInsulationRs
    prSoundLvl
  }
  }`
const UPDATE_PRE_TEST = `mutation updatePreTestTableByComponentId($prCurrent: JSON!, $prFrequency: JSON!, $prInsulationRs: JSON!, $prSoundLvl: JSON!, $componentId: Int!) {
  updatePreTestTableByComponentId(
    input: {preTestTablePatch: {prCurrent: $prCurrent, prFrequency: $prFrequency, prInsulationRs: $prInsulationRs, prSoundLvl: $prSoundLvl}, componentId: $componentId}
  ) {
    clientMutationId
  }
}
`;
const GET_ALL_TIMERS = `query getAllTimers {
  getAllTimers
}`;

const ALL_COMPONENTS = `query MyQuery {
  allComponentDetails {
    nodes {
      partName
      id
    }
  }
}`;

const ALL_DUST_YEARLY_PLANNER_BY_ID = `
  allDustYearlyPlanners(filter: {componentId: {equalTo: $id}}) {
    nodes {
      id
      testDetails
      totalSamplesTested
      samples
      componentId
      componentDetailByComponentId {
        partName
      }
    }
}
`;
const ALL_OVEN_YEARLY_PLANNER_BY_ID = `
  allOvenYearlyPlanners(filter: {componentId: {equalTo: $id}}) {
      nodes {
        id
        testDetails
        totalSamplesTested
        samples
        componentId
        componentDetailByComponentId {
          partName
        } 
    }
  }
`;
const ALL_RO_YEARLY_PLANNER_BY_ID = `
  allRoYearlyPlanners(filter: {componentId: {equalTo: $id}}) {
      nodes {
        id
        testDetails
        totalSamplesTested
        samples
        componentId
        componentDetailByComponentId {
          partName
        }
      }
  }
`;
const ALL_SHOWER_YEARLY_PLANNER_BY_ID = `
  allShowerYearlyPlanners(filter: {componentId: {equalTo: $id}}) {
      nodes {
        id
        testDetails
        totalSamplesTested
        samples
        componentId
        componentDetailByComponentId {
          partName
        }
    }
}`;
const ALL_THERMAL_CYCLE_YEARLY_PLANNER_BY_ID = `
  allThermalCycleYearlyPlanners(filter: {componentId: {equalTo: $id}}) {
      nodes {
        id
        testDetails
        totalSamplesTested
        samples
        componentId
        componentDetailByComponentId {
          partName
        }
      }
}`;
const ALL_THERMAL_SHOCK_YEARLY_PLANNER_BY_ID = `
  allThermalShockYearlyPalnners(filter: {componentId: {equalTo: $id}}) {
      nodes {
        id
        testDetails
        totalSamplesTested
        samples
        componentId
        componentDetailByComponentId {
          partName
        }
      }
}`;
const ALL_VIBRATION_YEARLY_PLANNER_BY_ID = `
  allVibrationYearlyPlanners(filter: {componentId: {equalTo: $id}}) {
      nodes {
        id
        testDetails
        totalSamplesTested
        samples
        componentId
        componentDetailByComponentId {
          partName
        }
      }
}`;
const UPDATE_DUST_MONTHLY_PLANNER_BY_PART_CODE = `
mutation updateDustMonthlyPlannerByPartCode($partCode: String!, $month: String!) {
  updateDustMonthlyPlannerByPartCode(
    input: {dustMonthlyPlannerPatch: {month: $month}, partCode: $partCode}
  ) {
    dustMonthlyPlanner {
      month
    }
  }
}
`;
const UPDATE_OVEN_MONTHLY_PLANNER_BY_PART_CODE = `mutation updateOvenMonthlyPlannerByPartCode($partCode: String!, $month: String!) {
  updateOvenMonthlyPlannerByPartCode(
    input: {ovenMonthlyPlannerPatch: {month: $month}, partCode: $partCode}
  ) {
    ovenMonthlyPlanner {
      month
    }
  }
}
`;
const UPDATE_RO_MONTHLY_PLANNER_BY_PART_CODE = `mutation updateRoMonthlyPlannerByPartCode($partCode: String!, $month: String!) {
  updateRoMonthlyPlannerByPartCode(
    input: {roMonthlyPlannerPatch: {month: $month}, partCode: $partCode}
  ) {
    roMonthlyPlanner {
      month
    }
  }
}`;
const UPDATE_SHOWER_MONTHLY_PLANNER_BY_PART_CODE = `mutation updateShowerMonthlyPlannerByPartCode($partCode:String!,$month:String!) {
  updateShowerMonthlyPlannerByPartCode(
    input: {showerMonthlyPlannerPatch: {month: $month}, partCode: $partCode}
  ) {
    showerMonthlyPlanner {
      month
    }
  }
}
`;
const UPDATE_THERMAL_CYCLE_MONTHLY_PLANNER_BY_PART_CODE = `mutation updateThermalCycleMonthlyPlannerByPartCode($partCode:String!,$month:String!) {
  updateThermalCycleMonthlyPlannerByPartCode(
    input: {thermalCycleMonthlyPlannerPatch: {month: $month}, partCode: $partCode}
  ) {
    thermalCycleMonthlyPlanner {
      month
    }
  }
}
`;
const UPDATE_THERMAL_SHOCK_MONTHLY_PLANNER_BY_PART_CODE = `mutation updateThermalShockMonthlyPlannerByPartCode($partCode:String!,$month:String!) {
  updateThermalShockMonthlyPlannerByPartCode(
    input: {thermalShockMonthlyPlannerPatch: {month: $month}, partCode: $partCode}
  ) {
    thermalShockMonthlyPlanner {
      month
    }
  }
}
`;
const UPDATE_VIBRATION_MONTHLY_PLANNER_BY_PART_CODE = `mutation updateVibrationMonthlyPlannerByPartCode($partCode:String!,$month:String!) {
  updateVibrationMonthlyPlannerByPartCode(
    input: {vibrationMonthlyPlannerPatch: {month: $month}, partCode: $partCode}
  ) {
    vibrationMonthlyPlanner {
      month
    }
  }
}
`;
const UPDATE_UNPLANNED_LIST = `mutation MyMutation($details:String!) {
  updateUnplannedList(details: $details)
}
`;

const UPDATE_POST_TEST = `mutation updatePostTestTableByComponentId($ptCurrent:JSON!, $ptDifferance: JSON!, $ptFrequency:JSON!, $ptInsulationRs: JSON!, $ptSoundLvl:JSON!,$componentId:Int!) {
  updatePostTestTableByComponentId(
    input: {postTestTablePatch: {ptCurrent: $ptCurrent, ptDifferance: $ptDifferance, ptFrequency: $ptFrequency, ptInsulationRs: $ptInsulationRs, ptSoundLvl: $ptSoundLvl}, componentId:$componentId}
  ) {
    clientMutationId
  }
}
`
const ALL_COMPONENT = `query allPreResultTables {
  allPreResultTables {
    nodes {
      partCode
      partName
    }
  }
}`
const CREATE_PRE_RESULT = `mutation createPreResultTable($partCode:String!,$n1:JSON!,$n2:JSON!,$n3:JSON!,$n4:JSON!,$partName:String!) {
  createPreResultTable(
    input: {preResultTable: {partCode:$partCode, n4:$n4, n3:$n3, n2:$n2, n1: $n1, partName:$partName}}
  ) {
    clientMutationId
  }
}`
const UPDATE_PRE_RESULT = `mutation updatePreResultTableByPartCode($current: JSON!, $frequency: JSON!, $insulationRs: JSON!, $soundLvl: JSON!,$partCode:String!) {
  updatePreResultTableByPartCode(
    input: {preResultTablePatch: {current: $current, frequency: $frequency, insulationRs: $insulationRs, soundLvl: $soundLvl}, partCode: $partCode}
  ) {
    clientMutationId
  }
}`
const CREATE_POST_RESULT = `mutation createPostResultTable($partCode:String!,$n1:JSON!,$n2:JSON!,$n3:JSON!,$n4:JSON!,$partName:String!) {
  createPostResultTable(
    input: {postResultTable: {partCode:$partCode, n4:$n4, n3:$n3, n2:$n2, n1: $n1, partName:$partName}}
  ) {
    clientMutationId
  }
}`
const UPDATE_POST_RESULT = `mutation updatePostResultTableByPartCode($ptCurrent: JSON!, $ptFrequency: JSON!, $ptInsulationRs: JSON!, $ptSoundLvl: JSON!, $partCode: String!) {
  updatePostResultTableByPartCode(
    input: {postResultTablePatch: {ptCurrent: $ptCurrent, ptFrequency: $ptFrequency, ptInsulationRs: $ptInsulationRs, ptSoundLvl: $ptSoundLvl}, partCode: $partCode}
  ) {
    clientMutationId
  }
}`
const PRE_RESULT_SAMPLE = `mutation createPreResultTable($partCode:String!, $partName:String!) {
  createPreResultTable(input: {preResultTable: {partCode: $partCode partName: $partName}}) {
    clientMutationId
  }
}`
const POST_RESULT_SAMPLE=`mutation createPostResultTable($partCode: String!, $partName: String!) {
  createPostResultTable(input: {postResultTable: {partCode: $partCode, partName: $partName}}
  ) {
    clientMutationId
  }
}`
  ;
const START_TIMER = `mutation startTimer($id:Int!) {
startTimer(id: $id)
  }
  `;

const STOP_TIMER = `mutation stopTimer($id:String!){
 stopTimer(id:$id)
  }`;

const UPDATE_ALERT_BY_ID = `mutation updateAlertById($alertStatus: Int!, $machineStatus: Int!, $remarks: String!, $userName: String!, $id: Int!, $actionTaken: String!) {
updateAlertById(
  input: {alertPatch: {alertStatus: $alertStatus, machineStatus: $machineStatus, remarks: $remarks, userName: $userName, actionTaken: $actionTaken}, id: $id}
) {
clientMutationId
}
}
`;
const FATCH_PRE_RESULT=`subscription preResultTableByPartCode($partCode: String!) {
  preResultTableByPartCode(partCode: $partCode) {
    current
    frequency
    insulationRs
    soundLvl
  }
}`
const FATCH_POST_RESULT=`subscription postResultTableByPartCode($partCode:String!) {
  postResultTableByPartCode(partCode: $partCode) {
    ptCurrent
    ptFrequency
    ptInsulationRs
    ptSoundLvl
  }
}`
const PRE_TABLE_DATA=`query allPreResultTables {
  allPreResultTables {
    nodes {
      current
      frequency
      insulationRs
      nodeId
      partCode
      partName
      soundLvl
    }
  }
}`
const UPDATE_DIFF_DATA=`mutation updatePostResultTableByPartCode($diffFrequency: JSON!, $diffSound: JSON!,$partCode:String!) {
  updatePostResultTableByPartCode(
    input: {postResultTablePatch: {diffFrequency: $diffFrequency, diffSound: $diffSound}, partCode: $partCode}
  ) {
    clientMutationId
  }
}
`
const FATCH_DIFF_RESULTS=`subscription postResultTableByPartCode($partCode:String!) {
  postResultTableByPartCode(partCode: $partCode) {
    diffFrequency
    diffSound
  }
}`
const FATCH_DIFFERENCE=`query MyQuery {
  allPostResultTables {
    nodes {
      diffFrequency
      diffSound
      partCode
    }
  }
}`

export {
  AUTH,
  ADD_USER,
  GET_ALL_USER,
  UPDATE_USER,
  DELETE_USER,
  SUB,
  CREATE_VENDORS,
  REPEATED_OPS_DETAILS,
  CREATE_RO_YEARLY_PLANNER,
  RO_YEARLY_PLANNER,
  THERMAL_SHOCK_YEARLY_PLANNER,
  SHOWER_YEARLY_PLANNER,
  MAKE_YEARLY_PLANNER,
  DUST_YEARLY_PLANNER,
  VIBRATION_YEARLY_PLANNER,
  OVEN_YEARLY_PLANNER,
  THERMAL_CYCLE_YEARLY_PLANNER,
  EQUIPMENT_DETAILS,
  DUST_TEST_DETAILS,
  SAVE_DUST_DETAILS,
  OVEN_TEST_DETAILS,
  SAVE_OVEN_DETAILS,
  REPEATED_OPERATION_TEST_DETAILS,
  SAVE_REPEATED_OPERATION_DETAILS,
  SHOWER_TEST_DETAILS,
  SAVE_SHOWER_DETAILS,
  THERMAL_CYCLE_TEST_DETAILS,
  SAVE_THERMAL_CYCLE_DETAILS,
  THERMAL_SHOCK_TEST_DETAILS,
  SAVE_THERMAL_SHOCK_DETAILS,
  VIBRATION_TEST_DETAILS,
  SAVE_VIBRATION_DETAILS,
  PART_CODE_DETAILS,
  deleteTable,
  PARTDEAILS_BY_PART_CODE,
  ADD_DUST_MONTHLY_PLANNER,
  ADD_OVEN_MONTHLY_PLANNER,
  ADD_RO_MONTHLY_PLANNER,
  ADD_SHOWER_MONTHLY_PLANNER,
  ADD_THERMAL_CYCLE_MONTHLY_PLANNER,
  ADD_THERMAL_SHOCK_MONTHLY_PLANNER,
  ADD_VIBRATION_MONTHLY_PLANNER,
  DUST_MONTHLY_PLANNER_BY_DATE,
  OVEN_MONTHLY_PLANNER_BY_DATE,
  RO_MONTHLY_PLANNER_BY_DATE,
  SHOWER_MONTHLY_PLANNER_BY_DATE,
  THERMAL_CYCLE_MONTHLY_PLANNER_BY_DATE,
  THERMAL_SHOCK_MONTHLY_PLANNER_BY_DATE,
  VIBRATION_MONTHLY_PLANNER_BY_DATE,
  ADD_MONTHLY_UPLOAD_HISTORY,
  ALL_MONTHLY_HISTORY,
  ADD_YEARLY_HISTORY,
  ALL_YEARLY_PLANNER_HISTORY,
  EQUIPMENT_HISTORY,
  ADD_EQUIPMENT_UPDATE_HISTORY,
  ADD_SHOWER_STATUS,
  ADD_REPEATED_OPERATION_STATUS,
  ADD_OVEN_STATUS,
  ADD_VIBRATION_STATUS,
  ADD_THERMAL_SHOCK_STATUS,
  ADD_THERMAL_CYCLE_STATUS,
  ADD_DUST_STATUS,
  ADD_NOTIFICATION,
  NOTIFICATION_MESSAGE_BY_DATE,
  ALL_NOTIFICATIONS,
  ALL_ALERTS,
  START_TIMER,
  UPDATE_ALERT_BY_ID,
  STOP_TIMER,
  GET_ALL_TIMERS,
  ALL_COMPONENTS,
  ALL_DUST_YEARLY_PLANNER_BY_ID,
  ALL_OVEN_YEARLY_PLANNER_BY_ID,
  ALL_RO_YEARLY_PLANNER_BY_ID,
  ALL_SHOWER_YEARLY_PLANNER_BY_ID,
  ALL_THERMAL_CYCLE_YEARLY_PLANNER_BY_ID,
  ALL_THERMAL_SHOCK_YEARLY_PLANNER_BY_ID,
  ALL_VIBRATION_YEARLY_PLANNER_BY_ID,
  UPDATE_DUST_MONTHLY_PLANNER_BY_PART_CODE,
  UPDATE_OVEN_MONTHLY_PLANNER_BY_PART_CODE,
  UPDATE_RO_MONTHLY_PLANNER_BY_PART_CODE,
  UPDATE_SHOWER_MONTHLY_PLANNER_BY_PART_CODE,
  UPDATE_THERMAL_CYCLE_MONTHLY_PLANNER_BY_PART_CODE,
  UPDATE_THERMAL_SHOCK_MONTHLY_PLANNER_BY_PART_CODE,
  UPDATE_VIBRATION_MONTHLY_PLANNER_BY_PART_CODE,
  UPDATE_UNPLANNED_LIST,
  CREATE_PRE_TEST,
  CREATE_POST_TEST,
  FATCH_PRE_DATA,
  FATCH_POST_DATA,
  UPDATE_PRE_TEST,
  UPDATE_POST_TEST,
  ALL_COMPONENT,
  CREATE_PRE_RESULT,
  CREATE_POST_RESULT,
  UPDATE_PRE_RESULT,
  UPDATE_POST_RESULT,
  PRE_RESULT_SAMPLE,
  POST_RESULT_SAMPLE,
  FATCH_PRE_RESULT,
  FATCH_POST_RESULT,
  PRE_TABLE_DATA,
  UPDATE_DIFF_DATA,
  FATCH_DIFF_RESULTS,
  FATCH_DIFFERENCE,
};
