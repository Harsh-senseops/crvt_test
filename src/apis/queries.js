const AUTH = `query Authenticate($name:String!,$password:String!) {
  authenticate(name: $name, password: $password)
}`;

const ADD_USER = `mutation addUser($eCode:String!,$name:String!,$pass:String!,$role:Int!) {
createCrvtEmployeeDetail(
  input: {crvtEmployeeDetail: {employeeCode: $eCode, name: $name, password: $pass, role: $role}}
) {
  crvtEmployeeDetail {
    employeeCode
  }
}
}
`;

const GET_ALL_USER = `query MyQuery {
allCrvtEmployeeDetails {
  nodes {
    employeeCode
    name
    password
    role
  }
}
}`;

const UPDATE_USER = `mutation updateCrvtEmployeeDetailByEmployeeCode($name: String!, $empCode: String!, $role: Int!, $password: String!) {
updateCrvtEmployeeDetailByEmployeeCode(
  input: {crvtEmployeeDetailPatch: {name: $name, employeeCode: $empCode, password: $password, role: $role}, employeeCode: $empCode}
) {
  clientMutationId
}
}
`;
const DELETE_USER = `mutation deleteEmployeeDetailByEmployeeCode($empCode:String!) {
deleteCrvtEmployeeDetailByEmployeeCode(input: {employeeCode: $empCode}) {
  deletedCrvtEmployeeDetailId
}
}
`;

const SUB = `subscription allEmployeeDetails {
allCrvtEmployeeDetails {
  nodes {
    employeeCode
    name
    password
    role
  }
}
}`;

const CREATE_VENDORS = `mutation AddVendors($vendorCode: String!, $vendorName: String!) {
createCrvtVendor(
  input: {vendor: {vendorCode: $vendorCode, vendorName: $vendorName}}
) {
  clientMutationId
  crvtVendor {
    vendorCode
    vendorName
  }
}
}`;

const REPEATED_OPS_DETAILS = `query equipment_running_days {
allCrvtEquipmentRunningDetails {
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
const CREATE_RO_YEARLY_PLANNER = `mutation createRoPlanner($componentName: String!, $samples: Int, $testDetails: JSON, $totalSamplesTested: Int) {
createCrvtRoYearlyPlanner(
  input: {crvtRoYearlyPlanner: {componentName: $componentName, samples: $samples, testDetails: $testDetails, totalSamplesTested: $totalSamplesTested}}
) {
  clientMutationId
}
}
`;
const MAKE_YEARLY_PLANNER = `mutation MyMutation {
  makeYearlyPlanner
}
`;

const RO_YEARLY_PLANNER = `query roYearlyPlanner {
allCrvtRoYearlyPlanners {
  nodes {
    crvtComponentDetailByComponentId {
      partName
      crvtEquipmentRunningDetailByPartId{
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
allCrvtThermalShockYearlyPalnners {
  nodes {
    crvtComponentDetailByComponentId {
      partName
      crvtEquipmentRunningDetailByPartId {
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
allCrvtShowerYearlyPlanners {
  nodes {
    crvtComponentDetailByComponentId {
      partName
      crvtEquipmentRunningDetailByPartId{
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
allCrvtDustYearlyPlanners {
  nodes {
    crvtComponentDetailByComponentId {
      partName
      crvtEquipmentRunningDetailByPartId{
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
allCrvtVibrationYearlyPlanners {
  nodes {
    crvtComponentDetailByComponentId {
      partName
      crvtEquipmentRunningDetailByPartId{
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
allCrvtOvenYearlyPlanners {
  nodes {
    crvtComponentDetailByComponentId {
      partName
      crvtEquipmentRunningDetailByPartId{
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
allCrvtThermalCycleYearlyPlanners {
  nodes {
    crvtComponentDetailByComponentId {
      partName
      crvtEquipmentRunningDetailByPartId{
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

const EQUIPMENT_DETAILS = `query equipments_details {
allCrvtComponentDetails {
  nodes {
    partName
    crvtDustTestDetailsByPartName {
      nodes {
        status
        testDetails
        partName
      }
    }
    crvtOvenTestDetailsByPartName {
      nodes {
        status
        testDetails
        partName
      }
    }
    crvtRepeatedOperationTestDetailsByPartName {
      nodes {
        status
        testDetails
        partName
      }
    }
    crvtThermalCycleTestDetailsByPartName {
      nodes {
        status
        testDetails
        partName
      }
    }
    crvtThermalShockChamberTestDetailsByPartName {
      nodes {
        status
        testDetails
        partName
      }
    }
    crvtVibrationTestDetailsByPartName {
      nodes {
        status
        testDetails
        partName
      }
    }
    crvtShowerTestDetailsByPartName {
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
crvtDustTestDetailByPartName(partName: $partName) {
  testDetails
  status
}
}`;

const SAVE_DUST_DETAILS = `mutation MyMutation($partName: Int!,$testDetails:JSON!) {
updateCrvtDustTestDetailByPartName(
  input: {crvtDustTestDetailPatch: {testDetails: $testDetails}, partName: $partName}
) {
  clientMutationId
}
}
`;
const OVEN_TEST_DETAILS = `subscription ovenTestDetailByPartName($partName:Int!) {
crvtOvenTestDetailByPartName(partName:$partName) {
  testDetails
}
}`;

const SAVE_OVEN_DETAILS = `mutation updateOvenTestDetailByPartName($partName: Int!, $testDetails: JSON!) {
updateCrvtOvenTestDetailByPartName(
  input: {crvtOvenTestDetailPatch: {testDetails: $testDetails}, partName: $partName}
) {
  clientMutationId
}
}
`;
const REPEATED_OPERATION_TEST_DETAILS = `subscription repeatedOperationTestDetailByPartName($partName:Int!) {
crvtRepeatedOperationTestDetailByPartName(partName: $partName) {
  testDetails
}
}
`;
const SAVE_REPEATED_OPERATION_DETAILS = `mutation updateRepeatedOperationTestDetailByPartName($testDetails:JSON!,$partName:Int!) {updateCrvtRepeatedOperationTestDetailByPartName(
input: {crvtRepeatedOperationTestDetailPatch: {testDetails: $testDetails}, partName: $partName}
) {
clientMutationId
}
}`;
const SHOWER_TEST_DETAILS = `subscription showerTestDetailByPartName($partName:Int!) {
crvtShowerTestDetailByPartName(partName: $partName) {
  testDetails
}
}`;

const SAVE_SHOWER_DETAILS = `mutation updateShowerTestDetailByPartName($testDetails:JSON!,$partName:Int!) {
updateCrvtShowerTestDetailByPartName(
  input: {crvtShowerTestDetailPatch: {testDetails: $testDetails}, partName: $partName}
) {
  clientMutationId
}
}`;

const THERMAL_CYCLE_TEST_DETAILS = `subscription thermalCycleTestDetailByPartName($partName:Int!) {
crvtThermalCycleTestDetailByPartName(partName: $partName) {
  testDetails
}
}`;
const SAVE_THERMAL_CYCLE_DETAILS = `mutation updateThermalCycleTestDetailByPartName($testDetails:JSON!,$partName:Int!) {updateCrvtThermalCycleTestDetailByPartName(
input: {crvtThermalCycleTestDetailPatch: {testDetails: $testDetails}, partName: $partName}
) {
clientMutationId
}
}`;
const THERMAL_SHOCK_TEST_DETAILS = `subscription thermalShockChamberTestDetailByPartName($partName:Int!) {
crvtThermalShockChamberTestDetailByPartName(partName: $partName) {
  testDetails
}
}`;

const SAVE_THERMAL_SHOCK_DETAILS = `mutation updateThermalShockChamberTestDetailByPartName($testDetails:JSON!,$partName:Int!) {
updateCrvtThermalShockChamberTestDetailByPartName(
  input: {crvtThermalShockChamberTestDetailPatch: {testDetails:$testDetails}, partName: $partName}
) {
  clientMutationId
}
}`;
const VIBRATION_TEST_DETAILS = `subscription vibrationTestDetailByPartName($partname:Int!){
crvtVibrationTestDetailByPartName(partName: $partname) {
  testDetails
}
}`;

const SAVE_VIBRATION_DETAILS = `mutation updateVibrationTestDetailByPartName($testDetails:JSON!,$partName:Int!) {
updateCrvtVibrationTestDetailByPartName(
  input: {crvtVibrationTestDetailPatch: {testDetails: $testDetails}, partName: $partName}
) {
  clientMutationId
}
}`;

const PART_CODE_DETAILS = `
mutation createPartCodeDetails($he6t: Int!, $hhhd: Int!, $hhhg: Int!, $hhhu: Int!, $hm4n: Int!, $hm5v: Int!, $hm6c: Int!, $partCode: String!, $partName: String!, $vendorDetails: JSON,$count:Int!) {
createCrvtPartCodeDetail(
  input: {crvtPartCodeDetail: {he6T: $he6t, hhhd: $hhhd, hhhg: $hhhg, hhhu: $hhhu, hm4N: $hm4n, hm5V: $hm5v, hm6C: $hm6c, partCode: $partCode, partName: $partName, vendorDetails: $vendorDetails, count: $count}}
) {
  clientMutationId
}
}

`;
const PARTDEAILS_BY_PART_CODE = `
query MyQuery($partCode:String!) {
crvtPartCodeDetailByPartCode(partCode: $partCode) {
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
createCrvtDustMonthlyPlanner(input: {crvtDustMonthlyPlanner: {partCode: $partCode, partName: $partName, status: $status, vendorDetails: $vendorDetails,month:$month}}) {
  clientMutationId
}
}
`;
const ADD_OVEN_MONTHLY_PLANNER = `
mutation add_oven_montly_planner($partCode:String!,$partName:String!,$status:Int!,$vendorDetails:JSON,$month:String!) {
createCrvtOvenMonthlyPlanner(input: {crvtOvenMonthlyPlanner: {partCode: $partCode, partName: $partName, status: $status, vendorDetails: $vendorDetails,month:$month}}) {
  clientMutationId
}
}
`;
const ADD_RO_MONTHLY_PLANNER = `
mutation add_ro_montly_planner($partCode:String!,$partName:String!,$status:Int!,$vendorDetails:JSON,$month:String!) {
createCrvtRoMonthlyPlanner(input: {crvtRoMonthlyPlanner: {partCode: $partCode, partName: $partName, status: $status, vendorDetails: $vendorDetails,month:$month}}) {
  clientMutationId
}
}
`;
const ADD_SHOWER_MONTHLY_PLANNER = `
mutation add_shower_montly_planner($partCode:String!,$partName:String!,$status:Int!,$vendorDetails:JSON,$month:String!) {
createCrvtShowerMonthlyPlanner(input: {crvtShowerMonthlyPlanner: {partCode: $partCode, partName: $partName, status: $status, vendorDetails: $vendorDetails,month:$month}}) {
  clientMutationId
}
}
`;
const ADD_THERMAL_CYCLE_MONTHLY_PLANNER = `
mutation add_thermal_cylce_montly_planner($partCode:String!,$partName:String!,$status:Int!,$vendorDetails:JSON,$month:String!) {
createCrvtThermalCycleMonthlyPlanner(input: {crvtThermalCycleMonthlyPlanner: {partCode: $partCode, partName: $partName, status: $status, vendorDetails: $vendorDetails,month:$month}}) {
  clientMutationId
}
}
`;
const ADD_THERMAL_SHOCK_MONTHLY_PLANNER = `
mutation add_thermal_shock_montly_planner($partCode:String!,$partName:String!,$status:Int!,$vendorDetails:JSON,$month:String!) {
createCrvtThermalShockMonthlyPlanner(input: {crvtThermalShockMonthlyPlanner: {partCode: $partCode, partName: $partName, status: $status, vendorDetails: $vendorDetails,month:$month}}) {
  clientMutationId
}
}
`;
const ADD_VIBRATION_MONTHLY_PLANNER = `
mutation add_vibration_shock_montly_planner($partCode:String!,$partName:String!,$status:Int!,$vendorDetails:JSON,$month:String!) {
createCrvtVibrationMonthlyPlanner(input: {crvtVibrationMonthlyPlanner: {partCode: $partCode, partName: $partName, status: $status, vendorDetails: $vendorDetails,month:$month}}) {
  clientMutationId
}
}
`;

const DUST_MONTHLY_PLANNER_BY_DATE = `
subscription allDustMonthlyPlanners($month:String!) {
allCrvtDustMonthlyPlanners(condition: {month: $month}) {
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
allCrvtOvenMonthlyPlanners(condition: {month: $month}) {
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
allCrvtRoMonthlyPlanners(condition: {month: $month}) {
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
allCrvtShowerMonthlyPlanners(condition: {month: $month}) {
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
allCrvtThermalCycleMonthlyPlanners(condition: {month: $month}) {
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
allCrvtThermalShockMonthlyPlanners(condition: {month: $month}) {
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
allCrvtVibrationMonthlyPlanners(condition: {month: $month}) {
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
createCrvtMonthlyUploadHistory(
  input: {crvtMonthlyUploadHistory: {partCode: $partCode, description: $description, status: $status, empCode: $empCode}}
) {
  crvtMonthlyUploadHistory {
    partCode
  }
}
}
`;
const ALL_MONTHLY_HISTORY = `query allMonthlyUploadHistories {
allCrvtMonthlyUploadHistories {
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
createCrvtYearlyPlannerHistory(
  input: {crvtYearlyPlannerHistory: {empcode: $empCode, fileName: $fileName}}
) {
  clientMutationId
}
}
`;
const ALL_YEARLY_PLANNER_HISTORY = `
query yearlyPlannerHistory {
allCrvtYearlyPlannerHistories {
  nodes {
    date
    empcode
    fileName
  }
}
}
`;

const ADD_DUST_STATUS = `mutation updateDustTestDetailByPartName($status:Int,$partName:Int!) {
updateCrvtDustTestDetailByPartName(
  input: {crvtDustTestDetailPatch: {status: $status}, partName: $partName}
) {
  clientMutationId
}
}`;
const ADD_THERMAL_CYCLE_STATUS = `mutation updateThermalCycleTestDetailByPartName($status:Int!,$partName:Int!) {
updateCrvtThermalCycleTestDetailByPartName(
  input: {crvtThermalCycleTestDetailPatch: {status: $status}, partName: $partName}
) {
  clientMutationId
}
}`;
const ADD_THERMAL_SHOCK_STATUS = `mutation updateThermalShockChamberTestDetailByPartName($status:Int!,$partName:Int!) {
updateCrvtThermalShockChamberTestDetailByPartName(
input: {crvtThermalShockChamberTestDetailPatch: {status: $status}, partName: $partName}
) {
clientMutationId
}
}`;
const ADD_VIBRATION_STATUS = `mutation updateVibrationTestDetailByPartName($status:Int!,$partName:Int!) {
updateCrvtVibrationTestDetailByPartName(
  input: {crvtVibrationTestDetailPatch: {status: $status}, partName: $partName}
) {
  clientMutationId
}
}`;
const ADD_OVEN_STATUS = `mutation updateOvenTestDetailByPartName($status:Int!,$partName:Int!) 
{updateCrvtOvenTestDetailByPartName(
input: {crvtOvenTestDetailPatch: {status:$status}, partName: $partName}
){
clientMutationId
}
}`;
const ADD_REPEATED_OPERATION_STATUS = `mutation updateRepeatedOperationTestDetailByPartName($status:Int!,$partName:Int!) {
updateCrvtRepeatedOperationTestDetailByPartName(
  input: {crvtRepeatedOperationTestDetailPatch: {status: $status}, partName: $partName}
) {
  clientMutationId
}
}`;
const ADD_SHOWER_STATUS = `mutation updateShowerTestDetailByPartName($status:Int!,$partName:Int!) {
updateCrvtShowerTestDetailByPartName(
  input: {crvtShowerTestDetailPatch: {status: $status}, partName: $partName}
) {
  clientMutationId
}
}`;
const ADD_EQUIPMENT_UPDATE_HISTORY = `mutation createEquipmentUpdateHistory($componentId: Int!, $employeeCode: String!, $testType: String!,$updateValues:JSON!) {
createCrvtEquipmentUpdateHistory(
  input: {crvtEquipmentUpdateHistory: {componentId: $componentId, employeeCode: $employeeCode, testType: $testType, updateValues: $updateValues}}
) {
  clientMutationId
}
}
`;
const EQUIPMENT_HISTORY = `
query allEquipmentUpdateHistories {
allCrvtEquipmentUpdateHistories {
  nodes {
    updateValues
    testType
    componentId
    date
    employeeCode
    crvtComponentDetailByComponentId {
      partName
    }
  }
}
}
`;
const ADD_NOTIFICATION = `
mutation MyMutation($empCode:String!,$message:String!,$notificationFrom:String!,$description:String!) {
createCrvtNotification(input: {crvtNotification: {empCode: $empCode, message: $message, notificationFrom: $notificationFrom, description: $description}}
) {
  clientMutationId
}
}
`;
const NOTIFICATION_MESSAGE_BY_DATE = `
subscription MyQuery($dateTime: Datetime!) {
allCrvtNotifications(filter: {datetime: {greaterThan: $dateTime}}) {
  nodes {
    message
  }
}
}
`;
const ALL_NOTIFICATIONS = `
query allNotifications {
allCrvtNotifications {
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
allCrvtAlerts {
  nodes {
    machineStatus
    dateTime
    counter
    crvtTestingEquipmentByEquipmentName {
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
`;
const CREATE_PRE_TEST = `mutation createPreTestTable($componentId: Int!, $prCurrent: JSON!, $prFrequency: JSON!, $prDifferance: JSON!, $prInsulationRs: JSON!, $prSoundLvl: JSON!) {
createPreTestTable(
  input: {preTestTable: {componentId: $componentId, prCurrent: $prCurrent, prFrequency: $prFrequency, prDifferance: $prDifferance, prInsulationRs: $prInsulationRs, prSoundLvl: $prSoundLvl}}
) {
  clientMutationId
}
}`;
const CREATE_POST_TEST = `mutation createPostTestTable($componentId:Int!,$ptCurrent:JSON!,$ptDifferance:JSON!,$ptFrequency:JSON!,$ptInsulationRs:JSON!,$ptSoundLvl:JSON!) {
createCrvtPostTestTable(
  input: {crvtPostTestTable: {componentId: $componentId, ptCurrent: $ptCurrent, ptDifferance: $ptDifferance, ptFrequency: $ptFrequency, ptInsulationRs: $ptInsulationRs, ptSoundLvl: $ptSoundLvl}}
) {
  clientMutationId
}
}`;
const FATCH_POST_DATA = `subscription postTestTableByComponentId($componentId:Int!) {
crvtPostTestTableByComponentId(componentId: $componentId) {
  ptCurrent
  ptDifferance
  ptFrequency
  ptInsulationRs
  ptSoundLvl
}
}`;
const FATCH_PRE_DATA = `subscription preTestTableByComponentId($componentId:Int!) {
crvtPreTestTableByComponentId(componentId: $componentId) {
  prCurrent
  prFrequency
  prInsulationRs
  prSoundLvl
}
}`;
const UPDATE_PRE_TEST = `mutation updatePreTestTableByComponentId($prCurrent: JSON!, $prFrequency: JSON!, $prInsulationRs: JSON!, $prSoundLvl: JSON!, $componentId: Int!) {
updateCrvtPreTestTableByComponentId(
  input: {crvtPreTestTablePatch: {prCurrent: $prCurrent, prFrequency: $prFrequency, prInsulationRs: $prInsulationRs, prSoundLvl: $prSoundLvl}, componentId: $componentId}
) {
  clientMutationId
}
}
`;
const GET_ALL_TIMERS = `query getAllTimers {
getAllTimers
}`;

const ALL_COMPONENTS = `query MyQuery {
allCrvtComponentDetails {
  nodes {
    partName
    id
  }
}
}`;

const ALL_DUST_YEARLY_PLANNER_BY_ID = `
allCrvtDustYearlyPlanners(filter: {componentId: {equalTo: $id}}) {
  nodes {
    id
    testDetails
    totalSamplesTested
    samples
    componentId
    crvtComponentDetailByComponentId {
      partName
    }
  }
}
`;
const ALL_OVEN_YEARLY_PLANNER_BY_ID = `
allCrvtOvenYearlyPlanners(filter: {componentId: {equalTo: $id}}) {
    nodes {
      id
      testDetails
      totalSamplesTested
      samples
      componentId
      crvtComponentDetailByComponentId {
        partName
      } 
  }
}
`;
const ALL_RO_YEARLY_PLANNER_BY_ID = `
allCrvtRoYearlyPlanners(filter: {componentId: {equalTo: $id}}) {
    nodes {
      id
      testDetails
      totalSamplesTested
      samples
      componentId
      crvtComponentDetailByComponentId {
        partName
      }
    }
}
`;
const ALL_SHOWER_YEARLY_PLANNER_BY_ID = `
allCrvtShowerYearlyPlanners(filter: {componentId: {equalTo: $id}}) {
    nodes {
      id
      testDetails
      totalSamplesTested
      samples
      componentId
      crvtComponentDetailByComponentId {
        partName
      }
  }
}`;
const ALL_THERMAL_CYCLE_YEARLY_PLANNER_BY_ID = `
allCrvtThermalCycleYearlyPlanners(filter: {componentId: {equalTo: $id}}) {
    nodes {
      id
      testDetails
      totalSamplesTested
      samples
      componentId
      crvtComponentDetailByComponentId {
        partName
      }
    }
}`;
const ALL_THERMAL_SHOCK_YEARLY_PLANNER_BY_ID = `
allCrvtThermalShockYearlyPalnners(filter: {componentId: {equalTo: $id}}) {
    nodes {
      id
      testDetails
      totalSamplesTested
      samples
      componentId
      crvtComponentDetailByComponentId {
        partName
      }
    }
}`;
const ALL_VIBRATION_YEARLY_PLANNER_BY_ID = `
allCrvtVibrationYearlyPlanners(filter: {componentId: {equalTo: $id}}) {
    nodes {
      id
      testDetails
      totalSamplesTested
      samples
      componentId
      crvtComponentDetailByComponentId {
        partName
      }
    }
}`;
const UPDATE_DUST_MONTHLY_PLANNER_BY_PART_CODE = `
mutation updateDustMonthlyPlannerByPartCode($partCode: String!, $month: String!) {
updateCrvtDustMonthlyPlannerByPartCode(
  input: {crvtDustMonthlyPlannerPatch: {month: $month}, partCode: $partCode}
) {
  crvtDustMonthlyPlanner {
    month
  }
}
}
`;
const UPDATE_OVEN_MONTHLY_PLANNER_BY_PART_CODE = `mutation updateOvenMonthlyPlannerByPartCode($partCode: String!, $month: String!) {
updateCrvtOvenMonthlyPlannerByPartCode(
  input: {crvtOvenMonthlyPlannerPatch: {month: $month}, partCode: $partCode}
) {
  crvtOvenMonthlyPlanner {
    month
  }
}
}
`;
const UPDATE_RO_MONTHLY_PLANNER_BY_PART_CODE = `mutation updateRoMonthlyPlannerByPartCode($partCode: String!, $month: String!) {
updateCrvtRoMonthlyPlannerByPartCode(
  input: {crvtRoMonthlyPlannerPatch: {month: $month}, partCode: $partCode}
) {
  crvtRoMonthlyPlanner {
    month
  }
}
}`;
const UPDATE_SHOWER_MONTHLY_PLANNER_BY_PART_CODE = `mutation updateShowerMonthlyPlannerByPartCode($partCode:String!,$month:String!) {
updateCrvtShowerMonthlyPlannerByPartCode(
  input: {crvtShowerMonthlyPlannerPatch: {month: $month}, partCode: $partCode}
) {
  crvtShowerMonthlyPlanner {
    month
  }
}
}
`;
const UPDATE_THERMAL_CYCLE_MONTHLY_PLANNER_BY_PART_CODE = `mutation updateThermalCycleMonthlyPlannerByPartCode($partCode:String!,$month:String!) {
updateCrvtThermalCycleMonthlyPlannerByPartCode(
  input: {crvtThermalCycleMonthlyPlannerPatch: {month: $month}, partCode: $partCode}
) {
  crvtThermalCycleMonthlyPlanner {
    month
  }
}
}
`;
const UPDATE_THERMAL_SHOCK_MONTHLY_PLANNER_BY_PART_CODE = `mutation updateThermalShockMonthlyPlannerByPartCode($partCode:String!,$month:String!) {
updateCrvtThermalShockMonthlyPlannerByPartCode(
  input: {crvtThermalShockMonthlyPlannerPatch: {month: $month}, partCode: $partCode}
) {
  crvtThermalShockMonthlyPlanner {
    month
  }
}
}
`;
const UPDATE_VIBRATION_MONTHLY_PLANNER_BY_PART_CODE = `mutation updateVibrationMonthlyPlannerByPartCode($partCode:String!,$month:String!) {
updateCrvtVibrationMonthlyPlannerByPartCode(
  input: {crvtVibrationMonthlyPlannerPatch: {month: $month}, partCode: $partCode}
) {
  crvtVibrationMonthlyPlanner {
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
updateCrvtPostTestTableByComponentId(
  input: {crvtPostTestTablePatch: {ptCurrent: $ptCurrent, ptDifferance: $ptDifferance, ptFrequency: $ptFrequency, ptInsulationRs: $ptInsulationRs, ptSoundLvl: $ptSoundLvl}, componentId:$componentId}
) {
  clientMutationId
}
}
`;
const ALL_COMPONENT = `query allPreResultTables {
allCrvtPreResultTables {
  nodes {
    partCode
    partName
  }
}
}`;
const CREATE_PRE_RESULT = `mutation createPreResultTable($partCode:String!,$n1:JSON!,$n2:JSON!,$n3:JSON!,$n4:JSON!,$partName:String!) {
createCrvtPreResultTable(
  input: {crvtPreResultTable: {partCode:$partCode, n4:$n4, n3:$n3, n2:$n2, n1: $n1, partName:$partName}}
) {
  clientMutationId
}
}`;
const UPDATE_PRE_RESULT = `mutation updatePreResultTableByPartCode($current: JSON!, $frequency: JSON!, $insulationRs: JSON!, $soundLvl: JSON!,$partCode:String!) {
updateCrvtPreResultTableByPartCode(
  input: {crvtPreResultTablePatch: {current: $current, frequency: $frequency, insulationRs: $insulationRs, soundLvl: $soundLvl}, partCode: $partCode}
) {
  clientMutationId
}
}`;
const CREATE_POST_RESULT = `mutation createPostResultTable($partCode:String!,$n1:JSON!,$n2:JSON!,$n3:JSON!,$n4:JSON!,$partName:String!) {
createCrvtPostResultTable(
  input: {crvtPostResultTable: {partCode:$partCode, n4:$n4, n3:$n3, n2:$n2, n1: $n1, partName:$partName}}
) {
  clientMutationId
}
}`;
const PRE_CURRENT = `mutation preCurrent($current: JSON! $partCode: String!) {
updateCrvtPreResultTableByPartCode(
  input: {crvtPreResultTablePatch: {current: $current}, partCode: $partCode}
) {
  clientMutationId
}
}`;
const PRE_FREQUENCY = `mutation preFrequency($frequency: JSON!, $partCode: String!) {
updateCrvtPreResultTableByPartCode(
  input: {crvtPreResultTablePatch: {frequency: $frequency}, partCode: $partCode}
) {
  clientMutationId
}
}`;
const PRE_SOUND = `mutation preSound($soundLvl: JSON!, $partCode: String!) {
updateCrvtPreResultTableByPartCode(
  input: {crvtPreResultTablePatch: {soundLvl: $soundLvl}, partCode: $partCode}
) {
  clientMutationId
}
}`;
const PRE_INSULATION = `mutation preInsulation($insulationRs: JSON!, $partCode: String!) {
updateCrvtPreResultTableByPartCode(input: {crvtPreResultTablePatch: {insulationRs: $insulationRs}, partCode: $partCode}
) {
  clientMutationId
}
}`;

const POST_CURRENT = `mutation postCurrent($ptCurrent:JSON! ,$partCode:String!) {
updateCrvtPostResultTableByPartCode(
  input: {crvtPostResultTablePatch: {ptCurrent: $ptCurrent}, partCode: $partCode}
) {
  clientMutationId
}
}`;
const POST_FREQUENCY = `mutation postFrequency($ptFrequency: JSON, $partCode: String!) {
updateCrvtPostResultTableByPartCode(
  input: {crvtPostResultTablePatch: {ptFrequency: $ptFrequency}, partCode: $partCode}
) {
  clientMutationId
}
}`;
const POST_SOUND = `mutation postSound($ptSoundLvl: JSON, $partCode: String!) {
updateCrvtPostResultTableByPartCode(
  input: {crvtPostResultTablePatch: {ptSoundLvl: $ptSoundLvl}, partCode: $partCode}
) {
  clientMutationId
}
}`;
const POST_INSULATION = `mutation postInsulation($ptInsulationRs: JSON, $partCode: String!) {
updateCrvtPostResultTableByPartCode(
  input: {crvtPostResultTablePatch: {ptInsulationRs:$ptInsulationRs }, partCode: $partCode}
) {
  clientMutationId
}
}`;

const PRE_RESULT_SAMPLE = `mutation createPreResultTable($partCode:String!, $partName:String!) {
createCrvtPreResultTable(input: {crvtPreResultTable: {partCode: $partCode partName: $partName}}) {
  clientMutationId
}
}`;
const POST_RESULT_SAMPLE = `mutation createPostResultTable($partCode: String!, $partName: String!) {
createCrvtPostResultTable(input: {crvtPostResultTable: {partCode: $partCode, partName: $partName}}
) {
  clientMutationId
}
}`;

const START_TIMER = `mutation startTimer($machineId: Int!) {
startTimer(machineId: $machineId)
}
`;

const STOP_TIMER = `
mutation stopTimer($machineId: Int!) {
stopTimer(machineId: $machineId)
}
`;

const UPDATE_ALERT_BY_ID = `mutation updateAlertById($alertStatus: Int!, $machineStatus: Int!, $remarks: String!, $userName: String!, $id: Int!, $actionTaken: String!) {
updateCrvtAlertById(
  input: {crvtAlertPatch: {alertStatus: $alertStatus, machineStatus: $machineStatus, remarks: $remarks, userName: $userName, actionTaken: $actionTaken}, id: $id}
) {
clientMutationId
}
}
`;

const FATCH_PRE_RESULT = `subscription preResultTableByPartCode($partCode: String!) {
crvtPreResultTableByPartCode(partCode: $partCode) {
  current
  frequency
  insulationRs
  soundLvl
}
}`;
const FATCH_POST_RESULT = `subscription postResultTableByPartCode($partCode:String!) {
crvtPostResultTableByPartCode(partCode: $partCode) {
  ptCurrent
  ptFrequency
  ptInsulationRs
  ptSoundLvl
}
}`;
const PRE_TABLE_DATA = `subscription allPreResultTables {
allCrvtPreResultTables {
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
}`;
const UPDATE_DIFF_DATA = `mutation updatePostResultTableByPartCode($diffFrequency: JSON!, $diffSound: JSON!,$partCode:String!) {
updateCrvtPostResultTableByPartCode(
  input: {crvtPostResultTablePatch: {diffFrequency: $diffFrequency, diffSound: $diffSound}, partCode: $partCode}
) {
  clientMutationId
}
}
`;
const FATCH_DIFF_RESULTS = `subscription postResultTableByPartCode($partCode:String!) {
crvtPostResultTableByPartCode(partCode: $partCode) {
  diffFrequency
  diffSound
}
}`;
const FATCH_DIFFERENCE = `subscription MyQuery {
allCrvtPostResultTables {
  nodes {
    diffFrequency
    diffSound
    partCode
  }
}
}`;

const UPDATE_ALERT_STATUS_BY_ID = `mutation updateAlertById($alertStatus: Int!, $id: Int!) {
updateCrvtAlertById(
  input: {crvtAlertPatch: {alertStatus: $alertStatus}, id: $id}
) {
  clientMutationId
}
}`;
const UPLOAD_POST_IMAGES = `mutation updatePostResultTableByPartCode($postImages: JSON!, $partCode: String!) {
updateCrvtPostResultTableByPartCode(
  input: {crvtPostResultTablePatch: {postImages: $postImages}, partCode: $partCode}
) {
  clientMutationId
}
}`;

const IMAGE_FETCH = `subscription ImageFetch($partCode:String!) {
crvtPostResultTableByPartCode(partCode: $partCode) {
  postImages
}
}`;

const ALL_ACTIVE_ALERTS = `subscription allCrvtActiveAlerts {
  allCrvtAlerts(condition: {alertStatus: 1}) {
    nodes {
      machineStatus
      remarks
      crvtTestingEquipmentByEquipmentName {
        equipmentName
      }
    }
  }
}
`
const EVERY_TEST_DEATILS = `query everyTestDetails {
  allCrvtDashboardDetails {
    nodes {
      testCompleted
      testInProgress
      testPlanned
      unplannedTest
    }
  }
}
`
const UPDATE_DASHBOARD_DETAILS = `
mutation updatedashBoardDetails($rowName: String!,$canIncrement: Boolean!) {
  updatedashBoardDetails(rowName: $rowName, canIncrement: $canIncrement)
}
`
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
  PRE_RESULT_SAMPLE,
  POST_RESULT_SAMPLE,
  FATCH_PRE_RESULT,
  FATCH_POST_RESULT,
  PRE_TABLE_DATA,
  UPDATE_DIFF_DATA,
  FATCH_DIFF_RESULTS,
  FATCH_DIFFERENCE,
  PRE_CURRENT,
  PRE_FREQUENCY,
  PRE_INSULATION,
  PRE_SOUND,
  POST_SOUND,
  POST_FREQUENCY,
  POST_INSULATION,
  POST_CURRENT,
  UPDATE_ALERT_STATUS_BY_ID,
  UPLOAD_POST_IMAGES,
  IMAGE_FETCH,
  ALL_ACTIVE_ALERTS,
  EVERY_TEST_DEATILS,
  UPDATE_DASHBOARD_DETAILS
};
