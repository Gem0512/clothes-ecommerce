# File: data.py
import torch
from torch_geometric.data import Data

def get_graph_data():
    # Tạo dữ liệu cho các nút (node features)
    node_features = torch.tensor([
        [0, 25],  # User 1: tuổi 25
        [0, 30],  # User 2: tuổi 30
        [1, 100], # Product 1: giá 100
        [1, 200]  # Product 2: giá 200
    ], dtype=torch.float)

    # Tạo dữ liệu cạnh (edges) - các mối quan hệ giữa user và product
    edge_index = torch.tensor([
        [0, 1, 0, 1],  # Nút nguồn
        [2, 3, 3, 2]   # Nút đích
    ], dtype=torch.long)

    # Các thuộc tính cạnh (ví dụ loại tương tác: 1 = view, 2 = purchase)
    edge_attributes = torch.tensor([
        [1], [2], [1], [2]
    ], dtype=torch.float)

    # Tạo đối tượng đồ thị
    data = Data(x=node_features, edge_index=edge_index, edge_attr=edge_attributes)
    return data
