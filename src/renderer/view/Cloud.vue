<template>
  <div class="cloudWrapper">
    <div class="l">
      <Title></Title>
      <section>
        <Progress :type='1'></Progress>
        <AutoSelect></AutoSelect>
        <ManuallySelect></ManuallySelect>
      </section>
      <section>
        <Progress></Progress>
        <SellCloud></SellCloud>
      </section>
      <section>
        <SellRecords></SellRecords>
        <div class="tips">
          <p>已租出空間若申請撤銷需等待客人同意,否則視同無緣下架,扣除保證金.</p>
          <p>未租出空間若申請撤銷於24小時內若無人購買即會自動下架.</p>
        </div>
      </section>
    </div>
    <div class="r">
      <UserInfo></UserInfo>
    </div>

  </div>
</template>

<script>
import Title from '@/components/Cloud/Title'
import Progress from '@/components/Cloud/Progress'
import AutoSelect from '@/components/Cloud/AutoSelect'
import ManuallySelect from '@/components/Cloud/ManuallySelect'
import SellCloud from '@/components/Cloud/SellCloud'
import SellRecords from '@/components/Cloud/SellRecords'
import UserInfo from '@/components/Cloud/UserInfo'
export default {
  data() {
    return {}
  },
  components: {
    Title,
    Progress,
    AutoSelect,
    ManuallySelect,
    SellCloud,
    SellRecords,
    UserInfo
  },
  computed: {},
  methods: {},
  watch: {},
  created() {}
}
</script>

<style  lang='scss' scoped>
.cloudWrapper {
  padding: 0 40px;
  width: 100%;
  background: #fff;
  display: flex;
  .l {
    width: 600px;
    padding-right: 30px;
    > section {
      margin-bottom: 50px;
      border-top: 1px solid #e8e8e9;
    }
    .tips {
      margin-top: 20px;
      font-size: 12px;
      color: #888888;
    }
  }
  .r {
    width: 250px;
  }
}
</style>
