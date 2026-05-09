from flask import Flask, request, jsonify
import joblib
import pandas as pd

app = Flask(__name__)

model = joblib.load("shield_model.pkl")

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.json

        # create empty feature frame with correct columns
        df = pd.DataFrame([data])

        # fill missing columns with 0 (IMPORTANT FIX)
        for col in model.feature_names_in_:
            if col not in df.columns:
                df[col] = 0

        df = df[model.feature_names_in_]

        prediction = model.predict(df)[0]

        return jsonify({
            "prediction": int(prediction),
            "status": "attack" if prediction == 1 else "normal"
        })

    except Exception as e:
        return jsonify({"error": str(e)})
print("Script started...")

if __name__ == "__main__":
    print("Inside main block...")
    app.run(port=8000, debug=True)