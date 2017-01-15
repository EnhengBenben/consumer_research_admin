(function () {
  'use strict';

  angular
    .module('app')
    .controller('ContractorsListCtrl', Controller);

  /* @ngInject */
  function Controller($localStorage, $state, FreelanceService, $scope, ContractorsService, AuthService) {
    var vm = this;
    vm.first = first;
    vm.last = last;
    vm.filterPage = filterPage;
    vm.more = more;
    vm.selectCity = selectCity;
    vm.selectProvince = selectProvince;
    vm.selectSkills = selectSkills;
    vm.checkItems = checkItems;
    vm.checkExp = { //选中的行业经验
      ids: []
    };
    vm.checkSkills = { //选中的擅长技能类型
      ids: []
    };
    vm.skillsItem = { ////选中的擅长技能
      items: []
    };
    vm.filter = {
      1: null,
      2: null,
      3: null,
    };
    vm.page = {
      pageSize: 10,
      currentPage: 1
    };
    vm.flattypeArr = [{id: 0, name: '企业'}, {id: 1, name: '事业单位'}, {id: 2, name: '民办非企业单位'},
                      {id: 3, name: '个体工商户'}, {id: 4, name: '社会团体'}, {id: 5, name: '党政及国家单位'}];

    return init();

    function init(){
      vm.pageArr = [];
      vm.pageList = {
        currentPage: 1, //当前页数
        pageSize: 1 //每页条数
      };
      vm.nowPage = vm.pageList.nowPage;
      for (var i = 1; i <= vm.pageList.total; i++) {
        vm.pageArr.push(i);
      }
      /*******************获取筛选条件列表start*************************/
      FreelanceService
        .province()
        .then(function (res) {
          vm.citys = res.data;
        });
      AuthService
        .experience()
        .then(function(res){
          vm.experiences = res.data;
        });
      AuthService
        .skill()
        .then(function(res){
          vm.skills = res.data;
        });
      /*******************获取筛选条件列表end*************************/
      ContractorsService
        .list(vm.page)
        .then(function(res){
          vm.lists = res.data.jsonArray;
          for (var i = 1; i <= res.data.total; i++) {
            vm.pageArr.push(i);
          }
          vm.lists.map(function(i){
             vm.flattypeArr.map(function(j){
               if(i.flattype === j.id){
                 return i.flattype = j.name;
               }
             })
          })
        });
      $scope.$watch('vm.pageList.currentPage', function (newValue, oldValue, scope) {
        if (newValue != oldValue) {
          ManageService
            .more(vm.pageList)
            .then(function (res) {
              vm.lists = res.data.jsonArray;
            })
        }
      }, true);
      $scope.$watch('vm.checkSkills', function (newValue, oldValue, scope) {
        if (newValue != oldValue) {
          console.log(vm.checkSkills);
        }
      }, true);
      $scope.$watch('vm.checkExp', function (newValue, oldValue, scope) {
        if (newValue != oldValue) {
          vm.experienceList = vm.checkExp.ids.join(',');
          console.log(vm.experienceList);
        }
      }, true);
    }

    function first() {
      vm.pageList.currentPage = 1;
    }

    function last() {
      vm.pageList.currentPage = vm.pageArr.length;
    }

    function filterPage(data) {
      vm.pageList.currentPage = data;
    }

    function more() {
      //更多省市按钮
      vm.tag = !vm.tag;
    }

    function selectCity(data) {
      vm.select = data;
      vm.filter[1] = data.id;
      vm.tag = !vm.tag;
    }

    function selectProvince(data){
      console.log(data);
      vm.filter[1] = data;
      vm.tag = !vm.tag;
    }

    function selectSkills(data, list){
      angular.forEach(vm.skills, function(i){
        if(i.pid === list.pid){
          angular.forEach(i.diclist,function(d){
            if(d.id === data.id){
              if(d.selected){
               delete d.selected;
              }else {
                d['selected'] = true;
              }
            }
          })
        }
      })
    }
    function checkItems(data){
      /*angular.forEach(data.diclist,function(i){
        if(i.selected){
          vm.skillsItem.items.push(i.id);
        }
      });
      var params = vm.skillsItem.items.join(',');*/
      var params = [];
      angular.forEach(vm.skills,function(lists){
        if(lists.selected && lists.opened){
          angular.forEach(lists.diclist, function(i){
            if(i.selected){
              params.push(i.id);
            }
          });
          lists.opened = false;
        }else {
          delete lists.selected;
          delete lists.opened;
          angular.forEach(lists.diclist, function(i){
            if(i.selected){
              delete i.selected;
            }
          });
        }
      });
      console.log(params.join(','));
    }
  }
})();
