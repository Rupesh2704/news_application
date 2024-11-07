
// understand
// /https:/ / newsapi.org / v2 / everything ? q = tesla & from=2024 - 10-07 & sortBy=publishedAt & apiKey=387f4a2e544042ca9504b288e7cd7562


// till q that is url
// after q there are key value pair some conditios
// an at end have to add API key always
// we get responf in the form of JSON forat 
// Java script object NOTATION


const API_KEY = "387f4a2e544042ca9504b288e7cd7562";
const url = "https://newsapi.org/v2/everything?q=";

// initially we will able to see india data
window.addEventListener('load', () => fetchNews("India"));

// async function

async function fetchNews(query) {
    // news eka dusra server varti padle ahe tr te lahgech tr bhtnar nhi so aaplayla wai karava lagel
    // so aaplayla promise bhetel ke ho bho me tula  news denae ahe 
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);

    //converted that data into json format 
    // java script object notation
    // and this also retutn the promise only so have to await
    const data = await res.json();
    console.log(data);
    bindData(data.articles);
}

// Readload function 
function reload(){
    window.location.reload();
}

// now we will bind the articles 
// jitke articles aale titkech templete banle pahej 
// te templete cha close banau aanni  
// aani aaplay all card cha container madhe append karat jau 
function bindData(articles) {
    const allcard = document.getElementById("all-card");
    const templete = document.getElementById("template-news-card");

    //jeva tu api call karshil tr darr time la je card padle ahe techa khali card add hotil aani te aaplauyla nko hava ahe new card pahej neva pn api call karshil teva 

    // so bind data jeva pn hoyel teva container emplty hoyel 
    allcard.innerHTML = '';

    // for loop 
    articles.forEach(articles => {

        // API kadna image aalech nhi ahe te nko ahe te news mala 
        if (!articles.urlToImage) {
            return;
        }

        // deep Cloning 
        // cloning each and every part of templete
        const cardclone = templete.content.cloneNode(true);
        fillDataInCard(cardclone, articles);
        // putting that clone into card
        allcard.appendChild(cardclone);

    })
}


function fillDataInCard(cardclone, articles) {

    const newsImg = cardclone.querySelector("#cardimg");
    const newstitle = cardclone.querySelector("#news-title");
    const newssource = cardclone.querySelector("#news-source");
    const newsdiscript = cardclone.querySelector("#news-discription");



    // change img src to articel provided urlimage
    newsImg.src = articles.urlToImage;
    // change innerHtml of title to article provided 
    newstitle.innerHTML = articles.title;
    // changing inner HTML of discription to new article discription
    newsdiscript.innerHTML = articles.description;

    // for converting the data into human redable format
    // toLocalString()
    const date = new Date(articles.publishedAt).toLocaleString("en-us", {
        timezone: "Asia/Jakarta"

    })

    // changeing news srouce to source name and i added DATE 
    newssource.innerHTML = `${articles.source.name} . ${date}`;


    // after clicking on the card we should redirect to the entire window

    cardclone.firstElementChild.addEventListener('click', () => {

        //  
        window.open(articles.url, "_blank");
    })
}



// current tab must be blue 
let currentselected = null;
function onNavItemClick(id) {
    // news ko fetech larega aur data ko bind bhi kar dega
    fetchNews(id);

    // id coming from upper side
    const navItem = document.getElementById(id);

    // navin varti click kel tr junay nav item varna te active class kadun tak 
    if (currentselected != null) {
        currentselected.classList.remove('active');
    }

    // mag current varti jithe click kelea hota tela currentselected madeh takla aani classList madhe add karun takla
    currentselected = navItem;
    currentselected.classList.add('active');

}


// search button functionality
const searchtxt = document.getElementById('text');
const searchbtn = document.getElementById('search-btn');

searchbtn.addEventListener('click', () => {
    const query = searchtxt.value;
    if (query == null) {
        return;
    }else{
        fetchNews(query);
        currentselected.classList.remove('active');
        currentselected=null;
    }
})


