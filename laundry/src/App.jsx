import React, { useState } from "react";
import PropTypes from "prop-types";
import "./App.css";

// Formulário para adicionar um novo pedido
function PedidoForm({ onAddPedido }) {
  const [novoPedido, setNovoPedido] = useState({
    cliente: "",
    servico: "",
    status: "pendente",
  });

  const handleSubmit = () => {
    if (novoPedido.cliente && novoPedido.servico) {
      onAddPedido(novoPedido);
      setNovoPedido({ cliente: "", servico: "", status: "pendente" });
    } else {
      alert("Por favor, preencha todos os campos!");
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Nome do Cliente"
        value={novoPedido.cliente}
        onChange={(e) =>
          setNovoPedido({ ...novoPedido, cliente: e.target.value })
        }
      />
      <input
        type="text"
        placeholder="Serviço"
        value={novoPedido.servico}
        onChange={(e) =>
          setNovoPedido({ ...novoPedido, servico: e.target.value })
        }
      />
      <select
        value={novoPedido.status}
        onChange={(e) =>
          setNovoPedido({ ...novoPedido, status: e.target.value })
        }
      >
        <option value="pendente">Pendente</option>
        <option value="em andamento">Em Andamento</option>
        <option value="concluído">Concluído</option>
      </select>
      <button onClick={handleSubmit}>Adicionar Pedido</button>
    </div>
  );
}

PedidoForm.propTypes = {
  onAddPedido: PropTypes.func.isRequired,
};

// Lista de pedidos
function PedidoList({ pedidos, onEditPedido, onDeletePedido }) {
  return (
    <ul>
      {pedidos.map((pedido) => (
        <li key={pedido.id}>
          <div>
            <strong>Cliente:</strong> {pedido.cliente}
            <br />
            <strong>Serviço:</strong> {pedido.servico}
            <br />
            <strong>Status:</strong> {pedido.status}
          </div>
          <div>
            <button onClick={() => onEditPedido(pedido.id, "em andamento")}>
              Em Andamento
            </button>
            <button onClick={() => onEditPedido(pedido.id, "concluído")}>
              Concluído
            </button>
            <button onClick={() => onDeletePedido(pedido.id)}>Excluir</button>
          </div>
        </li>
      ))}
    </ul>
  );
}

PedidoList.propTypes = {
  pedidos: PropTypes.arrayOf(PropTypes.object).isRequired,
  onEditPedido: PropTypes.func.isRequired,
  onDeletePedido: PropTypes.func.isRequired,
};

// Componente principal
function App() {
  const [pedidos, setPedidos] = useState([]);

  const adicionarPedido = (novoPedido) => {
    const novo = {
      id: Date.now(),
      ...novoPedido,
    };
    setPedidos([...pedidos, novo]);
  };

  const editarPedido = (id, status) => {
    const pedidosAtualizados = pedidos.map((pedido) =>
      pedido.id === id ? { ...pedido, status } : pedido
    );
    setPedidos(pedidosAtualizados);
  };

  const excluirPedido = (id) => {
    const pedidosAtualizados = pedidos.filter((pedido) => pedido.id !== id);
    setPedidos(pedidosAtualizados);
  };

  return (
    <div className="container">
      <h1>Gerenciamento de Pedidos de Lavanderia</h1>
      <PedidoForm onAddPedido={adicionarPedido} />
      <h2>Pedidos</h2>
      <PedidoList
        pedidos={pedidos}
        onEditPedido={editarPedido}
        onDeletePedido={excluirPedido}
      />
    </div>
  );
}

export default App;
