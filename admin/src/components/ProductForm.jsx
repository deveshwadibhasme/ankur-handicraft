import { useEffect, useState } from "react";

const emptyForm = {
  name: "",
  description: "",
  material: "",
  category: "",
  oldPrice: "",
  price: "",
  dimensions: "",
  imageFile: null,
  isFeatured: false,
};

function ProductForm({
  mode = "create",
  initialValue,
  loading,
  onSubmit,
  onCancel,
}) {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (initialValue) {
      setForm({
        name: initialValue.name || "",
        description: initialValue.description || "",
        material: initialValue.material || "",
        category: initialValue.category || "",
        oldPrice: initialValue.oldPrice || "",
        price: initialValue.price || "",
        dimensions: initialValue.dimensions || "",
        isFeatured: initialValue.isFeatured || false,
        imageFile: null,
      });
      return;
    }
    // setForm(emptyForm);
  }, [initialValue]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await onSubmit(form);
    if (mode === "create") {
      setForm(emptyForm);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Product Name
        </label>
        <input
          type="text"
          placeholder="Enter product name"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          value={form.name}
          onChange={(event) =>
            setForm((prev) => ({ ...prev, name: event.target.value }))
          }
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          placeholder="Enter product description"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          value={form.description}
          onChange={(event) =>
            setForm((prev) => ({ ...prev, description: event.target.value }))
          }
          required
          rows={4}
        />
      </div>

      <div className="flex w-full gap-5">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={form.category}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, category: event.target.value }))
            }
            required
          >
            <option value="" disabled>
              Select a category
            </option>
            <option value="memento-corporate">Memento & Corporate</option>
            <option value="traditional">Traditional</option>
            <option value="religious-art">Religious Art</option>
            <option value="cnc-product">CNC Product</option>
          </select>
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Material Type
          </label>
          <input
            type="text"
            placeholder="e.g. Wood, Brass, Ceramic"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={form.material}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, material: event.target.value }))
            }
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Price
          </label>
          <input
            type="number"
            placeholder="0.00"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={form.price}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, price: event.target.value }))
            }
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            After Discount
          </label>
          <input
            type="number"
            placeholder="0.00"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={form.oldPrice}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, oldPrice: event.target.value }))
            }
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Dimensions
          </label>
          <input
            type="text"
            placeholder="e.g. 10x10x5 cm"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={form.dimensions}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, dimensions: event.target.value }))
            }
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Product Image{" "}
            {mode === "edit" && (
              <span className="text-gray-400 font-normal">
                (Leave empty to keep current)
              </span>
            )}
          </label>
          <input
            type="file"
            accept="image/*"
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer"
            onChange={(event) =>
              setForm((prev) => ({
                ...prev,
                imageFile: event.target.files?.[0] || null,
              }))
            }
          />
        </div>
      </div>

      <div className="flex items-center">
        <input
          id="isFeatured"
          type="checkbox"
          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          checked={form.isFeatured}
          onChange={(event) =>
            setForm((prev) => ({ ...prev, isFeatured: event.target.checked }))
          }
        />
        <label
          htmlFor="isFeatured"
          className="ml-2 block text-sm text-gray-900"
        >
          Mark as Featured Product
        </label>
      </div>

      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition-colors"
        >
          {loading
            ? "Saving..."
            : mode === "create"
            ? "Add Product"
            : "Update Product"}
        </button>

        {mode === "edit" && (
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="flex-1 inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition-colors"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default ProductForm;
