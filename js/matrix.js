(function(window) {
    //标题和链接
    //var TitleHrefList = document.getElementById('sourcedata').innerHTML;
    //var arrTitleHref = eval(TitleHrefList);
    // //背景颜色
    var ColorList = [
        ['color0'],
        ['color1'],
        ['color2'],
        ['color3']
    ];
    var arrColor = eval(ColorList);

    window.BeginChange = function(width, height, spacing, arrTitleHref) {
            var left_width = width + spacing;
            var top_height = height + spacing;
            //重新赋值 一屏显示20条
            //AreaPosition = [[0, 0], [0, top_height], [left_width, 0], [left_width, top_height], [left_width*2, 0], [left_width*2, top_height], [left_width*3, 0], [left_width*3, top_height], [left_width*4, 0], [left_width*4, top_height], [left_width*5, 0], [left_width*5, top_height],
            //               [left_width*6, 0], [left_width*6, top_height], [left_width*7, 0], [left_width*7, top_height], [0, top_height*2], [0, top_height*3], [left_width, top_height*2], [left_width, top_height*3], [left_width*2, top_height*2], [left_width*2, top_height*3], [left_width*3, top_height*2],
            //               [left_width*3, top_height*3], [left_width*4, top_height*2], [left_width*4, top_height*3], [left_width*5, top_height*2], [left_width*5, top_height*3], [left_width*6, top_height*2], [left_width*6, top_height*3], [left_width*7, top_height*2], [left_width*7, top_height*3]];

            // 一屏显示15条
            AreaPosition = [
                [0, 0],
                [0, top_height],
                [left_width, 0],
                [left_width, top_height],
                [left_width * 2, 0],
                [left_width * 2, top_height],
                [left_width * 3, 0],
                [left_width * 3, top_height],
                [left_width * 4, 0],
                [left_width * 4, top_height],
                [left_width * 5, 0],
                [left_width * 5, top_height],
                [left_width * 6, 0],
                [left_width * 6, top_height],
                [0, top_height * 2],
                [left_width, top_height * 2],
                [left_width * 2, top_height * 2],
                [left_width * 3, top_height * 2],
                [left_width * 4, top_height * 2],
                [left_width * 5, top_height * 2],
                [left_width * 6, top_height * 2]
            ];


            arrAreaPosition = eval(AreaPosition);
            divshift = [
                [-500, -200],
                [500, 200],
                [130, 130],
                [-30, -30],
                [161, 0],
                [-161, 0],
                [644, 117],
                [161, 0],
                [483, 234],
                [1100, 350],
                [-232, -55],
                [-1100, -350],
                [-322, -17],
                [20, 20],
                [10, 10],
                [305, 111],
                [-222, -789],
                [-10, -10],
                [70, 50],
                [100, 130]
            ];
            arrDivShift = eval(divshift);
            arrNewArea = new Array(); //新的数组排列
            arrAreaPosition = arrAreaPosition.sort(function() {
                return Math.random() > 0.5 ? -1 : 1;
            }); //数组对象随机排序

            //var xx = 2;     //2个最大区域
            //var xw = 2;     //2个长区域
            //var xh = 4;     //4个高区域
            //var x = 12;     //12个小区域

            var xx = 1; //2个最大区域
            var xw = 2; //2个长区域
            var xh = 1; //4个高区域
            var x = 11; //12个小区域
            var left = 0; //css left
            var top = 0; //css top

            //获取大区域的坐标
            for (var i1 = 0; i1 < arrAreaPosition.length; i1++) {
                left = arrAreaPosition[i1][0];
                top = arrAreaPosition[i1][1];
                //if (xx > 0 & left % (left_width*2) == 0 & top % (top_height*2) == 0) {
                //    arrNewArea.push(arrAreaPosition[i1]);
                //    DeleteArea(left, top);
                //    DeleteArea(left, top + top_height);
                //    DeleteArea(left + left_width, top);
                //    DeleteArea(left + left_width, top + top_height);
                //    xx--;
                //    i1--;
                //}

                if (xx > 0 & left % (left_width * 2) == 0 & left / left_width < 6 & top / top_height < 2) {
                    arrNewArea.push(arrAreaPosition[i1]);
                    DeleteArea(left, top);
                    DeleteArea(left, top + top_height);
                    DeleteArea(left + left_width, top);
                    DeleteArea(left + left_width, top + top_height);
                    xx--;
                    i1--;
                }
            }

            //获取两个长区域的坐标
            for (var i2 = 0; i2 < arrAreaPosition.length; i2++) {
                left = arrAreaPosition[i2][0];
                top = arrAreaPosition[i2][1];
                //if (xw > 0 & left % (left_width*2) == 0 & top % top_height == 0) {
                //    if (top / top_height == 0 | top / top_height == 2) {
                //        arrNewArea.push(arrAreaPosition[i2]);
                //        DeleteArea(left, top);
                //        DeleteArea(left + left_width, top);
                //        AddArea(left, top + top_height);
                //        DeleteArea(left, top + top_height);
                //        AddArea(left + left_width, top + top_height);
                //        DeleteArea(left + left_width, top + top_height);
                //    }
                //    else if (top / top_height == 1 | top / top_height == 3) {
                //        arrNewArea.push(arrAreaPosition[i2]);
                //        DeleteArea(left, top);
                //        DeleteArea(left + left_width, top);
                //        AddArea(left, top - top_height);
                //        DeleteArea(left, top - top_height);
                //        AddArea(left + left_width, top - top_height);
                //        DeleteArea(left + left_width, top - top_height);
                //    }
                //    xw--;
                //    i2--;
                //}

                if (xw > 0 & left / left_width < 6 & top % top_height == 0) {
                    if (isExit(left, top) & isExit(left + left_width, top)) {
                        arrNewArea.push(arrAreaPosition[i2]);
                        DeleteArea(left, top);
                        DeleteArea(left + left_width, top);
                        xw--;
                        i2--;
                    }

                }
            }

            //获取四个高区域的坐标
            //for (var i3 = 0; i3 < arrAreaPosition.length; i3++) {
            //    left = arrAreaPosition[i3][0];
            //    top = arrAreaPosition[i3][1];
            //    if (xh > 0 & left % left_width == 0 & top % (top_height*2) == 0) {
            //        if (xh == 4) {
            //            arrNewArea.push(arrAreaPosition[i3]);
            //            DeleteArea(left, top);
            //            DeleteArea(left, top + top_height);
            //            xh--;
            //            if (left / left_width % 2 == 0) {
            //                AddArea(left + left_width, top);
            //                DeleteArea(left + left_width, top);
            //                DeleteArea(left + left_width, top + top_height);
            //            }
            //            else {
            //                AddArea(left - left_width, top);
            //                DeleteArea(left - left_width, top);
            //                DeleteArea(left - left_width, top + top_height);
            //            }
            //        }
            //        else if (xh == 3) {
            //            arrNewArea.push(arrAreaPosition[i3]);
            //            DeleteArea(left, top);
            //            DeleteArea(left, top + top_height);
            //        }
            //        else {
            //            if (left / left_width % 2 == 0) {
            //                arrNewArea.push(arrAreaPosition[i3]);
            //                DeleteArea(left, top);
            //                DeleteArea(left, top + top_height);
            //                AddArea(left + left_width, top);
            //                DeleteArea(left + left_width, top);
            //                AddArea(left + left_width, top + top_height);
            //                DeleteArea(left + left_width, top + top_height);
            //            }
            //            else {
            //                arrNewArea.push(arrAreaPosition[i3]);
            //                DeleteArea(left, top);
            //                DeleteArea(left, top + top_height);
            //                AddArea(left - left_width, top);
            //                DeleteArea(left - left_width, top);
            //                AddArea(left - left_width, top + top_height);
            //                DeleteArea(left - left_width, top + top_height);
            //            }
            //        }
            //        xh--;
            //        i3--;
            //    }
            //}


            //获取一个个高区域的坐标
            for (var i3 = 0; i3 < arrAreaPosition.length; i3++) {
                left = arrAreaPosition[i3][0];
                top = arrAreaPosition[i3][1];
                if (xh > 0 & left % left_width == 0 & top / top_height < 2) {
                    if (isExit(left, top) & isExit(left, top + top_height)) {
                        arrNewArea.push(arrAreaPosition[i3]);
                        DeleteArea(left, top);
                        DeleteArea(left, top + top_height);
                        xh--;
                        i3--;
                    }
                }
            }

            //剩下四个小区域
            for (var i4 = 0; i4 < arrAreaPosition.length; i4++) {
                arrNewArea.push(arrAreaPosition[i4]);
            }

            DrawArea(arrNewArea, width, height, spacing, arrTitleHref);
            RightAreaHtml();
        }
        //数组中删除指定坐标的区域
    function DeleteArea(left, top) {
        for (var i = 0; i < arrAreaPosition.length; i++) {
            if (left == arrAreaPosition[i][0] & top == arrAreaPosition[i][1]) {
                arrAreaPosition.splice(i, 1);
                return;
            }
        }
    }
    //数组中添加指定坐标的区域
    function AddArea(left, top) {
        for (var i = 0; i < arrAreaPosition.length; i++) {
            if (left == arrAreaPosition[i][0] & top == arrAreaPosition[i][1]) {
                arrNewArea.push(arrAreaPosition[i]);
                return;
            }
        }
    }

    //判断是否存在
    function isExit(left, top) {
        for (var i = 0; i < arrAreaPosition.length; i++) {
            if (left == arrAreaPosition[i][0] & top == arrAreaPosition[i][1]) {
                return true;
            }
        }
    }


    //区域中画图
    function DrawArea(arrNewArea, width, height, spacing, arrTitleHref) {
        var left = 0;
        var top = 0;
        var title;
        var href;
        var color;
        var strHtml = "";
        arrTitleHref = arrTitleHref.sort(function() {
            return Math.random() > 0.5 ? -1 : 1;
        }); //数组对象随机排序
        arrColor = arrColor.sort(function() {
            return Math.random() > 0.5 ? -1 : 1;
        }); //数组对象随机排序
        arrDivShift = arrDivShift.sort(function() {
            return Math.random() > 0.5 ? -1 : 1;
        }); //数组对象随机排序
        console.log("arrNewArea.length:" + arrNewArea.length);
        for (var i = 0; i < arrNewArea.length; i++) {
            left = arrNewArea[i][0];
            top = arrNewArea[i][1];
            title = arrTitleHref[i][0];
            href = arrTitleHref[i][1];
            color = arrColor[i % 4];
            //if (i == 0 | i == 1) {
            //    strHtml += AreaHtml((width*2)+spacing, (height*2)+spacing, top, left, 48, color, href, title, 40, 101.5, i);
            //}
            //else if (i < 8) {
            //    if (i == 2 | i == 5)
            //        strHtml += AreaHtml((width*2)+spacing, height, top, left, 30, color, href, title, 31, 43, i);
            //    else
            //        strHtml += AreaHtml(width, height, top, left, 20, color, href, title, 23.5, 43, i);
            //}
            //else if (i < 16) {
            //    if (i == 8 | i == 9 | i == 10 | i == 13)
            //        strHtml += AreaHtml(width, (height*2)+spacing, top, left, 34, color, href, title, 35.5, 101.5, i);
            //    else
            //        strHtml += AreaHtml(width, height, top, left, 20, color, href, title, 23.5, 43, i);
            //}
            //else
            //    strHtml += AreaHtml(width, height, top, left, 20, color, href, title, 23.5, 43, i);

            if (i == 0) {
                strHtml += AreaHtml((width * 2) + spacing, (height * 2) + spacing, top, left, 48, color, href, title, 40, 101.5, i);
            } else if (i < 3) {
                if (i == 1 | i == 2)
                    strHtml += AreaHtml((width * 2) + spacing, height, top, left, 30, color, href, title, 31, 43, i);
                else
                    strHtml += AreaHtml(width, height, top, left, 20, color, href, title, 23.5, 43, i);
            } else if (i < 14) {
                if (i == 3)
                    strHtml += AreaHtml(width, (height * 2) + spacing, top, left, 34, color, href, title, 35.5, 101.5, i);
                else
                    strHtml += AreaHtml(width, height, top, left, 20, color, href, title, 23.5, 43, i);
            } else
                strHtml += AreaHtml(width, height, top, left, 20, color, href, title, 23.5, 43, i);
        }

        document.getElementById('cb-main-con').innerHTML = strHtml;
    }

    var ispeed = 1000; //移动速度,单位毫秒
    //有偏移的移位
    function AreaHtml(w, h, top, left, fs, color, href, title, pt1, pt2, n) {
        var ctop = top + arrDivShift[n][1];
        if (top + arrDivShift[n][1] < 0 | top + arrDivShift[n][1] > 702) {
            ctop = top;
            arrDivShift[n][1] = 0;
        }
        var cleft = left + arrDivShift[n][0];
        if (left + arrDivShift[n][0] < 0 | left + arrDivShift[n][0] > 965) { //限制移位的像素,防止令页面出现width过大出现滚动条
            cleft = left;
            arrDivShift[n][0] = 0;
        }
        var html = "";
        html += "<div style='width: " + w + "px; height: " + h + "px; top: " + ctop + "px; left: " + cleft + "px; font-size: " + fs + "px;' class='content_tagstage_unit'>";
        html += "<a target='_blank' class='" + color + "' href='" + href + "'><span class='title' style='padding-top: " + pt1 + "px;'>" + title + "</span>";
        html += "<div class='mask'>";
        html += "<div class='cont_mask' style='font-size: 14px; padding-top: " + pt2 + "px;'>";
        html += "<span class='cont_title'>" + title + "</span><span class='cont_desc'></span>";
        html += "</div>";
        html += "</div>";
        html += "</a>";
        html += "</div>";
        return html;
    }

    //去除偏移的移位(复位)
    function RightAreaHtml() {
        var divobj = $("#cb-main-con .content_tagstage_unit");
        for (var i = 0; i < divobj.length; i++) {
            divobj.eq(i).animate({
                'left': divobj.eq(i).css('left').replace('px', '') - arrDivShift[i][0],
                'top': divobj.eq(i).css('top').replace('px', '') - arrDivShift[i][1]
            }, ispeed);
        }
    }
}(window))