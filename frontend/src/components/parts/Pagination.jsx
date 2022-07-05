import React from 'react'

function Pagination({ booksPerPage, totalBooks, currentPage }) {

    const makePaginationHref = () => {
        const totalPages = []   // ページの総数を取得
        for (let i = 1; i <= Math.ceil(totalBooks / booksPerPage); i++) {  // 記事総数÷5=ページの総数として取得
            totalPages.push(i)
        }
        const activePage = parseInt(currentPage)  // 現在のページ

        var startIndex, endIndex        // 目次の最初と最後
        let pages = totalPages.length   // ページの総数を数値で取得
        if (pages <= 10) {    // ページ総数が１０以下の場合
            startIndex = 1    // 最初の目次=1
            endIndex = pages  // 最後の目次=ページの最後のID（2〜10のどれか）
        } else {
            if (activePage <= 6) {  // 現在のページが６以下の場合
                startIndex = 1      // 最初の目次=1
                endIndex = 10       // 最後の目次=10
            } else if (activePage + 4 >= pages) {  // 現在のページがページ総数のラスト4に差し掛かった場合
                startIndex = pages - 9  // 最初の目次=ページ総数の-9
                endIndex = pages        // 最後の目次=ページの最後のID
                //  例えば総ページ数 = 25で、 現在のページが21の場合
                //  【 前へ 16 17 18 19 20 [21] 22 23 24 25 】
            } else {  // それ以外（現在のページが7ページ以降の場合）
                startIndex = activePage - 5  // 最初の目次=現在のページの-5
                endIndex = activePage + 4    // 最後の目次=現在のページの+5
                //  例えば現在のページが７の場合は
                //  【 前へ 2 3 4 5 6 [7] 8 9 10 11 次へ 】  となる
            }
        }

        const pageNumbers = []  // ページネーションの目次に使用する配列
        if (startIndex > 1) {  // 最初の目次が1以上なら「前へ」を表示させる
            pageNumbers.push(
                <a href={`/books/` + (activePage - 1)} key="1">
                    <span>≦前へ</span>
                </a>
            )
        }

        for (let i = startIndex; i <= endIndex; i++) {  // 最初の目次から最後の目次までのIDを取得
            pageNumbers.push(
                <a href={"/books/" + i} key={i} className={activePage === i ? "active" : ""}>
                    <span>{i}</span>
                </a>
            )
        }

        if (endIndex < pages) {  // 最後の目次がページ総数以下の場合「次へ」を表示
            pageNumbers.push(
                <a href={"/books/" + (activePage + 1)} key={pages}>
                    <span>≧次へ</span>
                </a>
            )
        }
        return pageNumbers  // ページネーションの配列を返す
    }


    return (
        <nav>
            {/* ページネーションのレンダリング */}
            <h2>{makePaginationHref()}</h2>
        </nav>
    )
}

export default Pagination
