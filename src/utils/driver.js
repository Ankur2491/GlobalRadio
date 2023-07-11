const place = require('./places');
// var masterData = {}
// let func = async function() {
// 	let res = await place.getPlaces();
// 	let places = res.data.list;
// 	let placeList = [];
// 	for (let place of places) {
// 		if(place['country'] == 'India') {
// 			placeList.push(place);
			
// 		}
// 	}
// 	for (let x of placeList) {
// 		await resolveUrl(x);
// 	}
// 	console.log(masterData);
// }
// let resolveUrl = async function(place) {
// 	let res = await fetch(`http://radio.garden/api/ara/content/page/${place['id']}/channels`)
// 	let json = await res.json()
// 	masterData[place['title']] = [];
// 	for(let content of json.data.content) {
// 		let items = content['items'];
// 		for(let item of items) {
// 			let hrefArr = item['href'].split('/')
// 			let channelId = hrefArr[hrefArr.length-1];
// 			let obj = {'title': item['title']}
// 			obj['link'] = `http://radio.garden/api/ara/content/listen/${channelId}/channel.mp3`
// 			masterData[place['title']].push(obj);
// 		}
// 	}
// }
const getPlaces = async () => {
	let x = await fetch('https://radio.garden/api/ara/content/places')
	let json = await x.json()
	return json
	}
export default getPlaces;