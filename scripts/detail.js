/* 
-URL'deki arama parametresine(search-param) erişme
-JS'de tarayıcı ile alakalı verilere erişmek istiyorsak
-window nesnesini kullanırız
-İçerisindeki location değeri url detaylarını verir

- JS'de URL'deki arama parametrelerini yönetmeye yarayan
- yerleşik bir class vardır. URLSearchParams
*/

// URL'deki parametreleri yönetmemizi sağlayacak bir nesne oluşturduk
const params = new URLSearchParams(window.location.search);

/* 
-yukarıdaki class'dan örnek olmamız sayesinde parametreler
-erişmeye ve güncellemeye yaran metodları kullanabileceğimiz
-bir nesne oluştu biz de bu nesnenin içerisindeki get methodu ile
-parametreler arasından istediğimizi çağırdık
*/
const paramId = params.get("id")

//Sayfanın yüklenmesini izle
document.addEventListener("DOMContentLoaded", async() => {
// 1 api'dan verileri al
const res = await fetch("../db.json");
const data = await res.json()
// 2 veriler arasında url'deki id'ye denk gelen veriyi al
const product = data.menu.find((item) => item.id == paramId)
// 3 sayfa içeriği elimizdeki veriye göre değişir
renderPage(product)
});

const outlet = document.getElementById("outlet")

function renderPage(product){
    outlet.innerHTML = `
    <div class="d-flex justify-content-between fs-5">
    <a href="/">
        <img width="40px" src="/images/home.png">
    </a>
    <p>Anasayfa | ${product.category} | ${product.title} </p>
</div>


<h1 class="text-center my-3">${product.title}
</h1>
<img class="rounded object-fit-cover shadow" src="${product.img}" alt="oreo">

<h3 class="mt-4">
    <span>Ürünün Kategorisi</span>
    <span class="text-success">${product.category}</span>
</h3>

<h3 class="mt-4">
    <span>Ürünün Fiyatı:</span>
    <span class="text-success">${(product.price * 30).toFixed(2)} ₺</span>
</h3>

<p class="lead">${product.desc}</p>

    `
}