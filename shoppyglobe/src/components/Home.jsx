import ProductList from "./ProductList"; 

function Home() {
  return (
    <div className="py-8">
      {/* Welcome message */}
      <h1 className="text-5xl aclonica-regular text-center text-[#145374] mb-8">
        Welcome to ShoppyGlobe
      </h1>
      
      {/* To displays all products */}
      <div className="max-w-7xl mx-auto px-4">
        <ProductList />
      </div>
    </div>
  );
}

export default Home;