import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container, Row } from 'react-bootstrap';
import MainContent from './pages/MainContent';
import './styles/glob.css'
import 'bootstrap/dist/css/bootstrap.min.css';

//#region Redux
import { _reducersActions as _RA } from './components/_redux/constants';
import { connect } from 'react-redux';

//#endregion

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            scrollval: window.pageYOffset,
            age: 21,
            weight : 80

        }
    }


    //#region  componentDidMount,componentWillUnmount,listenToScroll
    componentDidMount() {
        window.addEventListener('scroll', this.listenToScroll)
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.listenToScroll)
    }
    listenToScroll = () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop
        //const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
        const scrolled = winScroll // / height
        this.setState({ scrollval: scrolled, })
    }

    //#endregion
    
    
    render() {
        return (
            

                <div className="App" >

                    <Router  >
                        <div className='headerTabBig whitecolor title center'>This is the header</div>
                    <div>Age:<span>{this.props.age}</span></div>
                    
                    <div>
                        <button onClick={this.props.onAgeUp} >Age Up</button>
                        <button onClick={this.props.onAgeDown} >Age Down</button>
                    </div>
                    <div>Weight:<span>{this.props.weight}</span></div>
                    <div>
                        <button onClick={this.props.onWeightup} >Weight Up</button>
                        <button onClick={this.props.onWeightDown} >Weight Down</button>
                    </div>

                        <Container fluid className='minheig80 mb-2 body lowerindex ' >
                            <Row >
                                <Route path="/" exact render={() => <MainContent />} />
                                <Route path="/findamarket" exact render={() => { return <div>Second Page</div> }} />

                            </Row>
                        </Container>
                        <div>Footer</div>
                    </Router>
                    
                </div>
            
        );
    }
}
//#region Redux-Component Link
const mapDispachToProps = dispatch => {
    return {
        onAgeUp: () => dispatch({ type: _RA.counter.onAgeUp, value: 1 }),
        onAgeDown: () => dispatch({ type: _RA.counter.onAgeDown, value: 1 }),
        onWeightUp: () => dispatch({ type: _RA.counterWeight.onWeightUp, value: 1 }),
        onWeightDown: () => dispatch({ type: _RA.counterWeight.onWeightDown, value: 1 })
    };
};

const mapStateToProps = state => {
    return {
        age: state.counterAge.age,
        weight: state.counterWeight.weight
    };
};

//#endregion
export default connect(
    mapStateToProps,
    mapDispachToProps
)(App);