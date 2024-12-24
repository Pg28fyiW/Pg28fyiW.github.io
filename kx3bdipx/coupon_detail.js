/**
 * 「利用条件を必ずご確認ください」の開閉アニメーション
 */
function termsAccordion() {
    const toggleText = document.querySelector('.benefits-terms-toggle'); // 「利用条件を必ずご確認ください」ボタンの開くアニメーション
    const closeTexts = document.querySelectorAll('.benefits-terms-close');// 「閉じる」ボタンの閉じるアニメーション
    const benefitArea = document.querySelector('.benefits-terms-wrap'); // 開閉部分のエリア

    // 開閉 function
    const toggleDisplay = () => {
        $(benefitArea).slideToggle(500);
        toggleText.classList.toggle('open');
        closeTexts.forEach((elm) => elm.classList.toggle('open'));
    };

    // 開閉
    toggleText.addEventListener('click', () => toggleDisplay());
    closeTexts.forEach((elm) => {
        elm.addEventListener('click', () => toggleDisplay());
    });
};

/**
 * クーポンコード コピーボタン
 * （jQueryでつくられたメソッド）
 */
function couponCodeCopy() {
    $('.button-coupon-code-copy').click(function () {
        const code = $(this).prev().text(); // コード取得

        // 取得表示
        $('.coupon_get').fadeIn('slow', function () {
            $(this).delay(2000).fadeOut('slow');
        });

        // クリップボードに実装→http://サーバーだと動かない
        navigator.clipbord.writeText(code).then(function() {
            // 取得表示
            $('.coupon_get').fadeIn('slow', function () {
                $(this).delay(2000).fadeOut('slow');
            });
        });
    });
}



/**
 * 「よくある質問」の開閉アニメーション
 */
document.addEventListener('DOMContentLoaded', function() {
    const qaItems = document.querySelectorAll('.qa-item');

    // 開閉
    qaItems.forEach((element) => {
        const question = element.querySelector('.qa-que-wrap');
        const answer = element.querySelector('.qa-ans-wrap');
        question.addEventListener('click', () => {
            question.classList.toggle('open');
            $(answer).slideToggle(200);
        });
    });
});

/**
 * 優待商品の高さをそろえるためにつかっているメソッド
 * 1～10あるsection内のすべての'.box-subtitle', '.box-title', '.box-text'の要素を『同じ高さ』に揃える。
 * @param target_attr target_attrに'.box-subtitle', '.box-title', '.box-text'が1つづつ入ってきます。
 */
function match_height(target_attr) {
    // 例: '.box-title' が渡された場合、.box-title のすべての要素が取得されます。
    const target_elements = document.querySelectorAll(target_attr);

    // 対象要素が 1つ以下の場合は何もしません。
    // 2つ以上ある場合のみ以下の処理を進めます。
    if (target_elements.length > 1) {
        // 各要素の高さを取得
        let height_array = [];
        target_elements.forEach((element) => {
            // 各要素の高さ（clientHeight）を取得し、
            const height = element.clientHeight;
            // 配列 height_array に追加します。
            // 例: 高さがそれぞれ 100px, 120px, 150px の場合 → height_array = [100, 120, 150]
            height_array.push(height);
        });
        // 最大値を算出
        // 配列 height_array から最大値を取得します。
        // 例: height_array = [100, 120, 150] → 最大値は 150
        const max_height = Math.max(...height_array);
        // 要素の高さの割り当て
        target_elements.forEach((node) => {
            // すべての要素の高さを最大値に揃える。これで、すべての要素が同じ高さに揃います。
            node.style.height = max_height + 'px';
        });
    }
}

/**
 * 1～10あるsection内のすべての'.box-subtitle', '.box-title', '.box-text'の要素を『同じ高さ』に揃える。
 * 
 * window.addEventListener('load',
 * は、ページ全体の読み込みが完了した後に実行されます。
 */
function sentenceAdjustment() {
    /**
     * 文字を省略する要素の最小・最大の高さを指定する
     * 最小：1行単位の高さ
     * 最大：省略表示する行 * 1行単位の高さ
     */
    // 文字を省略するクラス名を配列としてリスト化しています。
    // const matchHeightClassesText = ['.js-line-clamp-02', '.js-line-clamp-03', '.js-line-clamp-04']; // スマソさんの書き方
    const matchHeightClassesText = ['.recommend_title_text_02', '.recommend_detail_03']; // TODO: ここを山田さんは修正
    // 高さを揃えたい要素のクラス名を配列としてリスト化しています。「おすすめクーポン」の「おつりで投資トラノコ」部分
    const matchHeightClasses = ['.box-subtitle', '.box-title', '.box-text'];

    function defineMinMaxHeight(arrayClassName) {
        arrayClassName.forEach((clsName) => {
            const elms = document.querySelectorAll(`${clsName}`);
            // クラス名の終端の数値を取得
            const clampLines = parseFloat(clsName.split('-').slice(-1)[0]);
            elms.forEach((elm) => {
                // line-heightを取得
                const lineHeight = window.getComputedStyle(elm).getPropertyValue('line-height');
                // ピクセル値が返ってくるので、数字だけにする（"16px" → "16"）
                        // lineHeight は、文字の行間の高さを表す文字列（例: "16px" や "1.5em" など）が入っていると仮定します。
                        // replace(/[^-\d\.]/g, '')
                        // replace メソッドで、lineHeight 文字列から特定の文字以外を取り除いています。
                        // [^] は「この中の文字以外」を意味します。
                        // -\d\. の部分で、「-（マイナス符号）、数字（\d）、
                        // および小数点（.）」だけを残すよう指定しています。
                        // g は「グローバル」を意味し、文字列全体を検索・置換します。
                        // 結果として、「マイナス符号・数字・小数点以外の文字」は削除されます。
                        // 例: "16px" → "16"    
                const lineHeightNum = parseFloat(lineHeight.replace(/[^-\d\.]/g, ''));
                elm.style.minHeight = `${lineHeightNum}px`;
                elm.style.maxHeight = `${lineHeightNum * clampLines}px`;
            });
        });
    }

    defineMinMaxHeight(matchHeightClassesText);

    [...matchHeightClassesText, ...matchHeightClasses].forEach((element) => {
        match_height(element);
    });

    window.addEventListener('resize', () => {
        defineMinMaxHeight(matchHeightClassesText);
        [...matchHeightClassesText, ...matchHeightClasses].forEach((element) => {
            match_height(element);
        });
    });
}


document.addEventListener('DOMContentLoaded', function() {
    // 「利用条件を必ずご確認ください」の開閉アニメーション
    termsAccordion();

    // クーポンコード コピーボタン
    couponCodeCopy();

    // 「おすすめクーポン」の「おつりで投資トラノコ」部分のすべてsectionタグ内の
    // '.box-subtitle', '.box-title', '.box-text'の要素を『同じ高さ』に揃える。
    sentenceAdjustment();
});