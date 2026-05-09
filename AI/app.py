import pandas as pd
from sklearn.ensemble import IsolationForest

# sample security data
data = {
    "requests_per_min": [10, 15, 12, 14, 300, 11, 13, 250],
    "failed_logins":   [0, 1, 0, 1, 20, 0, 1, 15]
}

df = pd.DataFrame(data)

# train model
model = IsolationForest(contamination=0.25, random_state=42)
df["prediction"] = model.fit_predict(df)

# convert results
df["status"] = df["prediction"].apply(
    lambda x: "Suspicious" if x == -1 else "Normal"
)

print(df)