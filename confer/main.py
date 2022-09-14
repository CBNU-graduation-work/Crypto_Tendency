import pyupbit

#BTC 최근 200시간의 데이터 불러옴
df = pyupbit.get_ohlcv("KRW-BTC", interval="minute60")

#시간(ds)와 종가(y)값만 남김
df = df.reset_index()
df['ds'] = df['index']
df['y'] = df['close']
data = df[['ds','y']]

#prophet 불러옴
from fbprophet import Prophet

import matplotlib.pyplot as plt

#학습
model = Prophet()
data['ds'] = data['ds'].dt.tz_localize(None)

model.fit(data)

#24시간 미래 예측
future = model.make_future_dataframe(periods=24, freq='H')
forecast = model.predict(future)

#그래프1
fig1 = model.plot(forecast)

plt.figure(figsize=(12,6))
plt.plot(forecast['ds'],forecast['yhat'],label='forecast')
plt.show()
