import axios from 'axios';
import {
    Column,
    Lookup
} from 'devextreme-react/data-grid';
import 'devextreme-react/text-area';
import CustomStore from 'devextreme/data/custom_store';
import React, { Fragment } from 'react';
import { Breadcrumbs, Link, makeStyles, Typography } from '@material-ui/core';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import GrainIcon from '@material-ui/icons/Grain';
import 'whatwg-fetch';
import { DataGridItemEditing, DataGridOptions, SmartERPDataGrid } from '../../components/devx';
import { DOCTORPOLIS } from '../../global/api-endpoint'

const useStyles = makeStyles((theme) => ({
    link: {
        display: 'flex',
    },
    icon: {
        marginRight: theme.spacing(0.5),
        width: 20,
        height: 20,
    },
}));

const masterDoctorsPolisData = new CustomStore({
    key: 'DoctorsPolisId',
    loadMode: 'raw',
    load: async () => {
        try {
            const response = await axios.get(DOCTORPOLIS.GETALL, { headers: { Accept: 'application/json', 'Content-Type': 'application/json' } })
            const { data } = response;

            if (response.status === 200) return data;

            return false
        } catch (e) {
            console.log('Error', e.response.data);
        }
    },
    insert: async (values) => {
        try {
            const response = await axios.post(DOCTORPOLIS.POST, values, { headers: { Accept: 'application/json', 'Content-Type': 'application/json' } })
            const { data } = response;
            
            if (response.status === 200) return data;

            return response.data.message
        } catch (e) {
            console.log('Error', e.response.data);
        }
    },
    remove: async (key) => {
        try {
            const response = await axios.delete(DOCTORPOLIS.DELETE(key), { headers: { Accept: 'application/json', 'Content-Type': 'application/json' } })
            const { data } = response;
            
            if (response.status === 200) return data;

            return response.data.message
        } catch (e) {
            console.log('Error', e.response.data);
        }
    },
    update: async (key, values) => {
        try {
            const response = await axios.put(DOCTORPOLIS.UPDATE(key), values, { headers: { Accept: 'application/json', 'Content-Type': 'application/json' } })
            const { data } = response;
            
            if (response.status === 200) return data;

            return response.data.message
        } catch (e) {
            console.log('Error', e.response.data);
        }
    }
})



export default function DoctorsPolis() {
    const classes = useStyles();
    return (
        <Fragment>
            <Breadcrumbs aria-label="breadcrumb">
                <Link color="inherit" className={classes.link} >
                    <WhatshotIcon className={classes.icon} />
                    Master Data
                </Link>
                <Typography color="textPrimary" className={classes.link}>
                    <GrainIcon className={classes.icon} />
                    DoctorsPolis
                </Typography>
            </Breadcrumbs>

            <SmartERPDataGrid id="Master DoctorsPolis" dataSource={masterDoctorsPolisData}>
                {DataGridOptions({ fileName: "MasterDoctorsPolis" })}
                {[{ dataField: "DoctorsPolisId", caption: "ID", visible: false, fixed: true },
                { dataField: "IsActive", caption: "IsActive", fixed: true },
                { dataField: "CreatedBy", caption: "Created By" },
                { dataField: "createdAt", caption: "Created At", dataType: "datetime" },
                { dataField: "UpdatedBy", caption: "Modified By" },
                { dataField: "updatedAt", caption: "Modified At", dataType: "datetime" }
                ].map(({ Lookups, ...rest }, index) => <Column key={index} {...rest}>
                    {Lookups && <Lookup {...Lookups} />}
                </Column>
                )}
                
                {DataGridItemEditing({
                    title: "Master DoctorsPolis",
                    itemGroup1: {
                        options: {colSpan: 2, colCount: 2},
                        data: ["Nik", "Str" ]
                    },
                    itemGroup2: {
                        options: {colSpan: 2, colCount: 4},
                        data: [ "DoctorName", "Religion", "Specialis", "ExperienceDate"],
                    },itemGroup3: {
                        options: {colSpan: 2, colCount: 4},
                        data: ["PlaceOfBirth", "DateOfBirth", "Address", "PhoneNo1"],
                    },
                    remark: "none"
                })}
            </SmartERPDataGrid>
        </Fragment>
    );
}
