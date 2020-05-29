<template>
  <div class="log_list">
    <h1 class="main__title">Сервис логирования</h1>
    <Searching/>
      <table>
        <thead>
          <tr>
            <th>Сервис</th>
            <th>Раздел</th>
            <th>Подраздел</th>
            <th>UserId</th>
            <th>Уровень</th>
            <th>Время <img src="../assets/arrow.png" class="arrow" :class="{arrow_active:sortTime}" @click="sortByTimeDesc(sortByTime)"></th>
            <th>Данные</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(log,ind) of paginatedLogs" :key="ind" >
              <td>{{log.ServiceName}}</td>
              <td>{{log.Section}}</td>
              <td>{{log.Subsection}}</td>
              <td>{{log.UserId}}</td>
              <td v-if="log.Level === 'Fatal'">
                <span :style="{backgroundColor: '#AF00CC'}" class="level__Server">{{log.Level}}</span>
              </td>
              <td v-else-if="log.Level === 'Erorr'">
                <span :style="{backgroundColor: '#FF0000'}" class="level__Server">{{log.Level}}</span>
              </td>
              <td v-else-if="log.Level === 'Info'">
                <span :style="{backgroundColor: '#7277FF'}" class="level__Server">{{log.Level}}</span>
              </td>
              <td v-else-if="log.Level === 'Debug'">
                <span :style="{backgroundColor: '#FFFFFF'}" class="level__Server">{{log.Level}}</span>
              </td>
              <td v-else>
                <span :style="{backgroundColor: '#FFF615'}" class="level__Server">{{log.Level}}</span>
              </td>
              <td>{{log.RegistrationTime | timeZone }}</td>
              <td>{{log.Data}}</td>
          </tr>
        </tbody>
    </table>
    <div class="logs__wrapper">
      <div class="logs__lenth_all">
        <span class="logs__lenth_all-title">Всего записей: {{logsTaskerAll}}</span>
          <div class="logs__lenth_page">
            <span class="logs__length_page-title">На страницу:</span>
            <select class="selecter" @change="logsLengthAll($event)">
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
        </div> 
      </div>
      <div class="pages__wrapper">
        <div class="pages__btn" @click="changePage(prevPageButton)">предыдущая</div>
        <div class="page" 
            v-for="page in pages" 
            :key="page"
            :class="{'pageSelected': page === pageNumber}"
            @click="nextPage(page)">
            {{page}}
        </div>
        <div class="pages__btn" @click="changePage(nextPageButton)">следующая</div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions,mapGetters} from 'vuex'
import Searching from '@/components/Searching'
export default {
  name: 'LogList',
  components:{
    Searching
  },
  data(){
    return{
      logPerPage: 10,
      pageNumber: 1,
      sortTime: false
    }
  },
  methods:{
     ...mapActions(['getLogsFromServer','logsLengthAll']),

        nextPage(page){
          this.pageNumber = page
        },

        logsLengthAll(e){
          this.logPerPage = parseInt(e.target.options[e.target.options.selectedIndex].value)
          this.pageNumber = 1
        },

        changePage(nextPageButton){
          this.pageNumber = nextPageButton
        },

        changePage(prevPageButton){
          this.pageNumber = prevPageButton
        },

        sortByTimeDesc(sortByTime){
          this.sortTime = !this.sortTime
        }
  },
  computed:{
      ...mapGetters(['logsTasker','logsTaskerAll','getFilteredLogs']),

        filteredCourses(){
          try {
              let checkFiltered = (this.getFilteredLogs || this.logsTasker)
              return checkFiltered
              }catch (e) {
                  console.log(e)
              }
        },

        sortByTime(){
          if(this.sortTime === false){
              return this.filteredCourses.sort(function (a, b) {
                  return b.RegistrationTime.localeCompare(a.RegistrationTime);
              })  
          }else{
              return this.filteredCourses.sort(function (a, b) {
                  return a.RegistrationTime.localeCompare(b.RegistrationTime);
              })      
          }  
        },

        nextPageButton(){
          if(this.pageNumber === this.pages){
              this.pageNumber = 0
          }
          return this.pageNumber + 1;
        },

        prevPageButton(){
          if(this.pageNumber === 1){
            return this.pageNumber = 1
          }
          return this.pageNumber - 1
        },

        pages(){
          return Math.ceil((this.filteredCourses.length /  this.logPerPage ))
        },

        paginatedLogs(){
          let fromPag =  (this.pageNumber -1) * this.logPerPage;
          let toPag = fromPag + this.logPerPage; 
          return this.filteredCourses.slice(fromPag, toPag)
        },
    },
    mounted(){
        this.getLogsFromServer()
    },
    filters:{
        timeZone: function (value) {
          if (value) {
              return (new Date(value)).toLocaleString() 
          }
        }
    }
}
</script>

<style scoped>
.log_list{
  margin:10px 0;
}
.main__title{
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 40px;
  line-height: 47px;
  color: #000000;
  margin-bottom: 10px ;
  margin-top: 0;
}
table{
  border-collapse: collapse;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  border: 1px solid;
  width: 100%;
}
th{
  position: relative;
  border: 1px solid #000000;
  padding: 10px ;
  background: #B9B9B9;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  color: #000000;
}
tr:nth-child(odd){
    background: #EDEDED;
}
tr:nth-child(even){
    background: #DFDFDF;
}
td{
  border: 1px solid #000000;
  padding: 10px;
  text-align: center;
  border-top: none;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  color: #000000;
  border-bottom: none;
}
.arrow{
  position: absolute;
  left: 80%;
  cursor:pointer;
  top: 45%;
}
.logs__wrapper{
  display: flex;
  align-items:center;
  justify-content: space-between;
  margin-top:20px;
}
.logs__lenth_all{
  flex: 0 0 31.25%;
  display: flex;
  align-items: center;
}
.logs__lenth_page{
  display: flex;
  align-items:center;
}
.logs__lenth_all-title{
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  margin-right: 20px;
  color: #000000;
}
.logs__length_page-title{
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  color: #000000;
  margin-right: 5px;
}
.pages__wrapper{
  display: flex;
  align-items: center;
  justify-self: space-between;
}
.pages__btn{
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  cursor: pointer;
  padding: 4px 11px;
  color: #FFFFFF;
  background: linear-gradient(0deg, #969696, #969696), linear-gradient(0deg, #969696, #969696), #969696;
}
.level__Server{
  padding:4px;
  border: 1px solid #ffffff;
  width: 100%;
  display: block;
  box-sizing: border-box;
}
.page{
  padding: 1px 11px;
  cursor: pointer;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  color: #000000;
}
.green{
  background-color: green;
}
.pageSelected{
  color:blue
}
.arrow_active{
  transform: rotate(-180deg);
}
</style>
