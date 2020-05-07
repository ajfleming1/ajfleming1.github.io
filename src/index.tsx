import { ListGroupItem, ListGroup } from 'reactstrap';
import * as React from "react";
import * as ReactDOM from "react-dom";
import 'bootstrap/dist/css/bootstrap.css';
import face01 = require('./img/face01.png');
import face02 = require('./img/face02.png');
import face03 = require('./img/face03.png');
import face04 = require('./img/face04.png');
import CSS from 'csstype';

const imgStyle: CSS.Properties = {
    borderRadius: '50%',
    width: '200px',
    height: '200px',
    marginLeft: '400px',
    marginTop: '-150px'
};

const siteHeading: CSS.Properties = {
    marginTop: '50px'
};

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
            return { currentImage: "face02" as ImagesType };
        case "face02":
            return { currentImage: "face03" as ImagesType };
        case "face03":
            return { currentImage: "face04" as ImagesType };
        case "face04":
            return { currentImage: "face01" as ImagesType };
    }
};

const getFace = (image: ImagesType) => {
    switch (image) {
        case "face01":
            return face02;
        case "face02":
            return face03;
        case "face03":
            return face04;
        case "face04":
            return face01;
    }
}

class HomePage extends React.Component<object, State> {
    state: State = initialState;
    img!: typeof face01;
    render() {
        this.img = getFace(this.state.currentImage);
        return (
            <div>
                <Heading
                    onTimeOut={this.handleUpdateImage}
                    currentImage={this.img}
                />
                            
                <Content />
            </div>
        );
    }

    handleUpdateImage = () => this.setState(updateImage);
}

const Content = () => (
    <div className="container">
    <div className="row">
        <div className="col-lg-8 col-md-10 mx-auto">
            <div className="post-preview">
                <h2 className="post-title">
                    Man must explore, and this is exploration at its greatest
</h2>
                <h3 className="post-subtitle">
                    Problems look mighty small from 150 miles up
</h3>
                <p className="post-meta">Posted by
<a href="#">Start Bootstrap</a>
on September 24, 2019</p>
            </div>

        </div>
    </div>
</div>
);

const Image = (props: IProps) => {


    return (
        <img style={imgStyle} src={props.currentImage} alt="Drew's Face" />
    )
}

const Heading = (props: IProps) => {
    setTimeout(
        props.onTimeOut, 5000
    )
    return (

        <header className="masthead">
            <div className="overlay"></div>
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 col-md-10 mx-auto">
                        <div>
                            <h1 style={siteHeading}>Drew Fleming
                                <h5><br />Software Developer</h5>
                            </h1>
                            <Image
                                onTimeOut={props.currentImage}
                                currentImage={props.currentImage}
                            />
                            <hr />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

ReactDOM.render(<HomePage />, document.getElementById("appRoot"));