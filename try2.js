const fs = require('fs').promises;
var qs = require('querystring');
const axios = require('axios');
const cheerio = require('cheerio');
var https = require('follow-redirects').https;
async function solve(number){
    

    var options = {
      'method': 'POST',
      'hostname': 'tgbie.cgg.gov.in',
      'path': '/ResultMemorandum.do',
      'headers': {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'Accept-Language': 'en-US,en;q=0.9',
        'Cache-Control': 'max-age=0',
        'Connection': 'keep-alive',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': 'key=value; JSESSIONID=CF5F88DD5B67DB50CAFA2B97244D1A70; key=value',
        'Origin': 'https://tgbie.cgg.gov.in',
        'Referer': 'https://tgbie.cgg.gov.in/ResultMemorandum.do',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'same-origin',
        'Sec-Fetch-User': '?1',
        'Upgrade-Insecure-Requests': '1',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36 Edg/125.0.0.0',
        'sec-ch-ua': '"Microsoft Edge";v="125", "Chromium";v="125", "Not.A/Brand";v="24"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"'
      },
      'maxRedirects': 20
    };
    
    var req = https.request(options, function (res) {
      var chunks = [];
    
      res.on("data", function (chunk) {
        chunks.push(chunk);
      });
    
      res.on("end", function (chunk) {
        var body = Buffer.concat(chunks);
        // console.log(body.toString());
        // write(body.toString())
        getData(body.toString())
      });
    
      res.on("error", function (error) {
        console.error(error);
      });
    });
    
    var postData = qs.stringify({
      'actionpart': 'getBieResultSecondYearGen',
      'property(pass_year)': '2024',
      'year': '2',
      'category': 'G',
      'property(month)': '3',
      'hallticket_no': number
    });
    
    req.write(postData);
    
    req.end();
    
    }

// Asynchronous function to write data to a file
async function write(data) {
    try {
        await fs.appendFile('example.txt', data);
    } catch (err) {
        console.error('Error writing to file:', err);
    }
}

// Asynchronous function to get data from a webpage
async function getData(data) {
    const $ = cheerio.load(data);
    const nameLabelElement = $('td:contains("NAME")');

    // Extract the sibling <td> element containing the actual name
    const nameElement = nameLabelElement.next('td').find('b').first();

    // Get the text content of the name element
    const name = nameElement.text();

    const tdElement = $('td[style="width:130px;padding-top: 20px;"]');

    // Find the <img> tags within that <td> element and get the src attribute values
    const imgSrcValues = [];
    tdElement.find('img').each((index, img) => {
        imgSrcValues.push($(img).first().attr('src'));
    });

    // Write image src values to file
    for (const value of imgSrcValues) {
        await write(value + "\n");
    }

    // Optionally write the name to the file if needed
    // await write(name + "\n");
}

// Mock solve function to fetch data (assuming solve fetches HTML data from a URL)


// Main function to iterate over the range of IDs and fetch data asynchronously
async function main() {
    const promises = [];
    for (let i = 2458237000; i < 2458238000; i++) {
        promises.push(solve(i));
    }
    await Promise.all(promises);
}

main().catch(err => console.error('Error in main function:', err));
