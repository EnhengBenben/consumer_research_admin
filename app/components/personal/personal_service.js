(function(){

  'use strict';

  angular.module('app')
    .service('PersonalService', Service);

  /*@inject*/

  function Service(ENDPOINT, $http){
    return{
      list: list,//自由职业顾问列表
      show: show,//公司详情
      searchInfo: searchInfo, //获取企业注册信息
      updateBase: updateBase, // 保存企业基本信息
      updateCompanyExp: updateCompanyExp,//保存企业行业经验
      updateCompanySkill: updateCompanySkill, //保存企业擅长技能
      updateCompanyQua: updateCompanyQua, //保存企业资质
      updateFreelanceBase: updateFreelanceBase, //保存自由职业顾问基本信息
      updateFreelanceExp: updateFreelanceExp, //保存自由职业顾问行业经验
      updateFreelanceSkill: updateFreelanceSkill, //保存自由职业顾问擅长技能
      updateFreelanceResume: updateFreelanceResume, //保存自由职业顾问履历
      findInBox: findInBox,//查询收件箱
      findOutbox: findOutbox, //查询发件箱
      deleteInBox: deleteInBox, // 删除私信
      deleteOutBox: deleteOutBox, // 删除私信
      infoAcceptBox: infoAcceptBox, // 收件箱详情
      infoSendBox: infoSendBox,//发件箱详情
      delSendAllMessage: delSendAllMessage, //批量删除发件箱
      delAcceptAllMessage: delAcceptAllMessage, //批量删除发件箱
      findInBox2: findInBox2, //承包方收件箱列表
      countMessage: countMessage, //私信未读数目
      updateMessageStatus: updateMessageStatus, //承包方收件箱列表
    };
    function findInBox2(data){
      return  $http({
        url: ENDPOINT + '/findInBox2.action',
        method: 'POST',
        data: data
      })
    }
    function countMessage(data){
      return  $http({
        url: ENDPOINT + '/countMessage.action',
        method: 'POST',
        data: data
      })
    }
    function updateMessageStatus(data){
      return  $http({
        url: ENDPOINT + '/updateMessageStatus.action',
        method: 'POST',
        data: data
      })
    }

    function delAcceptAllMessage(data){
      return  $http({
        url: ENDPOINT + '/toDelAllInBoxMessage.action',
        method: 'POST',
        data: data
      })
    }

    function delSendAllMessage(data){
      return  $http({
        url: ENDPOINT + '/toDelAllOutBoxMessage.action',
        method: 'POST',
        data: data
      })
    }

    function infoAcceptBox(data){
      return  $http({
        url: ENDPOINT + '/toFindInBoxMessageById.action',
        method: 'POST',
        data: data
      })
    }

    function infoSendBox(data){
      return  $http({
        url: ENDPOINT + '/tofindOutBoxMessageById.action',
        method: 'POST',
        data: data
      })
    }

    function deleteInBox(data){
      return  $http({
        url: ENDPOINT + '/toDeleteInMessageById.action',
        method: 'POST',
        data: data
      })
    }

    function deleteOutBox(data){
      return  $http({
        url: ENDPOINT + '/toDeleteOutMessageById.action',
        method: 'POST',
        data: data
      })
    }

    function findInBox(data){
      return  $http({
        url: ENDPOINT + '/findInBox.action',
        method: 'POST',
        data: data
      })
    }

    function findOutbox(data){
      return  $http({
        url: ENDPOINT + '/findOutbox.action',
        method: 'POST',
        data: data
      })
    }

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
        url: ENDPOINT + '/findQYInfoAndById.action',
        method: 'GET',
        params: params
      })
    }

  }
})();
