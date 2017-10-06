# Multi-List Random String Generator

This app allows a user to create, delete and edit multiple lists, then assemble a string of random items from each list activated.

To preview this app from your device now, simply download the Expo Client app ([ios](https://itunes.apple.com/us/app/expo-client/id982107779?mt=8) or [android](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en)) on your phone, and either enter this URL into the app, or open this url from you computer and scan the QR code from the expo app:
[https://expo.io/@sgale/multi-list-random-string-generator](https://expo.io/@sgale/multi-list-random-string-generator)

###### Screenshots from the app
<img alt="List management page" src="https://github.com/deseretdigital/classifieds-ThaminAxe/blob/master/GGRNB-2017/Sam%20Gale/randomizer-app/Screenshots/Screen%20Shot%202017-10-06%20at%202.01.07%20PM.png?raw=true" height=350 > <img alt="List editor open" src="https://github.com/deseretdigital/classifieds-ThaminAxe/blob/master/GGRNB-2017/Sam%20Gale/randomizer-app/Screenshots/Screen%20Shot%202017-10-06%20at%202.01.50%20PM.png?raw=true" height=350 > <img alt="Add list form" src="https://github.com/deseretdigital/classifieds-ThaminAxe/blob/master/GGRNB-2017/Sam%20Gale/randomizer-app/Screenshots/Screen%20Shot%202017-10-06%20at%202.02.24%20PM.png?raw=true" height=350 > <img alt="Random string generator page" src="https://github.com/deseretdigital/classifieds-ThaminAxe/blob/master/GGRNB-2017/Sam%20Gale/randomizer-app/Screenshots/Screen%20Shot%202017-10-06%20at%202.02.56%20PM.png?raw=true" height=350 >

<br>

## Setup
These instructions should help you start, preview and publish this app
1. Clone this repo
2. Using the [Expo XDE](https://expo.io/tools), select `Open existing project...`, select the directory the project was cloned to, and press open
3. From here you should be able to start and preview the app
4. [Click here](https://docs.expo.io/versions/latest/index.html) for additional instructions on using Expo
5. [Click here](https://docs.expo.io/versions/latest/guides/publishing.html) for instructions on how to package and publish an app from Expo

<br>

## Possible future updates

- Allow users to change the order of the lists
- Allow users to change the order of items within lists
- Let users select and modify an individual item (currently just create and delete functions)
- Allow users to create a template to place the randomly generated words into. Possible format for twister template: `Place your {{limbLists}} on the {{colorLists}} circle`
- Let users save a list to a remote repository
- Let users create an account
- Build an exchange allowing users to share and search for lists (eg. Salt Lake Restaurants)

<br>

## Lessons Learned

### Keep the state simple and shallow as possible

One challenge I ran into was structuring the state of my app to avoid deeply nesting data. I found as the depth of my data increased, writing reducers to transform my state became increasingly difficult.

In my current state tree (figure A), to even just find a particular list item, I had to map over my lists array to find the correct list, then map over the array of list items within that list until I found the correct item. If I wanted to then update that list item, in order to adhere to immutable requires I had to then use multiple object assignments several layers deep.

*The lesson here is* I would have greatly benefited from either using a library like [immutability-helper](https://github.com/kolodny/immutability-helper), to simpify the immutable update patterns, or taking the time to normalize my state.

###### figure A (current app state) 
```
Store 
|
|-- lists: array<listObjects>
|     |
|     |-- name*: string
|     |-- selected: boolean
|     |-- items: array<itemObjects>
|           |
|           |- itemKey*: string
|           |- text: string
|
|-- strings: array<stringObjects>
      |
      |-- stringKey*: string
      |-- text: string
      

* = unique
```

### If you expect to share data accross multiple views, use as state management library from the start

I originally built my app with the entire state on the root component, passed down as props to each view. While this *worked*, it became apparent that I would really benefit from using a state management library. 

I chose to use Redux due to the large community, resources, and for the opportunity to become more familiar with it.

While my setup with Redux wasn't terribly complicated, it was a beast of a job identifying and updating each place the state was being used, and rewriting methods to use to the new state container. I believe it would have been much easier to have used Redux from the get-go.

### Expo really simplified things!

I really enjoyed using [Expo](https://expo.io/) to write my app! Expo provides a base template to start building your React Native app on top of, hot reloading within the similutor, access to native functionality through a large number of prebuilt components, and more! However you still have access to a lot of the nuts and bolts of your app if you want it.

###### Screenshot of Expo's XDE
<img alt="Expo takes a lot of the configuration and set up time away" src="https://github.com/deseretdigital/classifieds-ThaminAxe/blob/master/GGRNB-2017/Sam%20Gale/randomizer-app/Screenshots/Screen%20Shot%202017-10-06%20at%201.57.51%20PM.png?raw=true" height=400 >

To boot up my app with Expo, all I have to do it open the Expo XDE, and choose my project. To open it in the iOS simular, or on my Android phone, I just click the **Device** button and choose where I want the app. Every time I save a file, expo will make sure my preview is automatically updated with the changes. It also provides a great console to view logs both from the apps runtime and build processes.

### Default functionality can sometimes be a little wonky, but can ussually be changed

When I first built the form for adding a new list item, it drove me crazy when the first click I made after editing an input field would only dimiss the keyboard, not complete the action I thought it would. It was only after the keyboard was dimissed that I could then click other inputs and buttons. By adding these properties to the scroll view wrapping my form `keyboardDismissMode='on-drag' keyboardShouldPersistTaps={'handled'}` it changed the functionality so that my first click would perform the action I expected it to.


### end
