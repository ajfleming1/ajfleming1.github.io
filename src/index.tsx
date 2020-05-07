import { ListGroupItem, ListGroup } from 'reactstrap';
import * as React from "react";
import * as ReactDOM from "react-dom";
import 'bootstrap/dist/css/bootstrap.css';
import face01 = require('./img/face01.png');
import face02 = require('./img/face02.png');
import face03 = require('./img/face03.png');
import face04 = require('./img/face04.png');

type ImagesType = "face01" | "face02" | "face03" | "face04";

const initialState = {
    version: "",
    currentImage: "face01" as ImagesType
}

type State = Readonly<typeof initialState>;
type IProps = {
    onTimeOut: () => void,
    currentImage: any
}

const updateImage = (prevState: State) => {
    switch (prevState.currentImage) {
        case "face01":
            return {currentImage: "face02" as ImagesType };
        case "face02":
            return {currentImage: "face03" as ImagesType };
        case "face03":
            return {currentImage: "face04" as ImagesType };
        case "face04":
            return {currentImage: "face01" as ImagesType };
    }

};

class HomePage extends React.Component<object, State> {
    state: State = initialState;
    img!: typeof face01;
    render() {
        switch (this.state.currentImage) {
            case "face01":
                this.img = face02;
                break;
            case "face02":
                this.img = face03;
                break;
            case "face03":
                this.img = face04;
                break;
            case "face04":
                this.img = face01;
                break;
        }
        return (
            <div>

                <Heading />
                <Image
                    currentImage={this.img}
                    onTimeOut={this.handleUpdateImage}
                />
            </div>
        );
    }

    handleUpdateImage = () => this.setState(updateImage);
}

const Image = (props: IProps) => {
        setTimeout(
            props.onTimeOut, 5000
        )

        return (
            <img src={props.currentImage} alt="Drew's Face" />
        )
}

const Heading = () => (
    <div>
        <h1>Drew Fleming</h1>
        <h2>Software Developer</h2>
    </div>
);

ReactDOM.render(<HomePage />, document.getElementById("appRoot"));