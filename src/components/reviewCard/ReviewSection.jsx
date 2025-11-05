import styles from "./reviews.module.css";
import ReviewCard from "./ReviewCard";

export default function ReviewsSection() {
  return (
    <section id="reviews" className={styles.section}>
      <div className="container">
        <h2 className={styles.title}>Lo que dicen nuestros clientes</h2>
        <div className={styles.grid}>
          <ReviewCard
            avatar="https://lh3.googleusercontent.com/aida-public/AB6AXuBo8cC10qgjGdrHoaP7A6yWVN154GpKnh_S41A9poNiwgy1SaqDU7r_3xGncI6f4HaIBSTdhcEGSqqnHH1DMVqG0XoduLUJ-zNroeCAB15cxBPZMhztNjgCEBop7rIjNHVgVtElSEybc847iy6B8aN-kQQyQNCW45WGBs9iwP1mGQnteuSBItis79ap7kxVH28R8tVfSaPMcG6eoVvI9VHWyJmn0gljjBHsqM_75QlEVuyoIEwkEy6lm3WUtT2a6P7Iru0vJAFvDck"
            name="María S."
            stars={5}
            text={`"El encebollado sabe como hecho en casa, con ese toque que solo una mamá sabe dar. Fresco, bien servido y con un sabor que reconforta el alma."`}
          />

          <ReviewCard
            avatar="https://lh3.googleusercontent.com/aida-public/AB6AXuC5O8tYnAFno5gnJ6F95u20L4tYiYsfdrnwiYR0ce_zJtTrU5b9NrJHitoZytWj3H4nmb_mlSi6NOlSzBJBvWwtuJB-wKWm5fFJrAzhqJ-jJSAFfKEBcpTjRqdOwjpZuSh3F8M2xbIddHhlgQkdAxsnP0CPy0BI0-GpG5OlyMAW_HqWtF4GY0XVugXnvWMri3_Z38VecU9JVpqxeGuh1gCrW_Q93mWMjAuPxWIozd6OetSg0EyEcmSURoXtMAH6JU2HEmybDlemdMw"
            name="Juan D."
            stars={4}
            text={`"Pedí el bolón con café pasado... y fue el mejor inicio de día que he tenido en mucho tiempo. Abundante, auténtico y con verdadero sabor ecuatoriano."`}
          />

          <ReviewCard
            avatar="https://lh3.googleusercontent.com/aida-public/AB6AXuDNi-OeVwUaQfQ2XfxOdBBOnJXaY3hcKjZ_XUsFECXXwT_-AJs9-8QgT-PY_BUd1LCwKnXtnAz00bJ7lp33go1gm7bc50jn6xjZWxPyfsUyVJRuoTpSUsli0WY8UjP9ER_hGkYDX_4T9Dw0-V9UY6GD6pgXF7robi-rDHmxYG_096gC0fDYMhndo1kfDEDJYwqaNQMNcYK3oypwRQKKXW81uJSVv_oWmxoiD294soqS9qbtKDKiLiMlW2hhK30bbFV3145m-zptjGw"
            name="Aisha K."
            stars={5}
            text={`"El arroz marinero fue simplemente espectacular. Ingredientes frescos, sabor intenso y servido con elegancia. Se nota el cariño en cada plato."`}
          />
        </div>
      </div>
    </section>
  );
}
