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

`
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
`

const deleteTable = `query deleteTable($tableName:String!) {
  trancuateTable(tableName: $tableName)
}`

const ADD_DUST_MONTHLY_PLANNER = `
mutation add_dust_montly_planner($partCode:String!,$partName:String!,$status:Int!,$vendorDetails:JSON,$month:String!) {
  createDustMonthlyPlanner(input: {dustMonthlyPlanner: {partCode: $partCode, partName: $partName, status: $status, vendorDetails: $vendorDetails,month:$month}}) {
    clientMutationId
  }
}
`
const ADD_OVEN_MONTHLY_PLANNER = `
mutation add_oven_montly_planner($partCode:String!,$partName:String!,$status:Int!,$vendorDetails:JSON,$month:String!) {
  createOvenMonthlyPlanner(input: {ovenMonthlyPlanner: {partCode: $partCode, partName: $partName, status: $status, vendorDetails: $vendorDetails,month:$month}}) {
    clientMutationId
  }
}
`
const ADD_RO_MONTHLY_PLANNER = `
mutation add_ro_montly_planner($partCode:String!,$partName:String!,$status:Int!,$vendorDetails:JSON,$month:String!) {
  createRoMonthlyPlanner(input: {roMonthlyPlanner: {partCode: $partCode, partName: $partName, status: $status, vendorDetails: $vendorDetails,month:$month}}) {
    clientMutationId
  }
}
`
const ADD_SHOWER_MONTHLY_PLANNER = `
mutation add_shower_montly_planner($partCode:String!,$partName:String!,$status:Int!,$vendorDetails:JSON,$month:String!) {
  createShowerMonthlyPlanner(input: {showerMonthlyPlanner: {partCode: $partCode, partName: $partName, status: $status, vendorDetails: $vendorDetails,month:$month}}) {
    clientMutationId
  }
}
`
const ADD_THERMAL_CYCLE_MONTHLY_PLANNER = `
mutation add_thermal_cylce_montly_planner($partCode:String!,$partName:String!,$status:Int!,$vendorDetails:JSON,$month:String!) {
  createThermalCycleMonthlyPlanner(input: {thermalCycleMonthlyPlanner: {partCode: $partCode, partName: $partName, status: $status, vendorDetails: $vendorDetails,month:$month}}) {
    clientMutationId
  }
}
`
const ADD_THERMAL_SHOCK_MONTHLY_PLANNER = `
mutation add_thermal_shock_montly_planner($partCode:String!,$partName:String!,$status:Int!,$vendorDetails:JSON,$month:String!) {
  createThermalShockMonthlyPlanner(input: {thermalShockMonthlyPlanner: {partCode: $partCode, partName: $partName, status: $status, vendorDetails: $vendorDetails,month:$month}}) {
    clientMutationId
  }
}
`
const ADD_VIBRATION_MONTHLY_PLANNER = `
mutation add_vibration_shock_montly_planner($partCode:String!,$partName:String!,$status:Int!,$vendorDetails:JSON,$month:String!) {
  createVibrationMonthlyPlanner(input: {vibrationMonthlyPlanner: {partCode: $partCode, partName: $partName, status: $status, vendorDetails: $vendorDetails,month:$month}}) {
    clientMutationId
  }
}
`

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
`
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
`
const RO_MONTHLY_PLANNER_BY_DATE=`
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
`

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
`

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
`

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
`

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
`

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
`
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
`
const ADD_YEARLY_HISTORY = `mutation MyMutation($empCode:String!,$fileName:String!) {
  createYearlyPlannerHistory(
    input: {yearlyPlannerHistory: {empcode: $empCode, fileName: $fileName}}
  ) {
    clientMutationId
  }
}
`
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
`

const ADD_DUST_STATUS=`mutation updateDustTestDetailByPartName($status:Int,$partName:Int!) {
updateDustTestDetailByPartName(
  input: {dustTestDetailPatch: {status: $status}, partName: $partName}
) {
  clientMutationId
}
}`
const ADD_THERMAL_CYCLE_STATUS=`mutation updateThermalCycleTestDetailByPartName($status:Int!,$partName:Int!) {
updateThermalCycleTestDetailByPartName(
  input: {thermalCycleTestDetailPatch: {status: $status}, partName: $partName}
) {
  clientMutationId
}
}`
const ADD_THERMAL_SHOCK_STATUS=`mutation updateThermalShockChamberTestDetailByPartName($status:Int!,$partName:Int!) {
updateThermalShockChamberTestDetailByPartName(
  input: {thermalShockChamberTestDetailPatch: {status: $status}, partName: $partName}
) {
  clientMutationId
}
}`
const ADD_VIBRATION_STATUS=`mutation updateVibrationTestDetailByPartName($status:Int!,$partName:Int!) {
updateVibrationTestDetailByPartName(
  input: {vibrationTestDetailPatch: {status: $status}, partName: $partName}
) {
  clientMutationId
}
}`
const ADD_OVEN_STATUS=`mutation updateOvenTestDetailByPartName($status:Int!,$partName:Int!) 
{updateOvenTestDetailByPartName(
  input: {ovenTestDetailPatch: {status:$status}, partName: $partName}
){
  clientMutationId
}
}`
const ADD_REPEATED_OPERATION_STATUS=`mutation updateRepeatedOperationTestDetailByPartName($status:Int!,$partName:Int!) {
updateRepeatedOperationTestDetailByPartName(
  input: {repeatedOperationTestDetailPatch: {status: $status}, partName: $partName}
) {
  clientMutationId
}
}`
const ADD_SHOWER_STATUS=`mutation updateShowerTestDetailByPartName($status:Int!,$partName:Int!) {
updateShowerTestDetailByPartName(
  input: {showerTestDetailPatch: {status: $status}, partName: $partName}
) {
  clientMutationId
}
}` 
const ADD_EQUIPMENT_UPDATE_HISTORY=`mutation createEquipmentUpdateHistory($componentId: Int!, $employeeCode: String!, $testType: String!,$updateValues:JSON!) {
createEquipmentUpdateHistory(
  input: {equipmentUpdateHistory: {componentId: $componentId, employeeCode: $employeeCode, testType: $testType, updateValues: $updateValues}}
) {
  clientMutationId
}
}
`
const EQUIPMENT_HISTORY=`
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
  ADD_DUST_STATUS
};
