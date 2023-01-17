import pandas as pd
import numpy as np
import xgboost as xgb
import datetime
import sys

def main():
    #Reading CSV file in and create dataframe to predict
    df = pd.read_csv('E://SCSE Hackfest//Carpark Prediction//to_predict.csv', index_col=[0])
    now = datetime.datetime.now()
    now = pd.Timestamp(now)
    hour = now.hour
    dayofweek = now.dayofweek

    i = -1

    for index, row in df.iterrows():
        i += 1
        if i == 25:
            i = 1
        else:
            pass
        
        newhour = hour + i
        if newhour > 23:
            df.at[index,'hour'] = newhour - 24
        else:
            df.at[index,'hour'] = newhour
            
        df.at[index,'dayofweek'] = dayofweek

    df = edit_features(df)
    
    model = xgb.XGBRegressor()
    model.load_model('E:/SCSE Hackfest/Carpark Prediction/model.json')
    df['prediction'] = model.predict(df)
    
    preds = create_prediction_dictionary(df)
    print(preds)
    return preds

def edit_features(df):
    '''
    Function to edit datatypes to
    input in XGBRegresor Model
    '''
    df['carpark_number'] = df['carpark_number'].astype('category')
    df['car_park_type'] = df['car_park_type'].astype('category')
    df['type_of_parking_system'] = df['type_of_parking_system'].astype('category')
    df['short_term_parking'] = df['short_term_parking'].astype('category')
    df['free_parking'] = df['free_parking'].astype('category')
    df['night_parking'] = df['night_parking'].astype('category')
    df['car_park_basement'] = df['car_park_basement'].astype('category')
    df['carpark_area'] = df['carpark_area'].astype('category')
    df['hour'] = df['hour'].astype('category')
    df['dayofweek'] = df['dayofweek'].astype('category')
    df['quarter'] = df['quarter'].astype('category')
    df['month'] = df['month'].astype('category')
    return df

def create_prediction_dictionary(df):
    '''
    Function to output a dictionary of the 24 hour
    predictions for carpark availability
    '''
    predictions = {
        'HE1' : [],
        'HE3' : [],
        'HE4' : [],
        'W103' : [],
        'W104' : [],
        'W105' : [],
        'T11' : [],
        'T12' : [],
        'T13' : [],
        'J24' : [],
        'J25' : [],
        'J26' : [],
        'SE16' : [],
        'SE17' : [],
        'SE18' : []
    }
    
    for index, row in df.iterrows():
        predictions[row['carpark_number']].append(round(row['prediction']))
        
    return predictions[sys.argv[1]]

main()