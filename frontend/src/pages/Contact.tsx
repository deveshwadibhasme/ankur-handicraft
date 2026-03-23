import { FormEvent, useState } from "react";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { MessageCircle, Phone } from "lucide-react";
import { toast } from "react-toastify";
import axios from "axios";

const Contact = () => {
  const [form, setForm] = useState({ userName: "", number: "", message: "" });
  const [loading, setLoading] = useState(false);

  const BASE_URL =
    window.location.hostname === "localhost"
      ? "http://localhost:5000"
      : "server.ankurhandicraft.com";

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/inquiry/add`, form);
      if (response.status === 200 || response.status === 201 || response.data.type === 'success') {
        toast.success("Inquiry sent successfully!");
        setForm({ userName: "", number: "", message: "" });
      } else {
        toast.error(response.data.message || "Failed to send inquiry");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to send inquiry");
    } finally {
      setLoading(false);
    }
  };


  return (
    <main className="pt-20">
      <section className="py-20">
        <div className="container max-w-5xl">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground text-center mb-4">Get In Touch</h1>
          <p className="text-muted-foreground text-center text-lg mb-12 max-w-2xl mx-auto">
            We'd love to hear from you. Reach out via WhatsApp or fill in the form below.
          </p>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 bg-card rounded-lg p-6 shadow-soft hover:shadow-card transition-shadow"
              >
                <div className="bg-whatsapp text-background rounded-full p-3">
                  <MessageCircle size={24} />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-foreground">WhatsApp</h3>
                  <p className="text-muted-foreground text-sm">Chat with us instantly</p>
                </div>
              </a>

              <div className="flex items-center gap-4 bg-card rounded-lg p-6 shadow-soft">
                <div className="bg-primary text-primary-foreground rounded-full p-3">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-foreground">Phone</h3>
                  <p className="text-muted-foreground text-sm">+91 8048201272</p>
                </div>
              </div>

              {/* Map placeholder */}
              <div className="bg-card rounded-lg overflow-hidden shadow-soft aspect-video flex items-center justify-center border border-border">
                <iframe
                  title="Workshop Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1315.2945642158868!2d79.1586483946065!3d21.18362347948605!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd4c7f0b018e72b%3A0xd25729c8f9c228ae!2sAnkur%20Handicrafts!5e0!3m2!1sen!2sin!4v1773048698277!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="bg-card rounded-lg p-8 shadow-soft space-y-5">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Name</label>
                <input
                  type="text"
                  required
                  value={form.userName}
                  onChange={(e) => setForm({ ...form, userName: e.target.value })}
                  className="w-full bg-background border border-input rounded-md px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Phone</label>
                <input
                  type="tel"
                  required
                  value={form.number}
                  onChange={(e) => setForm({ ...form, number: e.target.value })}
                  className="w-full bg-background border border-input rounded-md px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Your phone number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Message</label>
                <textarea
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full bg-background border border-input rounded-md px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                  placeholder="Tell us what you're looking for..."
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-primary-foreground font-medium py-3 rounded-md hover:opacity-90 transition-opacity text-sm disabled:opacity-50"
              >
                {loading ? "Sending..." : "Send"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
