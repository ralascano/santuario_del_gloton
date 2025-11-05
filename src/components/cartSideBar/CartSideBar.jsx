import styles from "./cart.module.css";

export default function CartSidebar() {
  return (
    <aside className={styles.aside} aria-labelledby="cart-title">
      <div className={styles.panel}>
        <h3 id="cart-title" className={styles.title}>
          Your Order
        </h3>

        <div className={styles.list}>
          <div className={styles.item}>
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBsqdEsAVKZHNGFXSJCn5HuH4VZgGLrz_8G7QpJTHXOLJ4ZjC7YDFBFiEggE-4P2xk8oEienXY6QDyD85bWr-WdxpdlJ0ouOQqmPZZLuLTexFF3eVBg_vD1FQlrUGJXWBr6d495JZ8r56mme0hDglo1-a7J8YMN3t4kG2FoowVFOBPzQCtWMuxrJfagQUizJB4PxtKOTZJKXkGVXOrzt-QS7BMIWfphhRGWTjrfVFh3SFfmnSf3vO7Ef2-6khNxuZ7vMn7FrMKixj8"
              alt="Gazpacho"
              className={styles.thumb}
            />
            <div className={styles.meta}>
              <p className={styles.itemName}>Gazpacho Andaluz</p>
              <p className={styles.itemPrice}>€8.50</p>
            </div>
            <div className={styles.qty}>
              <button className={styles.minus}>-</button>
              <span className={styles.count}>1</span>
              <button className={styles.plus}>+</button>
            </div>
          </div>

          <div className={styles.item}>
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCjqK8oOD8nTQY1zaREnqpRW2rgHY-OeDGtM5ByOauZLq0Kfx2xBaP_aIrTiVmAn2sKfNhVc5k8m1OBJaVcZoJ9ZGB-9vqrJQSuOFTE9Z6gCtkfcxNScBvx-kCy3uWtzvASghPVti2Nxg0GF9XdrUhI4j2wEZsXnEpDKT0Ugm7RbyR9w30_WcarEh8vh8u7TkwQ77VztCQHXbv7uEbiNQRZ74gHlPvn5gSpxuKE1wtvVE-S2jBdNKW0U1RZUbgCTSql4B9c25hx3Gs"
              alt="Paella"
              className={styles.thumb}
            />
            <div className={styles.meta}>
              <p className={styles.itemName}>Paella Valenciana</p>
              <p className={styles.itemPrice}>€18.00</p>
            </div>
            <div className={styles.qty}>
              <button className={styles.minus}>-</button>
              <span className={styles.count}>1</span>
              <button className={styles.plus}>+</button>
            </div>
          </div>
        </div>

        <div className={styles.totals}>
          <div className={styles.row}>
            <span>Subtotal</span>
            <span>€26.50</span>
          </div>
          <div className={styles.row}>
            <span>Tip</span>
            <div className={styles.tips}>
              <button>10%</button>
              <button className={styles.tipActive}>15%</button>
              <button>20%</button>
            </div>
          </div>
          <div className={styles.totalRow}>
            <span>Total</span>
            <span>€30.48</span>
          </div>
        </div>

        <button
          className="btn btn-primary"
          style={{ width: "100%", marginTop: 16, height: 48 }}
        >
          Proceed to Checkout
        </button>
      </div>
    </aside>
  );
}
