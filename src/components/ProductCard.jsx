import React from "react";
import { Star, Plus, Heart } from "lucide-react";
import { useCart } from "../context/CartContext";

const ProductCard = ({ product, onOpenDetails }) => {
  const { wishlist, toggleWishlist } = useCart();
  const { id, name, brand, price, originalPrice, rating, reviews, image, isNew, discount } = product;
  const isLiked = wishlist.includes(id);

  return (
    <article className="shoe-card" onClick={() => onOpenDetails(product)}>
      
      {discount > 0 && <span className="card-badge">{discount}% OFF</span>}
      {discount === 0 && isNew && <span className="card-badge new">NEW</span>}

      
      <button
        className="card-wishlist"
        onClick={(e) => {
          e.stopPropagation(); 
          toggleWishlist(id);
        }}
        aria-label="Add to wishlist"
      >
        <Heart
          size={18}
          fill={isLiked ? "var(--accent-crimson)" : "none"}
          stroke={isLiked ? "var(--accent-crimson)" : "currentColor"}
        />
      </button>

      
      <div className="card-image-wrapper">
        <img src={image} alt={name} className="card-image" loading="lazy" />
      </div>

      
      <div className="card-info">
        <span className="card-brand">{brand}</span>
        <h3 className="card-name" title={name}>{name}</h3>

        
        <div className="card-rating" style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "6px" }}>
          <span className="rating-pill-green" style={{
            backgroundColor: "#26a541",
            color: "#ffffff",
            padding: "2px 6px",
            borderRadius: "4px",
            fontSize: "0.75rem",
            fontWeight: "800",
            display: "inline-flex",
            alignItems: "center",
            gap: "2px",
            lineHeight: "1"
          }}>
            {rating} <Star size={10} fill="#ffffff" stroke="none" />
          </span>
          <span className="reviews-count" style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>({reviews})</span>
        </div>

        <div className="card-price-row" style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "8px" }}>
          <span className="card-price" style={{ fontWeight: "700", fontSize: "1.1rem", color: "var(--text-primary)" }}>₹{price.toLocaleString('en-IN')}</span>
          {originalPrice > price && (
            <>
              <span className="card-old-price" style={{ textDecoration: "line-through", color: "var(--text-muted)", fontSize: "0.85rem" }}>₹{originalPrice.toLocaleString('en-IN')}</span>
              <span className="card-discount-percent" style={{ color: "#388e3c", fontWeight: "700", fontSize: "0.85rem" }}>{discount}% off</span>
            </>
          )}
        </div>

        <div className="card-footer" style={{ marginTop: "12px", paddingTop: "8px", borderTop: "1px solid var(--card-border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Free Delivery</span>
          {isLiked ? (
            <button
              className="btn-add-cart-text"
              style={{
                backgroundColor: "var(--accent-neon)",
                color: "var(--bg-primary)",
                fontWeight: "800",
                fontSize: "0.8rem",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                padding: "8px 14px",
                borderRadius: "4px",
                transition: "all 0.2s ease",
                display: "inline-flex",
                alignItems: "center",
                cursor: "pointer"
              }}
              onClick={(e) => {
                e.stopPropagation(); 
                onOpenDetails(product);
              }}
            >
              Add to Cart
            </button>
          ) : (
            <button
              className="btn-add-cart"
              aria-label={`Add ${name} to Cart`}
              onClick={(e) => {
                e.stopPropagation(); 
                onOpenDetails(product);
              }}
              style={{
                backgroundColor: "var(--accent-neon)",
                color: "var(--bg-primary)",
                width: "32px",
                height: "32px",
                borderRadius: "4px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Plus size={18} />
            </button>
          )}
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
