import ProductItem from './ProductItem';
import classes from './Products.module.css';
const DUMMY_PRODUCT = [
  {
    id: 'a1',
    title: 'My first prduct',
    description: 'My first product description',
    price: 6
  },
  {
    id: 'a2',
    title: 'My second prduct',
    description: 'My second product description',
    price: 10
  },
  
]

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_PRODUCT.map(item => 
        <ProductItem
          key = {item.id}
          id = {item.id}
          title= {item.title}
          price= {item.price}
          description={item.description}
        />)}
        
      </ul>
    </section>
  );
};

export default Products;
