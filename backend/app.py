from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

tasks = []

@app.route("/")
def home():
    return "Task Manager Backend Running"
@app.route("/tasks", methods=["GET"])
def get_tasks():
    return jsonify(tasks)

@app.route("/tasks", methods=["POST"])
def add_task():
    data = request.json

    task = {
        "id": len(tasks) + 1,
        "taskName": data["taskName"],
        "status": data["status"],
        "date": data["date"]
    }

    tasks.append(task)

    return jsonify({
        "message": "Task added successfully",
        "task": task
    })


@app.route("/tasks/<int:index>", methods=["DELETE"])
def delete_task(index):

    if 0 <= index < len(tasks):
        tasks.pop(index)

        return jsonify({
            "message": "Task deleted successfully"
        })

    return jsonify({
        "error": "Invalid task index"
    })
if __name__ == "__main__":
    app.run(debug=True)