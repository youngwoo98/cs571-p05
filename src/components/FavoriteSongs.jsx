import { useContext } from "react";
import { Row, Col, Container } from "react-bootstrap";
import BadgerBeatsFavoritesContext from "../contexts/BadgerBeatsFavoritesContext";
import Song from "./Song";

const FavoriteSongs = (props) => {

    const [favorites, setFavorites] = useContext(BadgerBeatsFavoritesContext);

    let gCount = [];
    favorites.map(song => {
        if(gCount.includes(song.genre)){
        }
        else{
            gCount.push(song.genre);
        }
    })
    let sCount = 0;
    favorites.map(song => {
        const mns = song.length.split(":");
        sCount = parseInt(sCount) + parseInt(mns[0] * 60) + parseInt(mns[1]); 
    })

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
    
    return <div>
        <h1>Favorites</h1>
        <h4>You have {favorites.length} songs in {gCount.length} genres for a total of {sCount} seconds of music!</h4>
        <Container fluid>
            <Row>
                {
                    favorites.map(song => {
                        return <Col xs={12} sm={6} md={4} lg={3} xl={2} key = {song.id + 'fav'}>
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

export default FavoriteSongs;