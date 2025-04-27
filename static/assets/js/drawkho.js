import { params } from "./params.js";

const api = "http://localhost:3000/khogiaodien";

export const drawProduct = () => {
  const apiProduct = `${api}?q=${params.q}&_sort=${params.sort}&_order=${params.order}&_page=${params.page}&_limit=${params.limit}`;
  fetch(apiProduct)
    .then((response) => response.json())
    .then((data) => {
      let htmls = "";
      data.forEach((item) => {
        htmls += `
                    <div class="inner-box">
                        <div class="inner-image">
                            <img src="${item.image}" alt="">
                        </div>
                        <h2>${item.title}</h2>
                        <div class="inner-content">
                            <p>Giá: ${item.price}</p>
                            <a href="${item.link}" target="_blank">Chi Tiết</a>
                        </div>
                        <div class="them"><button type="button" class="btn btn-primary button" data-toggle="modal" data-target="#exampleModal" id="buttonHeader">Tư Vấn Ngay</button></div>    
                    </div>
                    `;
      });
      let divShop = document.querySelector("#innerShop");
      divShop.innerHTML = htmls;
    });
};
