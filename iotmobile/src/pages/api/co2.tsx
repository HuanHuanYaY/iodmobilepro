import request from "../util/request"


//co2的相关api
export function Co2Data (data?:[]) {
    return request({
        url:'/Co2/FindAllDataByIdandTime',
        method:'POST',
        data
    })
}

export function allCo2Data (data:any){
    return request({
        url:'/Co2/FindAllDataByTime',
        method:'POST',
        data
    })
}

export function tableCo2Data (data?:[]){
    return request({
        url:'/Co2/FindAllDataByTimeFenYe',
        method:'POST',
        data
    })
}