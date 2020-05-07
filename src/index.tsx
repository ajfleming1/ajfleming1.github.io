import { Button } from 'reactstrap';
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
    marginTop: '50px',
    fontFamily: "Roboto Mono, monospace"
};

const contentStyle: CSS.Properties = {
    fontFamily: "Roboto Mono, monospace",
    lineHeight: '24px',
    display: 'block'
}

const buttonStyle: CSS.Properties = {
    width: '120px',
    border: '2px solid #96979c',
    marginLeft: '25px',
    fontWeight: 'bold',
    fontFamily: "Roboto Mono, monospace"
};

const linkStyle: CSS.Properties = {
    width: '120px',
    marginLeft: '25px',
    fontWeight: 'bold',
    fontFamily: "Roboto Mono, monospace"
};

type ImagesType = "face01" | "face02" | "face03" | "face04";
const initialState = {
    version: "short" as "short" | "long",
    currentImage: "face01" as ImagesType
}

type State = Readonly<typeof initialState>;
type IImageProps = {
    onTimeOut: () => void,
    currentImage: any
};

type IContentProps = {
    version: "short" | "long",
    onClick: () => void
};

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
    render() {
        this.img = getFace(this.state.currentImage);
        return (
            <div>
                <Heading
                    onTimeOut={this.handleUpdateImage}
                    currentImage={this.img}
                />
                <Content
                    version={this.state.version}
                    onClick={this.handleOnClick}
                />
            </div>
        );
    }

    handleUpdateImage = () => this.setState(updateImage);
    handleOnClick = () => this.setState(updateContent);
}

const Links = () => (
    <>
        <a style={linkStyle} href="https://twitter.com/ajflemin">Twitter</a>
        <a style={linkStyle} href="https://github.com/ajfleming1">Github</a>
        <a style={linkStyle} href="https://www.goodreads.com/user/show/44820994-drew-fleming">Goodreads</a>
    </>
);

const Content = (props: IContentProps) => (
    <div className="container">

        <div className="row">

            <div className="col-lg-8 col-md-10 mx-auto">
            <Links />
            <br /> <br />
                <div className="post-preview">

                    <Button onClick={props.onClick} style={buttonStyle} color="danger">Short</Button>
                    <Button onClick={props.onClick} style={buttonStyle} color="info">Long</Button>
                    <br /> <br />
                    <div>
                        {props.version === "short" && <p style={contentStyle}>My name is Drew Fleming and I am an avid web developer. I have been a professional developer for the last 10 years. When not coding, I enjoy yoga, spinning, reading, drinking wine, and hanging out with my wife.</p>}

                        {props.version === "long" && <p style={contentStyle}>Greetings! My name is Drew Fleming and I am an avid web developer. I earned my degree in computer science in 2007 and immediately after I started my career as a software tester. As long as I can remember I wanted to write code for a living and I was given the opportunity to do so in 2009. Since then, I have been a full time software generalist developer with a focus on developing for the web.</p>}

                        {props.version === "long" && <p style={contentStyle}>I read programming books every single day and I love learning new technologies and languages. I especially enjoying working on projects with the new stuff I learn. When I am not coding or reading, I like to spend my time practicing yoga or spinning. I also enjoy drinking wine, cooking, hanging out with my wife, friends, and family.</p>}
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const Image = (props: IImageProps) => (<img style={imgStyle} src={props.currentImage} alt="Drew's Face" />)

const Heading = (props: IImageProps) => {
    setTimeout(
        props.onTimeOut, 5000
    );

    return (
        <header className="masthead">
            <div className="overlay"></div>
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 col-md-10 mx-auto">
                        <div>
                            <h1 style={siteHeading}>Drew Fleming
                                <small><br />Software Developer</small>
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
    );
}

ReactDOM.render(<HomePage />, document.getElementById("appRoot"));