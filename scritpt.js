    // news header 
const newsPortal = async() => {
    const res = await fetch(`https://openapi.programming-hero.com/api/news/categories`)
    const news = await res.json(); 
    loadNewsData(news.data.news_category) 

}
    // load news header 
const loadNewsData = (newsData) =>{

    const tabDiv = document.getElementById('tabDiv');

    newsData.forEach(element => {
    const tab = document.createElement('div');
    tab.innerHTML=`
    <a class="tab text-lg" href="#" onclick="tabHandle('${element.category_id}','${element.category_name}')">${element.category_name}</a>
    `
    tabDiv.appendChild(tab);
    
    });
    

} 



newsPortal()

// call news content 
const tabHandle = async(news='08',category_name) =>{
    const res = await fetch(` https://openapi.programming-hero.com/api/news/category/${news}`);
    let NewsItem = await res.json();
    NewsItem = NewsItem.data;

    handleNewsItem(NewsItem,category_name)
}

// load news content
const handleNewsItem = (NewsItem,category_name='All News') =>{
    const newsContent = document.getElementById('newsContent');
    newsContent.innerText= '';
    const totalItem = NewsItem.length;

    // finding data 
    const findItem = document.getElementById("findItem");
    findItem.innerHTML = `<span class="font-bold text-gray-500">${totalItem>0 ? totalItem+' founds for category' : 'coming soon' }  ${category_name} .... </span>`
    // append constent 
    NewsItem.forEach(element=>{
        const newsDiv = document.createElement('div');
        newsDiv.classList = ` card card-side bg-base-100 shadow-xl flex md:flex-row flex-col my-5`;
        newsDiv.innerHTML = `
        <figure class="md:w-4/12 w-full"><img src="${element.image_url}" alt="Movie"/></figure>
        <div class="card-body md:w-8/12 w-full">
          <h2 class="card-title">${element.title}</h2>
          <p>${element.details.slice(0,500)}    <span>  see more ...</span></p>

            <div class="flex justify-between">
                <div class="flex-1"><span class="font-semibold">Published <br></span>  ${element.author.published_date}</div>
                <p class="flex-1"><i class="fa-solid fa-eye"></i> ${element?.total_view}</p>
                <p class="flex-1"> ${element?.rating.number} of 5  ${element?.rating.badge}</p>
            </div>
          
        </div>
        `
        newsContent.appendChild(newsDiv);
        // console.log(element);
    })


}
tabHandle()