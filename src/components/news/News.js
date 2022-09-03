import 
{ Box,
  Heading,
  Flex,
  Button
} from "monday-ui-react-core"

import './News.css'

function News() {

  const news = [
    {
        "title": "A mother-daughter generational divideMy mom loves cars, but I despise them. Our yearslong debate is a window into the connection between our personal choices and the future of our climate.By Manuela Andreoni",
        "url": "https://www.nytimes.com/2022/09/02/climate/generational-divides-climate.html",
        "source": "tnyt"
    },
    {
        "title": "Biden, Remaking Climate Team, Picks John Podesta to Guide SpendingMr. Podesta, a Democratic stalwart, will oversee $370 billion in clean energy investments. Gina McCarthy, the president’s domestic climate adviser, is stepping down.By Lisa Friedman",
        "url": "https://www.nytimes.com/2022/09/02/climate/john-podesta-climate-biden.html",
        "source": "tnyt"
    },
    {
        "title": "Gina McCarthy, Biden’s Top Climate Adviser, to Step Down Sept. 16As the country’s first national climate adviser, Ms. McCarthy helped seed climate policy throughout the federal government.By Lisa Friedman",
        "url": "https://www.nytimes.com/2022/09/02/climate/gina-mccarthy-resignation.html",
        "source": "tnyt"
    },
    {
        "title": "Join Al Gore and John Kerry for a Times Climate EventHow does climate change exacerbate other global challenges? Join us remotely or in person for our climate event series, with an upcoming gathering in New York in September.By The New York Times",
        "url": "https://www.nytimes.com/article/climate-event.html",
        "source": "tnyt"
    },
    {
        "title": "Mississippi Crisis Highlights Climate Threat to Drinking Water NationwideAging infrastructure and underinvestment have left many cities’ water systems in tatters. Now flooding and other climate shocks are pushing them to failure.By Christopher Flavelle, Rick Rojas, Jim Tankersley and Jack Healy",
        "url": "https://www.nytimes.com/2022/09/01/us/mississippi-water-climate-change.html",
        "source": "tnyt"
    },
    {
        "title": "California Approves a Wave of Aggressive New Climate MeasuresAfter lobbying by the governor, lawmakers adopted $54 billion in climate spending and voted to keep open the state’s last nuclear plant.By Brad Plumer",
        "url": "https://www.nytimes.com/2022/09/01/climate/california-lawmakers-climate-legislation.html",
        "source": "tnyt"
    },
    {
        "title": "How Pakistan floods are linked to climate change",
        "url": "https://www.bbc.com/news/science-environment-62758811",
        "source": "bbc"
    },
    {
        "title": "How Pakistan floods are linked to climate change",
        "url": "https://www.bbc.com/news/science-environment-62758811",
        "source": "bbc"
    },
  ]

  const displayNews = news.map((news) => {
    return (
      <Box border={Box.borders.DEFAULT} className="News-card"
      padding={Box.paddings.SMALL}>
          <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sample88.jpg" alt="sample88" />
          <Heading type={Heading.types.h3} value={news.title} />
          <p>I'm looking for something that can deliver a 50-pound payload of snow on a small feminine target. Can you suggest something? Hello? </p>
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