import workshopImg from "@/assets/workshop.jpg";

const About = () => (
  <main className="pt-20">
    {/* Story */}
    <section className="py-20">
      <div className="container max-w-4xl">
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground text-center mb-8">Our Story</h1>
        <p className="text-muted-foreground text-lg leading-relaxed mb-6 text-center max-w-3xl mx-auto">
          Ankur Handicraft was born from a deep respect for India's centuries-old woodworking traditions. What started as a small family workshop has grown into a celebrated brand known for its exquisite handcrafted furniture and artistic wooden décor.
        </p>
        <p className="text-muted-foreground text-lg leading-relaxed text-center max-w-3xl mx-auto">
          Every creation begins with carefully selected timber and ends with the unmistakable warmth of a handmade piece. Our artisans pour their hearts into each curve, joint, and finish — ensuring that no two pieces are ever identical.
        </p>
      </div>
    </section>

    {/* Craftsmanship */}
    <section className="py-20 bg-card">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-heading text-3xl font-bold text-foreground mb-6">Craftsmanship & Quality</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We use only premium-grade hardwoods — Sheesham, Mango, Teak, and Acacia — sourced responsibly from sustainable plantations. Each piece is hand-carved, hand-sanded, and finished with natural oils and waxes for a lasting lustre.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Our workshop combines traditional hand-tool techniques with modern precision, resulting in furniture that is structurally sound and visually stunning.
            </p>
            <div className="grid grid-cols-3 gap-4 mt-8">
              {["Hand Carved", "Natural Finish", "Sustainably Sourced"].map((item) => (
                <div key={item} className="bg-background rounded-md p-4 text-center shadow-soft">
                  <span className="text-sm font-medium text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-lg overflow-hidden shadow-card">
            <img src={workshopImg} alt="Artisan crafting furniture in workshop" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  </main>
);

export default About;
