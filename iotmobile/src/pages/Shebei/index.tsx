import React, { useRef } from 'react'
import type { FC } from 'react'
import { NavBar, TabBar, Footer, Tag, Button, Dropdown, Grid } from 'antd-mobile'
import { DropdownRef } from 'antd-mobile/es/components/dropdown'
import {
    Route,
    Routes,
    useNavigate,
    useLocation,
    MemoryRouter as Router,
} from 'react-router-dom'
import {
    AppOutline,
    MessageOutline,
    UnorderedListOutline,
    UserOutline,
} from 'antd-mobile-icons'

import "./Shebei.css"

export const Device = () => {
    return (
        <>
            <div className='div-big-cover-shebei'>
                <div>
                    <Grid columns={2} gap={8}>
                        <Grid.Item>
                            <div className="grid-demo-item-blockA-shebei">A</div>
                        </Grid.Item>
                        <Grid.Item>
                            <div className="grid-demo-item-blockB-shebei">B</div>
                        </Grid.Item>
                        <Grid.Item>
                            <div className="grid-demo-item-blockC-shebei">C</div>
                        </Grid.Item>
                        <Grid.Item>
                            <div className="grid-demo-item-blockD-shebei">D</div>
                        </Grid.Item>
                    </Grid>
                </div>
            </div>
            <div className='div-big-cover-shebei'>
                <div>
                    <Grid columns={2} gap={8}>
                        <Grid.Item>
                            <div className="grid-demo-item-blockA-shebei">A</div>
                        </Grid.Item>
                        <Grid.Item>
                            <div className="grid-demo-item-blockB-shebei">B</div>
                        </Grid.Item>
                        <Grid.Item>
                            <div className="grid-demo-item-blockC-shebei">C</div>
                        </Grid.Item>
                        <Grid.Item>
                            <div className="grid-demo-item-blockD-shebei">D</div>
                        </Grid.Item>
                    </Grid>
                </div>
            </div>


        </>
    )

}