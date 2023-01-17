# OnePark
https://youtu.be/kWK1_ctG2x8
OnePark provides all-in-one services: from open fault-reporting to lot availability and maintenance predictions using advanced machine learning, to help residents take responsibility of their estate.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Built using:
- Front-end library: React
- CSS framework: React-bootstrap
- CSS animations library: Animate.css

Data sources: 
- https://data.gov.sg/dataset/hdb-carpark-information
- https://data.gov.sg/dataset/carpark-availability (2018-now)

Machine Learning Model:
- Used XGBoost library for the XGBRegressor, training it on features such as “Area Code”, “Total Lots”, “Carpark Lots”, “Hour of Day”, etc to predict the carpark’s lot availability at a given time

Features:
- View all carpark status (lot availability, facilities)
- Report faults
- View all open faults

In the /OnePark, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

