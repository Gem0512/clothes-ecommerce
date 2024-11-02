# File: model.py
import torch
import torch.nn.functional as F
from torch_geometric.nn import GCNConv

class RecommenderGNN(torch.nn.Module):
    def __init__(self, input_dim, hidden_dim, output_dim):
        super(RecommenderGNN, self).__init__()
        self.conv1 = GCNConv(input_dim, hidden_dim)
        self.conv2 = GCNConv(hidden_dim, output_dim)

    def forward(self, data):
        x, edge_index = data.x, data.edge_index

        # Lớp 1 của GCN
        x = self.conv1(x, edge_index)
        x = F.relu(x)

        # Lớp 2 của GCN
        x = self.conv2(x, edge_index)
        return x
