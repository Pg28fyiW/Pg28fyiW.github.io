/* ハンバーガーをクリック時 */
$(".hamburger").click(function () {
    // toggleClassは、もし<body> 要素にすでに fixed クラスが存在すれば、それを削除し、存在しなければ追加します。
    $('body').toggleClass('fixed');
    //  menu_modal というIDを持つ要素をクリックするたびに、その要素が表示されている場合はフェードアウトし、非表示の場合はフェードインする効果を提供します。
    $('#menu_modal').fadeToggle("fast");
    $(this).toggleClass("opened");
    $("#hamburger_menu").toggleClass("hide");
})

/* スマホのメニューのモーダルをクリック時 */
$("#menu_modal").click(function (event) {
    // スクロール固定を解除する。（.fixed {overflow: hidden;}）
    $('body').removeClass('fixed');
    $('#hamburger_menu').addClass("hide");
    $(this).fadeOut("fast");
    $(".hamburger").removeClass("opened");
    event.stopPropagation();
})

/* 月別タブ、週別タブ、日別タブの表示切り替え */
$(".tab ul li").click(function () {
    $(".tab ul li.current").removeClass("current");
    $(this).addClass("current");
    $(".panel.block").addClass("none");
    $(".panel.block").removeClass("block");
    let tmpID = $(this).attr('id');
    tmpID = '#' + 'graph_' + tmpID;
    $(tmpID).removeClass("none");
    $(tmpID).addClass("block");
})

/* 月別タブ、週別タブ、日別タブの表示切り替え
  （ハンバーガーメニューから遷移時の週別、日別選択済み）
*/
$(function () {
    // URL取得
    var url = location.href;
    url = (url.match(/\?id=tab\d+$/) || [])[0];

    if (url) { //URLに値が入ってたらindexである
        //取得したURLを「?」で分割
        var params = (String(url)).split("?");

        //params内のデータを「=」で分割
        var tab = (String(params[1])).split("=");

        //tab内のデータをtabnameに格納
        if ($(tab).length) {
            var tabname = tab[1];
        } else {
            var tabname = "tab1";
        }

        //コンテンツ非表示&amp;タブを非アクティブ
        $('.tabs .panel').hide();
        $('.tab ul li').removeClass('current');

        //何番目のタブかを格納
        var tabno = $('.tabs li#' + tabname).index();

        //コンテンツ表示
        $('.tabs .panel').eq(tabno).fadeIn();

        //タブのアクティブ化
        $('.tabs li').eq(tabno).addClass('current');
    }
})



/* PCナビゲーション */
$(".nav2 span").click(function () {
    // $("#pc_nav_modal2").removeClass("show");
    // $("#pc_nav_modal").toggleClass("show");
    $("#nav_procedure").slideUp();
    $("#nav_price").slideToggle();
})

$(".nav10 span").click(function () {
    // $("#pc_nav_modal").removeClass("show");
    // $("#pc_nav_modal2").toggleClass("show");
    $("#nav_price").slideUp();
    $("#nav_procedure").slideToggle();
})

// 現在表示中のプラン切り替えモーダル
$(".select_plan").click(function () {
    $("#plan").show();
})

$(".plans div").click(function () {
    $(".plans div").removeClass("selected");
    $(this).addClass("selected");
    $("#plan").hide();
})
// 現在表示中のプラン：スタンダードS
$(".plan1").click(function () {
    $(".plan_gas").hide();
    $(".plan_intensive").hide();
    $(".plan_electric").show();
})
// 現在表示中のプラン：とくとくガスプラン
$(".plan2").click(function () {
    $(".plan_electric").hide();
    $(".plan_intensive").hide();
    $(".plan_gas").show();
})
// 現在表示中のプラン：集約
$(".plan3").click(function () {
    $(".plan_electric").hide();
    $(".plan_gas").hide();
    $(".plan_intensive").show();
})


/* 円／kWh切り替え */
$(".switching li").click(function () {
    $(".price").toggleClass("none");
    $(".switching li").toggleClass("active");
})


/* 月切り替え（1月～12月のいずれかをクリックした時） */
$(".month_list li").click(function () {
    $(".month_list li.current").removeClass("current");
    $(this).addClass("current");
    $(".price_txt_area.block").addClass("none");
    $(".price_txt_area.block").removeClass("block");
    let tmpID = $(this).attr('id');
    $(tmpID).removeClass("none");
    $(tmpID).addClass("block");
    if (tmpID == "#month5_area") {
        $(".this_month").removeClass("none");
        $(".past").addClass("none");
    } else {
        $(".this_month").addClass("none");
        $(".past").removeClass("none");
    }
})

/* 月切り替え */
$(".month_list li").click(function () {
    $(".month_list li.current").removeClass("current");
    $(this).addClass("current");
    $(".price_txt_area.block").addClass("none");
    $(".price_txt_area.block").removeClass("block");
    let tmpID = $(this).attr('id');
    tmpID = '#' + tmpID + '_area';
    $(tmpID).removeClass("none");
    $(tmpID).addClass("block");
    if (tmpID == "#month5_area") {
        $(".this_month").removeClass("none");
        $(".past").addClass("none");
    } else {
        $(".this_month").addClass("none");
        $(".past").removeClass("none");
    }
})

// グラフの右寄せ表示 
$(document).ready(function () {
    $(".graph").scrollLeft(1000);

    // 日別グラフのcurrentのpositionを取得
    if ($(".graph_d").length) { // .graph_dの要素があったら実行
        $(".graph_d").scrollLeft(0);
        var dPos = $(".day_list li.current").position();
        dPos = dPos.left;
        if (dPos < 0) {
            dPos = -(dPos);
        }
        //console.log("POS:" + dPos);

        /* 画面サイズ取得 */
        var dWid = $(window).width();
        //console.log("Wid:" + dWid);

        var mov = dPos - (dWid * 0.78);
        //console.log("Mov:" + mov);
        $(".graph_d").scrollLeft(mov);
    }
})

//フローティングボタンの表示/非表示
$(function () {
    $(window).on('scroll', function () {
        // console.log('比較', ($(this).scrollTop() <= $('footer').offset().top - 600))
        // console.log('比較', $(this).scrollTop() +  ' <= ' + ($('footer').offset().top - 600))
        if ($('footer nav').length) {//footer navがあるかどうか（ホーム以前の画面対応）
            // $(this).scrollTop() は、その時点でのウィンドウのスクロール位置を取得します。
            // $(this).scrollTop() は、スクロースするたびに変わる。一番上は0、一番下は4923.599609375
            // スクロール位置が100ピクセルよりも下にある場合に特定の処理を実行するように指示
            if ($(this).scrollTop() > 100) {//ページが100px以上スクロールされたとき
                // $('footer').offset().top は、ページ内のフッター要素の上端からの垂直方向の位置を取得します。
                // $('footer').offset().top は常に固定の値（4604.906219482422）
                // <= $('footer').offset().top - 600 は、フッター要素の上端から600px以上、上にスクロールされている場合
                if ($(this).scrollTop() <= $('footer').offset().top - 600) {//かつfooterが表示されていない
                    // フローティングボタンを消す
                    $('footer nav').fadeOut();
                } else {
                    // フローティングボタンを表示
                    $('footer nav').fadeIn();
                }
            } else {
                // フローティングボタンを表示
                $('footer nav').fadeIn();
            }
            
        }
    })
})




//金額カウントアップは、使われていない





//タブバーアクション
//フローティングボタンの各種お手続きをクリックした場合
$("footer .edit span").click(function () {
    console.log("フローティングボタンの各種お手続きをクリックした場合");
    //  "subNav" であるすべての要素に対して、"act" クラスが存在しない場合に追加し、存在する場合に削除します。
    $('.subNav').toggleClass('act');
    // クリックされた要素（this）の親要素に対して、"act" クラスが存在しない場合に追加し、存在する場合に削除します。
    $(this).parent().toggleClass('act');
})

// headerタブ内に.editクラスはないので、これは使われていないメソッド
$("header .edit span").click(function () { 
    console.log("ヘッダーの各種お手続きをクリックした場合");
    //  "subNav" であるすべての要素に対して、"act" クラスが存在しない場合に追加し、存在する場合に削除します。
    $('.subNav').toggleClass('act');
    // クリックされた要素（this）の親要素に対して、"act" クラスが存在しない場合に追加し、存在する場合に削除します。
    $(this).parent().toggleClass('act');
})



// 「」モーダル id="show_cumulative" （クリックする？マーク）
$("#show_cumulative").click(function () {
    console.log('cc');
    // スクロールを固定にする（ .fixed {overflow: hidden;} ）（縦方向のスクロールを非表示にする）
    $('body').addClass('fixed');
    // 「」モーダルを表示する。 id="about_cumulative"（表示するモーダル）
    $("#about_cumulative").show();
});

// 似た家庭とは？モーダル id="show_similar" （クリックする？マーク）
$("#show_similar").click(function () {
    // スクロールを固定にする（ .fixed {overflow: hidden;} ）（縦方向のスクロールを非表示にする）
    $('body').addClass('fixed');
    // 似た家庭とは？モーダルを表示する。 id="about_similar"（表示するモーダル）
    $("#about_similar").show();
});


/* 目標金額と途中経過？モーダル */
$("#show_predict").click(function () {
    // スクロールを固定にする（ .fixed {overflow: hidden;} ）（縦方向のスクロールを非表示にする）
    $('body').addClass('fixed');
    // 目標金額と途中経過？モーダルを表示する。
    $("#about_predict").show();
});




/* 目標金額設定モーダル
  （「目標金額を設定」もしくは「目標金額を変更」ボタンを押下すると目標金額設定モーダルが開く） */
$(".show_goal_modal, .show_goal_bar").click(function () {
    // スクロールを固定にする（ .fixed {overflow: hidden;} ）（縦方向のスクロールを非表示にする）
    $('body').addClass('fixed');
    $("#goal_modal").show();
});


/* 目標金額設定モーダルの「キャンセル」ボタン、または「設定」ボタン押下時 */
$(".cancel_set li").click(function () {
     // スクロール固定を解除する。（.fixed {overflow: hidden;}）
    $('body').removeClass('fixed');
    $("#goal_modal").hide(); /* 目標金額設定モーダルを隠す */
});

/* 目標金額設定モーダルの「設定」ボタン押下時 */
$(".cancel_set li.set").click(function () {
    $('.change_goal').removeClass('none');
    $('set_goal').removeClass('none'); /* 「目標金額を変更」を隠す */
    $('.not_set').addClass('none'); /* 「目標金額を設定」を隠す */
});


// 現在表示中のプランの「表示する契約について」モーダル　 id="show_select_contract" （クリックする？マーク）
$("#show_select_contract").click(function () {
    // スクロールを固定にする（ .fixed {overflow: hidden;} ）（縦方向のスクロールを非表示にする）
    $('body').addClass('fixed');
    // 電気料金予測とは？モーダルを表示する。 id = "about_select_contract"（表示するモーダル）
    $("#about_select_contract").show();
});



// 未確定の表示についてモーダル id="show_accumulation" （クリックする？マーク）
$("#show_accumulation").click(function () {
    // スクロールを固定にする（ .fixed {overflow: hidden;} ）（縦方向のスクロールを非表示にする）
    $('body').addClass('fixed');
    // 未確定の表示についてモーダルを表示する。 id="about_accumulation"（表示するモーダル）
    $("#about_accumulation").show();
});



// 電気料金予測とは？モーダル id="show_forecast" （クリックする？マーク）
$("#show_forecast").click(function () {
    // スクロールを固定にする（ .fixed {overflow: hidden;} ）（縦方向のスクロールを非表示にする）
    $('body').addClass('fixed');
    // 電気料金予測とは？モーダルを表示する。 id="about_forecast"（表示するモーダル）
    $("#about_forecast").show();
});




/* モーダルの×ボタン */
$(".close_about").click(function () {
    // スクロール固定を解除する。（.fixed {overflow: hidden;}）
    $('body').removeClass('fixed');
    // モーダルを非表示にする。
    $(".modal").hide();
});

/* 「家族構成」画面の「世帯人数」で人数選択で項目表示 */
$('#number_of_people').change(function () {
    $(".people").hide();
    let number_of_people = $('option:selected').val();
    // 「クラス名が"people"である要素の中からインデックスがiに対応する要素を下方向にスライドしながら表示する」という意味です。
    for (i = 0; i < number_of_people; i++) {
        // .eq(i)は、選択した要素の中からインデックスがiに対応する要素を選択します。
        // iは0から始まるインデックスで、
        // 例えばeq(0)は最初の要素、eq(1)は2番目の要素を意味します。
        // .slideDown()は選択された要素を下方向にスライドしながら表示します。これはjQueryのアニメーション効果の一つです。
        $(".people").eq(i).slideDown();
    }
});

/* 「ライフスタイル」の「詳細を入力」ボタン、「詳細を閉じる」ボタンをクリック */
$("#other").click(function () {
    // .slideToggle()は、選択された要素に対して、
    // スライドトグル（スライドを開閉する）のアニメーション効果を適用します。
    $("#other_area").slideToggle();
    // .toggleClass("opened")は、
    // 選択された要素に"opened"というクラスが存在する場合にはそのクラスを削除し、
    // 存在しない場合には追加します。
    // つまり、要素のクラスをトグル（切り替え）します。
    $(this).toggleClass("opened");
    // .children("span")は、選択された要素の直接の子要素で、タグ名が"span"である要素を選択します。
    // .toggleClass("none")は、選択された要素に"none"というクラスが存在する場合にはそのクラスを削除し、存在しない場合には追加します。
    // つまり、子要素のspan要素のクラスをトグル（切り替え）します。
    $(this).children("span").toggleClass("none");
});

/* 文字数の多い選択肢を3点リーダー表示　「家族構成」「ライフスタイル」 */
$("#lifestyle").change(function () {
    let index = this.selectedIndex;
    if (index == 3) {
        $(".select_wide").addClass("delete");
    } else {
        $(".select_wide").removeClass("delete")
    }
});







// 「お知らせ一覧」画面のタイトルの右端の「▼」（下三角）または「▲」（上三角）をクリック時
$(".title_area").click(function () {
    // $(this) はクリックされた要素を指し、
    // "title_area" という要素がクリックされると、
    // それに続く ".notification_text" クラスの要素がスライドで表示/非表示されるようになります。
    $(this).next(".notification_text").slideToggle();
    // "title_area" という要素がクリックされると、
    // その直下の子要素の中でクラスが "new" であるものから "new" クラスが削除されます。
    $(this).children(".new").removeClass("new");
    // title_areaという要素がクリックされるたびに、
    // その要素のクラスに "opened" があれば削除し、なければ追加します。    
    $(this).toggleClass("opened");
});

