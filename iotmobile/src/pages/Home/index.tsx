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
import { MdOutlineWaterDrop, MdCo2 } from "react-icons/md"
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
import { Occupy } from '../api/occupy'
import { AiOutlineFrown } from "react-icons/ai";






export const Home = () => {


    const [co2Value, setCo2Value] = useState(null)
    const [co2, setCo2] = useState([])
    const [visible, setVisible] = useState(false)
    const [date, setDate] = useState(moment().format('YYYY-MM-DD'));
    const now = new Date()
    const [occupyData2, setOccupyData2] = useState(0)
    const [occupyData3, setOccupyData3] = useState(0)
    const [occupyData, setOccupyData] = useState(0)

    const OccupyParm = {
        device_id: 'CBO-010446',
        create_time: date
    }
    const OccupyParm2 = {
        device_id: 'CBO-010446JM',
        create_time: date
    }
    const OccupyParm3 = {
        device_id: 'CBO-010446GD',
        create_time: date
    }

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

    //occupy数据获取
    useEffect(() => {
        const selectOccupy = async () => {
            //   const res = await Occupy(qs.stringify(OccupyParm));
            //   const formatterData = res.data.map((Item:any) => ({
            //     ...Item,
            //     create_time: moment.tz(Item.create_time, "Asia/Shanghai").format("HH:mm:ss")
            //   }));
            //   if (res?.data?.length > 0) {
            //     let lengthOccupy = res.data.length;
            //     const flag = res.data[lengthOccupy - 1].occupy;
            //     setOccupyData(flag);
            //   } else {
            //     setOccupyData(0);
            //   }
            //   //console.log(occupyData)


            //   const res2 = await Occupy(qs.stringify(OccupyParm2));
            //   const formatterData2 = res2.data.map((Item:any) => ({
            //     ...Item,
            //     create_time: moment.tz(Item.create_time, "Asia/Shanghai").format("HH:mm:ss")
            //   }));
            //   if (res2?.data?.length > 0) {
            //     let lengthOccupy2 = res2.data.length;
            //     const flag2 = res2.data[lengthOccupy2 - 1].occupy;
            //     setOccupyData2(flag2);
            //   } else {
            //     setOccupyData2(0);
            //   }


            const res3 = await Occupy(qs.stringify(OccupyParm3));
            const formatterData3 = res3.data.map((Item: any) => ({
                ...Item,
                create_time: moment.tz(Item.create_time, "Asia/Shanghai").format("HH:mm:ss")
            }));
            if (res3?.data?.length > 0) {
                let lengthOccupy3 = res3.data.length;
                const flag3 = res3.data[lengthOccupy3 - 1].occupy;
                setOccupyData3(flag3);
            } else {
                setOccupyData3(0);
            }
            //console.log(occupyData3);

        };

        const interval = setInterval(selectOccupy, 5000); // 每 5 秒执行一次 selectOccupy

        return () => clearInterval(interval); // 组件卸载时清除定时器
    }, [occupyData])


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
                        <div>
                            {occupyData3.toString() === '0' ? (
                                <SmileOutline className='FaceRecognitionOutline-styles3'></SmileOutline>
                            ) : (
                                <AiOutlineFrown className='FaceRecognitionOutline-styles3'></AiOutlineFrown>
                            )
                            }
                        </div>
                    </div>
                    <div style={{ marginBottom: "7px" }}>
                        <text className='Co2-font-styles-2'>Occupy</text>
                    </div>
                    <div>
                        {occupyData3.toString() === '0' ? (
                            <text className='Co2-font-styles-2'>Free</text>
                        ) : (
                            <text className='Co2-font-styles-2'>Busy</text>
                        )
                        }
                    </div>
                </div>
            </div>
            <div className='div-big-cover-home-little'>
                <text className='Co2-font-styles-3'>PPM data line chart</text>
                <IoMdCalendar className='calendar-styles' onClick={() => {
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