import 
{ Box,
  Heading,
  Flex,
  Button
} from "monday-ui-react-core"
import { useEffect, useState } from "react"
import { findRecords } from "../../services/newsDataService"

import './News.css'

function News() {
  const [news, setNews] = useState([])

  useEffect(() => {
    findRecords().then(data => {
      setNews(data.data.documents)
    })
  })

  const displayNews = news.map((news) => {
    return (
      <Box border={Box.borders.DEFAULT} className="News-card"
      padding={Box.paddings.SMALL}>
          <img src={news.image} alt={news.title} />
          <Heading type={Heading.types.h3} value={news.title} />
          <p>{news.description.slice(0, 60)}...</p>
          <Button
              className="Action-button"
              kind={Button.kinds.SECONDARY}
              style={{float: "right"}}
          >
            Read more
          </Button> 
      </Box>
    )
  })

  return(
    <Box padding={Box.paddings.MEDIUM} margin={Box.margins.XL} >
      <Heading type={Heading.types.h1} value="News Heading" brandFont />
      <Flex wrap={true} gap={Flex.gaps.MEDIUM}>
        {displayNews}
      </Flex>
    </Box>
  )
}

export default News