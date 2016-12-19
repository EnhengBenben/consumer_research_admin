(function(){

  'use strict';

  angular.module('app')
    .service('PersonalService', Service);

  /*@inject*/

  function Service(ENDPOINT, $http){
    return{
      list: list,//自由职业者列表
      show: show,//自由职业者详情
      searchInfo: searchInfo, //获取企业注册信息
      updateBase: updateBase, // 保存企业基本信息
      updateCompanyExp: updateCompanyExp,//保存企业行业经验
      updateCompanySkill: updateCompanySkill, //保存企业擅长技能
      updateCompanyQua: updateCompanyQua, //保存企业资质
      updateFreelanceBase: updateFreelanceBase, //保存自由职业者基本信息
      updateFreelanceExp: updateFreelanceExp, //保存自由职业者行业经验
      updateFreelanceSkill: updateFreelanceSkill, //保存自由职业者擅长技能
      updateFreelanceResume: updateFreelanceResume, //保存自由职业者履历
    };

    function updateCompanyExp(data){
      return  $http({
        url: ENDPOINT + '/updateQYExperience.action',
        method: 'POST',
        data: data
      })
    }
    function updateCompanySkill(data){
      return  $http({
        url: ENDPOINT + '/updateQYSkills.action',
        method: 'POST',
        data: data
      })
    }
    function updateCompanyQua(data){
      return  $http({
        url: ENDPOINT + '/updateEnterpriseQualification.action',
        method: 'POST',
        data: data
      })
    }
    function updateFreelanceBase(data){
      return  $http({
        url: ENDPOINT + '/updatePersonInfo.action',
        method: 'POST',
        data: data
      })
    }
    function updateFreelanceExp(data){
      return  $http({
        url: ENDPOINT + '/updatePSExperience.action',
        method: 'POST',
        data: data
      })
    }
    function updateFreelanceSkill(data){
      return  $http({
        url: ENDPOINT + '/updatePSSKills.action',
        method: 'POST',
        data: data
      })
    }
    function updateFreelanceResume(data){
      return  $http({
        url: ENDPOINT + '/updateResume.action',
        method: 'POST',
        data: data
      })
    }

    function list(params){
     return  $http({
        url: ENDPOINT + '',
        method: 'GET',
        params: params
      })
    }

    function updateBase(data){
      return  $http({
        url: ENDPOINT + '/updateQYBaseInfo.action',
        method: 'POST',
        data: data
      })
    }

    function searchInfo(params){
      return  $http({
        url: ENDPOINT + '/searchInfoByUserId.action',
        method: 'GET',
        params: params
      })
    }

    function show(params){
    return  $http({
        url: ENDPOINT + '',
        method: 'GET',
        params: params
      })
    }

  }
})();
