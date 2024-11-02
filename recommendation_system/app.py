# File: app.py
from flask import Flask, jsonify, request
import torch
from data import get_graph_data
from model import RecommenderGNN
from torch.nn.functional import cosine_similarity

# Khởi tạo ứng dụng Flask
app = Flask(__name__)

# Tải dữ liệu và mô hình
data = get_graph_data()
model = RecommenderGNN(input_dim=2, hidden_dim=4, output_dim=2)
model.load_state_dict(torch.load("model.pth", weights_only=True))
model.eval()

# Endpoint cho hệ thống gợi ý
@app.route('/recommend', methods=['POST'])
def recommend():
    user_id = request.json['user_id']
    with torch.no_grad():
        # Tạo embeddings cho các nút
        out = model(data)
        user_vector = out[user_id]
        product_embeddings = out[2:]  # Lấy embeddings của các sản phẩm

        # Tính độ tương đồng và chọn sản phẩm gợi ý
        similarities = cosine_similarity(user_vector.unsqueeze(0), product_embeddings)
        recommended_product = torch.argmax(similarities).item()

        return jsonify({
            "user_id": user_id,
            "recommended_product": recommended_product + 1
        })

if __name__ == '__main__':
    app.run(debug=True)
