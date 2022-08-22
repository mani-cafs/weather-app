import React, {useState,useEffect} from 'react'
import * as ant  from "antd";
import * as icon from "@ant-design/icons";
import DOMPurify  from 'dompurify';

export default function News() {
    const [renderData,setRenderData] = useState([])
    const [newsInfo,setNewsInfo]     = useState({})
    const [isopen,setIsopen]         = useState(false)
    const [newsData,setNewsData]     = useState([])
    const [newData,setNewData]     = useState([])
    useEffect(() => {
        const fetchData = async () => {
            // https://newsapi.org/v2/everything?domains=wsj.com&apiKey=dec90e39ad08411fa35b04de02903aca
            // https://newsapi.org/v2/everything?q=apple&from=2022-08-19&to=2022-08-19&sortBy=popularity&apiKey=dec90e39ad08411fa35b04de02903aca
            // https://newsapi.org/v2/top-headlines?country=in&apiKey=dec90e39ad08411fa35b04de02903aca
            await fetch(`https://newsapi.org/v2/everything?q=apple&from=2022-08-19&to=2022-08-19&sortBy=popularity&apiKey=dec90e39ad08411fa35b04de02903aca`)
            .then(res => res.json())
            .then(result => {
                setNewsData(result.articles)
                var article = []
                result.articles.map((news_rslt,i)=>{
                    article.push(
                        <ant.Col key={i} style={{marginLeft:"5px",cursor:"pointer"}} className='new_card'>
                            <ant.Card style={{width: 300}}
                                cover={
                                    <img alt='news_image' src={news_rslt.urlToImage} />
                                } onClick={()=>open_info(news_rslt)}>
                                    <ant.Card.Meta 
                                        avatar={<ant.Avatar src="https://joeschmoe.io/api/v1/random"/>}
                                        title = {news_rslt.author}
                                    />
                                    <p style={{padding:"10px"}}>{news_rslt.title}</p>
                            </ant.Card>
                        </ant.Col>
                    )
                })
                
                function getMultipleRandom(arr, num) {
                    const shuffled = [...arr].sort(() => 0.5 - Math.random());
                  
                    return shuffled.slice(0, num);
                  }
                  
                const arr = result.articles;
                var items = getMultipleRandom(arr, 5)
                var vertical_info = []
                items.map((news_info,i)=>{
                    vertical_info.push(
                        <ant.Card key={i} style={{width: 600,height:140,display:'flex',}}
                            cover={ 
                                <img alt='news_image' src={news_info.urlToImage} style={{width:"120px",height:"120px"}}/>
                            } onClick={()=>open_info(news_info)} >
                                <ant.Card.Meta 
                                    avatar={<ant.Avatar src="https://joeschmoe.io/api/v1/random"/>}
                                    title = {news_info.author}
                                />
                                <p style={{padding:"10px"}}>{news_info.title}</p>
                        </ant.Card>
                    )
                })
                setNewData(vertical_info)
                setRenderData(article)
            });
        }
        fetchData();
        renderVertical()
    },[])

    const renderVertical=()=>{
        function get_random(arr, num) {
            const random_num = [...arr].sort(() => 0.5 - Math.random());
            return random_num.slice(0, num);
        }
        const arr         = newsData;
        var items         = get_random(arr, 5)
        var vertical_info = []
        items.map((news_info,i)=>{
            vertical_info.push(
                <ant.Card key={i} style={{width: 600,height:140,display:'flex'}}
                    cover={ 
                        <img alt='news_image' src={news_info.urlToImage} style={{width:"120px",height:"120px"}}/>
                    } onClick={()=>open_info(news_info)} >
                        <ant.Card.Meta 
                            avatar={<ant.Avatar src="https://joeschmoe.io/api/v1/random"/>}
                            title = {news_info.author}
                        />
                        <p style={{padding:"10px"}}>{news_info.title}</p>
                </ant.Card>
            )
        })
        setNewData(vertical_info)
    }

    const open_info =(news_rslt)=>{
        setIsopen(true)
        setNewsInfo(news_rslt)
        
    }

    return (
        <div>
            <h3>News</h3>
            <ant.Row gutter={{xs: 8,sm: 16,md: 24,}}>
                {renderData}
            </ant.Row>
            <ant.Modal
                centered
                title    = "Engadget"
                visible  = {isopen}
                onOk     = {() => setIsopen(false)}
                onCancel = {() => setIsopen(false)}
                width    = {1300}
                footer   = {null}
                style    = {{marginTop:"70px"}} 
            >   
                <ant.Row>
                    <ant.Col md={12}>
                        <ant.Row>
                            <ant.Col md={24} sm={12} xs={24}>
                                <img alt='news_image' src={newsInfo.urlToImage} style={{width:600}}/>
                            </ant.Col>
                            <ant.Col md={24} sm={12} xs={24}>
                                <h3>{newsInfo.title}</h3>
                            </ant.Col>
                            <ant.Col md={24} sm={12} xs={24}>
                                <p>{newsInfo.content}</p>
                            </ant.Col>
                            <ant.Col md={24} sm={12} xs={24}>
                                <p dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(newsInfo.description).replace(/\n/g, '<br />')}}/>
                            </ant.Col>
                            <ant.Col md={24} sm={12} xs={24}>
                                <a href={newsInfo.url}>Visit here : {newsInfo.url}</a>
                            </ant.Col>
                        </ant.Row>
                    </ant.Col>
                    <ant.Col md={12} style={{cursor:"pointer"}}>
                        {newData}
                    </ant.Col>
                </ant.Row>
            </ant.Modal>
        </div>
    )
}
