import { Button } from 'reactstrap';
import * as React from "react";
import * as ReactDOM from "react-dom";
import 'bootstrap/dist/css/bootstrap.css';
import face01 = require('./img/face01.png');
import face02 = require('./img/face02.png');
import face03 = require('./img/face03.png');
import face04 = require('./img/face04.png');
import "normalize.css/normalize.css";
import "./styles/styles.scss";

type ImagesType = "face01" | "face02" | "face03" | "face04";
type State = Readonly<typeof initialState>;
type IHeaderProps = { currentImage: any };
type IContentProps = { version: "short" | "long", onClick: () => void };

const initialState = {
    version: "short" as "short" | "long",
    currentImage: "face01" as ImagesType
}

const updateContent = (prevState: State) => {
    if (prevState.version === "long") {
        return { version: "short" as "short" | "long" };
    }

    return { version: "long" as "short" | "long" };
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
    timer!: any;
    render() {
        this.timer = setTimeout(
            this.handleUpdateImage, 5000
        );

        this.img = getFace(this.state.currentImage);
        return (
            <div>
                <Heading
                    currentImage={this.img}
                />
                <Content
                    version={this.state.version}
                    onClick={this.handleOnClick}
                />
            </div>
        );
    }

    componentDidUpdate() {
        clearTimeout(this.timer);
    };

    handleUpdateImage = () => {
        this.timer = setTimeout(
            this.handleUpdateImage, 5000
        );

        this.setState(updateImage)
    };

    handleOnClick = () => this.setState(updateContent);
}

const Links = () => (
    <>
        <a className="link" href="https://twitter.com/ajflemin"><i className="fab fa-twitter"></i></a>
        <a className="link" href="https://github.com/ajfleming1"><i className="fab fa-github"></i></a>
        <a className="link" href="https://www.goodreads.com/user/show/44820994-drew-fleming"><i className="fab fa-goodreads-g"></i></a>
        <a className="link" href="https://www.linkedin.com/in/ajfleming1/"><i className="fab fa-linkedin-in"></i></a>
        <a className="link" href="https://angel.co/u/drew-fleming"><i className="fab fa-angellist"></i></a>
        <a className="link" href="mailto:andrewfleming@gmail.com"><i className="fa fa-envelope" aria-hidden="true"></i></a>
    </>
);

const Content = (props: IContentProps) => (
    <div className="container">
        <div className="row">
            <div className="col-lg-8 col-md-10 mx-auto">
                <Links />
                <br /> <br />
                <div>
                    <Button
                        disabled={props.version === "short"}
                        onClick={props.onClick}
                        className="button"
                        color={props.version === "short" ? "danger" : "default"}>
                        Short
                        </Button>
                    <Button
                        disabled={props.version === "long"}
                        onClick={props.onClick}
                        className="button"
                        color={props.version === "long" ? "danger" : "default"}>
                        Long</Button>
                    <br /> <br />
                    <div className="content">
                        {props.version === "short" && <p>Greetings! My name is Drew and I am an avid web developer working for <a href="https://www.trackabout.com">TrackAbout</a>. I have been a professional developer for the last 10 years. When not coding, I enjoy yoga, spinning, reading, drinking wine, and hanging out with my wife.</p>}

                        {props.version === "long" && <p>Greetings! My name is Drew Fleming and I am an avid web developer working for <a href="https://www.trackabout.com">TrackAbout</a> (check us out for all your asset tracking needs)! I earned my degree in computer science in 2007 and immediately after I started my career as a software tester. As long as I can remember I wanted to write code for a living, and I was given the opportunity to do so in 2009. Since then, I have been a full stack developer helping companies of all sizes. Over the years I have gained expert level skills in .NET and a deep passion for developing for the web.</p>}

                        {props.version === "long" && <p>I read programming books every single day and I love learning new technologies and languages. I especially enjoy working on projects with the new stuff I learn. When I am not coding or reading, I like to spend my time practicing yoga or spinning. I also enjoy drinking wine, baking, and hanging out with my wife, friends, and family.</p>}
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const Image = (props: { currentImage: ImagesType }) => (<img className="image" src={props.currentImage} alt="Drew's Face" />)

const Heading = (props: IHeaderProps) => {
    return (
        <header>
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 col-md-10 mx-auto">
                        <div>
                            <h2 className="siteHeading">Drew Fleming
                                <small><br />Developer</small>
                            </h2>
                            <Image
                                currentImage={props.currentImage}
                            />
                            <hr />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

ReactDOM.render(<HomePage />, document.getElementById("appRoot"));