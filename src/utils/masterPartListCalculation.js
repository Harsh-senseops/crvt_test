let getPlantCount = (val) => {
  const { HHHD = 0, HHHG = 0, HHHU = 0, HM4N = 0, HM5V = 0, HM6C = 0, HE6T = 0 } = val;
  return [HHHD, HHHG, HHHU, HM4N, HM5V, HM6C, HE6T].reduce((total, count) => total + count, 0);
};

let getIndex = (part_name, arr) => {
  let index = 0;
  index = arr.findIndex((obj) => obj.part_name.toLowerCase() === part_name.toLowerCase());
  return index;
};

let findCommonIndex = (part_code, partName, arr) => {
  let index = 0;
  arr.map((val) => {
    if (val.part_name === partName) {
      index = val.part_code.findIndex((val) => val === part_code);
    }
  });
  return index;
};

function pairCount(obj,arr,isTrue) {
  let partName = "";
 if (isTrue) {
   partName = obj["Part Name"].split(" ")[0];
 } else {
 partName = obj["Part Name"];
 }
   if (obj["COUNT"]) {
     let isTheir = arr.findIndex((oarrj) => oarrj.partName === partName);
     if (isTheir !== -1) {
       arr[isTheir].partCode.push(obj["Part Code"]);
     } else {
       arr.push({
         partName: partName,
         partCount: 1,
         partCode: [obj["Part Code"]],
       });
     }
   } else {
     let isTheir = arr.findIndex((oarrj) => oarrj.partName === partName);
     if (isTheir === -1) {
       if (obj["COMMON"]) {
         arr.push({
           partName: partName,
           partCount: 1,
           partCode: [obj["Part Code"]],
         });
       } else {
         arr.push({
           partName: partName,
           partCount: getPlantCount(obj),
           partCode: [obj["Part Code"]],
         });
       }
     } else {
       if (obj["COMMON"]) {
         arr[isTheir].partCount += 1;
         arr[isTheir].partCode.push(obj["Part Code"]);
       } else {
         arr[isTheir].partCount += getPlantCount(obj);
         arr[isTheir].partCode.push(obj["Part Code"]);
       }
     }
   }
 
}

const partCodeDetails = (partCode, jsonMasterPartList) => {
  let filteredData = jsonMasterPartList.filter((value) => value["Part Code"] === partCode);
  let partDetails = { vendorsInfo: [] };
  let HHHD = 0,
    HHHG = 0,
    HHHU = 0,
    HM4N = 0,
    HM5V = 0,
    HM6C = 0,
    HE6T = 0;
  filteredData.map((val, i) => {
    HHHD += val.HHHD ? val.HHHD : 0;
    HHHG += val.HHHG ? val.HHHG : 0;
    HHHU += val.HHHU ? val.HHHU : 0;
    HM4N += val.HM4N ? val.HM4N : 0;
    HM5V += val.HM5V ? val.HM5V : 0;
    HM6C += val.HM6C ? val.HM6C : 0;
    HE6T += val.HE6T ? val.HE6T : 0;
    partDetails.HHHD = HHHD;
    partDetails.HHHG = HHHG;
    partDetails.HHHU = HHHU;
    partDetails.HM4N = HM4N;
    partDetails.HM5V = HM5V;
    partDetails.HM6C = HM6C;
    partDetails.HE6T = HE6T;
    let index = partDetails.vendorsInfo.findIndex((obj) => obj.vendorCode == val["Vendor Code"]);
    if (index == -1)
      partDetails.vendorsInfo.push({
        vendorName: val["Vendor Name"],
        vendorCode: val["Vendor Code"],
      });
  });

  return partDetails;
};

export default function masterPartDetailsMaker(jsonMasterPartList) {
  let arr = []
  jsonMasterPartList.map((newVal, i) => {
    if (i === 0) return;
    const partName = newVal["Part Name"];
    const commonParts = ["BATTERY"];

    if (commonParts.some((commonPart) => partName.includes(commonPart))) {
      pairCount(newVal, arr, true);
      return;
    }
    pairCount(newVal, arr);
  })
    for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].partCode.length; j++) {
      arr[i].partCode[j] = {
        partCode: arr[i].partCode[j],
        details: partCodeDetails(arr[i].partCode[j], jsonMasterPartList),
      };
    }
  }
  return arr;
}
