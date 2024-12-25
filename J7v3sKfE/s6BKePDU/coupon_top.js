function createDropDown() {
    const dropDownWrapper = document.querySelector('.dropdown-wrap');
    const dropdownSelected = document.querySelector('.dropdown-selected');
    const dropDownList = document.querySelector('.dropdown-list');
    const sections = document.querySelectorAll('.box-preferential');

    let isDropdownOpen = false; // プルダウンをひらいているか？（開いている:true, 閉じている：false）

    // 選択されたカテゴリに応じて文字色を変更する
    const updateSelectedTextColor = (category) => {
        // 「すべてのクーポン」を選択している場合
        if (category === 'すべてのクーポン') {
            dropdownSelected.style.color = '#BBBBBB'; // デフォルトの色
        } else {
            dropdownSelected.style.color = '#000'; // 黒に変更
        }
    };
    

    // ローカルストレージに保存された「プルダウンの状態」を復元する関数
    const restoreDropDown = () => {
        // ローカルストレージに保存された「プルダウンの状態」を取得
        const savedCategory = sessionStorage.getItem('SELECTED_CATEGORY') || 'all';
        // 「すべてのクーポン」が選択された場合、「すべてのクーポン」とプルダウンに表示
        dropdownSelected.textContent = savedCategory === 'all' ? 'すべてのクーポン' : savedCategory;

        // 選択されたカテゴリに応じて文字色の更新
        updateSelectedTextColor(savedCategory);  // ここで色の更新を適用

        // 初期表示時に「すべてのクーポン」の文字色をグレー色にする
        if (savedCategory === 'all') {
            dropdownSelected.style.color = '#BBBBBB';
        }


        // sectionタグをループする
        sections.forEach(section => {
            const categories = section.getAttribute('data-category').split(' ');
            if (savedCategory === 'all' || categories.includes(savedCategory)) {
                section.style.display = 'block'; // カテゴリーが選択されていれば、sectionを表示する
            } else {
                section.style.display = 'none';
            }
        });

        // "すべてのクーポン"が選択されている場合は、全セクションを表示する
        if (savedCategory === 'all') {
            sections.forEach(section => {
                section.style.display = 'block';
            });
        }
    };

    // プルダウンの開閉 function
    const dropDowntoggleDisplay = () => {
        dropDownWrapper.classList.toggle('open'); // プルダウンの右端の△
        dropdownSelected.classList.toggle('open'); // プルダウンの右端の△
        dropDownList.classList.toggle('open'); // プルダウンの右端の△

        // プルダウンを開いているか？
        isDropdownOpen = dropDownList.classList.contains('open'); // プルダウンの右端の△

        // プルダウンが閉じていて、かつ「すべてのクーポン」が選択されている場合、
        if (!isDropdownOpen && dropdownSelected.textContent === 'すべてのクーポン') {
            // すべてのセクションを表示する
            sections.forEach(section => {
                section.style.display = 'block';
            });
        }
    };

    // 要素が存在する場合のみ処理を行う
    if (dropDownWrapper && dropdownSelected && dropDownList) {
        // 「すべてのクーポン」をクリックした場合の、プルダウンの開閉イベント
        dropdownSelected.addEventListener('click', () => {
            if (!isDropdownOpen) {
                dropdownSelected.textContent = 'すべてのクーポン';
                sessionStorage .setItem('SELECTED_CATEGORY', 'all'); // 「すべてのクーポン」を選択状態として保存
                // console.log('選択状態を保存 all');

                // 文字色の更新
                updateSelectedTextColor('すべてのクーポン');
            }
            dropDowntoggleDisplay();
        });

        // プルダウンから項目選択時
        const items = document.querySelectorAll('.dropdown-list li');
        items.forEach((item) => {
            item.addEventListener('click', (e) => {
                const selectedCategory = e.target.getAttribute('data-category');
                dropdownSelected.textContent = e.target.textContent;
                sessionStorage .setItem('SELECTED_CATEGORY', selectedCategory); // TODO: 選択状態を保存
                
                // 文字色の更新
                updateSelectedTextColor(selectedCategory);
                
                // console.log('選択状態を保存', selectedCategory);
                dropDowntoggleDisplay();

                // 選択されたカテゴリに応じてセクションを表示/非表示
                sections.forEach(section => {
                    const categories = section.getAttribute('data-category').split(' ');
                    if (selectedCategory === 'all' || categories.includes(selectedCategory)) {
                        section.style.display = 'block';
                    } else {
                        section.style.display = 'none';
                    }
                });
            });
        });
    }

    // プルダウンの選択状態を復元
    restoreDropDown();
}

/**
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
function applyMaxHeight() {

    // 高さを揃えたい要素のクラス名を配列としてリスト化しています。
    const matchHeightClasses = ['.box-subtitle', '.box-title', '.box-text'];

    // すべての要素の高さをリセット
    matchHeightClasses.forEach((selector) => {
        document.querySelectorAll(selector).forEach((el) => {
            el.style.height = 'auto';
        });
    });

    // 最大高さを再計算して適用
    matchHeightClasses.forEach((selector) => {
        match_height(selector);
    });

    // 【スマソさんの受領のとおりのソース】
    // var ua = navigator.userAgent;
    // // navigator.userAgent で、デバイスの種類を判定しています。
    // // スマートフォンの場合（iPhone または Android Mobile）：何も処理しない（空の {}）。
    // // スマートフォン以外の場合（デスクトップやタブレットなど）：次の処理（高さを揃える処理）を実行します。
    // if (ua.indexOf('iPhone') > 0 || (ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0)) {
    // } else {
    //     matchHeightClasses.forEach((element) => {
    //         // matchHeightClasses の各クラスについて、match_height(element) 関数を呼び出します。
    //         // elementに'.box-subtitle', '.box-title', '.box-text'が1つづつ入ってきます。
    //         match_height(element);
    //     });
    // }
}




document.addEventListener('DOMContentLoaded', function() {

    // section内の各要素の高さを最大に調整
    applyMaxHeight();
    window.addEventListener('resize', function() {
        setTimeout(() => {
            applyMaxHeight(); // 遅延を追加して再計算を安定化
        }, 100);
    });

    // // section内の各要素の高さを最大に調整
    // applyMaxHeight();

    // ドロップダウンの操作
    createDropDown();
});
