import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

function TemplateForm() {
  const [template, setTemplate] = useState({
    name: "",
    header: "",
    message: "",
  });
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    if (id) {
      // Eğer id varsa, mevcut şablonu getir ve formu doldur
      // API çağrısı burada yapılacak
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // API'ye gönderme işlemi burada yapılacak
    // İşlem tamamlandıktan sonra ana sayfaya yönlendir
    history.push("/");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">
        {id ? "SMS Şablonu Düzenle" : "Yeni SMS Şablonu"}
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Şablon Adı
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            value={template.name}
            onChange={(e) => setTemplate({ ...template, name: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="header"
          >
            SMS Başlığı
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="header"
            type="text"
            value={template.header}
            onChange={(e) =>
              setTemplate({ ...template, header: e.target.value })
            }
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="message"
          >
            Mesaj
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="message"
            value={template.message}
            onChange={(e) =>
              setTemplate({ ...template, message: e.target.value })
            }
            rows="4"
          />
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Kaydet
        </button>
      </form>
    </div>
  );
}

export default TemplateForm;
