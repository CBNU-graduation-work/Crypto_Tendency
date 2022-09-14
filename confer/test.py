import json
import mpld3
import matplotlib.pyplot as plt

import pyupbit
from fbprophet import Prophet

df = pyupbit.get_ohlcv("KRW-BTC", interval="minute60")
df = df.reset_index()
df['ds'] = df['index']
df['y'] = df['close']
data = df[['ds','y']]

model = Prophet()
model.fit(data)

future = model.make_future_dataframe(periods=24, freq='H')
forecast = model.predict(future)

# fig1 = model.plot(forecast['ds'], forecast['y'])
fig1 = model.plot(forecast)

print(fig1)

# f = plt.figure(figsize=(12,6))
# plt.plot(forecast)

# print(mpld3.fig_to_html(f, figid='THIS_IS_FIGID'))