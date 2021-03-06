
app.service('$Sidebar',function ($AutoHeight) {
    this.active=function () {
        $('.subMenu').on('click', 'li', function () {
         $('.mainMenu').find('li').removeClass('chosen');
         $(this).addClass('chosen');
        });
    };
    this.init=function () {
        $AutoHeight.indexHeight();
        $('.subMenu').find('li').first().addClass('chosen');
        $('.mainMenu').on('click', '.titleMenu', function () {
        $(this).next('.subMenu').slideToggle().parent().siblings('.subMenu').slideUp();
        });
    }

});
//创建Header控制器
app.controller('HeaderCtrl',['$scope',function($scope){
    // $GetPath.getpath();
  //定义header显示信息列表
  $scope.userList={time:'上午',userName:'developer',userImg:'developer.png'};
  //定义显示用户名还是退出
  $scope.isshow=true;
  if(sessionStorage['courtName']){
    $scope.isshow=false;
  }
}]);
//创建admin.sidebar控制器
app.controller('adminSidebarCtrl',['$scope','$Sidebar','$state',function($scope,$Sidebar,$state){
    $Sidebar.init();
    $scope.clickToggle=function (desState, params) {
      console.log(' jump func is called ');
      $state.go(desState, params);
      $Sidebar.active();
  };
  //定义左边栏显示内容数据
  $scope.showList = [
      {
          "imgUrl":"commit.png",
          "text":"审委会",
          "content":[
              {"imgUrl":"index_2.png","text":"审委会管理","jumpTip":"admin.commitList"},
              {"imgUrl":"index_2.png","text":"会议列表","jumpTip":"admin.commitMeeting"},
              {"imgUrl":"index_2.png","text":"审委会统计","jumpTip":"admin.commitChart"}
          ]
      },
      {
          "imgUrl":"court.png",
          "text":"法院",
          "content":[
              {"imgUrl":"index_2.png","text":"法院管理","jumpTip":"admin.courtList"},
              {"imgUrl":"index_2.png","text":"部门管理","jumpTip":"admin.courtMeeting"},
              {"imgUrl":"index_2.png","text":"用户管理","jumpTip":"admin.courtList"}
          ]
      }
  ];
}]);
//定义模态框实例
app.controller('ModalInstanceCtrl',['$scope','$modalInstance','items',function ($scope,$modalInstance,items) {
    $scope.items=items;
    $scope.selected = {
        item : $scope.items[0]
    };
    $scope.ok = function () {
        $modalInstance.close($scope.selected.item);
    };
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}]);
//定义修改模态框控制器
app.controller('reviseModalCtrl', function ($scope, $modal, $log) {
    $scope.items = ['item1', 'item2', 'item3'];
   // $scope.animationsEnabled = true;
    $scope.openRevise= function (size) {
        var modalInstance = $modal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'myModalRevise.html',
            controller: 'ModalInstanceCtrl',
            size: size,
            resolve: {
                items: function () {
                    return $scope.items;
                }
            }
        });
        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };
    $scope.toggleAnimation = function () {
       $scope.animationsEnabled = !$scope.animationsEnabled;
    };
});
//定义添加模态框
app.controller('addModalCtrl', function ($scope, $modal, $log) {
    $scope.items = ['item1', 'item2', 'item3'];
   $scope.animationsEnabled = true;
    $scope.openAdd= function (size) {
        var modalInstance = $modal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'myModalAdd.html',
            controller: 'ModalInstanceCtrl',
            size: size,
            resolve: {
                items: function () {
                    return $scope.items;
                }
            }
        });
        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };
    $scope.toggleAnimation = function () {
       $scope.animationsEnabled = !$scope.animationsEnabled;
    };

});

























//创建public.index中模态框控制器（单模态框处理）
app.controller('modalCtrl',['$scope','$http',function ($scope,$http) {
    //请求排期数据
    $http
        .get('data/casedata.json')
        .success(function(data){
            $scope.caseDataList=data;
        });
}]);
//创建案件排期控制器
app.controller('caseDateCtrl',['$scope','$http','$stateParams','$httpParamSerializerJQLike',function($scope,$http,$stateParams,$httpParamSerializerJQLike){
    //表格数据
    $http
        .get('data/casedatadate.json')
        .success(function(data){
            $scope.caseDataDateList=data;
        });
    //查询列表
    $scope.checkoutList={
        caseNumber:'',
        caseCause:'',
        caseStartTime:'',
        casePersonal:'',
        caseAnswered:''
    };
    //点击查询时，拿到用户的输入
    $scope.submitCheckout=function () {
        //将用户查询输入序列化发送给后台
        var str=$httpParamSerializerJQLike($scope.checkoutList);
        console.log(str);

    };
}]);

