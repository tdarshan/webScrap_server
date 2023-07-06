const puppeteer = require('puppeteer');

async function getAllData(url) {
    let finalData;
    try {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();

        await page.goto(url);

        const data = await page.evaluate(() => {
            // DOM manipulation and data extraction logic
            const paragraphs = Array.from(document.querySelectorAll('*'));
            return paragraphs.map(p => p.innerText);
        });

        let initialData = data[0].split(" ");

        for (let item of initialData) {
            item = item.split('\n').join(" ");
            item = item.split('\t').join(" ");
        }

        for (let i = 0; i < initialData.length; i++) {
            initialData[i] = initialData[i].split("\n").join(" ");
        }
        let extractedWords = [...new Set(initialData)].join(" ").split(" ");

        extractedWords = extractedWords.filter(item => item != '');

        finalData = [...new Set(extractedWords)];

        await browser.close();

        return finalData;

    } catch (error) {
        console.error(error);
    }
}


async function getMediaLinks(url){
    let mediaData

    try {
        
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();

        await page.goto(url);

        const data = await page.evaluate(() => {
            // DOM manipulation and data extraction logic
            const images = Array.from(document.querySelectorAll('img'));
            return images.map(p => p.src);
        });
        mediaData = data.filter(d => d != '');


        await browser.close();

        return mediaData;

    } catch (error) {
        console.log(error);
    }
}


async function getWebLinks(url){
    let webData

    try {
        
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();

        await page.goto(url);

        const data = await page.evaluate(() => {
            // DOM manipulation and data extraction logic
            const images = Array.from(document.querySelectorAll('a'));
            return images.map(p => p.href);
        });
        webData = data.filter(d => d != '');


        await browser.close();

        return webData;

    } catch (error) {
        console.log(error);
    }
}

module.exports = {getAllData, getMediaLinks, getWebLinks};
