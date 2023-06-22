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

const RO_YEARLY_PLANNER = `subscription Roplanner {
  allRoYearlyPlanners {
    nodes {
      componentName
      samples
      testDetails
      totalSamplesTested
    }
  }
}
`;
const THERMAL_YEARLS_PLANNER = `subscription thermal_yearly_planner {
  allThermalShockYearlyPalnners {
    nodes {
      componentName
      samples
      testDetails
      totalSamplesTested
    }
  }
}
`;
const SHOWER_YEARLY_PLANNER = `subscription shower_yearly_panner {
  allShowerYearlyPlanners {
    nodes {
      componentName
      samples
      testDetails
      totalSamplesTested
    }
  }
}
`;
const DUST_YEARLY_PLANNER = `subscription dust_yearly_planner {
  allDustYearlyPlanners {
    nodes {
      componentName
      id
      samples
      testDetails
      totalSamplesTested
    }
  }
}
`;

const VIBRATION_YEARLY_PLANNER = `subscription vibration_yearly_planner {
  allVibrationYearlyPlanners {
    nodes {
      componentName
      id
      samples
      testDetails
      totalSamplesTested
    }
  }
}
`
const OVEN_YEARLY_PLANNER = `subscription oven_yearly_planner {
  allOvenYearlyPlanners {
    nodes {
      componentName
      id
      samples
      testDetails
      totalSamplesTested
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
  THERMAL_YEARLS_PLANNER,
  SHOWER_YEARLY_PLANNER,
  MAKE_YEARLY_PLANNER,
  DUST_YEARLY_PLANNER,
  VIBRATION_YEARLY_PLANNER,
  OVEN_YEARLY_PLANNER,
};
