import { useState } from 'react';
import './App.css';
import PropTypes from 'prop-types';

const PRODUCTS = [
  { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
  { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
  { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
  { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
  { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
  { category: "Vegetables", price: "$1", stocked: true, name: "Peas" }
]

const productsPropType = PropTypes.shape({
  category: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  stocked: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
})

ProductRow.propTypes = {
  product: PropTypes.object.isRequired
}
ProductCategoryRow.propTypes = {
  category: PropTypes.string.isRequired
}
ProductTable.propTypes = {
  products: PropTypes.arrayOf(productsPropType).isRequired,
  filtertext: PropTypes.string.isRequired,
  inStockOnly: PropTypes.bool.isRequired
}
SearchBar.propTypes = {
  filtertext: PropTypes.string.isRequired,
  inStockOnly: PropTypes.bool.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  onInStockOnlyChange: PropTypes.func.isRequired
}
FilterableProductTable.propTypes = {
  products: PropTypes.arrayOf(productsPropType).isRequired,
};

function FilterableProductTable({ products }) {
  const [filtertext, setFiltertext] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);

  return (
    <div>
      <SearchBar 
        filtertext = {filtertext}
        inStockOnly = {inStockOnly}
        onFilterChange = {setFiltertext}
        onInStockOnlyChange = {setInStockOnly}
      />
      <ProductTable 
        products = {products}
        filtertext = {filtertext}
        inStockOnly = {inStockOnly}
      />
    </div>
  )
}

function ProductTable({ products, filtertext, inStockOnly }) {
  const rows = [];
  let lastCategory = null;

  products.forEach(product => {
    let productNotFound = product.name.toLowerCase().indexOf(filtertext.toLowerCase()) === -1
    if(productNotFound) return;
    if(inStockOnly && !product.stocked) return;

    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow 
          category={product.category}
          key={product.category}
        />
      )
    }
    rows.push(
      <ProductRow 
        product={product}
        key={product.name}
      />
    )
    lastCategory = product.category;
  });
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        { rows }
      </tbody>
    </table>
  );
}

function SearchBar({ filtertext, inStockOnly, onFilterChange, onInStockOnlyChange }) {
  return (
    <form>
      <input type="text" placeholder='Search...' value={filtertext} onChange={(e) => onFilterChange(e.target.value)} />
      <label>
        <input type="checkbox" checked={inStockOnly} onChange={(e) => onInStockOnlyChange(e.target.checked)} />
        {' '}
        Only Show products in stock
      </label>
    </form>
  )
}

function ProductCategoryRow({ category }) {
  return (
    <tr>
      <th colSpan="2">
        { category }
      </th>
    </tr>
  )
}

function ProductRow({ product }) {
  const name = product.stocked ? product.name :
              <span style={{ color: 'red' }}>
                {product.name}
              </span>;
  return (
    <tr>
      <td>{ name }</td>
      <td>{ product.price }</td>
    </tr>
  )
}


function App() {  
  return <FilterableProductTable products={PRODUCTS} />;
}
export default App
