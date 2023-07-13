/**
 * 队伍类别
 */
import {UserType} from "./user";

export type TeamType = {
    id: number;
    name: string;
    description: string;
    expireTime?: Date;
    maxNum: number;
    password?: string;
    // todo 定义枚举值类型
    status: number;
    createTime: Date;
    updateTime: Date;
    createUser?: UserType;
    hasJoinNum?: number;
}