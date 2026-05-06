from flask import Flask, request, jsonify
import joblib

app = Flask(__name__)

model = joblib.load("model.pkl")

@app.route("/")
def home():
    return "Student Performance Predictor API is running"

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()

    study_hours = float(data["StudyHours"])
    attendance = float(data["Attendance"])

    prediction = model.predict([[study_hours, attendance]])

    return jsonify({
        "PredictedMarks": round(prediction[0], 2)
    })

if __name__ == "__main__":
    app.run(debug=True)