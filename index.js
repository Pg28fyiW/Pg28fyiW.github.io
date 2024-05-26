function CCC() {
    console.log('1');

    // カルーセルが表示されているかどうかを確認する関数
    const isCarouselVisible = () => {
        const carousel = document.querySelector(".slider__Group-BZV63CCC");
        // カルーセルが存在しない場合または表示されていない場合はfalseを返す
        if (!carousel || carousel.offsetWidth <= 0 || carousel.offsetHeight <= 0) {
            console.log('カルーセルなし');
            return false;
        }
        console.log('カルーセルあり');
        return true;
    };


    if (!isCarouselVisible()) {
        console.log('カルーセルJSが存在しない場合終了する');
        return;
    }
    console.log('カルーセルJSが存在する場合処理を続行する');

    // 林さんからのコメント
    // 配信停止にすればslider__Item - BZV63T2Qをもっていないdiv要素が残ると思うのですが、
    // その要素だけ削除する処理にしたいです。
    // そうすればコメントアウトと同じ状態になるはずなので
    // さっきは配信停止のタグをコメントアウトしてうまくいったと思うので
    
 
    //------------------------------------------------------------------------------------
    // ◎消すべき要素：slider_Item-BZV63T2Qを持たない要素（配信されていないカルーセルアイテム）
    // <div id="karte_kcx_home_slider_itemXX"></div>
    
    // ◎消すべきでない要素： slider_Item-BZV63T2Qを持つ要素（配信されているカルーセルアイテム）   
    // <a class="slider__Item_CCC slider__Item-BZV63CCC astro_CCC testXX" href="" data-slider-index="0">
    //------------------------------------------------------------------------------------
    
    //------------------------------------------
    // 配信停止になっているタグを削除する。
    //------------------------------------------
    const carousel = document.querySelector(".slider__Group-BZV63CCC");
    console.log('carousel', carousel);
    const childlen = carousel.children;
    console.log('childlen', childlen);


    // インデックス i が前から順番に処理されていました。
    // しかし、要素を削除すると、それ以降の要素のインデックスが変わってしまいます。
    // このため、要素を削除すると、ループ内のインデックス i と実際の子要素のインデックスが一致しなくなり、一部の要素が削除されなかったり、意図しない要素が削除されたりする可能性があります。
    // for (let i = 0; i < childlen.length; i++) {
    
    //後ろから前にループすることで、削除される要素が後ろから順番に削除され、
    //要素のインデックスが変わらないようにすることができます。
    //これにより、すべての要素がきれいに削除されます。
    for (let i = childlen.length - 1; i >= 0; i--) {
        console.log('i', i);
        const child = childlen[i];
        console.log('child', child);
        if (!child.classList.contains("slider__Item-BZV63CCC")) {
            console.log('削除child', child);
            child.remove();
        }
    }

//オブジェクトは以下のようになっているので、
//ループで最後から消した方が消したいオブジェクトがなくならないのでよい    
// HTMLCollection(13) [
//     div#karte_kcx_home_slider_item01, 
//     div#karte_kcx_home_slider_item02, 
//     div#karte_kcx_home_slider_item03, 
//     div#karte_kcx_home_slider_item04, 
//     div#karte_kcx_home_slider_item05, 
//     div#karte_kcx_home_slider_item06, 
//     a.slider__Item_CCC.slider__Item-BZV63CCC.sliderCurrent-BZV63CCC.astro_CCC.test1, 
//     a.slider__Item_CCC.slider__Item-BZV63CCC.sliderCurrent-BZV63CCC.astro_CCC.test2, 
//     a.slider__Item_CCC.slider__Item-BZV63CCC.sliderCurrent-BZV63CCC.astro_CCC.test3, 
//     a.slider__Item_CCC.slider__Item-BZV63CCC.sliderCurrent-BZV63CCC.astro_CCC.test4, 
//     a.slider__Item_CCC.slider__Item-BZV63CCC.sliderCurrent-BZV63CCC.astro_CCC.test5, 
//     a.slider__Item_CCC.slider__Item-BZV63CCC.sliderCurrent-BZV63CCC.astro_CCC.test6, 
//     a.slider__Item_CCC.slider__Item-BZV63CCC.sliderCurrent-BZV63CCC.astro_CCC.test7, 
// ]
    


    const c = document.querySelector(".slider-BZV63CCC");
    let i = document.querySelector(".slider__Group-BZV63CCC"), // カルーセル
        e = document.querySelectorAll(".slider__Item-BZV63CCC"); // スライダーアイアイテム
    let u = document.querySelector(".slider__IndicatorGroup-BZV63CCC");
    let B = document.querySelector(".slider__Indicator-BZV63CCC"),
        o = document.querySelector(".sliderCurrent-BZV63CCC"),
        a = document.querySelector(".slider__prev-BZV63CCC"),
        f = document.querySelector(".slider__next-BZV63CCC"),
        m = !1,
        d = 0;

    let autoplayTimeoutId; 
    function startAutoplayIfCarouselVisible() {
        // カルーセルが表示されていない場合は何もせずに関数を終了する
        if (!isCarouselVisible()) return;

        // カルーセルが表示されている場合のみ自動再生を開始する
        autoplayTimeoutId = setTimeout(function() {
            s("next", 1); // 次のスライドへ移動
            startAutoplayIfCarouselVisible(); // 再度自動スライドを開始
        }, 3000);
    }



    // 停止ボタンの位置をインディケーターの右端に配置するメソッド
    function setPauseBtnPosition() {
        // インディケーターのドットの幅と間隔
        const dotWidth = 8; // ピクセル単位での幅
        const dotSpacing = 12; // ピクセル単位での間隔

        // インディケーターのドットの数を取得
        const indicatorItems = document.querySelectorAll(".slider__Item-BZV63CCC");
        const numIndicators = indicatorItems.length;

        // インディケーターの総幅を計算
        const totalWidth = (dotWidth * numIndicators) + (dotSpacing * (numIndicators - 1));

        // テストして結果をログに表示
        // console.log('totalWidth:', totalWidth);
        // インディケーターのすべてのドットの幅8pxとその余白12pxを合計した数を半分に割って、
        // 15pxの余白を足した位置に四角形ボタンを配置するため
         const offsetPauseBtn = (totalWidth / 2) + 15;

        // console.log('offsetPauseBtn', offsetPauseBtn);
        const squareButton = document.querySelector('.auto_slide_btn.square');
        squareButton.style.left = `calc(50% + ${offsetPauseBtn}px)`;
    }

    // 自動スライドの再生ボタンと停止ボタンを押した時のメソッド
    function togglePauseOrStart() {
        const dot = document.querySelector('.auto_slide_btn');
        let isSquare = true; // 初期状態は再生しているので四角形の停止ボタン

        dot.addEventListener('click', function() {
            // スタイルを切り替える
            if (isSquare) {
                // 四角形から三角形に変更
                dot.classList.remove('square');
                dot.classList.add('triangle');
                clearTimeout(autoplayTimeoutId); //自動スライド設定を停止
            } else {
                // 三角形から四角形に変更
                dot.classList.remove('triangle');
                dot.classList.add('square');
                startAutoplay(); //自動スライド設定を開始
            }
            // 状態をトグルする
            isSquare = !isSquare;
        });
    }

    // スライド移動時の処理
    function T() {
        e = document.querySelectorAll(".slider__Item-BZV63CCC");
        for (let r = 0; r < e.length; r++) e[r].classList.remove("sliderCurrent-BZV63CCC");
        e[2] ? e[2].classList.add("sliderCurrent-BZV63CCC") : e[1] && e[1].classList.add("sliderCurrent-BZV63CCC"),
            o = document.querySelector(".sliderCurrent-BZV63CCC"), o && (d = Number(o.getAttribute("data-slider-index")))
    }

    // インディケーターの更新
    function g() {
        const r = document.querySelectorAll(".slider__Indicator-BZV63CCC");
         // rが存在しない場合は処理をスキップする
        if (!r || r.length === 0) { 
            console.log('インディケーターが見つかりません。');
            return;
        }
        for (let n = 0; n < r.length; n++) r[n].classList.remove("indicatorCurrent-BZV63CCC");
        r[d].classList.add("indicatorCurrent-BZV63CCC")
    }

    function v() {
        if (e.length === 1) i && i.classList.add("sliderSingle-BZV63CCC"), a && a.remove(), f && f.remove(), u && u.remove();
        else if (e.length < 5) e.length === 2 ? i && i.classList.add("sliderDouble-BZV63CCC") : i && i.classList.add("sliderSimple-BZV63CCC");
        else return
    }

    // スライド移動関数
    function s(r, n) {
        if (!m) {
            m = !0;
            for (let l = 0; l < n; l++) setTimeout(() => {
                if (r === "next") i && i.appendChild(e[0]);
                else if (r === "prev") i && i.insertBefore(e[e.length - 1], e[0]);
                else return;
                T(), g()
            }, 200 * l);
            e.length < 5 ? m = !1 : setTimeout(() => {
                m = !1
            }, 800)
        }
    }

    function Q(r) {
        if (o && (d = Number(o.getAttribute("data-slider-index")), d !== r))
            if (d < r) {
                let n = r - d;
                s("next", n)
            } else {
                let n = d - r;
                s("prev", n)
            }
    }

    // ランダム表示
    function shuffleElements() {
        // .slider__Group_CCC内のすべての.slider__Item_CCC要素を取得するために使用されます。
        var elements = document.querySelectorAll('.slider__Group_CCC .slider__Item_CCC');
        // document.querySelectorAll から返されるものをJavaScript配列に変換します。
        var elementsArray = Array.prototype.slice.call(elements);
        // 配列の要素をランダムに並び替えるために使用
        elementsArray.sort(function () {
            return Math.random() - 0.5;
        });
        var parent = elements[0].parentNode; // .slider__Group_CCCを取得
        // .slider__Group_CCC内の.slider__Item_CCC要素が、.slider__Group_CCC要素の子要素として追加されます。
        elementsArray.forEach(function (element) {
            parent.appendChild(element);
        });
    }

    // ランダム表示後、インディケーターを生成している
    function V() {

        // カルーセルが存在しない場合は何もしない
        if (!isCarouselVisible()) {
            return;
        }
        
        // ランダム表示後、Nodeを再取得
        e = document.querySelectorAll(".slider__Item-BZV63CCC"); // スライダーアイテム
        u = document.querySelector(".slider__IndicatorGroup-BZV63CCC"); // インディケーターグループ
        B = document.querySelector(".slider__Indicator-BZV63CCC"); // インディケーター
        
        for (let t = 0; t < e.length - 1; t++) u && B && u.appendChild(B.cloneNode(!0));
        if (v(), e.length === 1) return;
        const r = document.querySelectorAll(".slider__Indicator-BZV63CCC");
        for (let t = 0; t < e.length; t++) e[t].setAttribute("data-slider-index", String(t)), r[t] && r[t].setAttribute("data-indicator-index", String(t));
        for (let t = 0; t < r.length; t++) r[t].addEventListener("click", function () {
            let Z = Number(r[t].getAttribute("data-indicator-index"));
            Q(Z)
        });
        i && i.insertBefore(e[e.length - 2], e[0]), i && i.insertBefore(e[e.length - 1], e[0]), T(), g(), setTimeout(() => {
            i && i.classList.add("sliderLoaded-BZV63CCC")
        }, 50), a && a.addEventListener("click", function () {
            s("prev", 1)
        }), f && f.addEventListener("click", function () {
            s("next", 1)
        });
        let n = 0,
            l = 0,
            h = 30;
        c && (c.addEventListener("touchstart", function (t) {
            n = t.touches[0].pageX, l = t.changedTouches[0].pageX
        }), c.addEventListener("touchmove", function (t) {
            T.preventDefault(), l = t.changedTouches[0].pageX
        }), c.addEventListener("touchend", function (t) {
            l < n && n > l + h ? s("next", 1) : n < l && n + h < l && s("prev", 1)
        }))
    }

    // shuffleElements(); //ランダム表示
    if (isCarouselVisible()) {
        V(); // ランダム表示後、インディケーターを生成している
    }

    startAutoplayIfCarouselVisible(); // 自動スライドを開始
    setPauseBtnPosition(); //自動スライドの再生と停止ボタンの配置
    togglePauseOrStart(); // 自動スライドの再生ボタンと停止ボタンを押した時の動作
}
        
document.addEventListener('DOMContentLoaded', function () {

    // ここにJavaScriptコードを配置
    CCC()

});
