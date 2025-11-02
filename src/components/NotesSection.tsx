import { useState, useEffect } from 'react';
import { Plus, Trash2, Copy } from 'lucide-react';

interface AffiliateLink {
  id: string;
  productName: string;
  linkUrl: string;
  category: string;
  commission: string;
}

function NotesSection() {
  const [links, setLinks] = useState<AffiliateLink[]>([]);
  const [formData, setFormData] = useState({
    productName: '',
    linkUrl: '',
    category: 'Fashion',
    commission: ''
  });

  useEffect(() => {
    const saved = localStorage.getItem('affiliate-links');
    if (saved) {
      setLinks(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('affiliate-links', JSON.stringify(links));
  }, [links]);

  const addLink = () => {
    if (!formData.productName.trim() || !formData.linkUrl.trim()) return;

    const link: AffiliateLink = {
      id: Date.now().toString(),
      productName: formData.productName,
      linkUrl: formData.linkUrl,
      category: formData.category,
      commission: formData.commission,
    };

    setLinks([...links, link]);
    setFormData({
      productName: '',
      linkUrl: '',
      category: 'Fashion',
      commission: ''
    });
  };

  const deleteLink = (id: string) => {
    setLinks(links.filter(link => link.id !== id));
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-sm border border-gray-700 p-6">
      <h2 className="text-xl font-semibold text-white mb-4">AFFILIATE LINKS</h2>

      <div className="mb-6 space-y-4">
        <input
          type="text"
          value={formData.productName}
          onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
          placeholder="Product Name"
          className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-700 text-white"
        />

        <input
          type="url"
          value={formData.linkUrl}
          onChange={(e) => setFormData({ ...formData, linkUrl: e.target.value })}
          placeholder="Link URL"
          className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-700 text-white"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="px-4 py-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-700 text-white"
          >
            <option>Fashion</option>
            <option>Watches</option>
            <option>Cars</option>
            <option>Travel</option>
            <option>Tech</option>
            <option>Lifestyle</option>
          </select>

          <input
            type="text"
            value={formData.commission}
            onChange={(e) => setFormData({ ...formData, commission: e.target.value })}
            placeholder="Commission %"
            className="px-4 py-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-700 text-white"
          />
        </div>

        <button
          onClick={addLink}
          className="bg-gradient-to-r from-purple-600 to-amber-500 hover:from-purple-700 hover:to-amber-600 text-white px-6 py-3 rounded-lg transition-colors flex items-center gap-2 text-lg"
        >
          <Plus className="w-5 h-5" />
          Add Affiliate Link
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {links.length === 0 ? (
          <p className="text-gray-400 col-span-full text-center py-8">No affiliate links</p>
        ) : (
          links.map(link => (
            <div
              key={link.id}
              className="p-4 bg-gray-700 border border-gray-600 rounded-lg relative group hover:shadow-md transition-shadow"
            >
              <button
                onClick={() => deleteLink(link.id)}
                className="absolute top-2 right-2 text-red-400 hover:text-red-300 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 className="w-4 h-4" />
              </button>

              <h3 className="font-semibold text-white mb-2">{link.productName}</h3>
              <p className="text-purple-300 text-sm mb-2">{link.category}</p>
              {link.commission && (
                <p className="text-amber-300 text-sm mb-3">{link.commission}% commission</p>
              )}

              <button
                onClick={() => copyToClipboard(link.linkUrl)}
                className="w-full bg-gradient-to-r from-purple-600 to-amber-500 hover:from-purple-700 hover:to-amber-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Copy className="w-4 h-4" />
                Copy Link
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default NotesSection;
