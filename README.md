# California WaterLevels

California WaterLevels is a data visualization project that displays reservoir data on a dynamic graph. Users can select increments of time and specific months to compare changes in water levels. Additionally, users can scroll through the page to control the amount of data they want to view precisely.

## Features

- Visualization of reservoir data on a dynamic graph.
- Selection of increments of time and specific months for data comparison.
- Scroll functionality to control the amount of data displayed.


## How to Use

1. Input the desired increments and month for the data you want to see.
2. Scroll to adjust the amount of data displayed.
3. Explore changes in water levels over time.

## Known Issues

1. **Data Limitation**: The data is hard-set to end at 2022.
2. **Long Query Time**: Querying data from the public accessible API can take some time, resulting in delayed graph display.
3. **Background Graphics**: Background graphics might be removed for better user experience.

## Technologies Used

- React
- JavaScript Intersection Observer for dynamic control
- Publicly accessible API for data retrieval

## Demo

[Link to live demo](https://california-waterlevels.onrender.com/)
