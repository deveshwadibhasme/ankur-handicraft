import { useEffect, useState } from "react";
import {
  deleteProduct,
  getProducts,
  setFeatured,
  updateProduct,
} from "../api/products";
import ProductForm from "./ProductForm";
import { FaStar } from "react-icons/fa";

function ProductList({}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState("");
  const [editing, setEditing] = useState("");
  const [isEditing, setIsEditing] = useState("");
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

  const onEdit = (product) => {
    setEditing(product);
    setIsEditing(!isEditing);
  };

  const handleUpdate = async (form) => {
    if (!editing?._id) return;
    // setSaving(true);
    // setError("");
    try {
      await updateProduct(editing._id, form);
      setEditing(null);
      setIsEditing(false);
      await loadProducts();
    } catch (err) {
      // setError(err.message);
    } finally {
      // setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    // setDeletingId(id);
    try {
      await deleteProduct(id);
      await loadProducts();
    } catch (err) {
      // setError(err.message);
      console.log(err.message);
    } finally {
      // setDeletingId("");
    }
  };

  const setFeature = async (id, value) => {
    // setDeletingId(id);

    try {
      await setFeatured(id, value);
      await loadProducts();
    } catch (err) {
      // setError(err.message);
      console.log(err.message);
    } finally {
      // setDeletingId("");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        <span className="ml-3 text-gray-600">Loading products...</span>
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="text-center py-12 mx-auto w-full bg-white rounded-lg border-2 border-dashed border-gray-300">
        <p className="text-gray-500">
          No products found. Add your first product to get started!
        </p>
      </div>
    );
  }

  return (
    <div className="ml-2 grid grid-cols-1 lg:grid-cols-2 max-h-130 w-full overflow-y-auto h-full gap-3 p-4">
      {products?.map((product) => (
        <article
          key={product._id}
          className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow flex flex-col sm:flex-row"
        >
          {product.image && (
            <div className="sm:w-40 h-30 sm:h-auto shrink-0">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain"
              />
            </div>
          )}

          <div className="p-5 flex-1 flex flex-col justify-between relative">
            <button
              onClick={() => setFeature(product._id, !product.isFeatured)}
              className="absolute right-5 top-5"
            >
              <FaStar size={25} color={product.isFeatured ? "orange" : "red"} />
            </button>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">
                {product.name}
              </h3>
              <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                {product.description}
              </p>
            </div>

            <div className="flex items-center gap-3 mt-auto">
              <button
                type="button"
                onClick={() => onEdit(product)}
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => handleDelete(product._id)}
                disabled={deletingId === product._id}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 transition-colors"
              >
                {deletingId === product._id ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </article>
      ))}

      {isEditing && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800">Edit Product</h2>
              <button
                onClick={() => setIsEditing(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="p-6">
              <ProductForm
                mode="edit"
                initialValue={editing}
                // loading={saving}
                onSubmit={handleUpdate}
                onCancel={() => setEditing(null)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default ProductList;
