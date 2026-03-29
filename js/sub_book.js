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
                sub_datetime.innerText += datetime.substr(0,10)
                sticky_title.innerText = title;
                sticky_price.innerText = price.toLocaleString() + "원";

                total_price.innerText += (sale_price + 3000).toLocaleString() + '원'
                

            } catch (error) {
                console.log('에러발생', error);
            }
        }
        

        bookData();

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

bookData2();

bookData3();
        //메모장으로 sub 텍스트 가져오기, 서버에 올려야 보임
        // document.addEventListener("DOMContentLoaded", async function () {
        //     try {
        //         const response = await fetch("./sub_txt/txt1.txt");
        //         if (!response.ok) {
        //             throw new Error("Network response was not ok");
        //         }
        //         const data = await response.text();
        //         document.getElementById("tmpBox").innerHTML = data;
        //     } catch (error) {
        //         console.error("There was a problem with the fetch operation:", error);
        //     }
        // });

         document.addEventListener('DOMContentLoaded', () => {
            const headers = document.querySelectorAll('.accordion-header');

            headers.forEach(header => {
                header.addEventListener('click', () => {
                    const currentItem = header.parentElement;

                    // 이미 열려있는지 확인
                    const isActive = currentItem.classList.contains('active');

                    // 모든 항목 닫기 (아코디언 기능)
                    document.querySelectorAll('.accordion-item').forEach(item => {
                        item.classList.remove('active');
                    });

                    // 현재 클릭한 항목이 닫혀있었다면 열기
                    if (!isActive) {
                        currentItem.classList.add('active');
                    }
                });
            });
        });

        
