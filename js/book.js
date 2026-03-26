const API_KEY = "KakaoAK 749ed04b4081db578aecf104a677ac42"



async function fetchBooks(query) {
            const params = new URLSearchParams({
                target: "title",
                query,
                size: 10
            });
            const url = `https://dapi.kakao.com/v3/search/book?${params}`;

            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    Authorization: API_KEY
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP 오류: ${response.status}`);
            }

            return response.json();
        }

        async function bestData() 
        {
            try {
                document.querySelector("#tab2").style.display = "none";
                const queries = [
                    { query: "월간", sectionId: "tab1" },
                    { query: "주간", sectionId: "tab2" },
                ];

                for (const { query, sectionId } of queries) {
                    const data = await fetchBooks(query);

                    const section = document.querySelector(`#${sectionId}`);
                    const boxElements = section.querySelectorAll(".box");

                    boxElements.forEach((box, i) => {
                        const doc = data.documents[i];
                        if (!doc) return;

                        // 요소 생성 및 추가
                        box.innerHTML = `<img src="${doc.thumbnail}">
                        <h5>${doc.title}</h5>
                        <h6>${doc.authors}</h6>
                        <p>${doc.price}원</p>
                        `
                    });
                }
            } catch (error) {
                console.log('에러발생', error);
            }
        }

        bestData();

        const tabItems = document.querySelectorAll('#booktab li');
        const tabs = document.querySelectorAll('article');
        tabItems.forEach((tab, i) => {
            tab.addEventListener('click', () => {
                // 탭에 해당하는 리스트 보이고, 나머지는 숨기기
                tabs.forEach((tab, j) => {
                    tab.style.display = (i === j) ? 'flex' : 'none';
                });

            });
        });


async function bookData(query) {
    const params = new URLSearchParams({
        target: "title",
        query: query,
        size: 10
    });
    const url = `https://dapi.kakao.com/v3/search/book?${params}`

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                Authorization: API_KEY
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP 오류! 상태 코드: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);

        // .box 요소 전체 선택
        const boxElements = document.querySelectorAll("#slider .swiper-slide");
        console.log(boxElements)

        // documents 데이터를 각 box에 대응하여 렌더링
        boxElements.forEach((box, i) => {
            const doc = data.documents[i];

            if (!doc) return; // 데이터가 부족할 경우 생략

            // 요소 생성 및 추가
            box.innerHTML = `<a href="sub.html"><img src="${data.documents[i].thumbnail}"></a>
                <div>
                    <h5>${doc.title}</h5>
                    <h6>${doc.authors} &nbsp; ${data.documents[i].publisher}</h6>
                    <p>${doc.price}원</p>
                </div>
                    `
        });

    } catch (error) {
        console.log('에러발생', error);
    }
}
async function renderThumbs(query) {
    const data = await fetchBooks(query);
    const container = document.querySelector(".thumbSwiper .swiper-wrapper");

    container.innerHTML = "";

    data.documents.forEach((doc, i) => {
        const thumb = document.createElement("div");
        thumb.classList.add("swiper-slide");

        if (i === 0) thumb.classList.add("active");

        thumb.innerHTML = `<img src="${doc.thumbnail}">`;

        thumb.addEventListener("click", () => {
    slider_swiper.slideTo(i); // ⭐ 슬라이드 이동
});


        container.appendChild(thumb);
    });
    
thumbSwiper.update();
slider_swiper.update();
}
bookData("책한권");
renderThumbs("책한권");

async function bookData2() {
    const params = new URLSearchParams({
        target: "title",
        query: "요리",
        size: 10
    });
    const url = `https://dapi.kakao.com/v3/search/book?${params}`

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                Authorization: API_KEY
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP 오류! 상태 코드: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);

        // .box 요소 전체 선택
        const boxElements = document.querySelectorAll("#new .swiper-slide");
        console.log(boxElements)

        // documents 데이터를 각 box에 대응하여 렌더링
        boxElements.forEach((box, i) => {
            const doc = data.documents[i];

            if (!doc) return; // 데이터가 부족할 경우 생략

            // 요소 생성 및 추가
            box.innerHTML = `<img src="${data.documents[i].thumbnail}">
                    <h5>${data.documents[i].title}</h5>
                    <h6>${data.documents[i].authors}</h6>
                    <p>${data.documents[i].price}원</p>
                    `
        });

    } catch (error) {
        console.log('에러발생', error);
    }
}

bookData2();

const select = document.querySelector("#search .category_select");

select.addEventListener("change", function () {
    bookData(this.value);
    renderThumbs(this.value);
});