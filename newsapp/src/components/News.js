import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps ={
      country: 'us',
      pageSize: 12,
      category: 'general' 
  }

  static propTypes ={
      country:PropTypes.string,
      pageSize:PropTypes.number,
      category:PropTypes.string
  }


  articles = [
    {
      "source": {
        "id": "the-washington-post",
        "name": "The Washington Post"
      },
      "author": "Jacob Bogage",
      "title": "Trump would add twice as much to national debt as Harris, study finds - The Washington Post",
      "description": "Former president Donald Trump’s campaign proposals would add nearly twice as much to the national debt as Vice President Kamala Harris’s would, according to new research.",
      "url": "https://www.washingtonpost.com/business/2024/10/07/trump-harris-national-debt/",
      "urlToImage": "https://www.washingtonpost.com/wp-apps/imrs.php?src=https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/5E4E7HTJVTREI77LYARYCWQN3I.jpg&w=1440",
      "publishedAt": "2024-10-07T10:33:44Z",
      "content": "Former president Donald Trumps campaign proposals would add more than twice as much to the national debt as Vice President Kamala Harriss would, according to new research released Monday though both … [+6023 chars]"
    },
    {
      "source": {
        "id": "cnn",
        "name": "CNN"
      },
      "author": "Christian Edwards, Katie Hunt",
      "title": "Nobel Prize in medicine goes to Victor Ambros and Gary Ruvkun for work on the discovery of microRNA - CNN",
      "description": "This year’s Nobel Prize in physiology or medicine has been awarded to Victor Ambros and Gary Ruvkun for the discovery of microRNA and its role in post-transcriptional gene regulation.",
      "url": "https://www.cnn.com/2024/10/07/science/nobel-medicine-prize-discovery-microrna-victor-ambros-gary-ruvkun-intl/index.html",
      "urlToImage": "https://media.cnn.com/api/v1/images/stellar/prod/gettyimages-2176418104.jpg?c=16x9&q=w_800,c_fill",
      "publishedAt": "2024-10-07T10:27:00Z",
      "content": "This years Nobel Prize in physiology or medicine has been awarded to Victor Ambros and Gary Ruvkun for their work on the discovery of microRNA, a fundamental principle governing how gene activity is … [+2509 chars]"
    },
    {
      "source": {
        "id": "associated-press",
        "name": "Associated Press"
      },
      "author": "JEFF MARTIN, FREIDA FRISARO",
      "title": "Milton increases to a Category 2 hurricane as Florida prepares for massive evacuations - The Associated Press",
      "description": "Milton has increased to a Category 2 hurricane as Florida gears up for what could be a massive evacuation not seen since 2017. Milton’s maximum sustained winds increased to 100 mph early Monday. The storm was about 195 miles west-northwest of Progreso, Mexico…",
      "url": "https://apnews.com/article/hurricane-milton-helene-florida-557c5c512135e0a8661b298e45e17c92",
      "urlToImage": "https://dims.apnews.com/dims4/default/d9e15ea/2147483647/strip/true/crop/2000x1125+0+104/resize/1440x810!/quality/90/?url=https%3A%2F%2Fassets.apnews.com%2F30%2F22%2Fd7fb7c3fc810dff4c3716d127623%2Feb3437c59ba243f0ad07b86d6ef27ec8",
      "publishedAt": "2024-10-07T10:19:00Z",
      "content": "FORT LAUDERDALE, Florida (AP) Milton increased to a Category 2 hurricane early Monday as Florida gears up for what could be its biggest evacuation in seven years as the storm heads toward major popul… [+6244 chars]"
    },
    {
      "source": {
        "id": "business-insider",
        "name": "Business Insider"
      },
      "author": "Alex Morrell",
      "title": "Activist investor Starboard has informed Pfizer it has taken a stake - Business Insider",
      "description": "Activist investor Starboard Value is looking to shake up the pharma giant's sagging stock price after taking a stake reportedly worth about $1bn.",
      "url": "https://www.businessinsider.com/starboard-activist-significant-stake-in-drugmaker-pfizer-2024-10",
      "urlToImage": "https://i.insider.com/67032ce2198738e3a70e95d6?width=1200&format=jpeg",
      "publishedAt": "2024-10-07T09:40:00Z",
      "content": null
    },
    {
      "source": {
        "id": "reuters",
        "name": "Reuters"
      },
      "author": "Alun John, Kevin Buckland",
      "title": "10-year Treasury yield hits 4%, keeping equity bulls in check - Reuters.com",
      "description": "The benchmark 10-year Treasury yield rose to 4% on Monday after last week's U.S. labour market data dispelled fears of a recession, driving a paring of rate-cut bets, and supporting the dollar and equities at least initially.",
      "url": "https://www.reuters.com/markets/global-markets-wrapup-1-2024-10-07/",
      "urlToImage": "https://www.reuters.com/resizer/v2/TTZJAW22YNIOBEUNZ7AWZPYBDE.jpg?auth=ad14364c300e842f268016ece4657f255607e0fd49061acff5c415cb603f2e4f&height=1005&width=1920&quality=80&smart=true",
      "publishedAt": "2024-10-07T09:36:13Z",
      "content": null
    },
    {
      "source": {
        "id": "cnn",
        "name": "CNN"
      },
      "author": "Lauren Kent",
      "title": "Russian court sentences US citizen to six years in prison for fighting for Ukraine, state media reports - Yahoo! Voices",
      "description": "A Moscow court sentenced American citizen Stephen Hubbard, 72, to six years and 10 months in prison on Monday for allegedly fighting as a mercenary for Ukraine, according to Russian state media TASS.",
      "url": "https://www.cnn.com/2024/10/07/europe/russian-court-sentences-us-citizen-stephen-hubbard-intl/index.html",
      "urlToImage": "https://media.cnn.com/api/v1/images/stellar/prod/2024-10-07t090759z-746632545-rc2lfaaplx61-rtrmadp-3-russia-usa-hubbard.JPG?c=16x9&q=w_800,c_fill",
      "publishedAt": "2024-10-07T09:16:17Z",
      "content": "A Moscow court sentenced American citizen Stephen Hubbard, 72, to six years and 10 months in prison on Monday for allegedly fighting as a mercenary for Ukraine, according to Russian state media TASS.… [+1815 chars]"
    },
    {
      "source": {
        "id": null,
        "name": "Yahoo Entertainment"
      },
      "author": "ELAINE KURTENBACH",
      "title": "Stock market today: World shares are mixed after a blockbuster US jobs report - Yahoo Finance",
      "description": "World shares were mixed on Monday while oil prices pushed higher after the Israeli military said that projectiles fired from Gaza set off sirens in central...",
      "url": "https://finance.yahoo.com/news/stock-market-today-asian-shares-044304655.html/",
      "urlToImage": "https://s.yimg.com/cv/apiv2/social/images/yahoo_default_logo.png",
      "publishedAt": "2024-10-07T09:13:34Z",
      "content": "World shares were mixed on Monday while oil prices pushed higher after the Israeli military said that projectiles fired from Gaza set off sirens in central Tel Aviv, as Israel marked a year since the… [+4036 chars]"
    },
    {
      "source": {
        "id": "cnn",
        "name": "CNN"
      },
      "author": "Josh Campbell",
      "title": "‘Shocking,’ historic spike in anti-Jewish threats across the US, ADL says - CNN",
      "description": "Threats to Jews in the United States spiked over 200% in the one-year period since the deadly October 7th terrorist attack on Israel by Hamas, according to new data obtained by CNN from the Anti-Defamation League.",
      "url": "https://www.cnn.com/2024/10/06/us/anti-jewish-threats-us-adl/index.html",
      "urlToImage": "https://media.cnn.com/api/v1/images/stellar/prod/gettyimages-2150568135.jpg?c=16x9&q=w_800,c_fill",
      "publishedAt": "2024-10-07T09:07:00Z",
      "content": "Threats to Jews in the United States tripled in the one-year period since the deadly October 7 terrorist attack on Israel by Hamas, preliminary data provided to CNN by the Anti-Defamation League show… [+3924 chars]"
    },
    {
      "source": {
        "id": "politico",
        "name": "Politico"
      },
      "author": "Josh Gerstein",
      "title": "The Supreme Court’s back. These 2024 election cases could land on its docket. - POLITICO",
      "description": "From mail-in ballots in Pennsylvania to hurricane accommodations in North Carolina, here are the legal issues to watch.",
      "url": "https://www.politico.com/news/2024/10/07/supreme-court-new-term-election-cases-00182646",
      "urlToImage": "https://static.politico.com/60/1f/9e65ccf847548d5accc363c5b68c/supreme-court-55128.jpg",
      "publishedAt": "2024-10-07T09:00:00Z",
      "content": "Heading into the courts opening session on Monday, the justices have agreed to hear 40 cases this term. None of those cases is nearly as consequential as the high courts forays in recent years into a… [+13269 chars]"
    },
    {
      "source": {
        "id": "fox-news",
        "name": "Fox News"
      },
      "author": "Christine Rousselle",
      "title": "North Carolina woman eats nothing but sardines, loses 35 pounds: 'This is not a diet' - Fox News",
      "description": "A woman in North Carolina has eaten only sardines for the past three months and does not plan on eating carbohydrates ever again, she told Fox News Digital.",
      "url": "https://www.foxnews.com/food-drink/north-carolina-woman-eats-nothing-sardines-loses-35-pounds-this-not-diet",
      "urlToImage": "https://static.foxnews.com/foxnews.com/content/uploads/2024/09/sardine-split.jpg",
      "publishedAt": "2024-10-07T09:00:00Z",
      "content": "Join Fox News for access to this content\r\nPlus special access to select articles and other premium content with your account - free of charge.\r\nBy entering your email and pushing continue, you are ag… [+4332 chars]"
    },
    {
      "source": {
        "id": null,
        "name": "Hindustan Times"
      },
      "author": "HT News Desk",
      "title": "Hollywood News Live Today October 7, 2024 : Joaquin Phoenix's Joker 2 deliver disappointing numbers at the US Box office after a flop opening - Hindustan Times",
      "description": "Hollywood News Live: Stay updated with the latest Hollywood news. Get real-time updates on movies, celebrity events, gossip, and red carpet highlights. We bring you the hottest entertainment stories as they happen, all in one place!",
      "url": "https://www.hindustantimes.com/entertainment/hollywood/hollywood-news-live-get-latest-updates-on-celebrity-gossip-movie-ott-release-today-october-7-2024-101728259985403.html",
      "urlToImage": "https://www.hindustantimes.com/ht-img/img/2024/10/07/550x309/luna_lovegood_1728289040077_1728289040717.jfif",
      "publishedAt": "2024-10-07T07:22:35Z",
      "content": "Hollywood Get real time updates on Hollywood news, your go-to source for the latest updates in the entertainment world. From breaking celebrity news to new movie releases and red carpet moments, weve… [+1303 chars]"
    },
    {
      "source": {
        "id": "espn",
        "name": "ESPN"
      },
      "author": "Todd Archer",
      "title": "Dak's late TD gives Cowboys 'one to remember' - ESPN",
      "description": "Cowboys quarterback Dak Prescott threw the winning touchdown pass with 20 seconds left Sunday night in a crucial victory against the Steelers.",
      "url": "https://www.espn.com/nfl/story/_/id/41656720/cowboys-dak-prescott-delivers-last-minute-win-vs-steelers",
      "urlToImage": "https://a3.espncdn.com/combiner/i?img=%2Fphoto%2F2024%2F1007%2Fr1397165_1296x729_16%2D9.jpg",
      "publishedAt": "2024-10-07T07:11:00Z",
      "content": "PITTSBURGH -- As lightning lit up the sky outside Acrisure Stadium, delaying the start of Sunday night's game between the Dallas Cowboys and Pittsburgh Steelers, Dak Prescott had a message for his te… [+4469 chars]"
    },
    {
      "source": {
        "id": null,
        "name": "BBC News"
      },
      "author": null,
      "title": "Israeli hostage family's fight 'not over' one year on - BBC.com",
      "description": "On the one-year anniversary of the 7 October Hamas attacks in Israel, survivor Hadas Kalderon speaks to the BBC.",
      "url": "https://www.bbc.com/news/videos/c625nlxjpz7o",
      "urlToImage": "https://ichef.bbci.co.uk/news/1024/branded_news/6fb7/live/481f6b20-840b-11ef-83dd-fbf1b9732cf0.jpg",
      "publishedAt": "2024-10-07T06:38:15Z",
      "content": "On 7 October, it will be one year since the attacks on southern Israel by Hamas gunmen, where around 1,200 people were killed and 251 people were taken hostage.\r\nHadas Kalderon from Nir Oz survived t… [+422 chars]"
    },
    {
      "source": {
        "id": null,
        "name": "CNBC"
      },
      "author": "Yeo Boon Ping",
      "title": "CNBC Daily Open: September’s blockbuster jobs report changes the calculus - CNBC",
      "description": "The jobs report affirms recession unlikely for now. It also almost guarantees the Fed will reduce rates by a quarter point in November.",
      "url": "https://www.cnbc.com/2024/10/07/cnbc-daily-open-septembers-jobs-report-changes-the-calculus.html",
      "urlToImage": "https://image.cnbcfm.com/api/v1/image/108043920-1728280212553-gettyimages-2021277635-ocr-l-a2-jobfair-08-pb.jpeg?v=1728280240&w=1920&h=1080",
      "publishedAt": "2024-10-07T06:30:01Z",
      "content": "This report is from today's CNBC Daily Open, our international markets newsletter. CNBC Daily Open brings investors up to speed on everything they need to know, no matter where they are. Like what yo… [+3847 chars]"
    },
    {
      "source": {
        "id": "cnn",
        "name": "CNN"
      },
      "author": "Kathleen Magramo, Lex Harvey",
      "title": "Israel marks October 7 attack anniversary as Middle East conflict escalates - CNN",
      "description": "Israel marks the first anniversary of the October 7 Hamas attacks as conflict in the Middle East escalates. Follow for live updates.",
      "url": "https://www.cnn.com/world/live-news/israel-hamas-attack-anniversary-war-11-07-24-intl-hnk/index.html",
      "urlToImage": "https://media.cnn.com/api/v1/images/stellar/prod/gettyimages-2175912792.jpg?c=16x9&q=w_800,c_fill",
      "publishedAt": "2024-10-07T06:29:00Z",
      "content": "There were demonstrations, marches and memorials across the world this weekend ahead of the anniversary of Hamas October 7 attacks on Israel.\r\nLarge crowds marched through the streets of Barcelona, J… [+1569 chars]"
    },
    {
      "source": {
        "id": null,
        "name": "Sports Illustrated"
      },
      "author": "Albert Breer",
      "title": "Week 5 NFL Takeaways: Caleb Williams Playing Like the No. 1 Pick in the Draft - Sports Illustrated",
      "description": "The Bears quarterback had his best game as a pro on Sunday. Plus, Stephen Gilmore is not surprised by the Vikings’ 5–0 start, Aaron Rodgers needs Davante Adams and more.",
      "url": "https://www.si.com/nfl/week-5-nfl-takeaways-caleb-williams-playing-like-no-1-pick-in-draft",
      "urlToImage": "https://images2.minutemediacdn.com/image/upload/c_crop,w_8003,h_4501,x_0,y_171/c_fill,w_1440,ar_16:9,f_auto,q_auto,g_auto/images/ImagnImages/mmsport/si/01j9j3gdd5xk6bjbemez.jpg",
      "publishedAt": "2024-10-07T06:13:44Z",
      "content": "What a fun, entertaining Week 5. Were ready to roll with the takeaways to recap it all, morning (Hello, London!) to night \r\nCaleb Williams looked like the first pick in the NFL draft on Sunday. Tucke… [+29534 chars]"
    },
    {
      "source": {
        "id": null,
        "name": "Space.com"
      },
      "author": "Mike Wall",
      "title": "SpaceX, NASA stand down from Oct. 10 Europa Clipper launch due to Hurricane Milton - Space.com",
      "description": "'The safety of launch team personnel is our highest priority, and all precautions will be taken to protect the Europa Clipper spacecraft.'",
      "url": "https://www.space.com/spacex-nasa-europa-clipper-launch-delay-hurricane-milton",
      "urlToImage": "https://cdn.mos.cms.futurecdn.net/NDgDS4Ebivgn68ancGeLcJ-1200-80.jpg",
      "publishedAt": "2024-10-07T04:39:52Z",
      "content": "We'll have to wait a bit longer to see NASA's Europa Clipper probe get off the ground.\r\nThe $5 billion Europa Clipper mission had been scheduled to launch on Thursday (Oct. 10) atop a SpaceX Falcon H… [+2523 chars]"
    },
    {
      "source": {
        "id": null,
        "name": "Yahoo Entertainment"
      },
      "author": "Reuters",
      "title": "Mexican mayor assassinated days after taking office - Yahoo News Canada",
      "description": "The mayor of the capital of Mexico's violence-plagued state of Guerrero was killed on Sunday less than a week after he took office, the state's governor...",
      "url": "https://ca.news.yahoo.com/mexican-mayor-assassinated-days-taking-040533725.html",
      "urlToImage": "https://media.zenfs.com/en/reuters.com/a8e3700be269527b6415261109c6e371",
      "publishedAt": "2024-10-07T04:05:00Z",
      "content": "MEXICO CITY (Reuters) - The mayor of the capital of Mexico's violence-plagued state of Guerrero was killed on Sunday less than a week after he took office, the state's governor confirmed.\r\nAlejandro … [+1652 chars]"
    },
    {
      "source": {
        "id": "cbs-news",
        "name": "CBS News"
      },
      "author": "Elias Lopez",
      "title": "Mother of Sean \"Diddy\" Combs defends son in statement, says he is no \"monster\" - CBS News",
      "description": "The mother of Sean \"Diddy\" Combs released a statement Sunday defending her son against the federal charges ​and multiple allegations of sexual misconduct he is currently facing.",
      "url": "https://www.cbsnews.com/news/sean-diddy-combs-mother-defends-son-in-statement-says-he-is-no-monster/",
      "urlToImage": "https://assets3.cbsnewsstatic.com/hub/i/r/2024/09/19/7c3810d6-ffd6-4c76-a61d-0233df73eaf1/thumbnail/1200x630g2/1d6bbb549d1c7e89b761236659c2ebf4/gettyimages-1187731797.jpg?v=0736ad3ef1e9ddfe1218648fe91d6c9b",
      "publishedAt": "2024-10-07T03:10:15Z",
      "content": "The mother of the embattled hip-hop mogul Sean \"Diddy\" Combs released a statement Sunday defending her son against the criminal charges and multiple allegations of sexual misconduct he is currently f… [+3675 chars]"
    },
    {
      "source": {
        "id": null,
        "name": "Eonline.com"
      },
      "author": null,
      "title": "Sister Wives’ Kody Brown Leaves His and Wife Robyn Brown’s Home After Explosive Fight - E! NEWS",
      "description": "Sister Wives stars Kody Brown and Robyn Brown got into a \"heated exchange\" that prompted Kody to leave their Flagstaff, Arizona home on the Oct. 6 episode.",
      "url": "https://www.eonline.com/news/1408145/sister-wives-kody-brown-leaves-his-and-wife-robyn-browns-home-after-explosive-fight",
      "urlToImage": "https://akns-images.eonline.com/eol_images/Entire_Site/202493/rs_1200x1200-241003090001-swsplit.jpg?fit=around%7C1080:1080&output-quality=90&crop=1080:1080;center,top",
      "publishedAt": "2024-10-07T03:00:00Z",
      "content": "Griping about the familys inability to pay off Coyote Pass, Janelle said Kody claimed to have \"all these other debts.\" And, yet, shes watched him snap up other assets like trailers and home décor. \"I… [+1239 chars]"
    }
  ]

  constructor(props){
    super(props);
    console.log("this is constructor from news component");
    this.state ={
      articles: this.articles,
      loading: false,
      page: 1,
      totalResults: 0

    };
    document.title = `${this.props.category} - News`
  }
  async updateNews() {
    this.props.setProgress(10);  
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });

    try {
        let data = await fetch(url);
        this.props.setProgress(50);
        let parsedData = await data.json();
        this.props.setProgress(70); 
        console.log(parsedData);

        if (parsedData.status === "ok") {
            this.setState({ 
                articles: parsedData.articles, 
                totalResults: parsedData.totalResults, 
                loading: false,
            });
            this.props.setProgress(100);  
        } else {
            console.error("Error fetching data: ", parsedData.message);
            this.setState({ loading: false });
            this.props.setProgress(100);  
        }
    } catch (error) {
        console.error("Error fetching data: ", error);
        this.setState({ loading: false });
        this.props.setProgress(100);  
    }
}

componentDidMount = async () => {
    await this.updateNews(); 
};

onPrevPage = async () => {
    this.setState({ page: this.state.page - 1 });
    await this.updateNews();
};

onNextPage = async () => {
    this.setState({ page: this.state.page + 1 });
    await this.updateNews();
};

fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    
    this.setState({ 
        articles: this.state.articles.concat(parsedData.articles), 
        totalResults: parsedData.totalResults, 
        loading: false,
    });
};

render() {
    return (
        <div className='container sm:m-5'> 
            <h2 className='text-center my-2'>NEWS - Top {this.props.category} Headlines</h2>
            <InfiniteScroll
                dataLength={this.state.articles.length}
                next={this.fetchMoreData}
                hasMore={this.state.articles.length !== this.state.totalResults}
                loader={<Spinner />}
            >
                <div className='container'>
                <div className='row'>
    {!this.state.loading && this.state.articles.map((e) => { 
        return e.title ? (
            <div className='col-md-4' key={e.url}>
                <NewsItem 
                    title={e.title || "No Title Available"} 
                    description={e.description || "No Description Available"} 
                    imageUrl={e.urlToImage || "https://via.placeholder.com/150"} 
                    newsUrl={e.url} 
                    author={e.author || "Unknown"} 
                    date={e.publishedAt || new Date()} 
                    source={e.source ? e.source.name : "Unknown Source"}
                />
            </div>
        ) : null; 
    })}
</div>

                </div>
            </InfiniteScroll>
        </div>
    );
}
}

export default News