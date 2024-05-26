function BlocksCarouselCard() {
    console.log('1');
    const rootElement = document.querySelector('.astro-BBLZP602');
    const wrapperElement = document.querySelector('.astro-BBLZP602 .wrapper');
    const carouselElement = document.querySelector('.astro-BBLZP602 .carousel');
    console.log('2');
    const firstCardWidth = carouselElement.querySelector('.astro-BBLZP602 .card').clientWidth;
    console.log('3');
    const arrowButtons = document.querySelectorAll('.astro-BBLZP602 .slider__Btn');
    const carouselItems = [...carouselElement.children];

    let isDragging = false,
        isAutoPlay = true,
        startX,
        startScrollLeft,
        autoplayTimeoutId;
    
    // カルーセルに表示できるカードの数を計算
    let cardsInView = Math.round(carouselElement.clientWidth / firstCardWidth);

    // 無限スクロールを実現するため、カルーセルの最後の枚数のコピーを先頭に挿入
    carouselItems
        .slice(-cardsInView)
        .reverse()
        .forEach((item) => {
            carouselElement.insertAdjacentHTML('afterbegin', item.outerHTML);
        });
    
    // 無限スクロールを実現するため、カルーセルの最初の枚数のコピーを末尾に挿入
    carouselItems.slice(0, cardsInView).forEach((item) => {
        carouselElement.insertAdjacentHTML('beforeend', item.outerHTML);
    });

    // Firefoxで初めての重複するカードを隠すために適切な位置にカルーセルをスクロール
    carouselElement.classList.add('no-transition');
    carouselElement.scrollLeft = carouselElement.clientWidth;
    carouselElement.classList.remove('no-transition');

    // 矢印ボタンに左右のスクロールイベントリスナーを追加
    arrowButtons.forEach((button) => {
        button.addEventListener('click', () => {
            carouselElement.scrollLeft += button.id == 'left' ? -firstCardWidth : firstCardWidth;
        });
    });

    const startDrag = (e) => {
        isDragging = true;
        carouselElement.classList.add('dragging');
        //カルーセルの初期位置とカルーセルのスクロール位置を記録
        startX = e.pageX;
        startScrollLeft = carouselElement.scrollLeft;
    }

    const drag = (e) => {
        if (!isDragging) return; // isDraggingがfalseの場合、ここで処理終了
        // カルーセルの移動に基づいてカルーセルのスクロール位置を更新
        carouselElement.scrollLeft = startScrollLeft - (e.pageX - startX);
    };

    const stopDrag = () => {
        isDragging = false;
        carouselElement.classList.remove('dragging');
    };

    const handleInfiniteScroll = () => {
        // カルーセルが先頭にある場合、末尾にスクロール
        if (carouselElement.scrollLeft === 0) {
            carouselElement.classList.add('no-transition');
            carouselElement.scrollLeft = carouselElement.scrollWidth - 2 * carouselElement.clientWidth;
            carouselElement.classList.remove('no-transition');
        }
        // カルーセルが末尾にある場合、先頭にスクロール
        else if (
            Math.ceil(carouselElement.scrollLeft) >=
            carouselElement.scrollWidth - carouselElement.clientWidth
        ) {
            carouselElement.classList.add('no-transition');
            carouselElement.scrollLeft = carouselElement.clientWidth;
            carouselElement.classList.remove('no-transition');
        }

        // 既存のタイムアウトをクリアし、カルーセルにマウスがホバーしていない場合は自動再生を開始
        clearTimeout(autoplayTimeoutId);
        if (!wrapperElement.matches(':hover')) startAutoplay();
    };

    const startAutoplay = () => {
        // if (!isAutoPlay) return; // isAutoPlayがfalseの場合は終了
        if (!rootElement?.hasAttribute('data-blockStore-carousel-autoplay')) return;
        // 2500ミリ秒ごとにカルーセルを自動再生
        autoplayTimeoutId = setTimeout(() => (carouselElement.scrollLeft += firstCardWidth), 2500);
    };
    // startAutoplay();

    carouselElement.addEventListener('mousedown', startDrag);
    carouselElement.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', stopDrag);
    carouselElement.addEventListener('scroll', handleInfiniteScroll);
    wrapperElement.addEventListener('mouseenter', () => clearTimeout(autoplayTimeoutId));
    wrapperElement.addEventListener('mouseleave', startAutoplay);
}

// BlocksCarouselCard();

document.addEventListener('DOMContentLoaded', function() {
    // ここにJavaScriptコードを配置
    BlocksCarouselCard();
});

