from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient
import json
from collections import defaultdict


app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# MongoDB connection
client = MongoClient('mongodb+srv://dbuser:twMiwPaBHCBgBAuQ@shuats.kcquisr.mongodb.net/dashboard?retryWrites=true&w=majority')
db = client['dashboard']
collection = db['test']

# GET, all data
@app.route('/data', methods=['GET'])
def get_data():
    data = list(collection.find({}, {'_id': 0}).limit(10))  # Fetch data from MongoDB
    return jsonify(data)

# GET, all distinct data by key
@app.route('/list', methods=['GET'])
def get_key_list():
    key = request.args.get('key')
    data = list(collection.distinct(key))  # Fetch data from MongoDB
    return jsonify(data)

# GET, all keys
@app.route('/keys', methods=['GET'])
def get_keys():
    data = list(collection.find_one())  # Fetch data from MongoDB
    return jsonify(data)

# GET, distinct data by key
@app.route('/stats', methods=['GET'])
def get_key_stats():
    key = request.args.get('key')

    # Define all possible values for the "pestle" field
    all_possible_values = list(collection.distinct(key))

    # Use aggregation to count the occurrences of each all_possible_values
    pipeline = [
        {
            "$group": {
                "_id": f"${key}",
                "count": {"$sum": 1}
            }
        }
    ]

    result = collection.aggregate(pipeline)

    # Initialize a dictionary to hold the counts for each possible value
    all_possible_values_counts = defaultdict(int)

    # Populate the dictionary with counts from the aggregation result
    for doc in result:
        all_possible_values_counts[doc['_id']] = doc['count']

    # Ensure all possible values are included in the dictionary with count 0 if not present in the result
    for value in all_possible_values:
        if value not in all_possible_values_counts:
            all_possible_values_counts[value] = 0

    # Convert the counts dictionary to the desired list of dictionaries
    output = [{"name": key, "count": count} for key, count in all_possible_values_counts.items()]

    output_sorted = sorted(output, key=lambda x: x['count'], reverse=True)
    return jsonify(output_sorted)

if __name__ == '__main__':
    app.run(debug=True)
