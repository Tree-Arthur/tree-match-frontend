<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          v-model="editUser.currentValue"
          :name="editUser.editKey"
          :label="editUser.editName"
          :placeholder="`请输入${editUser.editName}`"
      />
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>

</template>

<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios";
import {showFailToast, showSuccessToast} from "vant";
import {getCurrentUser} from "../services/user";

const route = useRoute()
// 路由引入
const router = useRouter()

const editUser = ref({
  editKey: route.query.editKey,
  currentValue: route.query.currentValue,
  editName: route.query.editName
})

// 不可以写在外面，否则页面不显示内容，还没有报错信息，原因未知
//const currentUser = await getCurrentUser();

const onSubmit = async () => {
  // 异步方法必须添加 await 才可以拿到数据, 否则拿到的是 promise 对象
  const currentUser = await getCurrentUser();
  console.log("-------UserEditPage", currentUser);

  if (!currentUser){
    showFailToast('用户未登录');
    return;
  }

  const res = await myAxios.post('/user/update',{
    'id': currentUser.id,
    [editUser.value.editKey as string]: editUser.value.currentValue
  })
  console.log(res,'更新请求');
  if (res.code === 0 && res.data > 0){
    showSuccessToast('修改成功');//提示修改成功
    router.back();//修改成功返回之前页面
  }else {
    showFailToast('修改失败');//提示修改失败
  }
};
</script>

<style scoped>

</style>