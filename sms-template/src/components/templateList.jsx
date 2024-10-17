import { Link } from "react-router-dom";

function TemplateList() {
  // Burada API'den şablonları çekeceğiz
  const templates = []; // Örnek veri

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">SMS Şablonları</h1>
      <table className="w-full bg-white shadow-md rounded">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 text-left">Şablon Adı</th>
            <th className="p-2 text-left">SMS Başlığı</th>
            <th className="p-2 text-left">Mesaj</th>
            <th className="p-2 text-left">İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {templates.map((template) => (
            <tr key={template.id}>
              <td className="p-2">{template.name}</td>
              <td className="p-2">{template.header}</td>
              <td className="p-2">{template.message}</td>
              <td className="p-2">
                <Link
                  to={`/edit/${template.id}`}
                  className="text-blue-600 hover:text-blue-800 mr-2"
                >
                  Düzenle
                </Link>
                <button className="text-red-600 hover:text-red-800">Sil</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TemplateList;
