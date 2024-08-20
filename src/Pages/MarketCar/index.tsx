'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import './carrinho.css';

interface ICurso {
  id: number;
  titulo: string;
  preco: number;
  imagem: string;
  categorias: string[]; // Adicionado para associar categorias
}

interface IShoppingItem {
  produto: ICurso;
  quantidade: number;
}

const cursos: ICurso[] = [
  { id: 1, titulo: "Pizza de Calabresa", preco: 60.00, imagem: 'https://www.sabornamesa.com.br/media/k2/items/cache/513d7a0ab11e38f7bd117d760146fed3_XL.jpg', categorias: ["Pizza salgada"] },
  { id: 2, titulo: "Pizza de Portuguesa", preco: 60.00, imagem: 'https://www.receitasnestle.com.br/sites/default/files/styles/recipe_detail_desktop/public/srh_recipes/103eca6a504379a0df6f55155b8d607d.jpg?itok=0iu1IWt6', categorias: ["Pizza salgada"] },
  { id: 3, titulo: "Pizza de Marguerita", preco: 60.00, imagem: 'https://lirp.cdn-website.com/33406c6e/dms3rep/multi/opt/margherita-7d163fb8-640w.jpg', categorias: ["Pizza salgada"] },
  { id: 4, titulo: "Pizza de Frango com Catupiry", preco: 60.00, imagem: 'https://www.receitasnestle.com.br/sites/default/files/srh_recipes/86f7100c92218a97fac8e3bbd18ed787.jpg', categorias: ["Pizza salgada"] },
  { id: 5, titulo: "Pizza de Napolitana", preco: 60.00, imagem: 'https://super.abril.com.br/wp-content/uploads/2017/12/processo-de-confecc3a7c3a3o-da-pizza-napolitana-vira-patrimc3b4nio-da-unesco.png?w=720&h=440&crop=1', categorias: ["Pizza salgada"] },
  { id: 6, titulo: "Pizza de Brigadeiro", preco: 60.00, imagem: 'https://www.mavalerio.com.br/wp-content/uploads/2018/12/160722_pizzas-002-v2-500x340.png', categorias: ["Pizza doce"] },
  { id: 7, titulo: "Pizza de Romeu e Julieta", preco: 60.00, imagem: 'https://receitinhas.com.br/wp-content/uploads/2022/04/Pizza-de-Roemu-e-Julieta-Imagem-por-Pizzatec.jpg', categorias: ["Pizza doce"] },
  { id: 8, titulo: "Pizza de Lombinho", preco: 60.00, imagem: 'https://www.receiteria.com.br/wp-content/uploads/receitas-de-pizza-de-lombo-1-730x449.jpg', categorias: ["Pizza salgada"] },
];

const categorias = ["Todas", "Pizza salgada", "Pizza doce"];

const MarketCarPages = () => {
  const [shoppingCursos, setShoppingCursos] = useState<IShoppingItem[]>([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<string>("Todas");

  const handleAddCurso = (id: number) => {
    const curso = cursos.find((curso) => curso.id === id);
    if (!curso) return;

    const existeShoppingCurso = shoppingCursos.find((item) => item.produto.id === id);

    if (existeShoppingCurso) {
      const newShoppingCursos = shoppingCursos.map(item => {
        if (item.produto.id === id) {
          return { ...item, quantidade: item.quantidade + 1 };
        }
        return item;
      });
      setShoppingCursos(newShoppingCursos);
    } else {
      setShoppingCursos([...shoppingCursos, { produto: curso, quantidade: 1 }]);
    }
  };

  const handleRemoveCurso = (id: number) => {
    setShoppingCursos(shoppingCursos.filter(item => item.produto.id !== id));
  };

  const handleRemoveOneCurso = (id: number) => {
    const updatedShoppingCursos = shoppingCursos
      .map(item => {
        if (item.produto.id === id && item.quantidade > 1) {
          return { ...item, quantidade: item.quantidade - 1 };
        }
        return item;
      })
      .filter(item => item.quantidade > 0);

    setShoppingCursos(updatedShoppingCursos);
  };

  const totalCursos = shoppingCursos.reduce((total, item) => total + item.produto.preco * item.quantidade, 0);

  const cursosFiltrados = categoriaSelecionada === "Todas"
    ? cursos
    : cursos.filter(curso => curso.categorias.includes(categoriaSelecionada));

  return (
    <div className="container">
      <div className="categorias-container">
        <h2>Categorias</h2>
        <ul>
          {categorias.map(categoria => (
            <li
              key={categoria}
              className={categoriaSelecionada === categoria ? 'categoria-item ativo' : 'categoria-item'}
              onClick={() => setCategoriaSelecionada(categoria)}
            >
              {categoria}
            </li>
          ))}
        </ul>
      </div>

      <div className="cursos-container">
        <h1>
          <i className="fas fa-pizza-slice"></i> Belle Pizzaria
        </h1>
        <ul>
          {cursosFiltrados.map(curso => (
            <li key={curso.id} className="curso-item">
              <Image
                src={curso.imagem}
                alt={curso.titulo}
                className="curso-imagem"
                width={500}
                height={340}
                layout="intrinsic"
              />
              <p>{curso.titulo}</p>
              <p>Categorias: {curso.categorias.join(", ")}</p> {/* Mostra as categorias aqui */}
              <p>R${curso.preco.toFixed(2)}</p>
              <button onClick={() => handleAddCurso(curso.id)}>Adicionar</button>
            </li>
          ))}
        </ul>
      </div>

      <div className="carrinho-container">
        <h1>Carrinho de Compras (Total: R${totalCursos.toFixed(2)})</h1>
        <ul>
          {shoppingCursos.map(item => (
            <li key={item.produto.id} className="carrinho-item">
              <Image
                src={item.produto.imagem}
                alt={item.produto.titulo}
                className="carrinho-imagem"
                width={500}
                height={340}
                layout="intrinsic"
              />
              <p>Produto: {item.produto.titulo}</p>
              <p>Quantidade: {item.quantidade}</p>
              <p>Preço: R${item.produto.preco.toFixed(2)}</p>
              <p>Total: R${(item.quantidade * item.produto.preco).toFixed(2)}</p>
              <button onClick={() => handleRemoveOneCurso(item.produto.id)}>Remover 1</button>
              <button onClick={() => handleRemoveCurso(item.produto.id)}>Remover Tudo</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default MarketCarPages;
