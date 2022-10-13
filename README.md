## Inspiration
Climate change is a global issue. Higher temperatures over time are changing weather patterns and disrupting the usual balance of nature. This poses many risks to human beings and all other forms of life on Earth. Human activities have been the major driver of climate change since 1800s. Some major impacts of climate change are as follows, 
- Higher temperatures.
- Increased drought.
- A warming, rising ocean.
- Loss of species.
- Not enough food.
- More health risks.
- Poverty and displacement.

In order to tackle the climate change challenge and to combat the above-mentioned impacts of climate change, we developed Climatio. Climatio is a monday.com application which focuses on raising awareness about climate change among teams and individuals. We believe that monday.com, with its 152k customer base, is the perfect platform for us to showcase our application. Individual action can reduce up-to 25% of global carbon emissions according to this [study](https://takethejump.org/latest/jump-launches-research-the-power-of-people). A big problem that hampers the individual action to support the cause is the hesitation and unwillingness of people to contribute. People deem their efforts miniscule as compared to the masses. 

## What it does
Climatio is a climate change awareness application. It uses neuropsychology techniques to encourage people to reduce their individual carbon footprint and to raise more awareness among teams regarding this global issue. Climatio consists of 4 major sections. 

### 1. Carbon footprint calculator
Climatio enables a person to calculate his/her carbon footprint with only a slider! An individual can adjust his/her average annual income and find his/her carbon footprint. The individual can refine his/her carbon footprint estimate by further providing information in the following categories.
- Get Started Tab
    - In this tab, user can see an annual income slider. Our application uses that slider to estimate the carbon foorprint of the user. The assumptions that we make are also visible on this page. If the user wants a more accurate calculation. He/She can provide details in the below mentioned tabs as well.
- Travel
    - In this section, the user can provide the fuel type used by his/her vehicle. He can either selection Diesel, Gasoline or Electric option. On the right, he can type the number of kilometers driven by his car annually. This tab also takes public transit and air travel of the user in kilometers to find the carbon footprint.
- Home
    - In this section, the user can provide electricity used, natural gas, heating oil, other fuels, and living space area. 
- Food
    - In this section, user can provide his/her food consumption details including servings of meat, fish, eggs, grains, baked foods, dairy, snacks, drinks, fruits and vegetables.
- Shopping
    - In this section, user can provide details of how much goods and services he makes use of. 

The individual can view a realtime vertical bar chart of his/her carbon emissions in each category at all times. The chart also shows where a person stands in carbon emissions when compared to the average carbon emissions of people in that annual income range.
**Note**: All above sections are optional and are auto-filled by moving the income slider.

### 2. Eco Points
In our application, there are some daily tasks which everyone can perform. These tasks reduce the carbon footprint of a person. These tasks include switching off lights, carpooling to work, using public transportation and so on. These little tasks when performed daily by a large number of people can greatly impact the amout of carbon dioxide released into the atmosphere. The user is incentivized to perform these simple daily tasks. After a user marks a task as completed, he/she is awarded "eco points". These points encourage an individual to perform more and more tasks.

### 3. Green Board
The users can create a "Green Board" in their workspace which serves as leaderboard in the space. The "Green Board" is automatically created for the user on a simple button click. It is only required to be created once by the any user in a workspace. The user can see his/her carbon footprint, eco points and eco status in the green board. Eco status is determined by the carbon footprint of a person. The board shows these details for all of the users present in a workspace. This collective display of everyone's effort towards the climate change encourages teams and organizations to work more towards this global cause. It creates a sense of healthy competition which can be a great motivator for people to reduce their carbon footprint and increase their eco-points.

### 4. News
The users can read latest news related to climate change in the "News" tab. Reading news and reading the global discussions on climate change will broaden the perspective of the user. He/she will get greater insights into the global situation of climate change. The news is refreshed after every 4 hours in order to show the latest climate change news to the user.

### 5. Work Analyzer
The final section of our application is the "work analyzer". Many a times, users are unware of the consequences of their actions. They unknowingly perform actions which may prove out be harmful for the climate and for the planet. Using our work analyzer, users can find if the work they are assigned has got any positive/negative impact on the climate change. For example, if someone is assigned a task that may cause damage to our environment, will be flagged as negative. A task that is beneficial for climate change will be marked as positive. The tasks which don't impact climate change will be marked as neutral.

## How we built it
We built our dashboard widget and integration using ReactJs, MongoDb, Express and NodeJs. For our machine learning classifier, we fine-tuned a distilled version of Google's Bert transformer model over a twitter climate change dataset. 

## Challenges we ran into
Getting accustomed with monday.com API was tough. We weren't aware of the complexity problems that arise with the use of monday.com GraphQL API. We got to know about it very late. Moreover, we joined late and it was hard to put all of our ideas into the application. Moreover, with the machine learning part, we had trouble deploying huge models.

## Accomplishments that we're proud of
We were able to create something that not only I can use but it it something which has the potential of being used by almost any monday customer. While building this application, we felt like a part of something bigger that is working on this issue. Finally, we are proud to be able to create such a mature app in this limited time.

## What we learned
- We learnt about monday.com API and GraphQL. We hadn't worked with these before.
- We learnt how to deploy ML models, how to create and work with APIs.
- We learnt to create node & python servers.

## What's next for Climatio
There is a roadmap ahead for Climatio. In the short term, we weren't able to completely write production quality code. We believe that we can improve the code quality a lot if given enough time. Our API calls can be more secured and can be made safer. In the long run, we hope to add continuous updates and features. Features like dark mode support, more actions, and some sort of game to increase awareness which we were not able to add due to the limited time and we are hoping to add these in the future. Also, we are open to user feedback and our aim is to improve continuously with time.
