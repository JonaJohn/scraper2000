const axios = require("axios");
const cheerio = require ("cheerio");

const jsdom = require("jsdom");
const {JSDOM} = jsdom;
const got = require('got');


async function AfrikaDataScraping(){
    const url = 'https://de.wikipedia.org/wiki/Afrika'
        //#query-result > div.bootstrap-table.bootstrap3 > div.fixed-table-container > div.fixed-table-body > table > tbody > tr:nth-child(5) > td
    
    const tabelle = "#query-result > div.bootstrap-table.bootstrap3 > div.fixed-table-container > div.fixed-table-body > table > tbody > tr"
    
    // got(url).then(res => {
    //     const domPage = new JSDOM(res.body.toString()).window.document; 
    // })
    const data = await axios.get(url);
    $ = cheerio.load(data.data)
    console.log($.html());

    const dom = new JSDOM($.html(), 
        {
        url: "https://de.wikipedia.org/wiki/Afrika",
        referrer: "https://de.wikipedia.org/wiki/Afrika",
        contentType: "text/html",
        includeNodeLocations: true,
        storageQuota: 10000000
    });
    // QuerySelector must be turned on on the specificdocument we're creating

  

    console.log('Hier jenes Element welches sie sich wünschten saier')
    const eventsParentElement = dom.window.document.querySelector('.mw-parser-output');
    
    const eventElements = eventsParentElement.querySelectorAll('p')
    console.log(eventElements.length)//Divs in nur in dieser Class
    console.log(dom.window.document.querySelectorAll('p').length)//Alle Divs in der Html 

    eventElements.forEach(element => {
        const pElements = element.textContent;
        console.log(pElements);
    })
    // const divElements = dom.window.parentEl.querySelectorAll("p").forEach(elem =>{
    //     console.log(elem.textContent);
    // })
    // // var ListOfPelements = dom.window.document.querySelectorAll('p');
    // console.log(ListOfPelements.length)
    // let arrayElements = Array.from(ListOfPelements);//Muss erst zu nem array gemacht werden sonst ist da nur dieses verschissene Objekt was garnichts kann
    // for (i = 0; i < ListOfPelements.length; i++){
    //     console.log(arrayElements[i].textContent);
    // }
    }
WikidataScraping();
async function WikidataScraping(){
    url = 'https://query.wikidata.org/#PREFIX%20wikibase%3A%20%3Chttp%3A%2F%2Fwikiba.se%2Fontology%23%3E%0APREFIX%20wd%3A%20%3Chttp%3A%2F%2Fwww.wikidata.org%2Fentity%2F%3E%20%0APREFIX%20wdt%3A%20%3Chttp%3A%2F%2Fwww.wikidata.org%2Fprop%2Fdirect%2F%3E%0APREFIX%20rdfs%3A%20%3Chttp%3A%2F%2Fwww.w3.org%2F2000%2F01%2Frdf-schema%23%3E%0APREFIX%20p%3A%20%3Chttp%3A%2F%2Fwww.wikidata.org%2Fprop%2F%3E%0APREFIX%20v%3A%20%3Chttp%3A%2F%2Fwww.wikidata.org%2Fprop%2Fstatement%2F%3E%0ASELECT%20%3Fq%20WHERE%20%7B%0A%20%20%3Fq%20wdt%3AP31%20wd%3AQ11424%0A%7D'
    const Seite = await axios.get(url);
    $ = cheerio.load(Seite.data);

    $ = $.html().toString();
    const dom = new JSDOM($, { runScripts: "dangerously",resources: "usable" }, {
        url: "https://query.wikidata.org/#PREFIX%20wikibase%3A%20%3Chttp%3A%2F%2Fwikiba.se%2Fontology%23%3E%0APREFIX%20wd%3A%20%3Chttp%3A%2F%2Fwww.wikidata.org%2Fentity%2F%3E%20%0APREFIX%20wdt%3A%20%3Chttp%3A%2F%2Fwww.wikidata.org%2Fprop%2Fdirect%2F%3E%0APREFIX%20rdfs%3A%20%3Chttp%3A%2F%2Fwww.w3.org%2F2000%2F01%2Frdf-schema%23%3E%0APREFIX%20p%3A%20%3Chttp%3A%2F%2Fwww.wikidata.org%2Fprop%2F%3E%0APREFIX%20v%3A%20%3Chttp%3A%2F%2Fwww.wikidata.org%2Fprop%2Fstatement%2F%3E%0ASELECT%20%3Fq%20WHERE%20%7B%0A%20%20%3Fq%20wdt%3AP31%20wd%3AQ11424%0A%7D",
        referrer: "https://query.wikidata.org/#PREFIX%20wikibase%3A%20%3Chttp%3A%2F%2Fwikiba.se%2Fontology%23%3E%0APREFIX%20wd%3A%20%3Chttp%3A%2F%2Fwww.wikidata.org%2Fentity%2F%3E%20%0APREFIX%20wdt%3A%20%3Chttp%3A%2F%2Fwww.wikidata.org%2Fprop%2Fdirect%2F%3E%0APREFIX%20rdfs%3A%20%3Chttp%3A%2F%2Fwww.w3.org%2F2000%2F01%2Frdf-schema%23%3E%0APREFIX%20p%3A%20%3Chttp%3A%2F%2Fwww.wikidata.org%2Fprop%2F%3E%0APREFIX%20v%3A%20%3Chttp%3A%2F%2Fwww.wikidata.org%2Fprop%2Fstatement%2F%3E%0ASELECT%20%3Fq%20WHERE%20%7B%0A%20%20%3Fq%20wdt%3AP31%20wd%3AQ11424%0A%7D",
        contentType: "text/html",
        includeNodeLocations: true,
        storageQuota: 10000000
    });
    console.log(dom)
    // const { document } = (new JSDOM($)).window;
    const parentEl = dom.window.document.querySelector('div .toolbar-bottom');
    const childEl = parentEl.querySelector('button'); 
    console.log(childEl)
}



async function getInformation(){//Cheerio how to write data 
    let url = 'https://www.teachthought.com/pedagogy/52-education-blogs-you-should-follow/';

    const SpecificElements = '#post-6231 > div.ast-post-format-.single-layout-1.ast-no-date-box > div > h2'
    const Site = await axios.get(url);
    $ = cheerio.load(Site.data)

    $(SpecificElements).each((i, element) => {
        console.log(i);
        console.log($(element).text())
    })
}











