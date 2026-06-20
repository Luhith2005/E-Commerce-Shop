import React, { useState, useEffect, useMemo } from "react";
import { useCart } from "../context/CartContext";
import { fetchProducts } from "../services/api";
import ProductCard from "../components/ProductCard";
import Filters from "../components/Filters";

const Shop = ({ onOpenDetails }) => {
  const {
    selectedBrandFilter,
    setSelectedBrandFilter,
    selectedCategoryFilter,
    setSelectedCategoryFilter,
    selectedGenderFilter,
    setSelectedGenderFilter,
    searchQuery,
    setSearchQuery
  } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBrands, setSelectedBrands] = useState([]);
  
  const [mainCategory, setMainCategory] = useState(() => {
    if (selectedCategoryFilter && selectedCategoryFilter !== "All") {
      const cat = selectedCategoryFilter;
      if (["Mobiles", "Laptops", "Clothing", "Appliances", "Footwear", "Home & Furniture", "Watches", "Grocery", "Earphones", "Toys", "Perfumes"].includes(cat)) {
        return cat;
      }
      if (["Running", "Lifestyle", "Basketball", "Chappals"].includes(cat)) {
        return "Footwear";
      }
      if (["Shirts", "Pants", "Skirts", "Dresses", "Sarees", "Night Dresses"].includes(cat)) {
        return "Clothing";
      }
      if (["Thin & Light", "Business", "Gaming"].includes(cat)) {
        return "Laptops";
      }
      if (["Washing Machines", "AC", "Coolers", "Fans", "TV", "Stoves", "Refrigerator", "Microwave"].includes(cat)) {
        return "Appliances";
      }
      if (["Beds", "Bedsheets", "Tables", "Sofa"].includes(cat)) {
        return "Home & Furniture";
      }
      if (["Smartwatches", "Analog", "Digital"].includes(cat)) {
        return "Watches";
      }
      if (["Staples", "Beverages", "Snacks", "Dairy"].includes(cat)) {
        return "Grocery";
      }
      if (["Wireless Earbuds", "Wireless Neckbands", "Over-Ear Headphones"].includes(cat)) {
        return "Earphones";
      }
      if (["Building Blocks", "Diecast Cars", "Dolls", "Action Games"].includes(cat)) {
        return "Toys";
      }
    }
    return "All";
  });

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedGender, setSelectedGender] = useState("All");
  const [maxPrice, setMaxPrice] = useState(250000);
  const [sortBy, setSortBy] = useState("default");

  useEffect(() => {
    let active = true;
    setLoading(true);
    fetchProducts().then((data) => {
      if (active) {
        setProducts(data);
        setLoading(false);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (selectedBrandFilter && selectedBrandFilter !== "All") {
      setSelectedBrands([selectedBrandFilter]);
      setSelectedBrandFilter("All");
    }
    if (selectedCategoryFilter && selectedCategoryFilter !== "All") {
      const cat = selectedCategoryFilter;
      if (["Mobiles", "Laptops", "Clothing", "Appliances", "Footwear", "Home & Furniture", "Watches", "Grocery", "Earphones", "Toys", "Perfumes"].includes(cat)) {
        setMainCategory(cat);
        setSelectedCategory("All");
      } else {
        if (["Running", "Lifestyle", "Basketball", "Chappals"].includes(cat)) {
          setMainCategory("Footwear");
          setSelectedCategory(cat);
        } else if (["Shirts", "Pants", "Skirts", "Dresses", "Sarees", "Night Dresses"].includes(cat)) {
          setMainCategory("Clothing");
          setSelectedCategory(cat);
        } else if (["Thin & Light", "Business", "Gaming"].includes(cat)) {
          setMainCategory("Laptops");
          setSelectedCategory(cat);
        } else if (["Washing Machines", "AC", "Coolers", "Fans", "TV", "Stoves", "Refrigerator", "Microwave"].includes(cat)) {
          setMainCategory("Appliances");
          setSelectedCategory(cat);
        } else if (["Beds", "Bedsheets", "Tables", "Sofa"].includes(cat)) {
          setMainCategory("Home & Furniture");
          setSelectedCategory(cat);
        } else if (["Smartwatches", "Analog", "Digital"].includes(cat)) {
          setMainCategory("Watches");
          setSelectedCategory(cat);
        } else if (["Staples", "Beverages", "Snacks", "Dairy"].includes(cat)) {
          setMainCategory("Grocery");
          setSelectedCategory(cat);
        } else if (["Wireless Earbuds", "Wireless Neckbands", "Over-Ear Headphones"].includes(cat)) {
          setMainCategory("Earphones");
          setSelectedCategory(cat);
        } else if (["Building Blocks", "Diecast Cars", "Dolls", "Action Games"].includes(cat)) {
          setMainCategory("Toys");
          setSelectedCategory(cat);
        } else if (["Men", "Women", "Unisex"].includes(cat) && mainCategory === "Perfumes") {
          setMainCategory("Perfumes");
          setSelectedCategory(cat);
        }
      }
      setSelectedCategoryFilter("All");
    }
    if (selectedGenderFilter && selectedGenderFilter !== "All") {
      setSelectedGender(selectedGenderFilter);
      setSelectedGenderFilter("All");
    }
  }, [selectedBrandFilter, setSelectedBrandFilter, selectedCategoryFilter, setSelectedCategoryFilter, selectedGenderFilter, setSelectedGenderFilter]);

  
  useEffect(() => {
    if (mainCategory === "All") {
      setMaxPrice(250000);
    } else if (mainCategory === "Mobiles") {
      setMaxPrice(150000);
    } else if (mainCategory === "Laptops") {
      setMaxPrice(250000);
    } else if (mainCategory === "Appliances") {
      setMaxPrice(150000);
    } else if (mainCategory === "Home & Furniture") {
      setMaxPrice(50000);
    } else if (mainCategory === "Footwear") {
      setMaxPrice(20000);
    } else if (mainCategory === "Clothing") {
      setMaxPrice(5000);
    } else if (mainCategory === "Watches") {
      setMaxPrice(100000);
    } else if (mainCategory === "Grocery") {
      setMaxPrice(2000);
    } else if (mainCategory === "Earphones") {
      setMaxPrice(50000);
    } else if (mainCategory === "Toys") {
      setMaxPrice(10000);
    } else if (mainCategory === "Perfumes") {
      setMaxPrice(20000);
    }
    setSelectedCategory("All");
    setSelectedBrands([]);
  }, [mainCategory]);

  const filteredProducts = useMemo(() => {
    return products
      .filter((prod) => {
        const matchesSearch =
          prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          prod.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
          prod.category.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesBrand =
          selectedBrands.length === 0 || selectedBrands.includes(prod.brand);

        
        let matchesMainCategory = true;
        if (mainCategory !== "All") {
          matchesMainCategory = prod.category === mainCategory;
        }

        
        let matchesSubcategory = true;
        if (selectedCategory !== "All") {
          matchesSubcategory = prod.type === selectedCategory;
        }

        
        let matchesGender = true;
        if (selectedGender !== "All") {
          if (prod.gender) {
            if (selectedGender === "Unisex") {
              matchesGender = prod.gender === "Unisex";
            } else {
              matchesGender = prod.gender === selectedGender || prod.gender === "Unisex";
            }
          }
        }

        const matchesPrice = prod.price <= maxPrice;

        return matchesSearch && matchesBrand && matchesMainCategory && matchesSubcategory && matchesGender && matchesPrice;
      })
      .sort((a, b) => {
        if (sortBy === "price-asc") return a.price - b.price;
        if (sortBy === "price-desc") return b.price - a.price;
        if (sortBy === "rating") return b.rating - a.rating;
        if (sortBy === "discount") return b.discount - a.discount;
        return 0;
      });
  }, [searchQuery, selectedBrands, mainCategory, selectedCategory, selectedGender, maxPrice, sortBy]);

  const handleClearAllFilters = () => {
    setSearchQuery("");
    setSelectedBrands([]);
    setMainCategory("All");
    setSelectedCategory("All");
    setSelectedGender("All");
    setMaxPrice(150000);
    setSortBy("default");
  };

  return (
    <div className="container section">
      <div style={{ marginBottom: "20px" }}>
        <h1 style={{ fontSize: "2.5rem", fontWeight: 800 }}>
          Shop <span style={{ color: "var(--accent-neon)" }}>Collection</span>
        </h1>
        <p style={{ color: "var(--text-muted)", marginTop: "4px" }}>
          Browse our premium catalog and filter by your preference
        </p>
      </div>

      {}
      <div 
        className="main-category-tabs" 
        style={{ 
          display: "flex", 
          gap: "12px", 
          marginBottom: "24px",
          borderBottom: "1px solid var(--card-border)",
          paddingBottom: "16px",
          flexWrap: "wrap"
        }}
      >
        {[
          {
            id: "All",
            label: "All Items",
            icon: (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
              </svg>
            )
          },
          {
            id: "Mobiles",
            label: "Mobiles",
            icon: (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                <line x1="12" y1="18" x2="12.01" y2="18" />
              </svg>
            )
          },
          {
            id: "Laptops",
            label: "Laptops",
            icon: (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                <line x1="2" y1="20" x2="22" y2="20" />
                <line x1="12" y1="20" x2="12.01" y2="20" />
              </svg>
            )
          },
          {
            id: "Clothing",
            label: "Clothing",
            icon: (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l1.08 5.4a2 2 0 0 0 1.97 1.61H7v8a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-8h1.67a2 2 0 0 0 1.97-1.61l1.08-5.4a2 2 0 0 0-1.34-2.23z" />
              </svg>
            )
          },
          {
            id: "Appliances",
            label: "Appliances",
            icon: (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="2" />
                <line x1="2" y1="10" x2="22" y2="10" />
                <circle cx="12" cy="16" r="2" />
              </svg>
            )
          },
          {
            id: "Home & Furniture",
            label: "Home & Furniture",
            icon: (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            )
          },
          {
            id: "Footwear",
            label: "Footwear",
            icon: (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 17h11.5a3.5 3.5 0 0 0 3.3-2.3l1.9-5.1A1.5 1.5 0 0 0 18.3 8H12V5.5A1.5 1.5 0 0 0 10.5 4h-1A1.5 1.5 0 0 0 8 5.5V8H4.5A1.5 1.5 0 0 0 3 9.5v7.5z" />
                <path d="M7 17a2 2 0 1 1-4 0m14 0a2 2 0 1 1-4 0" />
              </svg>
            )
          },
          {
            id: "Watches",
            label: "Watches",
            icon: (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="6" />
                <polyline points="12 10 12 12 13 13" />
                <path d="m16.13 5.66-.46-2.92a2 2 0 0 0-1.96-1.69H10.3a2 2 0 0 0-1.96 1.7l-.46 2.92M8.13 18.23l.46 2.92a2 2 0 0 0 1.96 1.69h3.4a2 2 0 0 0 1.96-1.7l.46-2.92" />
              </svg>
            )
          },
          {
            id: "Grocery",
            label: "Grocery",
            icon: (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
            )
          },
          {
            id: "Earphones",
            label: "Earphones",
            icon: (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 18v-6a9 9 0 0 1 18 0v6"/>
                <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/>
              </svg>
            )
          },
          {
            id: "Toys",
            label: "Toys",
            icon: (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                <circle cx="9" cy="9" r="2"/>
                <circle cx="15" cy="15" r="2"/>
              </svg>
            )
          },
          {
            id: "Perfumes",
            label: "Perfumes",
            icon: (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 18h12a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2z" />
                <path d="M9 6V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3" />
                <path d="M12 10v4" />
                <path d="M10 12h4" />
              </svg>
            )
          }
        ].map((tab) => {
          const isActive = mainCategory === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setMainCategory(tab.id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "12px 24px",
                borderRadius: "30px",
                fontSize: "0.95rem",
                fontWeight: "700",
                backgroundColor: isActive ? "var(--accent-neon)" : "rgba(255, 255, 255, 0.03)",
                color: isActive ? "var(--bg-primary)" : "var(--text-muted)",
                border: "1px solid",
                borderColor: isActive ? "var(--accent-neon)" : "var(--card-border)",
                transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                boxShadow: isActive ? "0 4px 15px var(--accent-neon-glow)" : "none",
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.borderColor = "var(--accent-neon)";
                  e.currentTarget.style.color = "var(--text-primary)";
                  e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.06)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.borderColor = "var(--card-border)";
                  e.currentTarget.style.color = "var(--text-muted)";
                  e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.03)";
                }
              }}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      <div className="shop-layout">
        <Filters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedBrands={selectedBrands}
          setSelectedBrands={setSelectedBrands}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedGender={selectedGender}
          setSelectedGender={setSelectedGender}
          mainCategory={mainCategory}
          setMainCategory={setMainCategory}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          onClear={handleClearAllFilters}
        />

        <div className="shop-products-section">
          <div className="shop-controls">
            <span className="results-count">
              Showing {filteredProducts.length} of {products.length} Results
            </span>

            <div className="sort-wrapper">
              <label htmlFor="sort-select" className="sort-label">Sort by</label>
              <select
                id="sort-select"
                className="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="default">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Customer Rating</option>
                <option value="discount">Biggest Discount</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="product-skeleton-grid">
              {Array.from({ length: 6 }).map((_, idx) => (
                <div key={idx} className="product-skeleton-card">
                  <div className="skeleton-image"></div>
                  <div className="skeleton-brand"></div>
                  <div className="skeleton-title"></div>
                  <div className="skeleton-row">
                    <div className="skeleton-price"></div>
                    <div className="skeleton-button"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="product-grid">
              {filteredProducts.map((prod) => (
                <ProductCard key={prod.id} product={prod} onOpenDetails={onOpenDetails} />
              ))}
            </div>
          ) : (
            <div className="empty-shop-state">
              <h3>No items matched your criteria</h3>
              <p>Try clearing your active filters or adjusting the search term.</p>
              <button className="btn-primary" onClick={handleClearAllFilters}>
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
