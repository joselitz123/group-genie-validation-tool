import axios from 'axios';
import { LOAD_VALIDATION_RESULT, SHOW_MODAL_LOADER, LOAD_TOTAL_USERS_TO_EXTRACT, CURRENT_EXTRACT_COUNT } from './actionTypes';
import fs from 'fs';
import path from 'path';
import { setTimeout } from 'timers';


export const closeModal = () => dispatch => {
    dispatch({
        type: SHOW_MODAL_LOADER,
        payload: false
    })
}

export const triggerValidate = (inputUsers, selectedFilterGroups) => dispatch => {

    dispatch({
        type: SHOW_MODAL_LOADER,
        payload: true
    })

    const arrUsers = inputUsers.split("\n");


    dispatch({
        type: LOAD_TOTAL_USERS_TO_EXTRACT,
        payload: arrUsers.length
    })

    validate(arrUsers, selectedFilterGroups, dispatch);

}   


const validate = async (users, selectedFilterGroups, dispatch) => {

    const allUserAccessStat = await validateUsersAccess(users, selectedFilterGroups, dispatch);

    dispatch({
        type: LOAD_VALIDATION_RESULT,
        payload: allUserAccessStat
    });

}

const validateUsersAccess = (users, selectedFilterGroups, dispatch) => {

    return new Promise(async(resolve, reject) => {

        try {

            const allUserAccessStat = await users.reduce(async(prevValue, user, index) => {

                const awaitPrevValue = await prevValue;

                const userTrimmed = user.trim();

                const re = new RegExp(/((^([A-Z]{2})([0-9]{4})$))/, 'gi');

                const search = re.exec(userTrimmed) ? `memberdn=uid=${userTrimmed},ou=people,ou=pg,o=world` : `accountshortname=${userTrimmed}`;

                const data = await makeRequestToGroupService(search);

                await dispatch({
                    type: CURRENT_EXTRACT_COUNT,
                    payload: index + 1
                });

                const parser = new DOMParser();

                const xmlDoc = parser.parseFromString(data, "text/xml");

                const dataDn = xmlDoc.getElementsByTagName('group')[0].getAttribute('dn');

                const groupElements = xmlDoc.getElementsByTagName('group');
                
                let groupList = {};

                for (let index = 0; index < groupElements.length; index++) {
                    
                    const groupName = groupElements[index].getAttribute('dn').split(',')[0].split("=")[1];

                    groupList = {...groupList, [groupName]: groupName}
                    
                }

                const accessStats = await selectedFilterGroups.reduce((prevVal,curVal) => {

                    return groupList[curVal.group_name] != undefined ? {...prevVal, [curVal.group_alias]: {val_result: true, group_alias: curVal.group_alias}} : {...prevVal, [curVal.group_alias]:{val_result: false, group_alias: curVal.group_alias}}

                }, {});

                return {...awaitPrevValue, [user]: {user: user, access: accessStats }}

            }, Promise.resolve({}));

            resolve(await allUserAccessStat);
            
        } catch (error) {

            reject(error);
            
        }

    })

}

const makeRequestToGroupService = (search) => {

    return new Promise((resolve, reject) => {

        try {

            axios.get(`http://groupservice.internal.pg.com/GDSGroupService.jrun?op=getmembergroups&${search}`)
            .then((data) => {

                resolve(data.data);

            });
            
        } catch (error) {

            reject(error);
            
        }

    })

}