<template>
  <div id="teamUpdatePage">
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <!--        队伍名-->
        <van-field
            v-model="updateTeamData.name"
            name="name"
            label="队伍名"
            placeholder="请输入队伍名"
            :rules="[{ required: true, message: '请填写队伍名' }]"
        />
        <!--        队伍描述-->
        <van-field
            v-model="updateTeamData.description"
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
            :placeholder="updateTeamData.expireTime ?? '点击选择关闭队伍的时间'"
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
        <!--        队伍状态-->
        <van-field name="radio" label="队伍状态">
          <template #input>
            <van-radio-group v-model="updateTeamData.status" direction="horizontal">
              <van-radio name="0">公开</van-radio>
              <van-radio name="1">私有</van-radio>
              <van-radio name="2">加密</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <!--        密码-->
        <van-field
            v-if="updateTeamData.status === '2'"
            v-model="updateTeamData.password"
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

import {useRoute, useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {showFailToast, showSuccessToast} from "vant";
import myAxios from "../plugins/myAxios";

const router = useRouter();//页面跳转
const route = useRoute();//获取当前页面路由信息

const id = route.query.id;

//展示日期选择器
const showPicker = ref(false);
const minDate = new Date();
// 需要用户填写的表单数据
const updateTeamData = ref({})
//onMounted 获取之前队伍信息
onMounted(async () => {
  if (id <= 0){
    showFailToast('获取队伍信息失败');
    return;
  }
  const res = await myAxios.get("/team/get",{
    params: {
      id,
    }
  });
  if (res?.code === 0){//获取成功
    updateTeamData.value = res.data;//回填表单数据
  }else {
    showFailToast('获取队伍信息失败,请刷新重试');
  }
})

const onConfirm = ({selectedValues}) => {
  updateTeamData.value.expireTime = selectedValues.join('-');
  showPicker.value = false;
};
//提交
const onSubmit = async () =>{
  const postData = {
    ...updateTeamData.value,
    status: Number(updateTeamData.value.status)
  }
  //todo 前端数据校验
  const res = await myAxios.post("/team/update",postData);
  if (res?.code === 0 && res.data){
    showSuccessToast('队伍更新成功')
    router.push({//页面跳转
      path:'/team',
      replace:true,//禁止返回
    });
  }else {
    showFailToast('队伍更新失败');
  }
}

</script>

<style scoped>

</style>