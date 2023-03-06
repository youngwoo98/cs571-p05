import { Card, Button } from "react-bootstrap";
import { useState } from "react";



const Song = (props) => {

    const [isClicked, setClicked] = useState(false);

    const addSong = (song) => {
        props.add(isClicked, song);
    }

    let sId;

    return <Card>
        <div>
        <img src = {props.img}></img>
        <h4>{props.title}</h4>
        <h5>by {props.artist}</h5>
        <h6>{props.genre} | {props.year} | {props.length}</h6>
        <Button
            id = "favButton"
            value = {isClicked}
            onClick = {() => {
                sId = props.id;
                isClicked ? setClicked(false) : setClicked(true);
                addSong(props);
            }}
            variant = {isClicked ? "danger" : "primary"}
            >
                {isClicked ? "Remove from Favorites" : "Add to Favorites"}
        </Button>
    </div>
    </Card>
}

export default Song;