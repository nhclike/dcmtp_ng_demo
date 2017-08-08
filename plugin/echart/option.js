/**
 * Created by lij on 2017/8/4.
 */
option = {
    tooltip : {
        trigger: 'axis'
    },
    legend: {
        x : 'left',
        data:['图一','图二','图三']
    },
    toolbox: {
        show : true,
        feature : {
            mark : {show: true},
            dataView : {show: true, readOnly: false},
            restore : {show: true},
            saveAsImage : {show: true}
        }
    },
    calculable: true,
    polar : [
        {
            indicator : [
                { text : '指标一' },
                { text : '指标二' },
                { text : '指标三' },
                { text : '指标四' },
                { text : '指标五' }
            ],
            center : ['25%',210],
            radius : 150,
            startAngle: 0,
            splitNumber: 1,
            name : {
                formatter:'【{value}】',
                textStyle: {color:'#000'}
            },
            scale: true,
            type: 'circle',
            axisLine: {            // 坐标轴线
                show: true,        // 默认显示，属性show控制显示与否
                lineStyle: {       // 属性lineStyle控制线条样式
                    color: 'green',
                    width: 2,
                    type: 'solid'
                }
            },
            axisLabel: {           // 坐标轴文本标签，详见axis.axisLabel
                show: true,
                // formatter: null,
                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                    color: '#000'
                }
            },
            splitArea : {
                show : true,
                areaStyle : {
                    color: ['rgba(250,250,250,0.3)','rgba(0,200,200,0.3)']
                }
            },
            splitLine : {
                show : true,
                lineStyle : {
                    width : 2,
                    color : 'green'
                }
            }
        },
        {
            indicator : [
                { text : '语文', max  : 150 },
                { text : '数学', max  : 150 },
                { text : '英语', max  : 150 },
                { text : '物理', max  : 120 },
                { text : '化学', max  : 108 },
                { text : '生物', max  : 72 }
            ],
            center : ['75%', 210],
            radius : 150
        }
    ],
    series : [
        {
            name: '雷达图',
            type: 'radar',
            itemStyle: {
                emphasis: {
                    // color: 各异,
                    lineStyle: {
                        width: 4
                    }
                }
            },
            data : [
                {
                    value : [100, 8, 0.40, -80, 2000],
                    name : '图一',
                    symbol: 'star5',
                    symbolSize: 4,           // 可计算特性参数，空数据拖拽提示图形大小
                    itemStyle: {
                        normal: {
                            lineStyle: {
                                type: 'dashed'
                            }
                        }
                    }
                },
                {
                    value : [10, 3, 0.20, -100, 1000],
                    name : '图二',
                    itemStyle: {
                        normal: {
                            areaStyle: {
                                type: 'default'
                            }
                        }
                    }
                },
                {
                    value : [20, 3, 0.3, -13.5, 3000],
                    name : '图三',
                    symbol: 'none',         // 拐点图形类型，非标准参数
                    itemStyle: {
                        normal: {
                            lineStyle: {
                                type: 'dotted'
                            }
                        }
                    }
                }
            ]
        },
        {
            name: '成绩单',
            type: 'radar',
            polarIndex : 1,
            itemStyle: {
                normal: {
                    areaStyle: {
                        type: 'default'
                    }
                }
            },
            data : [
                {
                    value : [120, 118, 130, 100, 99, 70],
                    name : '张三',
                    itemStyle: {
                        normal: {
                            color: function(params) {
                                var value = params.data
                                return isNaN(value)
                                    ? undefined
                                    : (value >= 120 ? 'green' : 'red')
                            },
                            label: {
                                show: true,
                                formatter:function(params) {
                                    return params.value;
                                }
                            },
                            areaStyle: {
                                color: (function (){
                                    var zrColor = require('zrender/tool/color');
                                    var x = document.getElementById('main').offsetWidth - 250;
                                    return zrColor.getRadialGradient(
                                        x, 210, 0, x, 200, 150,
                                        [[0, 'rgba(255,255,0,0.3)'],[1, 'rgba(255,0,0,0.5)']]
                                    )
                                })()
                            }
                        }
                    }
                },
                {
                    value : [90, 113, 140, 30, 70, 60],
                    name : '李四',
                    itemStyle: {
                        normal: {
                            lineStyle: {
                                type: 'dashed'
                            }
                        }
                    }
                }
            ],
            markPoint : {
                symbol: 'emptyHeart',
                data : [
                    {name : '打酱油的标注', value : 100, x:'20%', y:'40%', symbolSize:32}
                ]
            }
        }
    ]
};
