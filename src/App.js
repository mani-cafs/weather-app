import React     from 'react'
import * as ant  from "antd";
import Home      from './component/home'
import News      from './component/news'
function App() {
    return (
        <div className="App">
            <ant.Row>
                {/* <ant.Col md={24}>
                    <Home />
                </ant.Col> */}
                <ant.Col md={24} >
                    <News />
                </ant.Col>
            </ant.Row>
        </div>
    );
}

export default App;
