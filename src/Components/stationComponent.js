import getPlaces from "../utils/driver";
import * as React from 'react';
import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css';
import './styles.css';

var masterData = {};

export default function StationComponent() {
    const [places, setPlaces] = React.useState([]);
    const [country, setCountry] = React.useState("Choose a Country");
    const [cities, setCities] = React.useState([]);
    const [city, setCity] = React.useState("Choose a City");
    const [stationList, setStationList] = React.useState([]);
    const [source, setSource] = React.useState("");
    const [title, setTitle] = React.useState("");
    const [stationMap, setStationMap] = React.useState({});

    React.useEffect(() => {
        getPlaces().then((places) => {
            for (let placeObj of places.data.list) {
                if (masterData[placeObj['country']] === undefined) {
                    masterData[placeObj['country']] = {};
                }
                masterData[placeObj['country']][placeObj['title']] = { 'id': placeObj['id'] };
            }
            setPlaces(Object.keys(masterData).sort());
        })
    }, []);
    return (
        <div>
            <select onChange={handleCountry}>
                <option key='blankKey' hidden value>Choose a Country</option>
                {
                    places.map(el => <option value={el} key={el}> {el} </option>)
                }
            </select>
            {
                cities.length > 0 && <select onChange={handleCity}>
                    <option key='blankKey' hidden value>Choose a City</option>
                    {
                        cities.map(el => <option value={el} key={el}> {el} </option>)
                    }
                </select>
            }
            {
                stationList.length > 0 && <select onChange={playStation}>
                    <option key='blankKey' hidden value>Choose a Station</option>
                    {
                        stationList.map(el => <option value={el.id} key={el.id}> {el.title} </option>)
                    }
                </select>
            }
            <br/>
            {
                source.length > 0 &&
                <AudioPlayer
                autoPlay
                src={source}
                showDownloadProgress={false}
                showFilledProgress={false}
                header={title}
                customProgressBarSection={[]}
                customAdditionalControls={[]}
                // other props here
              />

            }
        </div>
    );
    function handleCountry(e) {
        setCountry(e.target.value);
        setCities(Object.keys(masterData[e.target.value]).sort());

    }
    async function handleCity(e) {
        setCity(e.target.value);
        setStationList([]);
        setSource("");
        let id = masterData[country][e.target.value]['id'];
        let res = await fetch(`https://blazing-news-api.vercel.app/channels/${id}`)
        let json = await res.json();
        let contents = json.data.content;
        let arr = [];
        let sMap = {};
        for (let content of contents) {
            let items = content.items;
            for (let item of items) {
                let hrefArr = item.page.url.split("/");
                let stationObj = {};
                stationObj['title'] = item.page.title;
                stationObj['id'] = hrefArr[hrefArr.length - 1]
                arr.push(stationObj);
                sMap[hrefArr[hrefArr.length - 1]] = item.page.title;
            }
        }
        setStationList(arr);
        setStationMap(sMap);
    }
    function playStation(e) {
        setTitle(stationMap[e.target.value]);
        setSource("");
        setSource(`http://radio.garden/api/ara/content/listen/${e.target.value}/channel.mp3`)
    }
}