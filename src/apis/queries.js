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
}`

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
` 
const DELETE_USER = `mutation MyMutation($empCode:String!) {
  deleteEmployeeDetailByEmployeeCode(input: {employeeCode: $empCode}) {
    deletedEmployeeDetailId
  }
}
`

const SUB = `subscription allEmployeeDetails {
  allEmployeeDetails {
    nodes {
      employeeCode
      name
      password
      role
    }
  }
}`

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
}`

export { AUTH, ADD_USER,GET_ALL_USER,UPDATE_USER,DELETE_USER,SUB,CREATE_VENDORS };
