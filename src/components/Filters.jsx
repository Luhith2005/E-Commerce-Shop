import React, { useEffect } from "react";
import { Search } from "lucide-react";
import { brands as allBrands } from "../data/data";
import { MenIcon, WomenIcon } from "./GenderIcons";

const categoryBrands = {
  All: allBrands,
  Mobiles: ["Apple", "Samsung", "OnePlus", "Xiaomi", "Google", "Nothing"],
  Laptops: ["Apple", "Dell", "HP", "Lenovo", "ASUS"],
  Clothing: ["U.S. Polo Assn.", "Levi's", "Roadster", "H&M", "Zara", "Saara", "Divastri"],
  Appliances: ["LG", "Voltas", "Symphony", "Bajaj", "Sony", "Prestige", "Whirlpool", "Orient", "Crompton", "Philips", "Usha", "Daikin", "Havells", "Bosch", "IFB", "Lloyd", "Atomberg"],
  Footwear: ["Nike", "Adidas", "Puma", "Jordan", "Reebok", "Under Armour", "Converse", "Vans", "New Balance", "Asics", "Fila", "Skechers"],
  "Home & Furniture": ["Sleepwell", "Urban Ladder", "Bombay Dyeing", "Spaces", "IKEA"],
  Watches: ["Apple", "Samsung", "Fossil", "Casio", "Titan", "Noise"],
  Grocery: ["Tata", "Fortune", "Nestle", "Amul", "Cadbury", "Bru"],
  Earphones: ["Apple", "Sony", "OnePlus", "boAt", "JBL"],
  Toys: ["LEGO", "Hot Wheels", "Barbie", "Nerf", "Funko"],
  Perfumes: ["Chanel", "Dior", "Versace", "Gucci", "Fogg"]
};

const categorySubcategories = {
  All: [],
  Mobiles: ["All", "Smartphones"],
  Laptops: ["All", "Thin & Light", "Business", "Gaming"],
  Clothing: ["All", "Shirts", "Pants", "Skirts", "Dresses", "Sarees", "Night Dresses"],
  Appliances: ["All", "Washing Machines", "AC", "Coolers", "Fans", "TV", "Stoves", "Refrigerator", "Microwave"],
  Footwear: ["All", "Running", "Lifestyle", "Basketball", "Chappals"],
  "Home & Furniture": ["All", "Beds", "Bedsheets", "Tables", "Sofa"],
  Watches: ["All", "Smartwatches", "Analog", "Digital"],
  Grocery: ["All", "Staples", "Beverages", "Snacks", "Dairy"],
  Earphones: ["All", "Wireless Earbuds", "Wireless Neckbands", "Over-Ear Headphones"],
  Toys: ["All", "Building Blocks", "Diecast Cars", "Dolls", "Action Games"],
  Perfumes: ["All", "Men", "Women", "Unisex"]
};

const priceRanges = {
  All: { min: 500, max: 250000, step: 1000 },
  Mobiles: { min: 10000, max: 150000, step: 5000 },
  Laptops: { min: 20000, max: 250000, step: 5000 },
  Clothing: { min: 500, max: 5000, step: 100 },
  Appliances: { min: 1000, max: 150000, step: 1000 },
  "Home & Furniture": { min: 500, max: 50000, step: 500 },
  Footwear: { min: 1000, max: 20000, step: 500 },
  Watches: { min: 1000, max: 100000, step: 1000 },
  Grocery: { min: 50, max: 2000, step: 50 },
  Earphones: { min: 500, max: 50000, step: 500 },
  Toys: { min: 200, max: 10000, step: 100 },
  Perfumes: { min: 200, max: 20000, step: 200 }
};

const Filters = ({
  searchQuery,
  setSearchQuery,
  selectedBrands,
  setSelectedBrands,
  selectedCategory,
  setSelectedCategory,
  selectedGender,
  setSelectedGender,
  mainCategory,
  setMainCategory,
  maxPrice,
  setMaxPrice,
  onClear,
}) => {
  const activeBrands = categoryBrands[mainCategory] || allBrands;
  const activeSubcats = categorySubcategories[mainCategory] || [];
  const range = priceRanges[mainCategory] || priceRanges.All;

  
  useEffect(() => {
    if (maxPrice > range.max) {
      setMaxPrice(range.max);
    } else if (maxPrice < range.min) {
      setMaxPrice(range.min);
    }
  }, [mainCategory]);

  const handleBrandChange = (brand) => {
    setSelectedBrands((prev) => {
      if (prev.includes(brand)) {
        return prev.filter((b) => b !== brand);
      } else {
        return [...prev, brand];
      }
    });
  };

  const showGender = mainCategory === "All" || mainCategory === "Clothing" || mainCategory === "Footwear";

  return (
    <aside className="filters-sidebar">
      
      <div className="filter-header">
        <h3 className="filter-title">Filters</h3>
        <button className="btn-clear-filters" onClick={onClear}>
          Clear All
        </button>
      </div>

      
      <div className="filter-group">
        <h4 className="filter-group-title">Search</h4>
        <div className="search-input-wrapper">
          <Search size={18} className="search-icon-inside" />
          <input
            type="text"
            className="search-input"
            placeholder={`Search in ${mainCategory === "All" ? "E-Cart" : mainCategory}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      
      <div className="filter-group">
        <h4 className="filter-group-title">Brands</h4>
        <div className="brand-list">
          {activeBrands.map((brand) => (
            <label key={brand} className="filter-label">
              <input
                type="checkbox"
                className="filter-checkbox"
                checked={selectedBrands.includes(brand)}
                onChange={() => handleBrandChange(brand)}
              />
              <span>{brand}</span>
            </label>
          ))}
        </div>
      </div>

      
      {activeSubcats.length > 0 && (
        <div className="filter-group">
          <h4 className="filter-group-title">Subcategory</h4>
          <div className="category-list">
            {activeSubcats.map((subcat) => (
              <label key={subcat} className="filter-label">
                <input
                  type="radio"
                  name="subcategory-group"
                  className="filter-checkbox"
                  style={{ borderRadius: "50%" }}
                  checked={selectedCategory === subcat}
                  onChange={() => setSelectedCategory(subcat)}
                />
                <span>{subcat === "All" ? `All ${mainCategory}` : subcat}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      
      {showGender && (
        <div className="filter-group">
          <h4 className="filter-group-title">Gender / Age Group</h4>
          <div className="category-list">
            {["All", "Men", "Women", "Boys", "Girls", "Unisex"].map((gender) => (
              <label key={gender} className="filter-label">
                <input
                  type="radio"
                  name="gender-group"
                  className="filter-checkbox"
                  style={{ borderRadius: "50%" }}
                  checked={selectedGender === gender}
                  onChange={() => setSelectedGender(gender)}
                />
                <span style={{ display: "inline-flex", alignItems: "center" }}>
                  {gender === "Men" && <MenIcon size={16} style={{ marginRight: "4px" }} />}
                  {gender === "Women" && <WomenIcon size={16} style={{ marginRight: "4px" }} />}
                  {gender === "All" ? "All" : `${gender}`}
                </span>
              </label>
            ))}
          </div>
        </div>
      )}

      
      <div className="filter-group">
        <h4 className="filter-group-title">Max Price</h4>
        <div className="price-slider-wrapper">
          <input
            type="range"
            min={range.min}
            max={range.max}
            step={range.step}
            className="price-range-slider"
            value={maxPrice > range.max ? range.max : maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          />
          <div className="price-values">
            <span>₹{range.min.toLocaleString('en-IN')}</span>
            <span style={{ color: "var(--accent-neon)" }}>₹{maxPrice.toLocaleString('en-IN')}</span>
            <span>₹{range.max.toLocaleString('en-IN')}</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Filters;
