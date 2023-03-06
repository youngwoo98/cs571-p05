import { useContext, useState, useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import Song from "./Song";
import BadgerBeatsFavoritesContext from "../contexts/BadgerBeatsFavoritesContext";

const AllSongs = (props) => {

    const [favorites, setFavorites] = useContext(BadgerBeatsFavoritesContext);
    const [songs, setSongs] = useState([]);

    

    useEffect(() => {
        fetch('https://cs571.org/s23/hw5/api/songs', {
            method: "GET",
            headers: {
                "X-CS571-ID": "bid_c49825b5bd469d794555"
            }
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            setSongs(data);
        })
        .catch(error => console.error(error));
    }, [])

    let gCount = [];
    songs.map(song => {
        if(gCount.includes(song.genre)){
        }
        else{
            gCount.push(song.genre);
        }
    })
    let sCount = 0;
    songs.map(song => {
        const mns = song.length.split(":");
        sCount = parseInt(sCount) + parseInt(mns[0] * 60) + parseInt(mns[1]); 
    })


    const saved = sessionStorage.setItem('fav', favorites);
    

    const add = (isClicked, s) => {
        if(isClicked){
            setFavorites((oldFav) => [...oldFav.filter(song => song.id !== s.id)])
            sessionStorage.setItem('fav', favorites);                                   
        }
        else{
            setFavorites((oldFav) => [...oldFav, s])
            sessionStorage.setItem('fav', favorites);
        }
    }
    
    
    console.log(favorites)
    return <div>
        <h1>Songs</h1>
        <h4>We have {songs.length} songs in {gCount.length} genres for a total of {sCount} seconds of music!</h4>
        <Container fluid>
            <Row>
                {
                    songs.map(song => {
                        return <Col xs={12} sm={6} md={4} lg={3} xl={2} key = {song.id}>
                            <Song {...song}
                                add = {add}
                            />
                        </Col>
                    })
                }
            </Row>
        </Container>

    </div>
}

export default AllSongs;