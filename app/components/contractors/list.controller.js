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
    //vm.selectSkills = selectSkills;
    vm.checkItems = checkItems;
    vm.params = {
      currentPage: 1,
      pageSize: 10,
    };
    vm.checkExp = { //选中的行业经验
      ids: []
    };
    vm.checkSkills = { //选中的擅长技能类型
      ids: []
    };
    vm.skillsItem = { ////选中的擅长技能
      items: []
    };
    vm.choice = choice;
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

    function init() {
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
        .then(function (res) {
          vm.experiences = res.data;
        });
      AuthService
        .skill()
        .then(function (res) {
          vm.skills = res.data;
        });
      /*******************获取筛选条件列表end*************************/
      /********************------------------*************************/
      /*******************获取承包方列表start*************************/
      ContractorsService
        .list(vm.page)
        .then(function (res) {
          vm.lists = res.data.jsonArray;
          for (var i = 1; i <= res.data.total; i++) {
            vm.pageArr.push(i);
          }
          vm.lists.map(function (i) {
            vm.flattypeArr.map(function (j) {
              if (i.flattype === j.id) {
                return i.flattype = j.name;
              }
            })
          })
        });
      /*******************获取承包方列表end*************************/
      $scope.$watch('vm.pageList.currentPage', function (newValue, oldValue, scope) {
        if (newValue != oldValue) {
        /*  ManageService
            .more(vm.pageList)
            .then(function (res) {
              vm.lists = res.data.jsonArray;
            })*/
        }
      }, true);
      $scope.$watch('vm.skills', function (newValue, oldValue, scope) {
        if (newValue != oldValue) {
          var params = [];
          angular.forEach(vm.skills, function(lists){
            angular.forEach(lists.diclist, function(data){
              if(data.selected){
                params.push(data.id);
              }
            })
          });
          console.log(params);//选中技能
          if(params.length)
          vm.params['skills'] = params.join(',');
          else {
            delete vm.params.skills;
          }
        }
      }, true);
      $scope.$watch('vm.checkExp', function (newValue, oldValue, scope) {
        if (newValue != oldValue) {
          vm.experienceList = vm.checkExp.ids.join(',');
          console.log(vm.experienceList); //选中行业经验
          vm.params['experences'] = vm.experienceList;
        }
      }, true);
      $scope.$watch('vm.filter', function (newValue, oldValue) {
        if (newValue != oldValue) {
          if(vm.filter[1] && vm.filter[1].flag){
            vm.params['provinceid'] = vm.filter[1].id;
            if(vm.params.address){
              delete vm.params.address;
            }
          }else {
            vm.params.address = vm.filter[1];
            delete vm.params.provinceid;
          }
          vm.params['currentPage'] = 1;
          vm.params['pageSize'] = 10;
          vm.pageList.currentPage = 1;
          vm.pageList.pageSize = 10;
       /*   FreelanceService
            .list(vm.params)
            .then(function (res) {
              vm.lists = res.data.jsonArray;
              vm.pageArr = [];
              for (var i = 1; i <= res.data.totalPage; i++) {
                vm.pageArr.push(i);
              }
            })*/
        }
      }, true);
      $scope.$watch('vm.params', function (newValue, oldValue){
        if(newValue != oldValue){
          console.log(vm.params);
          ContractorsService
            .list(vm.params)
            .then(function(res){
              vm.lists = res.data.jsonArray;
             /* for (var i = 1; i <= res.data.total; i++) {
                vm.pageArr.push(i);
              }*/
              vm.lists.map(function (i) {
                vm.flattypeArr.map(function (j) {
                  if (i.flattype === j.id) {
                    return i.flattype = j.name;
                  }
                })
              })
            })
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

    function selectProvince(data) {
      console.log(data);
      vm.filter[1] = data;
      vm.tag = !vm.tag;
    }

    function choice(index, data) {
      //筛选条件选择活动项
      vm.filter[index] = data;
      vm.active = data;
    }

    //function selectSkills(data, list){
    //  angular.forEach(vm.skills, function(i){
    //    if(i.pid === list.pid){
    //      angular.forEach(i.diclist,function(d){
    //        if(d.id === data.id){
    //          if(d.selected){
    //           delete d.selected;
    //          }else {
    //            d['selected'] = true;
    //          }
    //        }
    //      })
    //    }
    //  })
    //}
    function checkItems(data) {
      /*angular.forEach(data.diclist,function(i){
       if(i.selected){
       vm.skillsItem.items.push(i.id);
       }
       });
       var params = vm.skillsItem.items.join(',');*/
      var params = [];
      angular.forEach(vm.skills, function (lists) {
        angular.forEach(lists.diclist, function (i) {
          if (i.selected) {
            i.selected = true;
            params.push(data.id);
          }else {
           delete i.selected;
          }
        });
      });
      console.log(params.join(','));
    }
  }
})();
