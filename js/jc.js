/**
 * Created by zhenglu on 2016/7/17.
 */
$(document).ready(function () {
    //下拉列表显示隐藏
    selectBox($('.lb-sel-bk'), $('.lb-sel-bk ul'));
    $(".lb-sel-bk").click(function () {
        if ($(this).hasClass("rw-sel-op")) {
            $(this).removeClass("rw-sel-op");
        }
        else {
            $(this).addClass("rw-sel-op");
        }
    });

    $(document).click(function () {
        if ($(".lb-sel-bk ul").css('display') == 'block') {
            $(".lb-sel-bk").removeClass("rw-sel-op");
        }
    });
});

function selectBox(div1, div2) {
    div1.click(function (event) {
        event.stopPropagation();
        var Index = div1.index(this);

        if (div2.eq(Index).css('display') == 'block') {
            div2.eq(Index).hide();
        } else {
            div2.hide();
            div2.eq(Index).show();
        }
        if (div2.eq(Index).css('display') == 'block') {
            $(document).click(function () {
                div2.hide();
            });
            $('li a', div2).click(function () {
                var text = this.innerHTML;
                $(this).parent().parent().prev().text(text);
            });
        }
    });
}