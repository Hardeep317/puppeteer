const puppeteer = require("puppeteer");
const fs = require('fs');

async function scrapeChannel(url, techInput) {

  const browser = await puppeteer.launch({headless: false});

  const page = await browser.newPage();
  await page.goto(url);

  // Adding all the titles to an array
  let titles = await page.evaluate(() => 
    Array.from(
      document.querySelectorAll(".BjJfJf"),
      (element) => element.textContent
    )
  );

  // Adding all the links to an array
  const hrefs = await page.evaluate(() =>
    Array.from(
      document.querySelectorAll(".EDblX"),
      (element) =>
        element.firstElementChild.firstElementChild.firstElementChild.href
    )
  );


  // Merging both arrays into one
  const resultArr = []

for(let i = 0; i < titles.length; i++){
    let obj = {
        href:hrefs[i],
        title:titles[i]
    }
    resultArr.push(obj)
}

  
  browser.close();

  //filtering the output 
  techInput = techInput.trim();  
  techInput = techInput.split(" ");

  //cleaning strings to match for lower case

  techInput = techInput.map(it=> it.toLowerCase())
  titles = titles.map(it=> it.toLocaleLowerCase())

  // writing the jobs.json file



  // fs.writeFile("Jobs.json", JSON.stringify(resultArr), (err) => {
  //   if(err) console.log(err);
  // })
  return { resultArr}; // arrays of strings
}

module.exports = {
  scrapeChannel,
};
