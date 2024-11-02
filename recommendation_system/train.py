# File: train.py
import torch
from data import get_graph_data
from model import RecommenderGNN

# Khởi tạo dữ liệu và mô hình
data = get_graph_data()
model = RecommenderGNN(input_dim=2, hidden_dim=4, output_dim=2)
optimizer = torch.optim.Adam(model.parameters(), lr=0.01)

# Huấn luyện mô hình
model.train()
for epoch in range(100):
    optimizer.zero_grad()
    out = model(data)
    loss = torch.nn.functional.mse_loss(out[data.edge_index[0]], out[data.edge_index[1]])
    loss.backward()
    optimizer.step()

    if epoch % 10 == 0:
        print(f'Epoch {epoch}, Loss: {loss.item()}')

# Lưu model đã huấn luyện
torch.save(model.state_dict(), "model.pth")
