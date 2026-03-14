import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface InquiryFormProps {
  productId?: string;
  productName: string;
  onClose: () => void;
}

const BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : "https://ankur-handicraft.onrender.com";

const InquiryForm = ({ productId, productName, onClose }: InquiryFormProps) => {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    number: "",
    message: "",
    productId: productId || "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/inquiry/add`, formData);
      if (response.status === 200 || response.status === 201 || response.data.type === 'success') {
        toast.success("Inquiry sent successfully!");
        setTimeout(() => onClose(), 1000);

        setFormData({
          userName: "",
          email: "",
          number: "",
          message: "",
          productId: productId || "",
        })
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl"
        >
          &times;
        </button>

        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Product Inquiry
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          Inquiring for: <span className="font-medium">{productName}</span>
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="userName"
              required
              value={formData.userName}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone
            </label>
            <input
              type="tel"
              name="number"
              required
              value={formData.number}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Message
            </label>
            <textarea
              name="message"
              rows={4}
              required
              value={formData.message}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            ></textarea>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200 disabled:bg-blue-300"
          >
            {loading ? "Sending..." : "Send Inquiry"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default InquiryForm;
