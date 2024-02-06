// diğer dosyalardan gelen veriler
import { renderMenuItems, renderButtons } from "./scripts/ui.js";

const buttonsArea = document.getElementById("buttons")

// Datayı global scope'da tanımla
let data;

//menü verilerini json'dan çek
async function fetchMenu() {

    //api'dan verileri al
    const res = await fetch('./db.json');

    //Json verisini js'e çevir
    data = await res.json()
    // console.log(data);
}
// console.log( data)

// olay izle'
window.addEventListener('DOMContentLoaded', () => {
    // ekrana butonları bas
    renderButtons("Hepsi");
    // verileri çeken fonksiyonu çalıştır
    fetchMenu()
        // fonsiyon başarılı olursa ekrana kartları basan fonksiyonu çalıştır
        .then(() => renderMenuItems(data.menu));
});

// Butonlara tıklanma olayını izle
buttonsArea.addEventListener("click", (event) => {
    //butona tıklanmadıysa fonsiyonu durdur
    if (event.target.id == "buttons") return;

    // active olan butonu belirlemek için butonları ekrana tekrar bas
    renderButtons(event.target.innerText)

    // Fitrelenecek kategori ismini belirle
    const selectedCategory = event.target.dataset.id;

    if (selectedCategory === "all") {
        //eğer hepsi seçeneği seçildiyse bu işlemi yap
        // bütün menu elemanlarını filtrelemeden ekrana bas
        renderMenuItems(data.menu)
    } else {
        //Eğer hepsi seçeneği seçilmediyse bu işlemi yap
        // ürünlerin arasından kategori ismi bizim seçtiğimiz
        // kategori ismine eşit olanları al
        const filtred = data.menu.filter(
            (item) => item.category === selectedCategory
        )
        // filtrelenen verileri ekrana bas
        renderMenuItems(filtred)
    }
})