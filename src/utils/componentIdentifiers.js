const componentIdentifiers = {
    ROTOR_OIL_FILTER:["15431"],
    COCK_ASSY_FUEL:["16950","1695A"],
    ROLL_OVER_VALVE:["17420"],
    ACG:["31100"],
    BATTERY:["31500"],
    SENSOR_ASSY_SIDE_STAND:["35140"],
    REG_RECT_COMP:["31600"],
    SPARK_PLUG:["31916"],
    // SW UNIT START
    // BANK ANGLE SENSOR
    BANK_ANGLE_SENSOR:["35160"],
    CLUTCH_SWITCH:["35330"],
    FRONT_STOP_SWITCH:["35340"],
    REAR_STOP_SWITCH:["35350"],
    CONTACT_ASSY_NEUTRAL:["35750","35759"],
    SPEED_SENSOR_ASSY:["37700","38520"],//Doubt.
    SENSOR_ASSY_T_OIL:["37750"],
    UNIT_COMP_ECU:["38770"],
    MIRROR_ASSY_RIGHT:["88110"],//doubt
    MIRROR_ASSY_LEFT:["88120"],//doubt
    ACK_CBS:["4650A"],
    AAF_CBS:["4650A"],
    HOSE:["43310","43400","4331A","43327","4511A","45120","45126","45128","4512A","4513A","4512B"],
    CHAIN_DRIVE:["40530"],
    KEY_SET:["35010","3501A"],
    TAIL_LIGHT:["33700","3370A","33701","3370B"],
    WINKER_ASSY_RIGHT_FRONT:["33400"],
    WINKER_ASSY_LEFT_FRONT:["33450"],
    WINKER_ASSY_RIGHT_REAR:["33600"],
    WINKER_ASSY_LEFT_REAR:["33650"],
    VEHICLE_CONTROL_UNIT:["38970"],
    //Please double check once.
    SW_UNIT_START : ["35160"],
    SW_UNIT_DIMMER : ["35170"],
    SW_UNIT_HORN : ["35180"],
    SW_UNIT_I3S : ["35190"],
    SW_ASSY_WINKER : ["35200"],
    SET_START_MAG : ["35860"],
    SPEEDOMETER_ASSY : ["37100","3710A","37200"],
    UNIT_ASSY_FUEL : ["37800"],
    HORN : ["38110"],
    WINKER_RELAY : ["38300"],
    STARTER_RELAY : ["38500"],
    POWER_RELAY : ["38500","38550","38551"], //doubt
    CABLE_COMP_SPEEDOMETER : ["44830"],
    OIL_PUMP_ASSY : ["15100"],
    ELEMENT_OIL_FILTER : ["15410"],
    THROTTLE_BODY_ASSY : ["16400"],
    UNIT_ASSY_FUEL_PUMP : ["16700"],
    INJECTOR_ASSY_FUEL : ["1711A"],
    COIL_COMP_IGNITION : ["30500","30510"],
    CAP_ASSY_NOISE_SUPPRESSOR : ["30700"],
    USB_CHARGER_ASSY : ["31300","31304"],
    HEAD_LIGHT : ["33100","3310A"],
    POSITION_LIGHT_FRONT : ["3330A"],
    STARTER_MOTOR : ["31200","3121A"],
    FFC : ["17620","17622"],
    LIFTER_ASSY_TENSIONER : ["14520"],
    ONE_WAY_VALVE : ["17430"],
    TWO_WAY_VALVE : ["1745A"],
    PURGE_VALVE : ["17460"],
    PURGE_SOLENOID_VALVE : ["17554"],
    CANISTER_COMP : ["17410"],
    MOTOR_DRIVE : ["30200"],
    POWER_DISTRIBUTION_UN : ["38400"],
    UNIT_ASSY_BCM : ["38800"],
    SW_ASSY_SEAT_AND_HANDLE:["35260"]
}

function findComponetNameAndComponetCode(codeToSearch){
    let data = []
    for (let key in componentIdentifiers) {
        if(componentIdentifiers[key].includes(codeToSearch)){
            data.push({name:key.replace(/_/g," "),code:componentIdentifiers[key]})
           
        }
       }
       if(data.length === 0) return false
        return data

}

export {findComponetNameAndComponetCode}