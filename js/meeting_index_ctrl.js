//创建模块
var app=angular.module('meetingIndex',['ng','ui.router']);

//配置状态
app.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('list', {
            url: '^/mylist',
            templateUrl: 'meeting/list.html',
            controller:'meetingList'
        })
        .state('topic', {
            url: '^/mytopic',
            templateUrl: 'meeting/topic.html'
        })
    $urlRouterProvider.otherwise('/mylist');
});


//创建父控制器
app.controller('meetingParent',['$scope','$state',function($scope,$state){
    //定义跳转方法jump
    $scope.jump = function (desState, params) {
        console.log(' jump func is called ');
        $state.go(desState, params);
    };
}]);

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
//创建sidebar控制器
app.controller('meetingSidebarCtrl',['$scope',function($scope){
    //定义左边栏显示内容数据
    $scope.showList = [
        {imgUrl:'index_1.png',text:'会议',jumpTip:'list'},
        {imgUrl:'casebuild_1.png',text:'议题',jumpTip:'topic'},
    ];
}]);
//创建会议列表控制器
app.controller('meetingList',['$scope','$http','$stateParams','$httpParamSerializerJQLike',function($scope,$http,$stateParams,$httpParamSerializerJQLike){
    $scope.meetingList=[];
    //表格数据
    $http
        .get('../data/meetinglist.json')
        .success(function(data){
            $scope.meetingList=data;
        });
    //查询列表
    $scope.checkoutList={
        courtName:'',
    };
    //监听用户输入
    $scope.$watch('checkoutList.courtName', function () {
        if ($scope.checkoutList.courtName.length > 0) {
            console.log($scope.checkoutList.courtName);
            // $http.get('data/？' + $scope.$scope.checkoutList.courtName)
            //     .success(function (data) {
            //         if (data.length > 0) {
            //             $scope.commitList=data;
            //         }
            //     })
        }
    });
    //点击查询时，拿到用户的输入
    $scope.submitCheckout=function () {
        //将用户查询输入序列化发送给后台
        var str=$httpParamSerializerJQLike($scope.checkoutList);
        console.log(str);

    };
    //分页处理

}]);