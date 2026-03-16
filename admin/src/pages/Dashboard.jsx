import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logoutAdmin } from "../api/auth";
import { getInquiry } from "../api/products";
import ProductForm from "../components/ProductForm";
import ProductList from "../components/ProductList";
import Sidebar from "../components/SideBar";
import { FaDatabase, FaTrash } from "react-icons/fa";
import { request } from "../utils/axios";
/**
 * API Endpoints Reference:
 * POST    /auth/admin/signup
 * POST    /auth/admin/login
 * GET     /api/products
 * POST    /api/products
 * PUT     /api/products/:id
 * DELETE  /api/products/:id
 */
function Dashboard() {
  const navigate = useNavigate();
  const [inquiry, setInquiry] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const loadInquiry = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getInquiry();
      setInquiry(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInquiry();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this inquiry?")) {
      try {
        setLoading(true);
        await request(`/inquiry/remove/${id}`, {
          method: "DELETE",
          auth: true,
        });
        await loadInquiry();
      } catch (err) {
        setError(err.message);
      }
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
              <h2 className="text-xl font-semibold mb-4">Recent Inquiries</h2>
              {loading ? (
                <p>Loading inquiries...</p>
              ) : inquiry.length === 0 ? (
                <p className="text-gray-500">No inquiries found.</p>
              ) : (
                <div className="space-y-4">
                  {inquiry.map((inq) => (
                    <div key={inq._id} className="border-b pb-4 last:border-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-gray-900">
                            {inq.userName}
                          </p>
                          <p className="text-sm text-gray-500">
                            {inq.email} | {inq.number}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-gray-400">
                            {new Date(inq.createdAt).toLocaleDateString()}
                          </span>
                          <button
                            onClick={() => handleDelete(inq._id)}
                            className="text-red-500 hover:text-red-700 transition-colors"
                          >
                            <FaTrash size={14} />
                          </button>
                        </div>
                      </div>
                      {inq.product && (
                        <div className="mt-2 p-2 bg-gray-50 rounded border border-gray-100 flex items-center gap-3">
                          {inq.product.image && (
                            <img
                              src={inq.product.image}
                              alt={inq.product.name}
                              className="w-12 h-12 object-cover rounded"
                            />
                          )}
                          <div>
                            <p className="text-xs font-semibold text-gray-600 uppercase">
                              Inquiry for Product:
                            </p>
                            <p className="text-sm font-medium text-gray-800">
                              {inq.product.name}
                            </p>
                            <p className="text-xs text-gray-500 line-clamp-1">
                              {inq.product.description}
                            </p>
                          </div>
                        </div>
                      )}
                      <p className="mt-2 text-sm text-gray-700">
                        {inq.message}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
