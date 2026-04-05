const API_KEY = "KakaoAK 749ed04b4081db578aecf104a677ac42"
async function bookData() {
    const params = new URLSearchParams({
        target: "title",
        query: "무조건 합격하는 암기의 기술"
    });

    const url = `https://dapi.kakao.com/v3/search/book?${params}`;
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

        // 요소 선택
        const photo = document.querySelector(".photo");
        const sub_title = document.querySelector(".sub_title");
        const sub_price = document.querySelector(".sub_price");
        const sub_authors = document.querySelector(".sub_author");
        const sub_publisher = document.querySelector(".sub_publisher");
        const sub_datetime = document.querySelector(".sub_datetime");
        const total_price = document.querySelector(".total_price h3");
        const sticky_title = document.querySelector(".sticky_title");
        const sticky_price = document.querySelector(".sticky_price span");



        // 데이터에서 필요한 값 추출
        const book = data.documents[0];
        const { title, thumbnail, authors, price, sale_price, contents, publisher, datetime } = book;

        // 요소 생성 및 추가
        // 요소 생성 및 추가
        photo.innerHTML += `<img src="${thumbnail}">`
        sub_title.innerText += title
        sub_price.innerHTML += `
                    <span>10%</span> ${sale_price.toLocaleString()}원 <span>${price.toLocaleString()}원</span>
                `
        sub_authors.innerText += authors
        sub_publisher.innerText += publisher
        sub_datetime.innerText += datetime.substr(0, 10)
        sticky_title.innerText = title;
        sticky_price.innerText = price.toLocaleString() + "원";

        total_price.innerText += (sale_price + 3000).toLocaleString() + '원'


    } catch (error) {
        console.log('에러발생', error);
    }
}



async function bookData2() {
    const params = new URLSearchParams({
        target: "person",
        query: "이윤규",
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
        const boxElements = document.querySelectorAll("#new_text_book .box");

        boxElements.forEach((box, i) => {
            const doc = data.documents[i];
            if (!doc) return;

            box.innerHTML = `
        <img src="${doc.thumbnail}">
        <h5>${doc.title}</h5>
        <h6>${doc.authors}</h6>
        <p>${doc.price}원</p>
    `;
        });

    } catch (error) {
        console.log('에러발생', error);
    }
}

async function bookData2() {
    const params = new URLSearchParams({
        target: "person",
        query: "이윤규",
        size: 10
    });

    const url = `https://dapi.kakao.com/v3/search/book?${params}`;

    try {
        const response = await fetch(url, {
            headers: { Authorization: API_KEY }
        });

        const data = await response.json();

        const wrapper = document.querySelector(".subSwiper .swiper-wrapper");
        wrapper.innerHTML = "";

        // ⭐ 2개씩 묶기
        for (let i = 0; i < data.documents.length; i += 2) {
            const slide = document.createElement("div");
            slide.classList.add("swiper-slide");

            // 책 2개
            const books = data.documents.slice(i, i + 2);

            slide.innerHTML = books.map(doc => `
                <div class="book_item">
                    <img src="${doc.thumbnail}">
                    <div class="text">
                    <div>
                        <h5>${doc.title}</h5>
                        <h6>${doc.authors.join(", ")}</h6>
                        <p>${doc.price.toLocaleString()}원</p>
                        </div>
                    </div>
                </div>
            `).join("");

            wrapper.appendChild(slide);
        }

    } catch (error) {
        console.log('에러발생', error);
    }
}


// tmpBox 3개 fetch + 아코디언 기능 통합
document.addEventListener("DOMContentLoaded", async function () {
    // 1️⃣ tmpBox에 텍스트 넣기
    const fetchTargets = [
        { id: "tmpBox", url: "sub_txt/txt1.txt" },
        { id: "tmpBox2", url: "sub_txt/txt2.txt" },
        { id: "tmpBox3", url: "sub_txt/txt3.txt" }
    ];

    for (let target of fetchTargets) {
        try {
            const response = await fetch(target.url);
            if (!response.ok) throw new Error("Network error: " + target.url);

            const data = await response.text();
            document.getElementById(target.id).innerHTML = data;
        } catch (error) {
            console.error(error);
        }
    }

    // 2️⃣ 아코디언
    const accordionItems = document.querySelectorAll(".accordion-item");

    accordionItems.forEach(item => {
        const header = item.querySelector(".accordion-header");
        const content = item.querySelector(".accordion-content");

        // 초기 높이 0
        content.style.height = "0px";
        content.style.overflow = "hidden";
        content.style.transition = "height 0.5s ease-out";

        header.addEventListener("click", () => {
            const isActive = item.classList.contains("active");

            // 모든 아코디언 닫기
            accordionItems.forEach(i => {
                i.classList.remove("active");
                i.querySelector(".accordion-content").style.height = "0px";
            });

            if (!isActive) {
                item.classList.add("active");
                // 내용 높이에 맞게 자동 확장
                content.style.height = content.scrollHeight + "px";
            }
        });
    });
});

// 실행
bookData();
bookData2();

// 🔥 sticky 높이 맞추기 함수
function syncHeight() {
    const left = document.querySelector('.left_area');
    const right = document.querySelector('.right_area');

    if (left && right) {
        right.style.height = left.offsetHeight + 'px';
    }
}

// 페이지 로드 후 실행
window.addEventListener('load', syncHeight);
window.addEventListener('resize', syncHeight);

// 아코디언 클릭 시에도 실행
document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
        setTimeout(syncHeight, 500);
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll("#hyperlink_switch a");
    const sections = [
        document.getElementById("info"),
        document.getElementById("notice"),
        document.getElementById("delivery")
    ];

    window.addEventListener("scroll", () => {
        let current = "";

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 80;

            if (window.scrollY >= sectionTop) {
                current = section.getAttribute("id");
            }
        });

        links.forEach(link => {
            link.classList.remove("active");

            if (link.getAttribute("href") === "#" + current) {
                link.classList.add("active");
            }
        });
    });
});
