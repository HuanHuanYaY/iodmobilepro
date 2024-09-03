import request from "../util/request"

//occupy的相关api
export function Occupy (data:any) {
    return request({
        url:'/Occupy/FindAllOccupyByIdandTime',
        method:'POST',
        data
    })
}

export function OccupyByTime (data:any) {
    return request({
        url:'/Occupy/FindAllOccupyByTime',
        method:'POST',
        data
    })
}

export function FindFreeTimePrecent (data:any) {
    return request({
        url:'/Occupy/FindFreeTimePrecent',
        method:'POST',
        data
    })
}

export function FindFreeTime (data:any) {
    return request({
        url:'/Occupy/FindFreeTime',
        method:'POST',
        data
    })
}

export function FindOccupyTime (data:any) {
    return request({
        url:'/Occupy/FindOccupyTime',
        method:'POST',
        data
    })
}