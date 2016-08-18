/**
 * Created by zhenglu on 2016/7/19.
 */
$(function () {
    var ld_index = 1;
    var qk_index = 1;
    var PRODUCTTYPE = ""; //大单位
    var ZB_SOURCE_SITE = ""; //小单位
    var ld_time = "7";
    $('.ld_more').click(function () {
        ld_index++;
        getIntensity(ld_index, PRODUCTTYPE, ZB_SOURCE_SITE, ld_time);
    });
    $('.qk_more').click(function () {
        qk_index++;
        getSituation(qk_index, ZB_SOURCE_SITE, ZB_SOURCE_SITE, '');
    });
    $('.selete').click(function () {
        ld_time = $(this).children('a').attr('selectid');
        $('.ld-wz-ul li').remove();
        getIntensity(1, PRODUCTTYPE, ZB_SOURCE_SITE, ld_time);
    });
    //菜单服务调用
    $.ajax({
        type: "get",
        dataType: "json",
        url: "data/navigationtree.json",
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                var createobj_i = $(
                    '<div class="ld-nav-fr" id="menu' + i + '"><a href="javascript:;">' + data[i].roleName + '</a></div>'
                );
                $('.ld-nav-lf').append(createobj_i);
            }
            $('#menu0').addClass('nav-fr-cur');
            //一级菜单点击事件
            $('.ld-nav-fr').click(function () {
                $(this).addClass('nav-fr-cur').siblings().removeClass('nav-fr-cur');
                $('.ld-nav-rt').hide();
                var showClass = $(this).attr('id');
                $('.' + showClass + '').show();
                $('.nav-th-bk').hide();
                $('.ld-nav-se').removeClass('nav-se-cur');
            });

            $('.ld-nav-fr').click(function () {
                $(this).addClass('nav-fr-cur').siblings().removeClass('nav-fr-cur');
            });
        },
        error: function (msg) {
            console.log(msg);
        }

    });
    getSituation("", '1');
    getIntensity("");

})

//文章传播情况
function getSituation(pageIndex, PRODUCTTYPE, ZB_SOURCE_SITE, pageClass) {
    var dataset = data3;
    // var decodedUrl = decodeURIComponent(data);
    //  var dataset = $.parseJSON(decodedUrl);
    if (dataset.result.length > 0) {
        for (var i = 0; i < dataset.result.length; i++) {
            var rankClass = ""
            if (i < 3 && pageClass == '1') {
                rankClass = "no"
            }
            var createobj = $(
                '<li class="' + rankClass + '"><div class="wz-dt"><span>' + dataset.result[i].pubtime + '</span></div>' +
                '<a href="' + dataset.result[i].href + '" class="wz-bt" target="_blank">' + dataset.result[i].title + '</a>' +
                '<span class="wz-ly">' + dataset.result[i].source + '</span>' +
                '<span class="wz-cbz">' + dataset.result[i].transmissibility + '</span>' +
                '</li>'
            );
            $(".rw-wz-ul").append(createobj);
        }
    }

}
//文章传播力度
function getIntensity(pageIndex, PRODUCTTYPE, ZB_SOURCE_SITE, time) {
    var dataset = data2;
    // var decodedUrl = decodeURIComponent(data);
    //  var dataset = $.parseJSON(decodedUrl);
    if (dataset.result.length > 0) {
        for (var i = 0; i < dataset.result.length; i++) {
            var rankClass = ""
            if (dataset.result[i].rank < 4) {
                rankClass = "no";
            }
            var createobj = $(
                '<li class="' + rankClass + '">' +
                '<span class="wz-xh">' + dataset.result[i].rank + '</span>' +
                '<a href="' + dataset.result[i].href + '" class="wz-bt" target="_blank">' + dataset.result[i].title + '</a>' +
                '<span class="wz-ly">' + dataset.result[i].source + '</span>' +
                '<span class="wz-cbz">' + dataset.result[i].transmissibility + '</span>' +
                '</li>'
            );
            $(".ld-wz-ul").append(createobj);
        }
    }
}
// 点击左侧栏目右侧内容的json变化
$(document).on("click", ".ld-nav-fr", function (event) {
    $('.ld-wz-ul li').remove();
    $(".rw-wz-ul li").remove();
    var index = $(this).index();
    switch (index) {
        case 0:
            data2 = datacb0;
            data3 = datanew0;
            break;
        case 1:
            data2 = datacb1;
            data3 = datanew1;
            break;
        case 2:
            data2 = datacb2;
            data3 = datanew2;
            break;
        case 3:
            data2 = datacb3;
            data3 = datanew3;
            break;
        case 4:
            data2 = datacb4;
            data3 = datanew4;
            break;
        default:
            data2 = datacb4;
            data3 = datanew4;
            break;
    }

    getSituation(1, "", "", '1');
    getIntensity(1, "", "", "7");

});

// 左侧导航json数据
/*var data1 = [{
 "roleName": "成都日报锦观集群",
 "pid": 0,
 "roleId": 1
 }, {
 "roleName": "成都商报新媒体集群",
 "pid": 1,
 "roleId": 1
 }, {
 "roleName": "成都晚报公益集群",
 "pid": 2,
 "roleId": 1
 }, {
 "roleName": "全搜索全媒体集群",
 "pid": 2,
 "roleId": 1
 }, {
 "roleName": "每经新媒体集群",
 "pid": 2,
 "roleId": 1
 }];*/

// 成都日报锦观集群-文章传播力排行榜json数据
// var data2 = {
//     "result": [{
//         "guid": "752443816518361088",
//         "href": "000",
//         "title": "0成都日报锦观集群",
//         "rank": 1,
//         "transmissibility": "1175.49",
//         "source": "重庆晨报网"
//     }, {
//         "guid": "753213891278020608",
//         "href": "000",
//         "title": "重庆人事任免涉及中新项目管理局等部门和多个高校",
//         "rank": 2,
//         "transmissibility": "1110.07",
//         "source": "华龙网"
//     }, {
//         "guid": "752708057531949056",
//         "href": "000",
//         "title": "河南卫辉通报交通执法暴力砸窗事件:两执法人员被停职",
//         "rank": 3,
//         "transmissibility": "1039.18",
//         "source": "重庆晨报网"
//     }, {
//         "guid": "753134367727165440",
//         "href": "000",
//         "title": "钱仁凤案再起波澜:案发幼儿园园长父亲称遭疑凶威胁",
//         "rank": 4,
//         "transmissibility": "888.49",
//         "source": "重庆晨报网"
//     }, {
//         "guid": "752660263018438656",
//         "href": "000",
//         "title": "扎根大山38年的老教师他为了村小的学生“抛下”重病妻子",
//         "rank": 5,
//         "transmissibility": "530.57",
//         "source": "华龙网"
//     }, {
//         "guid": "752558573800009729",
//         "href": "000",
//         "title": "中年汉子带着女网友假戏真唱大摇大摆闯进刑警队冒充队长",
//         "rank": 6,
//         "transmissibility": "378.22",
//         "source": "重庆晚报数字报"
//     }, {
//         "guid": "751185024300359680",
//         "href": "000",
//         "title": "买二手房交税多交1万多买主：我被巴南地税局收费人员忽悠了",
//         "rank": 7,
//         "transmissibility": "370.88",
//         "source": "华龙网"
//     }, {
//         "guid": "752558587666378753",
//         "href": "000",
//         "title": "美女眼眶下面长牙差点顶破眼球",
//         "rank": 8,
//         "transmissibility": "331.09",
//         "source": "重庆晚报数字报"
//     }, {
//         "guid": "752406090658095104",
//         "href": "000",
//         "title": "男子带8岁女儿4天暴走170公里回老家",
//         "rank": 9,
//         "transmissibility": "328.33",
//         "source": "重庆晨报网"
//     }, {
//         "guid": "751159194660777985",
//         "href": "000",
//         "title": "车借出去不到两个月违章17次被扣78分罚4400元",
//         "rank": 10,
//         "transmissibility": "323.53",
//         "source": "重庆商报数字报"
//     }],
//     "pageInfo": {
//         "pageCount": 1876,
//         "totalNum": 18759,
//         "pageSize": 10,
//         "pageIndex": 1
//     }
// }
// 成都日报锦观集群-文章传播力排行榜json数据
var datacb0 = {
    "result": [{
        "guid": "752443816518361088",
        "href": "javascript:;",
        "title": "一张报 一座城 小锦邀你看动画啦！",
        "rank": 1,
        "transmissibility": "200万",
        "source": "锦观客户端"
    }, {
        "guid": "753213891278020608",
        "href": "javascript:;",
        "title": "全国两会来了，这些知识点你需要get！",
        "rank": 2,
        "transmissibility": "150万",
        "source": "锦观客户端"
    }, {
        "guid": "752708057531949056",
        "href": "javascript:;",
        "title": "网传成都发生大洪水 省市防汛办：谣言！",
        "rank": 3,
        "transmissibility": "50万",
        "source": "成都日报微信"
    }, {
        "guid": "753134367727165440",
        "href": "javascript:;",
        "title": "暖心交警在车流中救出小猫",
        "rank": 4,
        "transmissibility": "38万",
        "source": "成都日报微信"
    }, {
        "guid": "752660263018438656",
        "href": "javascript:;",
        "title": "老爸，我爱你#【有些话，他喝了酒才敢对你说】",
        "rank": 5,
        "transmissibility": "15.6万",
        "source": "成都日报微信"
    }, {
        "guid": "752558573800009729",
        "href": "javascript:;",
        "title": "VR探营2016创交会！",
        "rank": 6,
        "transmissibility": "15万",
        "source": "成都日报微信"
    }, {
        "guid": "751185024300359680",
        "href": "javascript:;",
        "title": "胖娃上成都，萌翻一兜兜。你还不晓得？你太out了！",
        "rank": 7,
        "transmissibility": "13万",
        "source": "成都日报微博"
    }, {
        "guid": "752558587666378753",
        "href": "javascript:;",
        "title": "杨绛先生：岁月深处的沉香",
        "rank": 8,
        "transmissibility": "13万",
        "source": "成都日报微博"
    }, {
        "guid": "752406090658095104",
        "href": "javascript:;",
        "title": "什么叫“最牛朋友圈”？看2016创交会就晓得了",
        "rank": 9,
        "transmissibility": "8万",
        "source": "锦观客户端"
    }, {
        "guid": "751159194660777985",
        "href": "javascript:;",
        "title": "成都大家庭的新成员——简阳，你了解吗？ 戳进来看",
        "rank": 10,
        "transmissibility": "5万",
        "source": "锦观客户端"
    }],
    "pageInfo": {
        "pageCount": 1876,
        "totalNum": 18759,
        "pageSize": 10,
        "pageIndex": 1
    }
}
// 成都商报新媒体集群-文章传播力排行榜json数据
var datacb1 = {
    "result": [{
        "guid": "752443816518361088",
        "href": "http://z.zhongsou.net/news/080808_6837719.html",
        "title": "不幸！今年高考663分 四川小伙赴泰旅行却意外身亡",
        "rank": 1,
        "transmissibility": "7.5万",
        "source": "成都商报客户端"
    }, {
        "guid": "753213891278020608",
        "href": "http://z.zhongsou.net/news/080808_6867203.html",
        "title": "视频|沙湾一男子营救落水侄女 双双溺亡鱼塘",
        "rank": 2,
        "transmissibility": "2.7万",
        "source": "成都商报客户端"
    }, {
        "guid": "752708057531949056",
        "href": "http://z.zhongsou.net/news/080808_6850103.html",
        "title": "高考提前批部分本科院校调档线、实录线出炉",
        "rank": 3,
        "transmissibility": "2.5万",
        "source": "成都商报客户端"
    }, {
        "guid": "753134367727165440",
        "href": "http://z.zhongsou.net/news/080808_6864249.html",
        "title": "成都最美的晚霞图在这里，每一张都让我激动地想哭！",
        "rank": 4,
        "transmissibility": "2.5万",
        "source": "成都商报客户端"
    }, {
        "guid": "752660263018438656",
        "href": "http://z.zhongsou.net/news/080808_6870513.html",
        "title": "我有一个“蓝”朋友，它的名字叫成都",
        "rank": 5,
        "transmissibility": "2.3万",
        "source": "成都商报客户端"
    }, {
        "guid": "752558573800009729",
        "href": "http://z.zhongsou.net/news/080808_6863488.html",
        "title": "视频丨一场大雨洗清了这个城市，市中心可见雪山",
        "rank": 6,
        "transmissibility": "2.3万",
        "source": "成都商报客户端"
    }, {
        "guid": "751185024300359680",
        "href": "http://z.zhongsou.net/news/080808_6872163.html",
        "title": "成都新增5个地铁项目 总长度124.2公里",
        "rank": 7,
        "transmissibility": "1.9万",
        "source": "成都商报客户端"
    }, {
        "guid": "752558587666378753",
        "href": "http://www.cdsb.mobi/cdsb/app/ios/articledetail/262743",
        "title": "成都地铁新机场线今年开工 最快37分钟到达！",
        "rank": 8,
        "transmissibility": "1.6万",
        "source": "成都商报客户端"
    }, {
        "guid": "752406090658095104",
        "href": "http://www.cdsb.mobi/cdsb/app/ios/articledetail/198588",
        "title": "地铁18号线开工 以后去新机场就坐它了！",
        "rank": 9,
        "transmissibility": "9800",
        "source": "成都商报客户端"
    }, {
        "guid": "751159194660777985",
        "href": "http://www.cdsb.mobi/cdsb/app/ios/articledetail/220593",
        "title": "地铁6号线计划今年开工，首次公布具体站位",
        "rank": 10,
        "transmissibility": "7400",
        "source": "成都商报客户端"
    }],
    "pageInfo": {
        "pageCount": 1876,
        "totalNum": 18759,
        "pageSize": 10,
        "pageIndex": 1
    }
}
// 成都晚报公益集群-文章传播力排行榜json数据
var datacb2 = {
    "result": [{
        "guid": "753213891278020608",
        "href": "http://weibo.com/cdwbwb?refer_flag=1001030103_&is_all=1&is_search=1&key_word=%E7%AB%A5%E5%85%BB%E5%AA%B38%E5%B9%B44%E6%AC%A1%E9%80%83%E5%A9%9A#_0",
        "title": "童养媳8年4次逃婚",
        "rank": 1,
        "transmissibility": "440万",
        "source": "成都晚报"
    }, {
        "guid": "752443816518361088",
        "href": "http://weibo.com/p/100808d4623587178d35f691586d1c5680ab2d?k=%E7%9D%A1%E5%89%8D%E8%AE%B2%E6%95%85%E4%BA%8B&from=526&_from_=huati_topic",
        "title": "雷锋热线#睡前讲故事#话题墙",
        "rank": 2,
        "transmissibility": "62.9万",
        "source": "成都晚报"
    }, {
        "guid": "752708057531949056",
        "href": "http://weibo.com/p/100808b31fa4bc76f9c2e74e04c7275bcab30f?k=Bigbang%E6%88%90%E9%83%BD%E7%AB%99%E9%97%A8%E7%A5%A8%E5%85%8D%E8%B4%B9%E9%A2%86&from=526&_from_=huati_topic",
        "title": "#Bigbang成都站门票免费领#",
        "rank": 3,
        "transmissibility": "44万",
        "source": "成都晚报"
    }, {
        "guid": "753134367727165440",
        "href": "http://weibo.com/cdwbwb?refer_flag=1001030103_&is_all=1&is_search=1&key_word=%23%E8%B6%85%E8%90%8C%E5%B7%9D%E6%99%AE%E7%A5%9E%E6%9B%B2%23#_0",
        "title": "#超萌川普神曲#《胖娃儿上成都》",
        "rank": 4,
        "transmissibility": "24万",
        "source": "成都晚报"
    }, {
        "guid": "752660263018438656",
        "href": "http://weibo.com/cdwbwb?refer_flag=1001030103_&is_search=1&key_word=%E5%A4%B1%E8%B8%AA%E6%88%98%E5%A3%AB%E5%88%98%E6%99%AF%E6%B3%B0%E7%9A%84%E6%AF%8D%E4%BA%B2%EF%BC%9A%E6%88%98%E5%A3%AB%E4%BB%AC%E5%A4%AA%E8%BE%9B%E8%8B%A6%E4%BA%86&is_all=1#_0",
        "title": "失踪战士刘景泰的母亲：战士们太辛苦了，要不就不找了吧[泪]",
        "rank": 5,
        "transmissibility": "18万",
        "source": "成都晚报"
    }, {
        "guid": "752558573800009729",
        "href": "http://weibo.com/cdwbwb?is_all=1&is_search=1&key_word=%E5%8C%BB%E7%94%9F%E6%9C%AF%E4%B8%AD%E8%83%83%E7%97%89%E6%8C%9B%E5%8F%91%E4%BD%9C%EF%BC%8C%E5%BF%8D%E7%97%9B%E5%AE%8C%E6%88%90%E5%85%B3%E9%94%AE%E6%AD%A5%E9%AA%A4%E5%90%8E%EF%BC%8C%E5%80%92%E5%9C%B0%E5%90%B8%E6%B0%A7#_0",
        "title": "医生术中胃痉挛发作，忍痛完成关键步骤后，倒地吸氧",
        "rank": 6,
        "transmissibility": "15万",
        "source": "成都晚报"
    }, {
        "guid": "751185024300359680",
        "href": "http://weibo.com/cdwbwb?is_all=1&is_search=1&key_word=%E4%B8%80%E4%BD%8D%E5%9B%9B%E5%B7%9D%E5%A6%88%E5%A6%88%E5%92%8C%E5%A5%B9%E7%8B%97%E5%84%BF%E5%AD%90%E7%9A%84%E6%97%A5%E5%B8%B8%EF%BC%8C%E7%AC%91%E6%AD%BB%E6%88%91%E4%BA%86#_0",
        "title": "一位四川妈妈和她狗儿子的日常，笑死我了",
        "rank": 7,
        "transmissibility": "13万",
        "source": "成都晚报"
    }, {
        "guid": "752558587666378753",
        "href": "http://weibo.com/cdwbwb?is_all=1&is_search=1&key_word=%E5%B8%AE%E5%B8%AE%E5%A5%B9%EF%BC%81%E5%9B%9B%E5%B7%9D8%E5%B2%81%23%E6%82%A3%E7%99%8C%E5%A5%B3%E5%AD%A9%E6%83%B3%E8%A7%81%E5%A6%88%E5%A6%88%23#_0",
        "title": "帮帮她！四川8岁#患癌女孩想见妈妈#",
        "rank": 8,
        "transmissibility": "8.2万",
        "source": "成都晚报"
    }, {
        "guid": "752406090658095104",
        "href": "http://weibo.com/cdwbwb?is_all=1&is_search=1&key_word=%E5%90%83%E6%B0%B4%E6%9E%9C%E8%BF%98%E8%83%BD%E9%98%B2%E6%99%92%EF%BC%9F9%E5%BC%A0%E5%9B%BE%E6%95%99%E4%BD%A0%E5%A4%8F%E5%A4%A9%E5%BA%94%E8%AF%A5%E6%80%8E%E4%B9%88%E5%90%83#_0",
        "title": "吃水果还能防晒？9张图教你夏天应该怎么吃",
        "rank": 9,
        "transmissibility": "8万",
        "source": "成都晚报"
    }, {
        "guid": "751159194660777985",
        "href": "http://weibo.com/cdwbwb?refer_flag=1005055013_&is_all=1&is_search=1&key_word=%E6%B3%A5%E6%B0%B4%E5%B7%A5%E5%A4%AB%E5%A6%BB%E6%AD%A3%E8%A3%85%E4%BF%AE%E5%A2%99%E5%A1%8C%E4%BA%86%20%E4%B8%88%E5%A4%AB%E5%BE%92%E6%89%8B%E5%88%A8%E5%87%BA%E5%A6%BB%E5%AD%90#_0",
        "title": "热泪盈眶！哪怕你只是一名普通的中国人，也应该抽空看看这个视频！ ",
        "rank": 10,
        "transmissibility": "7.26万",
        "source": "成都晚报"
    }],
    "pageInfo": {
        "pageCount": 1876,
        "totalNum": 18759,
        "pageSize": 10,
        "pageIndex": 1
    }
}
// 全搜索全媒体集群-文章传播力排行榜json数据
var datacb3 = {
    "result": [{
        "guid": "752443816518361088",
        "href": "http://news.chengdu.cn/2016/0301/1768401.shtml",
        "title": "三分钟动画 看懂成都提升国际范的“五个锦囊”（动画视频）",
        "rank": 1,
        "transmissibility": "162万",
        "source": "全搜索新闻网"
    }, {
        "guid": "753213891278020608",
        "href": "http://special.chengdu.cn/160525/",
        "title": "建西部开发前沿 聚焦成都新机场（专题）",
        "rank": 2,
        "transmissibility": "148万",
        "source": "全搜索新闻网"
    }, {
        "guid": "752708057531949056",
        "href": "http://news.chengdu.cn/2016/0427/1782703.shtml",
        "title": "揭秘和总理打过羽毛球的网红机器人“萝卜酱”",
        "rank": 3,
        "transmissibility": "112万",
        "source": "全搜索新闻网"
    }, {
        "guid": "753134367727165440",
        "href": "http://news.chengdu.cn/2015/0512/1689045.shtml",
        "title": "万张照片带你穿越中轴线（视频）",
        "rank": 4,
        "transmissibility": "84.1万",
        "source": "全搜索新闻网"
    }, {
        "guid": "752660263018438656",
        "href": "http://news.chengdu.cn/2015/1013/1732951.shtml",
        "title": "网友化身“唐伯虎” 评说成都红星路改造（视频）",
        "rank": 5,
        "transmissibility": "72.4万",
        "source": "全搜索新闻网"
    }, {
        "guid": "752558573800009729",
        "href": "http://opinion.chengdu.cn/2015/1207/1747633.shtml",
        "title": "全叔读报：未来，成都哪些职业最受欢迎",
        "rank": 6,
        "transmissibility": "53.1万",
        "source": "全搜索新闻网"
    }, {
        "guid": "751185024300359680",
        "href": "http://news.chengdu.cn/2016/0712/1801451.shtml",
        "title": "2016成都中心城区小升初划片范围公布",
        "rank": 7,
        "transmissibility": "48.6万",
        "source": "全搜索新闻网"
    }, {
        "guid": "752558587666378753",
        "href": "http://news.chengdu.cn/2016/0119/1758299.shtml",
        "title": "网传“成都孕妇死于H7N9”几年前的谣言你还信?",
        "rank": 8,
        "transmissibility": "36.1万",
        "source": "全搜索新闻网"
    }, {
        "guid": "752406090658095104",
        "href": "http://news.chengdu.cn/2016/0615/1794589.shtml",
        "title": "射洪老人存60万变40万？ 银行：点钞机确认只有40万",
        "rank": 9,
        "transmissibility": "27.5万",
        "source": "全搜索新闻网"
    }, {
        "guid": "751159194660777985",
        "href": "http://u.eqxiu.com/s/nvJpAywi",
        "title": "全叔对决梅长苏（H5）",
        "rank": 10,
        "transmissibility": "11.2万",
        "source": "全搜索新闻网"
    }],
    "pageInfo": {
        "pageCount": 1876,
        "totalNum": 18759,
        "pageSize": 10,
        "pageIndex": 1
    }
}
// 每经新媒体集群-文章传播力排行榜json数据
var datacb4 = {
    "result": [{
        "guid": "752443816518361088",
        "href": "http://weibo.com/1649173367/DBTIE50pr?from=page_1002061649173367_profile&wvr=6&mod=weibotime&type=comment#_rnd1468650703493",
        "title": "【英国请愿二次公投人数已超过100万】",
        "rank": 1,
        "transmissibility": "266万",
        "source": "每经微博"
    }, {
        "guid": "753213891278020608",
        "href": "http://weibo.com/1649173367/D9NnIoQbW?type=comment#_rnd1468650848349",
        "title": "【“天降雄兵”救王石！保监会、银监会严查举牌资金来源】",
        "rank": 2,
        "transmissibility": "109万",
        "source": "每经微博"
    }, {
        "guid": "752708057531949056",
        "href": "http://www.nbd.com.cn/articles/2012-06-28/663437.html",
        "title": "新大地涉嫌造假上市  创业板首例",
        "rank": 3,
        "transmissibility": "75万",
        "source": "每经网"
    }, {
        "guid": "753134367727165440",
        "href": "http://www.nbd.com.cn/articles/2015-03-11/902185.html",
        "title": "唐良智：城市建设发展 要有“功成不必在我”的胸怀",
        "rank": 4,
        "transmissibility": "69.3万",
        "source": "每经网"
    }, {
        "guid": "752660263018438656",
        "href": "http://www.nbd.com.cn/articles/2008-06-25/71140.html",
        "title": "立立电子上市 李立本、王敏文、江作良的资本腾挪术",
        "rank": 5,
        "transmissibility": "68.5万",
        "source": "每经网"
    }, {
        "guid": "752558573800009729",
        "href": "http://www.nbd.com.cn/articles/2015-11-09/960738.html",
        "title": "第四届上市公司领袖峰会—资本大佬成都聚首 纵论产业变革新机遇",
        "rank": 6,
        "transmissibility": "58.9万",
        "source": "每经网"
    }, {
        "guid": "751185024300359680",
        "href": "http://mp.weixin.qq.com/s?__biz=ODYzMzExMzQx&mid=206261888&idx=2&sn=57445c4ee2115d09f1513b441b34bf96#rd",
        "title": "是什么医药峰会竟然让上海滩瘫痪 连身价上亿的大佬们都在淋雨等车",
        "rank": 7,
        "transmissibility": "54.6万",
        "source": "每经微信"
    }, {
        "guid": "752558587666378753",
        "href": "http://www.nbd.com.cn/articles/2015-05-29/919593.html",
        "title": "首度揭秘A股顶尖高手全貌：236人坐拥超700亿市值",
        "rank": 8,
        "transmissibility": "48.7万",
        "source": "每经网"
    }, {
        "guid": "752406090658095104",
        "href": "http://mp.weixin.qq.com/s?__biz=ODYzMzExMzQx&mid=2652681783&idx=1&sn=68e3f80446a1fa4e6a634f4e4eb35e7d#rd",
        "title": "英国脱欧，全球金融市场惨遭血洗，万亿美元财富瞬间蒸发！",
        "rank": 9,
        "transmissibility": "30.44万",
        "source": "每经微信"
    }, {
        "guid": "751159194660777985",
        "href": "http://mp.weixin.qq.com/s?__biz=ODYzMzExMzQx&mid=404873161&idx=1&sn=4764b8ecb6e977c729e3f2615268f4a9#rd",
        "title": "上海楼市疯狂24小时：一天卖掉1300套，网签系统被挤爆",
        "rank": 10,
        "transmissibility": "29.4万",
        "source": "每经微信"
    }],
    "pageInfo": {
        "pageCount": 1876,
        "totalNum": 18759,
        "pageSize": 10,
        "pageIndex": 1
    }
}
// 成都日报锦观集群-最新文章传播情况json数据
// var data3 = {
//     "result": [{
//         "guid": "753811327432269824",
//         "pubtime": "7-15",
//         "href": "javascript:;",
//         "title": "中国军队派南苏丹看望维和部队接运烈士伤员",
//         "transmissibility": "0.0",
//         "source": "华龙网"
//     }, {
//         "guid": "753811328220798976",
//         "pubtime": "7-15",
//         "href": "javascript:;",
//         "title": "上半年社会融资规模增量9.75万亿同比增9618亿",
//         "transmissibility": "0.0",
//         "source": "华龙网"
//     }, {
//         "guid": "753811332217970688",
//         "pubtime": "7-15",
//         "href": "javascript:;",
//         "title": "天热宠物易发怒伤人沈阳接种狂犬疫苗人数增6成",
//         "transmissibility": "0.0",
//         "source": "华龙网"
//     }, {
//         "guid": "753811328153690113",
//         "pubtime": "7-15",
//         "href": "javascript:;",
//         "title": "南京一4S店连遭9次钢珠袭击警方抓获嫌犯",
//         "transmissibility": "0.0",
//         "source": "华龙网"
//     }, {
//         "guid": "753811328942219264",
//         "pubtime": "7-15",
//         "href": "javascript:;",
//         "title": "郁慕明率“中华儿女文史体验营”参访团赴广西了解当地文化",
//         "transmissibility": "0.0",
//         "source": "华龙网"
//     }, {
//         "guid": "753811329336483840",
//         "pubtime": "7-15",
//         "href": "javascript:;",
//         "title": "法国总统奥朗德宣布将全国紧急状态延长3个月",
//         "transmissibility": "0.0",
//         "source": "华龙网"
//     }, {
//         "guid": "753811329726554112",
//         "pubtime": "7-15",
//         "href": "javascript:;",
//         "title": "三星堆祭祀坑发掘30周年专家：三星堆还将震惊世界",
//         "transmissibility": "0.0",
//         "source": "华龙网"
//     }, {
//         "guid": "753811329399398400",
//         "pubtime": "7-15",
//         "href": "javascript:;",
//         "title": "德交通协会提醒“捉精灵”手游玩家注意交通安全",
//         "transmissibility": "0.0",
//         "source": "华龙网"
//     }, {
//         "guid": "753811330909347840",
//         "pubtime": "7-15",
//         "href": "javascript:;",
//         "title": "黄澜遭男嘉宾“告白”",
//         "transmissibility": "0.0",
//         "source": "华龙网"
//     }, {
//         "guid": "753811330053709824",
//         "pubtime": "7-15",
//         "href": "000",
//         "title": "男子杀自称黑社会人员藏身孤岛被无人机揪出(图)",
//         "transmissibility": "0.0",
//         "source": "华龙网"
//     }],
//     "pageInfo": {
//         "pageCount": 61970,
//         "totalNum": 619695,
//         "pageSize": 10,
//         "pageIndex": 1
//     }
// };
// 成都日报锦观集群-最新文章传播情况json数据
var datanew0 = {
    "result": [{
        "guid": "753811327432269824",
        "pubtime": "7-15",
        "href": "javascript:;",
        "title": "成都定位国家中心城市 是国家层面的战略布局",
        "transmissibility": "15000",
        "source": "成都日报微信"
    }, {
        "guid": "753811328220798976",
        "pubtime": "7-15",
        "href": "javascript:;",
        "title": "成都坚持“全域开放” 机场吞吐量突破4000万",
        "transmissibility": "13765",
        "source": "成都日报微信"
    }, {
        "guid": "753811332217970688",
        "pubtime": "7-15",
        "href": "javascript:;",
        "title": "向全球展示“成都速度” 蓉欧快铁率先抵华沙",
        "transmissibility": "8900",
        "source": "锦观客户端"
    }, {
        "guid": "753811328153690113",
        "pubtime": "7-15",
        "href": "javascript:;",
        "title": "成都新机场带来的新：枢纽新支撑 经济新发展 国际新航线",
        "transmissibility": "7355",
        "source": "锦观客户端"
    }, {
        "guid": "753811328942219264",
        "pubtime": "7-15",
        "href": "javascript:;",
        "title": "争创首个内陆自贸区 成都勇担四川“全创”核心城市重任",
        "transmissibility": "4500",
        "source": "成都日报微信"
    }, {
        "guid": "753811329336483840",
        "pubtime": "7-15",
        "href": "javascript:;",
        "title": "加速实施全域北改#小微有态度#",
        "transmissibility": "3644",
        "source": "成都日报微信"
    }, {
        "guid": "753811329726554112",
        "pubtime": "7-15",
        "href": "javascript:;",
        "title": "增强综合交通枢纽功能 加速建设国家级国际枢纽空港城市",
        "transmissibility": "2500",
        "source": "成都日报微博"
    }, {
        "guid": "753811329399398400",
        "pubtime": "7-15",
        "href": "javascript:;",
        "title": "坚定不移实施工业强基行动 努力开创我市工业发展新局面",
        "transmissibility": "1800",
        "source": "成都日报微博"
    }, {
        "guid": "753811330909347840",
        "pubtime": "7-15",
        "href": "javascript:;",
        "title": "成都100个相对贫困村年底“摘帽”",
        "transmissibility": "1780",
        "source": "锦观客户端"
    }, {
        "guid": "753811330053709824",
        "pubtime": "7-15",
        "href": "javascript:;",
        "title": "成都2020年建成“六库八区” 7个湿地已建成",
        "transmissibility": "1653",
        "source": "锦观客户端"
    }],
    "pageInfo": {
        "pageCount": 61970,
        "totalNum": 619695,
        "pageSize": 10,
        "pageIndex": 1
    }
};
// 成都商报新媒体集群-最新文章传播情况json数据
var datanew1 = {
    "result": [{
        "guid": "753811327432269824",
        "pubtime": "7-15",
        "href": "http://z.zhongsou.net/news/080808_6872163.html",
        "title": "成都新增5个地铁项目 总长度124.2公里",
        "transmissibility": "1.9万",
        "source": "成都商报客户端"
    }, {
        "guid": "753811328220798976",
        "pubtime": "7-15",
        "href": "http://www.cdsb.mobi/cdsb/app/ios/articledetail/262743",
        "title": "成都地铁新机场线今年开工 最快37分钟到达！",
        "transmissibility": "1.6万",
        "source": "成都商报客户端"
    }, {
        "guid": "753811332217970688",
        "pubtime": "7-15",
        "href": "http://www.cdsb.mobi/cdsb/app/ios/articledetail/272861",
        "title": "央视近日重磅关注成都“蓉欧+”战略",
        "transmissibility": "1.3万",
        "source": "成都商报客户端"
    }, {
        "guid": "753811328153690113",
        "pubtime": "7-15",
        "href": "http://www.cdsb.mobi/cdsb/app/ios/articledetail/253356",
        "title": "发展工业强基，做强国家中心城市硬支撑",
        "transmissibility": "9000",
        "source": "成都商报客户端"
    }, {
        "guid": "753811328942219264",
        "pubtime": "7-15",
        "href": "http://www.cdsb.mobi/cdsb/app/ios/articledetail/240835",
        "title": "建国家中心城市 成都有三大优势",
        "transmissibility": "8530",
        "source": "成都商报客户端"
    }, {
        "guid": "753811329336483840",
        "pubtime": "7-15",
        "href": "http://www.cdsb.mobi/cdsb/app/ios/articledetail/193222",
        "title": "德国电子产品、服装鞋帽搭着蓉欧快铁来啦！",
        "transmissibility": "7300",
        "source": "成都商报客户端"
    }, {
        "guid": "753811329726554112",
        "pubtime": "7-15",
        "href": "http://www.cdsb.mobi/cdsb/app/ios/articledetail/214158",
        "title": "“成都大都市区”规划 多条地铁直通德阳资阳",
        "transmissibility": "6100",
        "source": "成都商报客户端"
    }, {
        "guid": "753811329399398400",
        "pubtime": "7-15",
        "href": "http://www.cdsb.mobi/cdsb/app/ios/articledetail/234713",
        "title": "今年 成都国际（地区）定期直飞航线数将达44条",
        "transmissibility": "5300",
        "source": "成都商报客户端"
    }, {
        "guid": "753811330909347840",
        "pubtime": "7-15",
        "href": "http://www.cdsb.mobi/cdsb/app/ios/articledetail/273011",
        "title": "3条跑道两个航站楼同步开建 2020年投用",
        "transmissibility": "4300",
        "source": "成都商报客户端"
    }, {
        "guid": "753811330053709824",
        "pubtime": "7-15",
        "href": "http://www.cdsb.mobi/cdsb/app/ios/articledetail/273012",
        "title": "到达新机场的N种方式",
        "transmissibility": "2210",
        "source": "成都商报客户端"
    }],
    "pageInfo": {
        "pageCount": 61970,
        "totalNum": 619695,
        "pageSize": 10,
        "pageIndex": 1
    }
};
// 成都晚报公益集群-最新文章传播情况json数据
var datanew2 = {
    "result": [{
        "guid": "753811327432269824",
        "pubtime": "7-15",
        "href": "http://weibo.com/1855024094/DEvVGfBl0?from=page_1002061855024094_profile&wvr=6&mod=weibotime&type=comment#_rnd1468647487787",
        "title": "成都明确产业发展方向和重点 吸引清华大学来蓉设西部首个研究院",
        "transmissibility": "2.4万",
        "source": "成都晚报"
    }, {
        "guid": "753811328220798976",
        "pubtime": "7-15",
        "href": "http://weibo.com/1855024094/DECIA1K5l?from=page_1002061855024094_profile&wvr=6&mod=weibotime&type=comment",
        "title": "四川系统推进全面创新改革试验方案获批",
        "transmissibility": "1.9万",
        "source": "成都晚报"
    }, {
        "guid": "753811332217970688",
        "pubtime": "7-15",
        "href": "http://weibo.com/1855024094/DEMah3v4Z?from=page_1002061855024094_profile&wvr=6&mod=weibotime&type=comment#_rnd1468647527063",
        "title": "中韩、中法、中德三大国别产业园 提升成都全方位对外开放水平",
        "transmissibility": "1.8万",
        "source": "成都晚报"
    }, {
        "guid": "753811328153690113",
        "pubtime": "7-15",
        "href": "http://weibo.com/1855024094/DEm1WxpP8?from=page_1002061855024094_profile&wvr=6&mod=weibotime&type=comment#_rnd1468647407673",
        "title": "唐良智主持召开市委常委(扩大)会议",
        "transmissibility": "1.8万",
        "source": "成都晚报"
    }, {
        "guid": "753811328942219264",
        "pubtime": "7-15",
        "href": "http://weibo.com/1855024094/DEkdtuW10?from=page_1002061855024094_profile&wvr=6&mod=weibotime&type=comment",
        "title": "成都定位为国家中心城市 晋升全国城镇体系“顶端”带来重大机遇",
        "transmissibility": "1.8万",
        "source": "成都晚报"
    }, {
        "guid": "753811329336483840",
        "pubtime": "7-15",
        "href": "http://weibo.com/1855024094/DETdrAgai?from=page_1002061855024094_profile&wvr=6&mod=weibotime&type=comment#_rnd1468647304569",
        "title": "天府国际机场力争11月动工 “蓉欧+”将形成北、中、南三条干线",
        "transmissibility": "1.7万",
        "source": "成都晚报"
    }, {
        "guid": "753811329726554112",
        "pubtime": "7-15",
        "href": "http://weibo.com/1855024094/DErWPeY6y?from=page_1002061855024094_profile&wvr=6&mod=weibotime&type=comment",
        "title": "争创首个内陆自贸区 成都勇担四川“全创”核心城市重任",
        "transmissibility": "1.5万",
        "source": "成都晚报"
    }, {
        "guid": "753811329399398400",
        "pubtime": "7-15",
        "href": "http://wcd.cdwb.com.cn:81/?p=39227",
        "title": "公里中环路，将成为“会呼吸的道路”",
        "transmissibility": "5300",
        "source": "微成都"
    }, {
        "guid": "753811330909347840",
        "pubtime": "7-15",
        "href": "http://wcd.cdwb.com.cn:81/?p=35019",
        "title": "《成渝城市群发展规划》出炉！成都重庆的小伙伴奔走相告啦~",
        "transmissibility": "2000",
        "source": "微成都"
    }, {
        "guid": "753811330053709824",
        "pubtime": "7-15",
        "href": "http://wcd.cdwb.com.cn:81/?p=36396",
        "title": "为什么说成都是中国中西部NO1？看完想低调都不得行！",
        "transmissibility": "1650",
        "source": "微成都"
    }],
    "pageInfo": {
        "pageCount": 61970,
        "totalNum": 619695,
        "pageSize": 10,
        "pageIndex": 1
    }
};
// 全搜索全媒体集群-最新文章传播情况json数据
var datanew3 = {
    "result": [{
        "guid": "753811327432269824",
        "pubtime": "7-15",
        "href": "http://news.chengdu.cn/2016/0412/1778904.shtml",
        "title": "建成绿色低碳发展典范 成都中法生态园“动作不断”",
        "transmissibility": "1.9万",
        "source": "全搜索新闻网"
    }, {
        "guid": "753811328220798976",
        "pubtime": "7-15",
        "href": "http://news.chengdu.cn/2016/0412/1778735.shtml",
        "title": "成都戴上绿色“项链”环城生态区2020年建成",
        "transmissibility": "1.1万",
        "source": "全搜索新闻网"
    }, {
        "guid": "753811332217970688",
        "pubtime": "7-15",
        "href": "http://news.chengdu.cn/2016/0407/1777814.shtml",
        "title": "成都环城生态区2020年建成 半小时可览湖光山色",
        "transmissibility": "5000",
        "source": "全搜索新闻网"
    }, {
        "guid": "753811328153690113",
        "pubtime": "7-15",
        "href": "http://news.chengdu.cn/2016/0304/1769439.shtml",
        "title": "大力推进生态建设 让绿水青山常伴身边",
        "transmissibility": "4300",
        "source": "全搜索新闻网"
    }, {
        "guid": "753811328942219264",
        "pubtime": "7-15",
        "href": "http://news.chengdu.cn/2016/0302/1768640.shtml",
        "title": "今年成都生态文明建设总投资超700亿元",
        "transmissibility": "3750",
        "source": "全搜索新闻网"
    }, {
        "guid": "753811329336483840",
        "pubtime": "7-15",
        "href": "http://news.chengdu.cn/2016/0229/1767960.shtml",
        "title": "成都启动实施生态文明建设7大主要任务",
        "transmissibility": "2400",
        "source": "全搜索新闻网"
    }, {
        "guid": "753811329726554112",
        "pubtime": "7-15",
        "href": "http://news.chengdu.cn/2016/0219/1765732.shtml",
        "title": "成都公布生态文明建设10年规划 第二水源今年上半年开工",
        "transmissibility": "1000",
        "source": "全搜索新闻网"
    }, {
        "guid": "753811329399398400",
        "pubtime": "7-15",
        "href": "http://news.chengdu.cn/2016/0218/1765658.shtml",
        "title": "未来十年成都5619亿投入生态文明建设 钱怎么花？",
        "transmissibility": "765",
        "source": "全搜索新闻网"
    }, {
        "guid": "753811330909347840",
        "pubtime": "7-15",
        "href": "http://news.chengdu.cn/2015/1201/1745985.shtml",
        "title": "唐良智：科学谋划水生态建设蓝图 推进城市有机可持续发展",
        "transmissibility": "630",
        "source": "全搜索新闻网"
    }, {
        "guid": "753811330053709824",
        "pubtime": "7-15",
        "href": "http://news.chengdu.cn/2016/0424/1781754.shtml",
        "title": "生态绿色为大熊猫营造幸福家园",
        "transmissibility": "548",
        "source": "全搜索新闻网"
    }],
    "pageInfo": {
        "pageCount": 61970,
        "totalNum": 619695,
        "pageSize": 10,
        "pageIndex": 1
    }
};
// 每经新媒体集群-最新文章传播情况json数据
var datanew4 = {
    "result": [{
        "guid": "753811327432269824",
        "pubtime": "7-15",
        "href": "http://www.nbd.com.cn/articles/2016-07-14/1021998.html",
        "title": "冰火两重天,民间投资棋局如何解",
        "transmissibility": "2.3万",
        "source": "每经网"
    }, {
        "guid": "753811328220798976",
        "pubtime": "7-15",
        "href": "http://www.nbd.com.cn/articles/2016-07-14/1021927.html",
        "title": "需求快速释放 环保PPP项目规模超万亿",
        "transmissibility": "1.78万",
        "source": "每经网"
    }, {
        "guid": "753811332217970688",
        "pubtime": "7-15",
        "href": "http://www.nbd.com.cn/articles/2016-07-13/1021602.html",
        "title": "去产能效应渐显 6月煤炭产量降幅扩大",
        "transmissibility": "1.4万",
        "source": "每经网"
    }, {
        "guid": "753811328153690113",
        "pubtime": "7-15",
        "href": "http://www.nbd.com.cn/articles/2016-07-13/1021582.html",
        "title": "网络文学将成网络版权监管重点",
        "transmissibility": "1.1万",
        "source": "每经网"
    }, {
        "guid": "753811328942219264",
        "pubtime": "7-15",
        "href": "http://www.nbd.com.cn/articles/2016-07-12/1021321.html",
        "title": "Papi酱再探直播变现 网红经济盈利到底有多难？",
        "transmissibility": "8640",
        "source": "每经网"
    }, {
        "guid": "753811329336483840",
        "pubtime": "7-15",
        "href": "http://www.nbd.com.cn/articles/2016-07-12/1021267.html",
        "title": "官员“截胡”集资房 法院终审判决退房",
        "transmissibility": "5000",
        "source": "每经网"
    }, {
        "guid": "753811329726554112",
        "pubtime": "7-15",
        "href": "http://www.nbd.com.cn/articles/2016-07-12/1021163.html",
        "title": "首个网约车司机标准发布 “三证”真实才能注册",
        "transmissibility": "4300",
        "source": "每经网"
    }, {
        "guid": "753811329399398400",
        "pubtime": "7-15",
        "href": "http://www.nbd.com.cn/articles/2016-07-11/1020959.html",
        "title": "让“财商”缩小人和人之间的鸿沟",
        "transmissibility": "3750",
        "source": "每经网"
    }, {
        "guid": "753811330909347840",
        "pubtime": "7-15",
        "href": "http://www.nbd.com.cn/articles/2016-07-11/1020809.html",
        "title": "不能让商家跑路把预付卡变成诚信滑坡带",
        "transmissibility": "2400",
        "source": "每经网"
    }, {
        "guid": "753811330053709824",
        "pubtime": "7-15",
        "href": "http://www.nbd.com.cn/articles/2016-07-11/1020805.html",
        "title": "揭秘网店倒卖产业链 虚假认证助假货横行",
        "transmissibility": "1000",
        "source": "每经网"
    }],
    "pageInfo": {
        "pageCount": 61970,
        "totalNum": 619695,
        "pageSize": 10,
        "pageIndex": 1
    }
};


var data2 = datacb0;
var data3 = datanew0;