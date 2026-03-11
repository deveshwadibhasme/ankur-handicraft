import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProduct, getProducts } from "../api/products";
import { FaDatabase } from "react-icons/fa";
import ProductForm from "../components/ProductForm";

function AddProduct() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState("");

  const loadProducts = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleCreate = async (form) => {
    setSaving(true);
    setError("");
    try {
      await createProduct(form);
      await loadProducts();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleUpdate = async (form) => {
    if (!editing?._id) return;
    setSaving(true);
    setError("");
    try {
      await updateProduct(editing._id, form);
      setEditing(null);
      await loadProducts();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex w-full">
      <main className="max-w-6xl mx-auto w-full py-8 px-4 sm:px-6 lg:px-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-400 text-red-700">
            <p className="text-sm">{error}</p>
          </div>
        )}

        <div className="w-full max-w-3xl">
          <section className="w-full">
            <div className="bg-white rounded-lg shadow p-6 sticky top-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Add New Product
              </h2>
              <ProductForm
                mode={"create"}
                initialValue={null}
                loading={saving}
                onSubmit={handleCreate}
              />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default AddProduct;
