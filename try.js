var https = require('follow-redirects').https;
var fs = require('fs');
const cheerio = require('cheerio');
var qs = require('querystring');

function solve(number){
    

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


// Requiring fs module in which
// writeFile function is defined.


// Data which will write in a file.
// let data = "Learning how to write in a file."

// Write data in 'Output.txt' .
function write(data){
    // const fs = require('fs');
    // writeFile appendFile
fs.appendFile('example.txt', data, function (err) {
  if (err) throw err;
//   console.log('Saved!');
});
}

function getData(data){
    const $ = cheerio.load(data);
    const nameLabelElement = $('td:contains("NAME")');

// Extract the sibling <td> element containing the actual name
const nameElement = nameLabelElement.next('td').find('b').first();

// Get the text content of the name element
const name = nameElement.text();
    //  const name =$('td:contains("NAME")').next().text().trim() || "Na"
    //  $('table.bg-spiral').text('NAME')
    // $('td').text(" NAME ")
    // const name = $('.bg-spiral').find('td').next().text().trim()
    // const name = $('.bg-spiral  tbody tr)').each((i,move)=>{
    //     const save = $(move).text();
    //     return(save)
    // })
    const tdElement = $('td:contains("NAME")');

    // Find the <img> tags within that <td> element and get the src attribute values
    // const imgSrcValues = [];
    // tdElement.find('img').each((index, img) => {
    //     imgSrcValues.push($(img).attr('src'));
    // });
    
    // Log the src attribute values
    // console.log('Image src attribute values:', imgSrcValues);

    // imgSrcValues.forEach((value)=>{
    //   write(value)
    // })
    
    write(name+"\n")
    // console.log(name)
    // console.log($.html())
}
// solve(2458237094)

for(let i=2458237090; i<2458237099;i++){
    solve(i)
}

