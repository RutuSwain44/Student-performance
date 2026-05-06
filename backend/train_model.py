import pandas as pd
from sklearn.linear_model import LinearRegression
import joblib

print("🔄 Loading dataset...")

data = pd.read_csv('../dataset/student_data.csv')

print("✅ Dataset loaded")
print(data.head())

X = data[['StudyHours', 'Attendance']]
y = data['Marks']

model = LinearRegression()
model.fit(X, y)

joblib.dump(model, 'model.pkl')

print("🎯 Model trained and saved successfully!")