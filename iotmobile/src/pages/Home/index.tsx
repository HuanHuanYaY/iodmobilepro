import React, { useEffect, useRef, useState } from 'react'
import type { FC } from 'react'
import { DatePicker, Button, Toast } from 'antd-mobile'
import { DropdownRef } from 'antd-mobile/es/components/dropdown'
import {
    Route,
    Routes,
    useNavigate,
    useLocation,
    MemoryRouter as Router,
} from 'react-router-dom'
import {
    FaceRecognitionOutline,
    SmileOutline,
    FrownOutline
} from 'antd-mobile-icons'
import { MdOutlineWaterDrop,MdCo2 } from "react-icons/md"
import { IoMdCalendar } from "react-icons/io"
import { Line } from '@ant-design/charts'
import qs from 'qs'
import moment, { min } from 'moment';
import momentTimezone from 'moment-timezone';
import "./index.css"
import { allCo2Data } from '../api/co2'
import { create } from 'domain'
import { isVisible } from '@testing-library/user-event/dist/utils'
import { show } from 'antd-mobile/es/components/dialog/show'






export const Home = () => {


    const [co2Value, setCo2Value] = useState(null)
    const [co2, setCo2] = useState([])
    const [visible, setVisible] = useState(false)
    const [date, setDate] = useState(moment().format('YYYY-MM-DD'));
    const now = new Date()

    const reqData = {
        create_time: date
    }
    //折线图
    const DemoLine: React.FC = () => {
        const config = {
            data: co2,
            padding: [40, 20],
            xField: 'create_time',
            yField: 'co2',
            sizeFeild: 'co2',
            legend: { size: false },
            //shapeField: 'co2',
            smooth: true,
            colorField: 'device_id',
            axis: {
                x: {
                    label: false,
                    grid: false
                },
                y: {
                    labelFormatter: (v: any) => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
                },
            },
        }
        return <Line {...config} />
    }

    //co2数据获取
    useEffect(() => {
        const getCo2Data = async () => {
            const res = await allCo2Data(qs.stringify(reqData));


            const formatterData = res.data.map((item: any) => {
                const date = momentTimezone.tz(item.create_time, "Asia/Shanghai");
                return {
                    create_time: date.format("HH:mm:ss"),
                    co2: parseInt(item.co2),
                    device_id: item.deviceid,
                }
            })
            let lengthN = res.data.length
            if (lengthN > 1) {
                //console.log(lengthN)
                lengthN = lengthN - 1
                //console.log(res.data)
                if (lengthN > 0) {
                    setCo2Value(res.data[lengthN].co2)
                    //console.log(res.data)
                } else {
                    setCo2Value(null)
                    //console.log("pass")
                }
            }
            setCo2(formatterData)
            //console.log(formatterData)
        }
        getCo2Data();
        const interval = setInterval(getCo2Data, 9000)
        return () => {
            clearInterval(interval)
        }
    }, [date])

    return (
        <>
            <div className='div-big-cover-home'>
                <div className='div-color-1'>
                    <div>
                        <MdCo2 className='FaceRecognitionOutline-styles'></MdCo2>

                    </div>
                    <div style={{ marginBottom: "7px" }}>
                        <text className='Co2-font-styles-2'>Co2 detect</text>
                    </div>
                    <div>
                        <text className='Co2-font-styles-2'>{co2Value}<sub>ppm</sub></text>
                    </div>
                </div>
            </div>
            <div className='div-big-cover-home'>
                <div className='div-color-2'>
                    <div>
                        <MdOutlineWaterDrop className='FaceRecognitionOutline-styles2'></MdOutlineWaterDrop>

                    </div>
                    <div style={{ marginBottom: "7px" }}>
                        <text className='Co2-font-styles-2'>Water using</text>
                    </div>
                    <div>
                        <text className='Co2-font-styles-2'>12,00<sub>L</sub></text>
                    </div>
                </div>
            </div>
            <div className='div-big-cover-home'>

                <div className='div-color-3'>
                    <div>
                        <SmileOutline className='FaceRecognitionOutline-styles3'></SmileOutline>

                    </div>
                    <div style={{ marginBottom: "7px" }}>
                        <text className='Co2-font-styles-2'>Occupy</text>
                    </div>
                    <div>
                        <text className='Co2-font-styles-2'>Free</text>
                    </div>
                </div>
            </div>
            <div className='div-big-cover-home-little'>
                <text className='Co2-font-styles-3'>PPM data line chart</text>
                        <IoMdCalendar className='calendar-styles'  onClick={() => {
                            setVisible(true)
                        }} />
                    <DatePicker
                        title='Time select'
                        visible={visible}
                        onClose={() => {
                            setVisible(false)
                        }}
                        max={now}
                        onConfirm={val => {
                            Toast.show(val.toDateString())
                            const date = new Date(val)
                            console.log(val)
                            const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
                            console.log(formattedDate)
                            setDate(formattedDate)
                        }}
                    />

            </div>

            <div className='div-big-cover-home2'>
                <DemoLine></DemoLine>
            </div>


        </>
    )

}