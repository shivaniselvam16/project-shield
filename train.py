import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
import joblib

# Load correct file
file = "Friday-WorkingHours-Afternoon-PortScan.pcap_ISCX.csv"

df = pd.read_csv(file, low_memory=False)
print(df.columns)

print("Rows loaded:", len(df))

# Clean column names
df.columns = df.columns.str.strip()

# Remove bad values
df.replace([float("inf"), float("-inf")], 0, inplace=True)
df.fillna(0, inplace=True)

# Label conversion (BENIGN = 0, ATTACK = 1)
df["Label"] = df["Label"].apply(lambda x: 0 if str(x).strip() == "BENIGN" else 1)

# Reduce size for 8GB laptop
df = df.sample(n=30000, random_state=42)

# Keep only numeric columns
X = df.drop(columns=["Label"]).select_dtypes(include=["number"])
y = df["Label"]

# Split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Train model
model = RandomForestClassifier(n_estimators=80, n_jobs=-1)
model.fit(X_train, y_train)

# Accuracy
print("Accuracy:", model.score(X_test, y_test))

# Save model
joblib.dump(model, "shield_model.pkl")

print("Model saved successfully")