import { useState, useEffect } from "react";
import { useParams, useHistory, Prompt } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/solid";
import axios from "axios";

function TemplateForm() {
  const [template, setTemplate] = useState({
    sablonAdi: "",
    kilitliMi: false,
    smsBasligi: "",
    smsMetni: "",
    degiskenler: {
      dosyaNo: "",
      borcuAdiMuhattap: "",
    },
  });
  const [initialTemplate, setInitialTemplate] = useState(null);
  const [smsBasliklar, setSmsBasliklar] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const { id } = useParams();
  const history = useHistory();

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://192.168.1.215:51080/api/app/sms-baslik",
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjRGOTY5MUQyMDk3RUExQ0QxODk5REZFRDg5QzM5NUNBQ0VENTQzQTkiLCJ4NXQiOiJUNWFSMGdsLW9jMFltZF90aWNPVnlzN1ZRNmsiLCJ0eXAiOiJhdCtqd3QifQ.eyJpc3MiOiJodHRwOi8vMTkyLjE2OC4xLjIxNTo1MDA4MC8iLCJleHAiOjE3MjkyNTgzOTgsImlhdCI6MTcyOTI1NDc5OCwiYXVkIjoiTGF3YXN0Q3JtQXBpIiwic2NvcGUiOiJMYXdhc3RDcm1BcGkiLCJqdGkiOiJjYWM5OGJiYS05M2UwLTQ1N2QtYWQ4NS0xZGYyMGQ5NjJmM2UiLCJzdWIiOiIzYTE1ODU1My1mODQ0LTgzN2YtODQ1My1jNDQzN2VhOTUwYWYiLCJ1bmlxdWVfbmFtZSI6InN1cGVyYWRtaW4iLCJvaV9wcnN0IjoiTGF3YXN0Q3JtQXBpX1N3YWdnZXIiLCJvaV9hdV9pZCI6IjNhMTU4NTU1LTRkYTYtY2FhMy01OWU1LTU3OWYwNzE0MTYwZSIsInByZWZlcnJlZF91c2VybmFtZSI6InN1cGVyYWRtaW4iLCJnaXZlbl9uYW1lIjoiU3VwZXIiLCJmYW1pbHlfbmFtZSI6IkFkbWluIiwicm9sZSI6ImFkbWluIiwiZW1haWwiOiJzdXBlcmFkbWluQGthcmFzb3kuY29tLnRyIiwiZW1haWxfdmVyaWZpZWQiOiJGYWxzZSIsInBob25lX251bWJlcl92ZXJpZmllZCI6IkZhbHNlIiwiY2xpZW50X2lkIjoiTGF3YXN0Q3JtQXBpX1N3YWdnZXIiLCJvaV90a25faWQiOiIzYTE1YjFjYi0wYzE2LThiMGMtODJlOS0yMDE3ZTViMTViMWQifQ.JRzJKAyUyD0e6ImHJcraqYlp-sg87u_sEeyEVdQ3tWF5MHgWaeb_MRt-AvUy91KIibOdbjw6JT-IrCPQChk8xVf-0JExsShsJHBTNb4786V8OfFnZ1iVwNCu40IwZy3D3XVWnkaB4PNaz1Mxe1wBTo6Jx1yR79pxbjAwL6g4NS2a1NUQExhRyll5b4-aK86scTckxtk5t41pr3piMxOfl79RTBJ8XXQX_O_c0jZKBH6rkToY87D9D7kLZUbf4055Ptdri9vIQMnOeK-ZT_gXwb8sKrANv3hXenJ1698EqTHLzr2JaEOfmB21BGG1lhX4VosI393X2OMFDkiUaD57sA`,
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Veri çekilirken hata oluştu:", error);
    }
  };

  fetchData();

  useEffect(() => {
    fetchSmsBasliklar();
    if (id) {
      fetchTemplate(id);
    } else {
      setInitialTemplate(template);
    }
  }, [id]);

  const fetchSmsBasliklar = async () => {
    setSmsBasliklar([
      { id: 1, ad: "Başlık 1" },
      { id: 2, ad: "Başlık 2" },
    ]);
  };

  const fetchTemplate = async (templateId) => {
    setTemplate({
      sablonAdi: "Örnek Şablon",
      kilitliMi: false,
      smsBasligi: "1",
      smsMetni: "Örnek SMS metni",
      degiskenler: {
        dosyaNo: "123",
        borcuAdiMuhattap: "John Doe",
      },
    });
    setInitialTemplate({
      sablonAdi: "Örnek Şablon",
      kilitliMi: false,
      smsBasligi: "1",
      smsMetni: "Örnek SMS metni",
      degiskenler: {
        dosyaNo: "123",
        borcuAdiMuhattap: "John Doe",
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setError(null);
      setInitialTemplate(template);
      setTimeout(() => {
        history.push("/");
      }, 2000);
    }, 1000);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.startsWith("degiskenler.")) {
      const degiskenName = name.split(".")[1];
      setTemplate((prev) => ({
        ...prev,
        degiskenler: {
          ...prev.degiskenler,
          [degiskenName]: value,
        },
      }));
    } else {
      setTemplate((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const isFormDirty = () => {
    return JSON.stringify(template) !== JSON.stringify(initialTemplate);
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-100 min-h-screen">
      <Prompt
        when={isFormDirty()}
        message="Kaydedilmemiş değişiklikleriniz var. Çıkmak istediğinizden emin misiniz?"
      />
      {(error || success) && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mb-4 p-4 rounded-md ${
            error
              ? "bg-red-100 border-l-4 border-red-500 text-red-700"
              : "bg-green-100 border-l-4 border-green-500 text-green-700"
          } flex items-center`}
          role="alert"
        >
          {error ? (
            <XMarkIcon className="h-5 w-5 mr-2" />
          ) : (
            <CheckIcon className="h-5 w-5 mr-2" />
          )}
          <p>
            {error || "Şablon başarıyla kaydedildi. Yönlendiriliyorsunuz..."}
          </p>
        </motion.div>
      )}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden"
      >
        <div className="px-6 py-4 bg-gray-800 text-white">
          <h2 className="text-2xl font-bold">
            {id ? "SMS Şablonu Düzenle" : "Yeni SMS Şablonu"}
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="sablonAdi"
            >
              Şablon Adı
            </label>
            <input
              type="text"
              id="sablonAdi"
              name="sablonAdi"
              value={template.sablonAdi}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="kilitliMi"
            >
              Kilitli mi?
            </label>
            <input
              type="checkbox"
              id="kilitliMi"
              name="kilitliMi"
              checked={template.kilitliMi}
              onChange={handleChange}
              className="mt-1 h-4 w-4 text-gray-600 focus:ring-gray-500 border-gray-300 rounded"
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="smsBasligi"
            >
              SMS Başlığı
            </label>
            <select
              id="smsBasligi"
              name="smsBasligi"
              value={template.smsBasligi}
              onChange={handleChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm rounded-md"
              required
            >
              <option value="">Seçiniz</option>
              {smsBasliklar.map((baslik) => (
                <option key={baslik.id} value={baslik.id}>
                  {baslik.ad}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="smsMetni"
            >
              SMS Mesaj Metni
            </label>
            <textarea
              id="smsMetni"
              name="smsMetni"
              rows="4"
              value={template.smsMetni}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
              maxLength="150"
              required
            ></textarea>
            <p className="mt-2 text-sm text-gray-500">
              {template.smsMetni.length}/150 karakter
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-2">
              Değişkenler
            </h3>
            <div className="space-y-4">
              <div>
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="degiskenler.dosyaNo"
                >
                  Dosya No
                </label>
                <input
                  type="text"
                  id="degiskenler.dosyaNo"
                  name="degiskenler.dosyaNo"
                  value={template.degiskenler.dosyaNo}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="degiskenler.borcuAdiMuhattap"
                >
                  Borçlu Adı / Muhattap
                </label>
                <input
                  type="text"
                  id="degiskenler.borcuAdiMuhattap"
                  name="degiskenler.borcuAdiMuhattap"
                  value={template.degiskenler.borcuAdiMuhattap}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              {loading ? "Kaydediliyor..." : "Kaydet"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

export default TemplateForm;
