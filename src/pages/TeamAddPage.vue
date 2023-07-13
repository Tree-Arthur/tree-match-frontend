<template>
  <div id="teamAddPage">
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <!--        队伍名-->
        <van-field
            v-model="addTeamData.name"
            name="name"
            label="队伍名"
            placeholder="请输入队伍名"
            :rules="[{ required: true, message: '请填写队伍名' }]"
        />
        <!--        队伍描述-->
        <van-field
            v-model="addTeamData.description"
            rows="4"
            autosize
            label="队伍描述"
            type="textarea"
            placeholder="请输入队伍描述"
        />
        <!--过期时间-->
        <van-field
            is-link
            readonly
            name="datePicker"
            label="过期时间"
            :placeholder="addTeamData.expireTime ?? '点击选择关闭队伍的时间'"
            @click="showPicker = true"
        />
        <van-popup v-model:show="showPicker" position="bottom">
          <van-date-picker
              @confirm="onConfirm"
              @cancel="showPicker = false"
              type="datetime"
              title="请选择关闭队伍时间"
              :min-date="minDate"
          />
        </van-popup>

        <!--        最大人数-->
        <van-field name="stepper" label="最大人数">
          <template #input>
            <van-stepper v-model="addTeamData.maxNum" max="10" min="3"/>
          </template>
        </van-field>
        <!--        队伍状态-->
        <van-field name="radio" label="队伍状态">
          <template #input>
            <van-radio-group v-model="addTeamData.status" direction="horizontal">
              <van-radio name="0">公开</van-radio>
              <van-radio name="1">私有</van-radio>
              <van-radio name="2">加密</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <!--        密码-->
        <van-field
            v-if="addTeamData.status === '2'"
            v-model="addTeamData.password"
            type="password"
            name="password"
            label="密码"
            placeholder="请输入队伍密码"
            :rules="[{ required: true, message: '请填写密码' }]"
        />
      </van-cell-group>
      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>

  </div>

</template>

<script setup lang="ts">

import {useRouter} from "vue-router";
import {ref} from "vue";
import {showFailToast, showSuccessToast} from "vant";
import myAxios from "../plugins/myAxios";

const router = useRouter();
//展示日期选择器
const showPicker = ref(false);
const minDate = new Date();
//表单默认信息
const initFromData = {
  "name": "",
  "description": "",
  "expireTime": null,
  "maxNum": 3,
  "password": "",
  "status": 0,
  "userId": 0
}
// 需要用户填写的表单数据
const addTeamData = ref({...initFromData})

const onConfirm = ({selectedValues}) => {
  addTeamData.value.expireTime = selectedValues.join('-');
  showPicker.value = false;
};
//提交
const onSubmit = async () =>{
  const postData = {
    ...addTeamData.value,
    status: Number(addTeamData.value.status)
  }
  //todo 前端数据校验
  const res = await myAxios.post("/team/add",postData);
  if (res?.code === 0 && res.data){
    showSuccessToast('队伍添加成功')
    router.push({
      path:'/team',
      replace:true,
    });
  }else {
    showFailToast('队伍添加失败');
  }
}

</script>

<style scoped>

</style>