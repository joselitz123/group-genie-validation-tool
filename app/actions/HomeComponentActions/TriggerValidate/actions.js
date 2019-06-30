import React from 'react';
import axios from 'axios';
import { LOAD_VALIDATION_RESULT, SHOW_MODAL_LOADER, LOAD_TOTAL_USERS_TO_EXTRACT, CURRENT_EXTRACT_COUNT, RESET_LOADER_UI_STATE, LOAD_ALL_USERS_ACCESS } from './actionTypes';
import fs from 'fs';
import path from 'path';
import { setTimeout } from 'timers';


export const closeModal = () => dispatch => {
    dispatch({
        type: SHOW_MODAL_LOADER,
        payload: false
    });
}

export const resetLoaderUIState = () => dispatch => {

    dispatch({
        type: RESET_LOADER_UI_STATE
    });

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

    const allUserAccessStat = await pullUsersAccess(users, dispatch);

    dispatch({
        type: LOAD_ALL_USERS_ACCESS,
        payload: allUserAccessStat
    })


    const userAccessStats = await checkAccessAvailability(users, allUserAccessStat, selectedFilterGroups);

    dispatch({
        type: LOAD_VALIDATION_RESULT,
        payload: userAccessStats
    });

}

const pullUsersAccess = (users, dispatch) => {

    return new Promise(async(resolve, reject) => {

        try {

            const allUserAccess = await users.reduce(async(prevValue, user, index, arr) => {

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

                const groupElements = xmlDoc.getElementsByTagName('group');

                let groupList = {};

                for (let index = 0; index < groupElements.length; index++) {

                    const groupName = groupElements[index].getElementsByTagName('name')[0].childNodes[0].nodeValue;

                    const groupDesc = groupElements[index].getElementsByTagName('description')[0].childNodes[0].nodeValue;

                    groupList = {...groupList, [groupName]: {name: groupName, description: groupDesc}}
                    
                }

                return {...awaitPrevValue, [user]: {user: user, access: groupList }}

            }, Promise.resolve({}));

            resolve(await allUserAccess);
            
        } catch (error) {

            reject(error);
            
        }

    })

}

const checkAccessAvailability = (users, allUserAccessStat, selectedFilterGroups) => {

    const result = users.reduce((prevVal, curUser) => {

        const access = selectedFilterGroups.reduce((pVal, cVal)=> {

            return typeof allUserAccessStat[curUser].access[cVal.group_name] != "undefined" ? {...pVal, [cVal.group_alias]: {val_result: true, group_alias: cVal.group_alias}} : {...pVal, [cVal.group_alias]: {val_result: false, group_alias: cVal.group_alias}};

        }, {});

        return {...prevVal, [curUser]: {user: curUser, access: access }}

    }, {});

    return result;

}

const makeRequestToGroupService = (search) => {

    return new Promise((resolve, reject) => {

        try {

            axios.get(`http://groupservice.internal.pg.com/GDSGroupService.jrun?op=getmembergroups&${search}&attributes=name,description`)
            .then((data) => {

                resolve(data.data);

            }).catch(err => {

                reject(error);

            });
            
        } catch (error) {

            reject(error);
            
        }

    })

}