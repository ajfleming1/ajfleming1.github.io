/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.tsx");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.tsx":
/*!***********************!*\
  !*** ./src/index.tsx ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

const initialState = {
    title: "Indecision App",
    subtitle: "Put your life in the hands of a computer",
    options: []
};
const deleteOptions = () => ({ options: [] });
const addOption = (prevState, option) => {
    return {
        options: prevState.options.concat(option)
    };
};
const pickRandom = (options) => {
    const randomNum = Math.floor(options.length * Math.random());
    const option = options[randomNum];
    alert(option);
};
class IndecisionApp extends React.Component {
    constructor() {
        super(...arguments);
        this.state = initialState;
        this.handleDeleteOptions = () => this.setState(deleteOptions);
        this.handlePickOption = () => pickRandom(this.state.options);
        this.handleAddOption = (option) => {
            if (!option) {
                return "Enter a valid option";
            }
            else if (this.state.options.indexOf(option) > -1) {
                return "Enter a unique option";
            }
            this.setState(prevState => addOption(prevState, option));
        };
    }
    render() {
        const { title, subtitle, options } = this.state;
        return (React.createElement("div", null,
            React.createElement(Header, { title: title, subtitle: subtitle }),
            React.createElement(Action, { hasOptions: options.length > 0, onClick: this.handlePickOption }),
            React.createElement(Options, { onClick: this.handleDeleteOptions, options: options }),
            React.createElement(AddOption, { addOption: this.handleAddOption })));
    }
}
class Header extends React.Component {
    render() {
        return (React.createElement("div", null,
            React.createElement("h1", null, this.props.title),
            React.createElement("h2", null, this.props.subtitle)));
    }
}
class Action extends React.Component {
    render() {
        return (React.createElement("div", null,
            React.createElement("button", { disabled: !this.props.hasOptions, onClick: this.props.onClick }, "What should I do?")));
    }
}
class Options extends React.Component {
    render() {
        return (React.createElement("div", null,
            React.createElement("button", { onClick: this.props.onClick }, "Remove All"),
            this.props.options.map(o => React.createElement(DecisionOption, { key: o, optionText: o }))));
    }
}
class AddOption extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            error: undefined
        };
        this.onFormSubmit = (e) => {
            e.preventDefault();
            const option = e.target.elements.option.value.trim();
            const error = this.props.addOption(option);
            this.setState(() => ({ error }));
            e.target.elements.option.value = "";
        };
    }
    render() {
        return (React.createElement("div", null,
            this.state.error && React.createElement("p", null, this.state.error),
            React.createElement("form", { onSubmit: this.onFormSubmit },
                React.createElement("input", { type: "text", name: "option" }),
                React.createElement("button", null, "Add Option"))));
    }
}
class DecisionOption extends React.Component {
    render() {
        return (React.createElement("p", null, this.props.optionText));
    }
}
ReactDOM.render(React.createElement(IndecisionApp, null), document.getElementById("appRoot"));


/***/ })

/******/ });
//# sourceMappingURL=main.js.map