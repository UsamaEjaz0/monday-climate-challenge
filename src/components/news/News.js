import
{
    Box,
    Heading,
    Flex,
    Button, Skeleton
} from "monday-ui-react-core"
import {useEffect, useState} from "react"
import {findRecords} from "../../services/newsDataService"
import defaultImage from "../../images/default.jpg"

import './News.css'

function News() {
    const [news, setNews] = useState([])
    const [render, setRender] = useState(false)

    useEffect(() => {
        findRecords().then(data => {
            setNews(data.data.documents)
            setRender(true)
        })
    }, [])

    const displayNews = render ? news.map((news) => {
        return (
            <Box   
                key={news._id} 
                border={Box.borders.DEFAULT} className="News-card"
                padding={Box.paddings.SMALL}
            >
                <object data={news.image} type="image/jpeg">
                    <img src={defaultImage} />
                </object>
                <Heading type={Heading.types.h3} value={news.title}/>
                <p>{news.description.slice(0, 60)}...</p>
                <Button
                    onClick={
                        () => window.open(news.url, '_blank', 'noopener,noreferrer')
                    }
                    className="Action-button"
                    kind={Button.kinds.SECONDARY}>
                    Read more
                </Button>
            </Box>
        )
    }) : [...Array(10)].map((_, index) =>
        <Box
            key={index} 
            border={Box.borders.DEFAULT} className="News-card"
            padding={Box.paddings.MEDIUM}>
            <p/>
            <Skeleton type="text"/>
            <p/>
            <Skeleton width={275}/>
            <p/>
            <Skeleton type={Skeleton.types.TEXT} size={Skeleton.sizes.TEXT.SMALL} width={275} />
            <p/>
            <Skeleton type={Skeleton.types.TEXT} size={Skeleton.sizes.TEXT.SMALL} width={250} />
            <p/>
            <Skeleton type={Skeleton.types.TEXT} size={Skeleton.sizes.TEXT.SMALL} width={275} />
            <p/>
            <Skeleton width={275} height={30}/>
        </Box>)

    return (
        <Box padding={Box.paddings.MEDIUM} margin={Box.margins.XL}>
            <Heading type={Heading.types.h1} value="News Heading" brandFont/>
            <Flex wrap={true} gap={Flex.gaps.MEDIUM}>
                {displayNews}
            </Flex>
        </Box>
    )
}

export default News
