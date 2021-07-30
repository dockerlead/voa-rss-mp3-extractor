const axios = require('axios');
const download = require('download');


const RSS_FEED_URL = 'https://www.voanews.com/podcast/76/listen';
const mp3Regex = /(url)\=\"https:\/\/(www.)?(.*?)\.(mp3)\"/g;

const getMP3List = async () => {
  const rawFeed = await axios.get(RSS_FEED_URL);
  const mp3List = [...rawFeed.data.matchAll(mp3Regex)];
  let urls = [];
  for (mp3Url of mp3List) {
    urls.push(mp3Url[0].slice(5, -1));
  }
  return urls.slice(0, 10);
}

const downloadFiles = async () => {
  const urls = await getMP3List();
  Promise.all(
    urls.map(url => download(url, 'downloads'))
  );
}

downloadFiles();
