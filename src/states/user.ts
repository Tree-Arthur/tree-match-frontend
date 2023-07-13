import {UserType} from "../models/user";
//存储当前用户信息
let currentUser: UserType;
//设置值
const setCurrentUserState =(user:UserType)=>{
    currentUser = user;
}
//取值
const getCurrentUserState= (): UserType   =>{
    return currentUser;
}
//导出
export {
    setCurrentUserState,
    getCurrentUserState,
}