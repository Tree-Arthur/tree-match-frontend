<template>
  <div id="teamCardList">
    <van-card
        v-for="team in props.teamList"
        :thumb="tp"
        :desc="team.description"
        :title="`${team.name}`"
    >
      <!--    卡片角标-->
      <template #tags>
        <van-tag plain type="primary" style="margin-right: 8px;margin-top: 8px">
          {{ teamStatusEnum[team.status] }}
        </van-tag>
      </template>

      <template #bottom>
        <div>
          {{ `队伍人数: ${team.hasJoinNum}/${team.maxNum}` }}
        </div>
        <div v-if="team.expireTime">
          {{ '过期时间: ' + team.expireTime }}
        </div>
        <div v-if="team.createTime">
          {{ '创建时间: ' + team.createTime }}
        </div>
      </template>

      <template #footer>
        <!--        不是创建人并且未加入 可见-->
        <van-button size="small" type="primary" plain
                    v-if="team.userId !== currentUser?.id && !team.hasJoin"
                    @click="preJoinTeam(team)">
          加入队伍
        </van-button>
        <!--仅创建人可见-->
        <van-button v-if="team.userId === currentUser?.id"
                    size="small" plain @click="doUpdateTeam(team.id)">
          更新队伍
        </van-button>
        <!--不是创建人并且加入 可见-->
        <van-button v-if="team.userId !== currentUser?.id && team.hasJoin"
                    size="small" plain @click="doQuitTeam(team.id)">
          退出队伍
        </van-button>
        <!--仅创建人可见-->
        <van-button v-if="team.userId === currentUser?.id"
                    type="danger" size="small" plain @click="doDeleteTeam(team.id)">
          解散队伍
        </van-button>
      </template>
    </van-card>
    <van-dialog v-model:show="showPasswordDialog" title="请输入密码" show-cancel-button
                @confirm="doJoinTeam()" @cancel="doJoinCancel">
      <van-field v-model="password" placeholder="请输入密码"/>
    </van-dialog>
  </div>


</template>

<script setup lang="ts">
import {TeamType} from "../models/team";
import {teamStatusEnum} from "../constants/team";
import tp from "../assets/1.jpg";
import myAxios from "../plugins/myAxios";
import {showFailToast, showSuccessToast} from "vant";
import {getCurrentUser} from "../services/user";
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";

const router = useRouter();//页面跳转
const currentUser = ref();

interface TeamCardListProps {
  teamList: TeamType[];
}

const props = withDefaults(defineProps<TeamCardListProps>(), {
  //@ts-ignore 忽略ts语法报错
  teamList: [] as TeamType[],
});
const showPasswordDialog = ref(false);
const password = ref('');
const joinTeamId = ref();

const preJoinTeam = (team: TeamType) =>{
  joinTeamId.value = team.id;
  if(team.status === 0){
    doJoinTeam();
  }else {
    showPasswordDialog.value = true;
  }
}
/**
 * 点击取消清空密码及队伍id
 */
const doJoinCancel = () =>{
  joinTeamId.value = 0;
  password.value = '';
}

/**
 * 加入队伍
 */
const doJoinTeam = async () => {
  if (!joinTeamId.value){return}
  const res = await myAxios.post('/team/join', {
    teamId: joinTeamId.value,
    password: password.value,
  });
  if (res.code === 0) {
    showSuccessToast('加入成功');
    doJoinCancel();
  } else {
    showFailToast('加入失败' + (res.description ? `,${res.description}` : ''))
  }
}
/**
 * 跳转至更新队伍页面
 * @param id 队伍id
 */
const doUpdateTeam = (id: number) => {
  router.push({
    path: '/team/update',
    query: {
      id,
    }
  })
}

/**
 * 退出队伍
 * @param id 队伍id
 */
const doQuitTeam = async (id: number) => {
  const res = await myAxios.post('/team/quit', {
    teamId: id
  });
  if (res.code === 0) {
    // showSuccessToast('操作成功')
  } else {
    showFailToast('操作失败' + (res.description ? `,${res.description}` : ''))
  }
}

/**
 * 解散队伍
 * @param id 队伍id
 */
const doDeleteTeam = async (id: number) => {
  const res = await myAxios.post('/team/delete', {
    id,
  });
  if (res.code === 0) {
    // showSuccessToast('操作成功')
  } else {
    showFailToast('操作失败' + (res.description ? `,${res.description}` : ''))
  }
}


//钩子函数 首次加载初始化执行
onMounted(async () => {
  currentUser.value = await getCurrentUser();
})


</script>

<style scoped>
/*图片样式*/
#teamCardList :deep(.van-image__img) {
  height: 128px;
  object-fit: unset;
}


</style>